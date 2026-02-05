"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import Atropos from "atropos/react";
import "atropos/css";
import { CrafterLogo } from "@/components/crafter-logo";
import { ThemeToggle } from "@/components/theme-toggle";

const PREVIEW_SLIDES = [
  {
    title: "MEMORIES",
    text: "Every moment with you feels like a favorite song on repeat",
    subtext: "the kind you never skip",
    image: "/images/cats/funky-cat.jpg",
    bg: "bg-gradient-to-br from-funky-navy via-funky-purple to-funky-navy",
  },
  {
    title: "VIBES",
    text: "You're the perfect playlist",
    subtext: "every track hits different",
    image: "/images/cats/tipsy-cat.jpg",
    bg: "bg-gradient-to-br from-tipsy-burgundy via-tipsy-wine to-tipsy-burgundy",
  },
  {
    title: "FEELS",
    text: "Like a cloudy day with you",
    subtext: "somehow it's still the best day",
    image: "/images/cats/cloudy-cat.jpg",
    bg: "bg-gradient-to-br from-cloudy-teal via-cloudy-mint to-cloudy-teal",
  },
  {
    title: "QUESTION",
    text: "So... wanna be my Valentine?",
    subtext: "pick your answer wisely",
    image: "/images/cats/meowcha-cat.jpg",
    bg: "bg-gradient-to-br from-meowcha-olive via-meowcha-lime/20 to-meowcha-olive",
  },
] as const;

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slide = PREVIEW_SLIDES[currentSlide];

  return (
    <div className="min-h-screen bg-background grain-intense">
      {/* Header */}
      <header className="border-b border-border backdrop-blur-sm bg-background/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CrafterLogo className="w-8 h-8" />
            <span className="font-mono text-foreground font-bold">Valentine 2026</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://crafterstation.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground font-mono text-sm transition-colors"
            >
              by Crafter Station
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block px-4 py-2 bg-funky-pink/20 border border-funky-pink/30 rounded-full text-funky-pink font-mono text-sm mb-4">
            Valentine's 2026 Limited Edition ✨
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-extrabold text-foreground tracking-tight">
            Just
            <span className="block text-primary">
              Ask Them.
            </span>
          </h1>

          <p className="font-serif italic text-xl md:text-2xl text-primary">
            Where love stories begin
          </p>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Create a personalized, lo-fi cassette-inspired Valentine's proposal with AI-generated mascots
          </p>
        </div>
      </section>

      {/* Preview Section */}
      <section className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 space-y-2">
            <h2 className="font-display text-2xl md:text-4xl font-extrabold text-foreground">
              Just Preview It.
            </h2>
            <p className="font-serif italic text-lg md:text-xl text-primary">
              See how your Valentine story unfolds
            </p>
          </div>

          {/* Interactive Preview with Atropos */}
          <Atropos
            className="atropos-preview w-full"
            activeOffset={40}
            shadowScale={1.05}
            rotateXMax={10}
            rotateYMax={10}
            shadow={true}
            highlight={true}
          >
            {/* Outer glass frame */}
            <div
              data-atropos-offset="-2"
              className="absolute inset-0 rounded-3xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                boxShadow:
                  "0 25px 80px rgba(0, 0, 0, 0.4), inset 1px 1px 2px rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            />

            {/* Main content */}
            <div
              data-atropos-offset="0"
              className={`${slide.bg} grain-intense rounded-3xl p-8 md:p-12 transition-all duration-700 relative overflow-hidden`}
              style={{
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
              }}
            >
              <div className="relative z-10 flex flex-col h-full">
                {/* Slide Header */}
                <div className="flex items-center justify-between mb-6" data-atropos-offset="3">
                  <div className="flex items-center gap-2">
                    <div className="text-white/40 text-xs font-mono">SIDE A</div>
                    <div className="w-8 h-[2px] bg-white/20" />
                  </div>
                  <h3 className="font-serif text-xl md:text-3xl font-bold text-white">
                    {slide.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-[2px] bg-white/20" />
                    <div className="text-white/40 text-xs font-mono">SIDE B</div>
                  </div>
                </div>

                {/* Image */}
                <div className="flex-1 flex items-center justify-center mb-6" data-atropos-offset="5">
                  <div className="relative w-full max-w-sm aspect-square cat-float">
                    <Image
                      src={slide.image}
                      alt="Illustration"
                      fill
                      className="object-contain drop-shadow-2xl"
                      priority
                    />
                  </div>
                </div>

                {/* Slide Content */}
                <div className="text-center space-y-2" data-atropos-offset="3">
                  <p className="text-white font-serif text-lg md:text-xl font-bold">
                    {slide.text}
                  </p>
                  <p className="text-white/60 font-mono text-xs md:text-sm">{slide.subtext}</p>
                </div>
              </div>
            </div>
          </Atropos>

          {/* Navigation - Outside Atropos */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-background/80 hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 text-foreground font-mono rounded-lg transition-all duration-200 border border-border hover:scale-105 backdrop-blur-sm"
            >
              ← Prev
            </button>
            <div className="text-muted-foreground font-mono text-sm px-3 py-1 bg-background/80 rounded-full backdrop-blur-sm border border-border">
              {currentSlide + 1} / {PREVIEW_SLIDES.length}
            </div>
            <button
              onClick={() => setCurrentSlide(Math.min(PREVIEW_SLIDES.length - 1, currentSlide + 1))}
              disabled={currentSlide === PREVIEW_SLIDES.length - 1}
              className="px-4 py-2 bg-background/80 hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 text-foreground font-mono rounded-lg transition-all duration-200 border border-border hover:scale-105 backdrop-blur-sm"
            >
              Next →
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-xl mx-auto text-center space-y-6">
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-foreground">
            Just Create Yours.
          </h2>
          <p className="font-serif italic text-lg md:text-xl text-primary mb-4">
            Where your story begins
          </p>
          <p className="text-base md:text-lg text-muted-foreground">
            Customize with your Valentine's name, choose your mascot vibe, and share
          </p>
          <Link
            href="/create"
            className="inline-block px-10 py-4 bg-primary text-primary-foreground font-mono font-bold text-lg rounded-2xl hover:scale-105 hover:bg-primary/90 transition-all duration-300 shadow-2xl animate-in fade-in slide-in-from-bottom-2 delay-300"
          >
            Create yours ✨
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-24">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground font-mono text-sm">
          Made with 💜 by{" "}
          <a
            href="https://crafterstation.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Crafter Station
          </a>
        </div>
      </footer>

      <style jsx global>{`
        .atropos-preview {
          perspective: 1200px;
        }
        .atropos-preview .atropos-scale,
        .atropos-preview .atropos-rotate {
          transform-style: preserve-3d;
        }
        .atropos-preview .atropos-inner {
          transform-style: preserve-3d;
        }
        .atropos-preview .atropos-shadow {
          filter: blur(30px);
          background: radial-gradient(
            ellipse at center,
            rgba(0, 0, 0, 0.35) 0%,
            transparent 70%
          );
        }
        .atropos-preview .atropos-highlight {
          background: radial-gradient(
            ellipse at center,
            rgba(255, 255, 255, 0.15) 0%,
            transparent 60%
          );
        }
      `}</style>
    </div>
  );
}
