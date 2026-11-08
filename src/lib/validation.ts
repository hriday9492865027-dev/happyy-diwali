export interface ValidationResult {
  valid: boolean;
  error?: string;
  mimeType?: string;
}

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

/**
 * Validates file buffer using magic bytes (file signatures)
 * Never trusts filename or browser MIME alone (Database & Security Rule 14).
 */
export function validateImageBuffer(buffer: Buffer): ValidationResult {
  if (!buffer || buffer.length === 0) {
    return { valid: false, error: "The provided file is empty." };
  }

  if (buffer.length > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: "File exceeds the 10 MB limit. Please select a smaller photo.",
    };
  }

  // Check JPEG: FF D8 FF
  if (
    buffer.length >= 3 &&
    buffer[0] === 0xff &&
    buffer[1] === 0xd8 &&
    buffer[2] === 0xff
  ) {
    return { valid: true, mimeType: "image/jpeg" };
  }

  // Check PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return { valid: true, mimeType: "image/png" };
  }

  // Check WebP: RIFF .... WEBP
  if (
    buffer.length >= 12 &&
    buffer[0] === 0x52 && // R
    buffer[1] === 0x49 && // I
    buffer[2] === 0x46 && // F
    buffer[3] === 0x46 && // F
    buffer[8] === 0x57 && // W
    buffer[9] === 0x45 && // E
    buffer[10] === 0x42 && // B
    buffer[11] === 0x50 // P
  ) {
    return { valid: true, mimeType: "image/webp" };
  }

  return {
    valid: false,
    error:
      "Unsupported file format. Please upload a genuine JPEG, PNG, or WebP photo.",
  };
}
