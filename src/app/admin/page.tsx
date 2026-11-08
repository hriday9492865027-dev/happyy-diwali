"use client";

import React, { useState } from "react";
import { Settings, Save, ShieldCheck, Eye, Sliders, ToggleLeft, ToggleRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
  const [title, setTitle] = useState("Happy Deepavali");
  const [subtitle, setSubtitle] = useState(
    "May the divine glow of Deepavali illuminate your world with health, joy, and endless prosperity."
  );
  const [senderName, setSenderName] = useState("");
  const [institutionName, setInstitutionName] = useState("");
  const [ghostOpacity, setGhostOpacity] = useState(0.08);
  const [particleDensity, setParticleDensity] = useState(60);

  const [features, setFeatures] = useState({
    allowUploads: true,
    allowSharing: true,
    allowReplay: true,
    allowAudio: false,
    allowIntro: true,
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const toggleFeature = (key: keyof typeof features) => {
    setFeatures((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-festival-dark text-festival-text-bright p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Admin Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-festival-border gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-festival-gold/10 border border-festival-gold/30">
              <Settings className="w-6 h-6 text-festival-gold" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold font-cinematic text-festival-text-bright">
                Festival Administration
              </h1>
              <p className="text-xs text-festival-text-muted">
                Manage greeting text, visual thresholds, and feature flags
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className="px-4 py-2 rounded-xl border border-festival-border hover:border-festival-gold text-xs font-medium text-festival-text-muted hover:text-festival-gold flex items-center space-x-1.5 transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>View Live Greeting</span>
            </Link>
          </div>
        </header>

        {savedSuccess && (
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 text-xs flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Settings saved successfully! Updated configurations are now live.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Greeting Copy Card */}
          <div className="p-6 rounded-2xl bg-festival-surface border border-festival-border shadow-xl space-y-4">
            <h2 className="text-sm font-semibold text-festival-gold font-cinematic uppercase tracking-wider flex items-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>Greeting Text & Attribution</span>
            </h2>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-festival-text-muted">
                Festival Greeting Headline
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-festival-card border border-festival-border text-xs sm:text-sm text-festival-text-bright focus:border-festival-gold outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-festival-text-muted">
                Supporting Message / Blessing
              </label>
              <textarea
                rows={3}
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-festival-card border border-festival-border text-xs sm:text-sm text-festival-text-bright focus:border-festival-gold outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="space-y-1">
                <label className="text-xs text-festival-text-muted">Sender / Sign-off</label>
                <input
                  type="text"
                  placeholder="e.g. Dean's Office"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-festival-card border border-festival-border text-xs text-festival-text-bright focus:border-festival-gold outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-festival-text-muted">Institution Name</label>
                <input
                  type="text"
                  placeholder="e.g. University"
                  value={institutionName}
                  onChange={(e) => setInstitutionName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-festival-card border border-festival-border text-xs text-festival-text-bright focus:border-festival-gold outline-none"
                />
              </div>
            </div>
          </div>

          {/* Visual Settings & Feature Toggles */}
          <div className="p-6 rounded-2xl bg-festival-surface border border-festival-border shadow-xl space-y-5">
            <h2 className="text-sm font-semibold text-festival-gold font-cinematic uppercase tracking-wider flex items-center space-x-2">
              <Sliders className="w-4 h-4" />
              <span>Animation & Visual Tuning</span>
            </h2>

            {/* Ghost Opacity Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-festival-text-muted">Ghost Portrait Opacity</span>
                <span className="text-festival-gold font-mono">{Math.round(ghostOpacity * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.04"
                max="0.15"
                step="0.01"
                value={ghostOpacity}
                onChange={(e) => setGhostOpacity(parseFloat(e.target.value))}
                className="w-full accent-festival-gold cursor-pointer"
              />
              <span className="text-[10px] text-festival-text-dim block">
                Recommended design range: 5% - 12%
              </span>
            </div>

            {/* Particle Density */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs">
                <span className="text-festival-text-muted">Cracker Spark Density</span>
                <span className="text-festival-gold font-mono">{particleDensity} sparks</span>
              </div>
              <input
                type="range"
                min="20"
                max="120"
                step="5"
                value={particleDensity}
                onChange={(e) => setParticleDensity(parseInt(e.target.value))}
                className="w-full accent-festival-gold cursor-pointer"
              />
              <span className="text-[10px] text-festival-text-dim block">
                Automatically adapts to lower budgets on mobile devices
              </span>
            </div>

            {/* Feature Flags */}
            <div className="pt-3 border-t border-festival-border space-y-3">
              <h3 className="text-xs font-semibold text-festival-text-muted uppercase tracking-wider">
                Feature Toggles
              </h3>

              <div className="flex items-center justify-between py-1">
                <span className="text-xs text-festival-text-bright">Allow Photo Uploads</span>
                <button
                  type="button"
                  onClick={() => toggleFeature("allowUploads")}
                  className="text-festival-gold"
                >
                  {features.allowUploads ? (
                    <ToggleRight className="w-7 h-7 text-festival-gold" />
                  ) : (
                    <ToggleLeft className="w-7 h-7 text-festival-text-dim" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-xs text-festival-text-bright">Enable Native Web Share</span>
                <button
                  type="button"
                  onClick={() => toggleFeature("allowSharing")}
                  className="text-festival-gold"
                >
                  {features.allowSharing ? (
                    <ToggleRight className="w-7 h-7 text-festival-gold" />
                  ) : (
                    <ToggleLeft className="w-7 h-7 text-festival-text-dim" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-xs text-festival-text-bright">Enable Replay Button</span>
                <button
                  type="button"
                  onClick={() => toggleFeature("allowReplay")}
                  className="text-festival-gold"
                >
                  {features.allowReplay ? (
                    <ToggleRight className="w-7 h-7 text-festival-gold" />
                  ) : (
                    <ToggleLeft className="w-7 h-7 text-festival-text-dim" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="min-h-[44px] px-7 py-2.5 rounded-xl bg-festival-gold text-festival-dark text-xs sm:text-sm font-semibold flex items-center space-x-2 shadow-lg shadow-amber-500/20 hover:bg-festival-gold-light active:scale-95 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Publish Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

