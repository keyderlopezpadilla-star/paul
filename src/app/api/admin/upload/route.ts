import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { isAllowedFolder, signUpload } from "@/lib/cloudinary";

export const runtime = "nodejs";

/**
 * Mints a Cloudinary upload signature for the admin media uploader.
 * Auth-protected — only signed-in CMS users can request a signature.
 * Returns 501 when Cloudinary is not configured so the client can fall back
 * to manual URL entry.
 */
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ ok: false, error: "No autorizado." }, { status: 401 });
  }

  let body: { folder?: string };
  try {
    body = (await req.json()) as { folder?: string };
  } catch {
    body = {};
  }

  const folder = body.folder ?? "agropaul/media";
  if (!isAllowedFolder(folder)) {
    return NextResponse.json({ ok: false, error: "Carpeta no permitida." }, { status: 400 });
  }

  const signed = signUpload(folder);
  if (!signed) {
    return NextResponse.json(
      { ok: false, configured: false, error: "Cloudinary no está configurado." },
      { status: 501 },
    );
  }

  return NextResponse.json({ ok: true, configured: true, ...signed });
}
