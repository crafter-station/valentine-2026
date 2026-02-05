"use client";

import { useState } from "react";
import Link from "next/link";

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const previewSlides = [
    {
      title: "MEMORIES",
      text: "Every moment with you feels like a favorite song on repeat",
      bg: "bg-gradient-to-br from-funky-navy via-funky-purple to-funky-navy",
    },
    {
      title: "VIBES",
      text: "You're the perfect playlist",
      bg: "bg-gradient-to-br from-tipsy-burgundy via-tipsy-wine to-tipsy-burgundy",
    },
    {
      title: "FEELS",
      text: "Like a cloudy day with you",
      bg: "bg-gradient-to-br from-cloudy-teal via-cloudy-mint to-cloudy-teal",
    },
    {
      title: "QUESTION",
      text: "So... wanna be my Valentine?",
      bg: "bg-gradient-to-br from-meowcha-olive via-meowcha-lime/20 to-meowcha-olive",
    },
  ];

  const slide = previewSlides[currentSlide];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 grain-intense scanline">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm bg-black/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-funky-pink rounded-lg" />
            <span className="font-mono text-white/90 font-bold">Valentine 2026</span>
          </div>
          <div className="text-white/60 font-mono text-sm">
            by Crafter Station
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block px-4 py-2 bg-funky-pink/20 border border-funky-pink/30 rounded-full text-funky-pink font-mono text-sm mb-4">
            Valentine's 2026 Limited Edition ✨
          </div>

          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white tracking-tight">
            Ask them to be your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-funky-pink via-funky-purple to-celebration-pink">
              Valentine 💝
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/70 font-mono max-w-2xl mx-auto">
            Create a personalized, lo-fi cassette-inspired Valentine's proposal with AI-generated mascots
          </p>
        </div>
      </section>

      {/* Preview Section */}
      <section className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center font-serif text-3xl md:text-4xl font-bold text-white mb-8">
            See it in action
          </h2>

          {/* Interactive Preview */}
          <div className={`${slide.bg} grain-intense rounded-3xl p-8 md:p-12 transition-all duration-700 relative overflow-hidden`}>
            <div className="absolute inset-0 scanline pointer-events-none" />

            <div className="relative z-10">
              {/* Slide Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="text-white/40 text-xs font-mono">SIDE A</div>
                  <div className="w-8 h-[2px] bg-white/20" />
                </div>
                <h3 className="font-serif text-2xl md:text-4xl font-bold text-white">
                  {slide.title}
                </h3>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-[2px] bg-white/20" />
                  <div className="text-white/40 text-xs font-mono">SIDE B</div>
                </div>
              </div>

              {/* Slide Content */}
              <div className="text-center py-12 md:py-16">
                <p className="text-white font-serif text-xl md:text-3xl font-bold">
                  {slide.text}
                </p>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                  disabled={currentSlide === 0}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-white font-mono rounded-lg transition"
                >
                  ← Prev
                </button>
                <div className="text-white/70 font-mono text-sm">
                  {currentSlide + 1} / {previewSlides.length}
                </div>
                <button
                  onClick={() => setCurrentSlide(Math.min(previewSlides.length - 1, currentSlide + 1))}
                  disabled={currentSlide === previewSlides.length - 1}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-white font-mono rounded-lg transition"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>

          <p className="text-center text-white/50 font-mono text-sm mt-4">
            Use arrow keys to navigate
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-xl mx-auto text-center space-y-6">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-white">
            Make it yours
          </h2>
          <p className="text-lg text-white/70 font-mono">
            Customize with your Valentine's name, choose your mascot vibe, and share
          </p>
          <Link
            href="/create"
            className="inline-block px-12 py-5 bg-gradient-to-r from-funky-pink to-celebration-pink text-white font-mono font-bold text-xl rounded-2xl hover:scale-105 transition-transform shadow-2xl"
          >
            Create yours ✨
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-24">
        <div className="container mx-auto px-4 py-8 text-center text-white/50 font-mono text-sm">
          Made with 💜 by{" "}
          <a
            href="https://crafterstation.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-funky-pink hover:underline"
          >
            Crafter Station
          </a>
        </div>
      </footer>
    </div>
  );
}
