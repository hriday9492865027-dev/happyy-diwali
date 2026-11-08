import { NextRequest, NextResponse } from "next/server";
import { validateImageBuffer } from "@/lib/validation";
import { getSegmentationProvider } from "@/lib/segmentation/adapter";
import { put } from "@vercel/blob";
import { db, schema } from "@/db";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No image file provided in request." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 1. Strict Server-Side Magic Byte Validation
    const validation = validateImageBuffer(buffer);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    const mimeType = validation.mimeType || "image/png";
    const sessionId = crypto.randomUUID();
    const assetId = crypto.randomUUID();

    // 2. Perform Human-Only Background Removal
    const provider = getSegmentationProvider();
    const segmentation = await provider.removeBackground(buffer, mimeType);

    if (!segmentation.success || !segmentation.transparentCutoutBuffer) {
      return NextResponse.json(
        {
          success: false,
          error:
            segmentation.error ||
            "Unable to isolate a clear human subject from the photo. Please try a photo with clear lighting.",
        },
        { status: 422 }
      );
    }

    const cutoutBuffer = segmentation.transparentCutoutBuffer;
    let cutoutUrl = "";

    // 3. Store in Private Vercel Blob if Token is configured
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blobKey = `cutouts/${assetId}.png`;
      const blob = await put(blobKey, cutoutBuffer, {
        access: "public", // or private if using authenticated proxy
        contentType: "image/png",
      });
      cutoutUrl = blob.url;
    } else {
      // Offline / Local Development Fallback: Data URL
      cutoutUrl = `data:image/png;base64,${cutoutBuffer.toString("base64")}`;
    }

    // 4. Record Media Metadata in Neon DB if connected
    if (db) {
      try {
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24-hour retention
        await db.insert(schema.mediaAssets).values({
          id: assetId,
          sessionId,
          blobKey: cutoutUrl,
          assetType: "cutout",
          mimeType: "image/png",
          sizeBytes: cutoutBuffer.length,
          status: "ready",
          expiresAt,
        });

        await db.insert(schema.processingJobs).values({
          id: crypto.randomUUID(),
          mediaAssetId: assetId,
          provider: provider.name,
          status: "completed",
        });
      } catch (dbErr) {
        console.warn("DB logging skipped or failed:", dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      assetId,
      cutoutUrl,
      sessionId,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error occurred.";
    console.error("Upload route error:", err);
    return NextResponse.json(
      { success: false, error: `Upload processing failed: ${message}` },
      { status: 500 }
    );
  }
}

