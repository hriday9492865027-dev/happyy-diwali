export interface SegmentationResult {
  success: boolean;
  transparentCutoutBuffer?: Buffer;
  mimeType?: string;
  error?: string;
}

export interface SegmentationProvider {
  name: string;
  removeBackground(imageBuffer: Buffer, mimeType: string): Promise<SegmentationResult>;
}

/**
 * Remove.bg Provider Adapter
 */
export class RemoveBgProvider implements SegmentationProvider {
  name = "removebg";
  private apiKey: string;

  constructor(apiKey = process.env.BACKGROUND_REMOVAL_API_KEY || "") {
    this.apiKey = apiKey;
  }

  async removeBackground(imageBuffer: Buffer): Promise<SegmentationResult> {
    if (!this.apiKey) {
      return {
        success: false,
        error: "Remove.bg API key is not configured.",
      };
    }

    try {
      const formData = new FormData();
      formData.append(
        "image_file",
        new Blob([new Uint8Array(imageBuffer)]),
        "input.png"
      );
      formData.append("size", "auto");
      formData.append("format", "png");

      const response = await fetch("https://api.remove.bg/v1.0/removebg", {
        method: "POST",
        headers: {
          "X-Api-Key": this.apiKey,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        return {
          success: false,
          error: `Remove.bg API failed: ${response.status} ${errorText}`,
        };
      }

      const arrayBuffer = await response.arrayBuffer();
      return {
        success: true,
        transparentCutoutBuffer: Buffer.from(arrayBuffer),
        mimeType: "image/png",
      };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      return { success: false, error: `Remove.bg network error: ${message}` };
    }
  }
}

/**
 * Replicate / BiRefNet Provider Adapter
 * High-accuracy open-source SOTA human segmentation
 */
export class ReplicateProvider implements SegmentationProvider {
  name = "replicate";
  private apiKey: string;

  constructor(apiKey = process.env.BACKGROUND_REMOVAL_API_KEY || "") {
    this.apiKey = apiKey;
  }

  async removeBackground(imageBuffer: Buffer, mimeType: string): Promise<SegmentationResult> {
    if (!this.apiKey) {
      return { success: false, error: "Replicate API token is not configured." };
    }

    try {
      const base64Data = `data:${mimeType};base64,${imageBuffer.toString("base64")}`;
      
      const response = await fetch("https://api.replicate.com/v1/predictions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
          Prefer: "wait",
        },
        body: JSON.stringify({
          // ZhengPeng7/BiRefNet: general and human high-resolution matting
          version: "bb3b879c7207604beab56041793a388f615f33eec1fa2789182390f7710ee9d2",
          input: {
            image: base64Data,
          },
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        return { success: false, error: `Replicate failed: ${errText}` };
      }

      const prediction = await response.json();
      const outputUrl = Array.isArray(prediction.output) ? prediction.output[0] : prediction.output;

      if (!outputUrl) {
        return { success: false, error: "Replicate did not return an image URL." };
      }

      const fileRes = await fetch(outputUrl);
      const arrayBuffer = await fileRes.arrayBuffer();

      return {
        success: true,
        transparentCutoutBuffer: Buffer.from(arrayBuffer),
        mimeType: "image/png",
      };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      return { success: false, error: `Replicate network error: ${message}` };
    }
  }
}

/**
 * Fallback & Local Dev Mock Provider
 * Used in local offline development or when third-party provider keys are pending approval.
 */
export class MockDevelopmentProvider implements SegmentationProvider {
  name = "mock";

  async removeBackground(imageBuffer: Buffer, mimeType: string): Promise<SegmentationResult> {
    // In dev mode without API keys, return original buffer marked as transparent cutout
    // or test subject to allow full UI and animation verification
    return {
      success: true,
      transparentCutoutBuffer: imageBuffer,
      mimeType: mimeType || "image/png",
    };
  }
}

export function getSegmentationProvider(): SegmentationProvider {
  const providerName = (process.env.BACKGROUND_REMOVAL_PROVIDER || "mock").toLowerCase();

  switch (providerName) {
    case "removebg":
      return new RemoveBgProvider();
    case "replicate":
    case "birefnet":
      return new ReplicateProvider();
    case "mock":
    default:
      return new MockDevelopmentProvider();
  }
}
