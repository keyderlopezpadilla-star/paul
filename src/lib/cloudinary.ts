import { createHash } from "crypto";

/**
 * Cloudinary helpers — signed direct uploads without the SDK.
 *
 * The browser uploads the file straight to Cloudinary (so large files never
 * pass through our server); we only mint a short-lived signature server-side,
 * keeping the API secret private. If Cloudinary is not configured the CMS
 * falls back to pasting an image URL manually.
 */

export type CloudinaryConfig = {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
};

export function getCloudinaryConfig(): CloudinaryConfig | null {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) return null;
  return { cloudName, apiKey, apiSecret };
}

export function isCloudinaryConfigured(): boolean {
  return getCloudinaryConfig() !== null;
}

export type SignedUpload = {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  folder: string;
  signature: string;
};

/**
 * Build a Cloudinary upload signature. Cloudinary expects the SHA-1 of the
 * upload params (sorted, `key=value` joined by `&`) with the API secret
 * appended. We only sign `folder` + `timestamp`, so those are the params the
 * client must send alongside the file.
 */
export function signUpload(folder: string): SignedUpload | null {
  const config = getCloudinaryConfig();
  if (!config) return null;

  const timestamp = Math.floor(Date.now() / 1000);
  const toSign = `folder=${folder}&timestamp=${timestamp}`;
  const signature = createHash("sha1")
    .update(toSign + config.apiSecret)
    .digest("hex");

  return {
    cloudName: config.cloudName,
    apiKey: config.apiKey,
    timestamp,
    folder,
    signature,
  };
}

const FOLDER_ALLOWLIST = new Set([
  "agropaul/posts",
  "agropaul/testimonials",
  "agropaul/partners",
  "agropaul/services",
  "agropaul/media",
]);

export function isAllowedFolder(folder: string): boolean {
  return FOLDER_ALLOWLIST.has(folder);
}
