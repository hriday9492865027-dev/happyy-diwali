import { put, del } from "@vercel/blob";

export interface StorageResult {
  url: string;
  blobKey: string;
}

export async function storePrivateMedia(
  path: string,
  buffer: Buffer,
  contentType: string
): Promise<StorageResult> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;

  if (token) {
    const blob = await put(path, buffer, {
      access: "public",
      contentType,
    });
    return {
      url: blob.url,
      blobKey: blob.pathname,
    };
  }

  // Local development / fallback storage using data URI
  const base64 = buffer.toString("base64");
  const dataUrl = `data:${contentType};base64,${base64}`;

  return {
    url: dataUrl,
    blobKey: path,
  };
}

export async function deletePrivateMedia(blobUrl: string): Promise<boolean> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return true;

  try {
    await del(blobUrl);
    return true;
  } catch (err) {
    console.error("Failed to delete blob:", err);
    return false;
  }
}
