"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, Camera, ShieldCheck, Loader2, Sparkles, ArrowRight } from "lucide-react";
import { CutoutPreview } from "./CutoutPreview";
import { useRouter } from "next/navigation";

interface PhotoUploaderProps {
  onSuccess: (cutoutUrl: string) => void;
  onSkip: () => void;
}

export function PhotoUploader({ onSuccess, onSkip }: PhotoUploaderProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [dragActive, setDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [candidateCutoutUrl, setCandidateCutoutUrl] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setErrorMessage(null);

    // Basic client checks
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setErrorMessage("Please select a valid image file (JPEG, PNG, or WebP).");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage("File exceeds 10 MB limit. Please select a smaller photo.");
      return;
    }

    try {
      setIsProcessing(true);
      setProcessingStep("Uploading image securely...");

      const formData = new FormData();
      formData.append("file", file);

      setProcessingStep("Detecting human subject & removing background...");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to process photo.");
      }

      setCandidateCutoutUrl(data.cutoutUrl);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Processing failed.";
      setErrorMessage(
        `${message} You can try another photo or proceed with the festive diya fallback.`
      );
    } finally {
      setIsProcessing(false);
      setProcessingStep("");
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const onDragLeave = () => {
    setDragActive(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  if (candidateCutoutUrl) {
    return (
      <CutoutPreview
        cutoutUrl={candidateCutoutUrl}
        onConfirm={() => onSuccess(candidateCutoutUrl)}
        onRetry={() => {
          setCandidateCutoutUrl(null);
          setErrorMessage(null);
        }}
      />
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center">
      {/* Upload Card */}
      <div className="w-full rounded-2xl bg-festival-surface/90 border border-festival-border p-5 sm:p-7 shadow-2xl backdrop-blur-md">
        <div className="text-center mb-5">
          <div className="inline-flex p-3 rounded-full bg-festival-gold/10 border border-festival-gold/20 mb-3">
            <Camera className="w-6 h-6 text-festival-gold" />
          </div>
          <h2 className="font-cinematic text-xl sm:text-2xl font-bold text-festival-text-bright">
            Upload Your Photo
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-festival-text-muted">
            We will isolate your portrait and reveal it in cinematic golden light.
          </p>
        </div>

        {/* Dropzone */}
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative w-full rounded-xl border-2 border-dashed p-6 sm:p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
            dragActive
              ? "border-festival-gold bg-festival-gold/5 scale-[1.01]"
              : "border-festival-border hover:border-festival-gold/50 bg-festival-card/60"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFile(e.target.files[0]);
              }
            }}
          />

          {isProcessing ? (
            <div className="flex flex-col items-center space-y-3 text-center py-4">
              <Loader2 className="w-9 h-9 text-festival-gold animate-spin" />
              <p className="text-xs sm:text-sm font-medium text-festival-gold">
                {processingStep || "Processing..."}
              </p>
              <p className="text-[11px] text-festival-text-dim">
                Stripping background scenery & refining edges
              </p>
            </div>
          ) : (
            <>
              <div className="p-3 rounded-full bg-festival-surface border border-festival-border mb-3">
                <UploadCloud className="w-6 h-6 text-festival-gold" />
              </div>
              <p className="text-xs sm:text-sm font-medium text-festival-text-bright text-center">
                Tap to choose from Camera Roll or drag file here
              </p>
              <p className="text-[11px] text-festival-text-dim mt-1">
                JPEG, PNG, WebP up to 10 MB
              </p>
            </>
          )}
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="mt-4 p-3 rounded-xl bg-red-950/40 border border-red-800/50 text-red-200 text-xs flex flex-col space-y-2">
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Privacy Note per PRD Section 13 */}
        <div className="mt-5 p-3 rounded-xl bg-festival-dark/70 border border-festival-border/60 flex items-start space-x-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-[11px] text-festival-text-dim leading-relaxed">
            <span className="text-festival-text-muted font-medium">Privacy Guaranteed: </span>
            Your photo is processed privately to extract your portrait. Scenery is deleted and your image is automatically erased according to retention policy.
          </div>
        </div>
      </div>

      {/* Non-Photo Fallback Action (FR-11) */}
      <button
        type="button"
        onClick={onSkip}
        className="mt-4 min-h-[44px] px-4 py-2 text-xs sm:text-sm text-festival-text-muted hover:text-festival-gold flex items-center space-x-1.5 transition-colors"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>Continue without a photo (Festive Diya Scene)</span>
        <ArrowRight className="w-3.5 h-3.5 ml-1" />
      </button>
    </div>
  );
}
