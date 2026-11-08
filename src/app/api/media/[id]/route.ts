import { NextRequest, NextResponse } from "next/server";
import { db, schema } from "@/db";
import { eq } from "drizzle-orm";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Media identifier is required." }, { status: 400 });
    }

    if (!db) {
      // In offline / local development mode without DB, return 404 for unknown IDs
      return NextResponse.json({ error: "Media not found." }, { status: 404 });
    }

    const [asset] = await db
      .select()
      .from(schema.mediaAssets)
      .where(eq(schema.mediaAssets.id, id))
      .limit(1);

    if (!asset) {
      return NextResponse.json({ error: "Asset not found." }, { status: 404 });
    }

    // Check expiration per PRD Section 12 & 13
    if (new Date() > new Date(asset.expiresAt)) {
      return NextResponse.json(
        { error: "This media asset has expired according to retention policy." },
        { status: 410 }
      );
    }

    // Redirect to private blob storage or stream the asset
    return NextResponse.redirect(asset.blobKey);
  } catch (error) {
    console.error("Error fetching media asset:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

