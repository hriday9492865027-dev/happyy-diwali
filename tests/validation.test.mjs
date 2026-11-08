import test from "node:test";
import assert from "node:assert/strict";

// Simulated validation logic mirroring src/lib/validation.ts
function validateImageBuffer(buffer) {
  if (!buffer || buffer.length === 0) {
    return { valid: false, error: "The provided file is empty." };
  }
  const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
  if (buffer.length > MAX_FILE_SIZE_BYTES) {
    return { valid: false, error: "File exceeds the 10 MB limit. Please select a smaller photo." };
  }
  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return { valid: true, mimeType: "image/jpeg" };
  }
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
  if (
    buffer.length >= 12 &&
    buffer[0] === 0x52 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x46 &&
    buffer[8] === 0x57 &&
    buffer[9] === 0x45 &&
    buffer[10] === 0x42 &&
    buffer[11] === 0x50
  ) {
    return { valid: true, mimeType: "image/webp" };
  }
  return { valid: false, error: "Unsupported file format. Please upload a genuine JPEG, PNG, or WebP photo." };
}

test("rejects empty buffer", () => {
  const res = validateImageBuffer(Buffer.from([]));
  assert.equal(res.valid, false);
});

test("detects valid JPEG magic bytes", () => {
  const jpegBuffer = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10]);
  const res = validateImageBuffer(jpegBuffer);
  assert.equal(res.valid, true);
  assert.equal(res.mimeType, "image/jpeg");
});

test("detects valid PNG magic bytes", () => {
  const pngBuffer = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00]);
  const res = validateImageBuffer(pngBuffer);
  assert.equal(res.valid, true);
  assert.equal(res.mimeType, "image/png");
});

test("rejects arbitrary text file disguised as image", () => {
  const fakeBuffer = Buffer.from("<html><script>alert(1)</script></html>");
  const res = validateImageBuffer(fakeBuffer);
  assert.equal(res.valid, false);
});
