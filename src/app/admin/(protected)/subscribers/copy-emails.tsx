"use client";

import { useState } from "react";
import { Copy, Check, Download } from "lucide-react";

export function CopyEmails({ emails }: { emails: string[] }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(emails.join(", "));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const downloadCsv = () => {
    const csv = "email\n" + emails.join("\n");
    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8;" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = `agropaul-suscriptores-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (emails.length === 0) return null;

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-2 rounded-full border border-forest-900/15 px-4 py-2 text-sm font-medium text-forest-900 transition-colors hover:bg-forest-50"
      >
        {copied ? <Check className="h-4 w-4 text-accent-600" /> : <Copy className="h-4 w-4" />}
        {copied ? "Copiado" : "Copiar emails"}
      </button>
      <button
        type="button"
        onClick={downloadCsv}
        className="inline-flex items-center gap-2 rounded-full bg-forest-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-forest-800"
      >
        <Download className="h-4 w-4" /> Exportar CSV
      </button>
    </div>
  );
}
