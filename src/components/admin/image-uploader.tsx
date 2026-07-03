"use client";

import { useRef, useState } from "react";
import { UploadCloud, Loader2, X, ImageIcon, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";

type SignResponse = {
  ok: boolean;
  configured?: boolean;
  cloudName?: string;
  apiKey?: string;
  timestamp?: number;
  folder?: string;
  signature?: string;
  error?: string;
};

/**
 * Admin media field. Uploads directly to Cloudinary via a server-signed
 * request; if Cloudinary is not configured it degrades to manual URL entry.
 * The resulting image URL is stored in a hidden input named `name` so it is
 * submitted with the surrounding server-action form.
 */
export function ImageUploader({
  name,
  label,
  defaultValue = "",
  folder = "agropaul/media",
  hint,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  folder?: string;
  hint?: string;
}) {
  const [url, setUrl] = useState(defaultValue);
  const [status, setStatus] = useState<"idle" | "uploading">("idle");
  const [error, setError] = useState<string | null>(null);
  const [manual, setManual] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setError(null);
    setStatus("uploading");
    try {
      // 1. Ask our server for a signature.
      const signRes = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder }),
      });

      if (signRes.status === 501) {
        setManual(true);
        setError(
          "Cloudinary no está configurado. Pega la URL de una imagen abajo.",
        );
        return;
      }
      const sign = (await signRes.json()) as SignResponse;
      if (!signRes.ok || !sign.signature) {
        setError(sign.error ?? "No se pudo iniciar la subida.");
        return;
      }

      // 2. Upload the file straight to Cloudinary.
      const form = new FormData();
      form.append("file", file);
      form.append("api_key", sign.apiKey!);
      form.append("timestamp", String(sign.timestamp));
      form.append("folder", sign.folder!);
      form.append("signature", sign.signature);

      const upRes = await fetch(
        `https://api.cloudinary.com/v1_1/${sign.cloudName}/image/upload`,
        { method: "POST", body: form },
      );
      const upData = (await upRes.json()) as {
        secure_url?: string;
        error?: { message?: string };
      };
      if (!upRes.ok || !upData.secure_url) {
        setError(upData.error?.message ?? "La subida ha fallado.");
        return;
      }
      setUrl(upData.secure_url);
    } catch {
      setError("Error de red durante la subida.");
    } finally {
      setStatus("idle");
    }
  };

  return (
    <div>
      <span className="mb-1.5 block text-sm font-medium text-forest-900">{label}</span>
      <input type="hidden" name={name} value={url} />

      <div className="flex items-start gap-4">
        {/* Preview */}
        <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-forest-900/15 bg-mist">
          {url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={url} alt="Vista previa" className="h-full w-full object-cover" />
          ) : (
            <ImageIcon className="h-7 w-7 text-slate/50" />
          )}
          {url && (
            <button
              type="button"
              onClick={() => setUrl("")}
              aria-label="Quitar imagen"
              className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-forest-900/70 text-white hover:bg-harvest-600"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={status === "uploading"}
              className={cn(
                "inline-flex items-center gap-2 rounded-lg border border-forest-900/15 bg-white px-4 py-2 text-sm font-medium text-forest-900 transition-colors hover:bg-forest-50 disabled:opacity-60",
              )}
            >
              {status === "uploading" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <UploadCloud className="h-4 w-4" />
              )}
              {status === "uploading" ? "Subiendo..." : "Subir imagen"}
            </button>
            <button
              type="button"
              onClick={() => setManual((m) => !m)}
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate transition-colors hover:text-forest-700"
            >
              <Link2 className="h-4 w-4" /> {manual ? "Ocultar URL" : "Usar URL"}
            </button>
          </div>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
              e.target.value = "";
            }}
          />

          {(manual || (url && !url.includes("res.cloudinary.com"))) && (
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://.../imagen.jpg"
              className="w-full rounded-lg border border-forest-900/15 bg-white px-3 py-2 text-sm text-forest-900 placeholder:text-slate/60 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
            />
          )}

          {hint && !error && <p className="text-xs text-slate">{hint}</p>}
          {error && <p className="text-xs text-harvest-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}
