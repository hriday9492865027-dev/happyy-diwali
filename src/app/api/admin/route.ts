import { NextRequest, NextResponse } from "next/server";
import { db, schema } from "@/db";
import { eq, lt, sql } from "drizzle-orm";
import { deletePrivateMedia } from "@/lib/storage";
import crypto from "crypto";

export async function GET() {
  try {
    if (!db) {
      return NextResponse.json({
        config: {
          title: "Happy Deepavali",
          subtitle: "May the divine light illuminate your path with joy, peace, and boundless prosperity.",
          enabledFeatures: {
            allowUploads: true,
            allowSharing: true,
            allowReplay: true,
            allowAudio: false,
            allowIntro: true,
          },
          themeJson: {
            ghostOpacity: 0.08,
            particleBudgetMobile: 40,
            particleBudgetDesktop: 120,
            accentColor: "#FFD700",
          },
        },
        metrics: {
          totalUploads: 0,
          failedProcessing: 0,
          activeAssets: 0,
        },
      });
    }

    const configs = await db.select().from(schema.greetingConfigs).limit(1);
    const activeConfig = configs[0] || null;

    // Fetch aggregate metrics without exposing personal details (PRD Section 10.1)
    const [uploadCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(schema.mediaAssets);

    const [failedCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(schema.processingJobs)
      .where(eq(schema.processingJobs.status, "failed"));

    return NextResponse.json({
      config: activeConfig,
      metrics: {
        totalUploads: Number(uploadCount?.count || 0),
        failedProcessing: Number(failedCount?.count || 0),
      },
    });
  } catch (error) {
    console.error("Admin GET error:", error);
    return NextResponse.json({ error: "Failed to load admin data" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, subtitle, senderName, institutionName, enabledFeatures, themeJson } = body;

    if (!db) {
      return NextResponse.json({ success: true, message: "Mock admin settings saved." });
    }

    const configId = "default-config";
    await db
      .insert(schema.greetingConfigs)
      .values({
        id: configId,
        title: title || "Happy Deepavali",
        subtitle: subtitle || "",
        senderName,
        institutionName,
        enabledFeatures: enabledFeatures || {},
        themeJson: themeJson || {},
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: schema.greetingConfigs.id,
        set: {
          title,
          subtitle,
          senderName,
          institutionName,
          enabledFeatures,
          themeJson,
          updatedAt: new Date(),
        },
      });

    // Record Audit Log (PRD Section 10.2)
    await db.insert(schema.auditLogs).values({
      id: crypto.randomUUID(),
      actorId: "admin",
      action: "UPDATE_CONFIG",
      targetId: configId,
      metadataJson: { title, updatedFields: Object.keys(body) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin POST error:", error);
    return NextResponse.json({ error: "Failed to update configuration" }, { status: 500 });
  }
}

/**
 * Retention and automated expiration cleanup (PRD Section 12 & 13)
 */
export async function DELETE() {
  try {
    if (!db) {
      return NextResponse.json({ success: true, deletedCount: 0 });
    }

    const now = new Date();
    // Find all expired assets
    const expiredAssets = await db
      .select()
      .from(schema.mediaAssets)
      .where(lt(schema.mediaAssets.expiresAt, now));

    let deletedBlobs = 0;
    for (const asset of expiredAssets) {
      if (asset.blobKey && asset.blobKey.startsWith("http")) {
        await deletePrivateMedia(asset.blobKey);
        deletedBlobs++;
      }
    }

    // Remove expired records from DB
    await db.delete(schema.mediaAssets).where(lt(schema.mediaAssets.expiresAt, now));

    // Audit log cleanup event
    await db.insert(schema.auditLogs).values({
      id: crypto.randomUUID(),
      actorId: "system_cron",
      action: "RETENTION_CLEANUP",
      metadataJson: { deletedAssets: expiredAssets.length, deletedBlobs },
    });

    return NextResponse.json({
      success: true,
      deletedCount: expiredAssets.length,
      deletedBlobs,
    });
  } catch (error) {
    console.error("Retention cleanup error:", error);
    return NextResponse.json({ error: "Cleanup failed" }, { status: 500 });
  }
}

