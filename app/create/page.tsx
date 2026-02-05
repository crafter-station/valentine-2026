"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import confetti from "canvas-confetti";

type PetVibe = "cats" | "dogs" | "bunnies" | "foxes";

export default function CreatePage() {
  const [step, setStep] = useState<"select" | "slides">("select");
  const [name, setName] = useState("");
  const [petVibe, setPetVibe] = useState<PetVibe>("cats");
  const [customPrompt, setCustomPrompt] = useState("");
  const [isStarting, setIsStarting] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const petVibes: { value: PetVibe; label: string; emoji: string }[] = [
    { value: "cats", label: "Cats", emoji: "🐱" },
    { value: "dogs", label: "Dogs", emoji: "🐶" },
    { value: "bunnies", label: "Bunnies", emoji: "🐰" },
    { value: "foxes", label: "Foxes", emoji: "🦊" },
  ];

  const slides = [
    {
      title: "MEMORIES",
      text: "Every moment with you feels like a favorite song on repeat",
      subtext: "the kind you never skip",
      image: "/images/funky-cat.jpg",
      bg: "bg-gradient-to-br from-funky-navy via-funky-purple to-funky-navy",
      frame: "bg-funky-navy/40 backdrop-blur-md border border-funky-purple/30",
      hasButtons: false,
    },
    {
      title: "VIBES",
      text: "You're the perfect playlist",
      subtext: "every track hits different",
      image: "/images/tipsy-cat.jpg",
      bg: "bg-gradient-to-br from-tipsy-burgundy via-tipsy-wine to-tipsy-burgundy",
      frame: "bg-tipsy-burgundy/40 backdrop-blur-md border border-tipsy-rose/30",
      hasButtons: false,
    },
    {
      title: "FEELS",
      text: "Like a cloudy day with you",
      subtext: "somehow it's still the best day",
      image: "/images/cloudy-cat.jpg",
      bg: "bg-gradient-to-br from-cloudy-teal via-cloudy-mint to-cloudy-teal",
      frame: "bg-cloudy-teal/40 backdrop-blur-md border border-cloudy-mint/30",
      hasButtons: false,
    },
    {
      title: "QUESTION",
      text: "So... wanna be my Valentine?",
      subtext: "pick your answer wisely",
      image: "/images/meowcha-cat.jpg",
      bg: "bg-gradient-to-br from-meowcha-olive via-meowcha-lime/20 to-meowcha-olive",
      frame: "bg-meowcha-olive/40 backdrop-blur-md border border-meowcha-lime/30",
      hasButtons: true,
    },
    {
      title: "YAYYY",
      text: "Best decision ever!",
      subtext: "let's make this Valentine's unforgettable",
      image: "/images/celebration-cat.jpg",
      bg: "bg-gradient-to-br from-celebration-pink via-celebration-peach to-celebration-coral",
      frame: "bg-celebration-pink/40 backdrop-blur-md border border-celebration-coral/30",
      hasButtons: false,
    },
  ];

  // Keyboard navigation (existing code)
  useEffect(() => {
    if (step !== "slides") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        const maxSlide = accepted ? slides.length - 1 : slides.length - 2;
        setCurrentSlide((prev) => Math.min(prev + 1, maxSlide));
      } else if (e.key === "Arrow Up" || e.key === "ArrowLeft") {
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [accepted, step, slides.length]);

  // Magnetic repulsion physics (existing code - keeping it unchanged)
  useEffect(() => {
    if (step !== "slides") return;

    const slide = slides[currentSlide];
    if (!slide.hasButtons) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!noButtonRef.current || !containerRef.current) return;

      const button = noButtonRef.current;
      const container = containerRef.current;
      const rect = button.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      const buttonCenterX = rect.left + rect.width / 2;
      const buttonCenterY = rect.top + rect.height / 2;

      const dx = e.clientX - buttonCenterX;
      const dy = e.clientY - buttonCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const repulsionRadius = 150;

      if (distance < repulsionRadius) {
        setNoButtonPos((prev) => {
          const buttonWithTransform = {
            left: rect.left,
            right: rect.right,
            top: rect.top,
            bottom: rect.bottom,
          };

          const edgeThreshold = 60;
          const isNearLeftEdge = buttonWithTransform.left - containerRect.left < edgeThreshold;
          const isNearRightEdge = containerRect.right - buttonWithTransform.right < edgeThreshold;
          const isNearTopEdge = buttonWithTransform.top - containerRect.top < edgeThreshold;
          const isNearBottomEdge = containerRect.bottom - buttonWithTransform.bottom < edgeThreshold;

          const isCornered =
            (isNearLeftEdge || isNearRightEdge) && (isNearTopEdge || isNearBottomEdge);

          if (isCornered && distance < repulsionRadius * 0.8) {
            const padding = 100;
            const maxOffsetX = (containerRect.width - rect.width - padding * 2) / 2;
            const maxOffsetY = (containerRect.height - rect.height - padding * 2) / 2;

            let randomX, randomY, attempts = 0;
            do {
              randomX = (Math.random() - 0.5) * maxOffsetX * 2;
              randomY = (Math.random() - 0.5) * maxOffsetY * 2;

              const newButtonX = containerRect.left + containerRect.width / 2 + randomX;
              const newButtonY = containerRect.top + containerRect.height / 2 + randomY;

              const distanceFromCursor = Math.sqrt(
                Math.pow(e.clientX - newButtonX, 2) +
                Math.pow(e.clientY - newButtonY, 2)
              );

              if (distanceFromCursor > repulsionRadius * 1.5 || attempts > 10) break;
              attempts++;
            } while (attempts < 20);

            return { x: randomX, y: randomY };
          }

          const force = (repulsionRadius - distance) / repulsionRadius;
          const intensity = 200;

          const angle = Math.atan2(dy, dx);
          const repulsionX = -Math.cos(angle) * force * intensity;
          const repulsionY = -Math.sin(angle) * force * intensity;

          const newX = prev.x + repulsionX * 0.1;
          const newY = prev.y + repulsionY * 0.1;

          const newButtonWithTransform = {
            left: rect.left + newX - prev.x,
            right: rect.right + newX - prev.x,
            top: rect.top + newY - prev.y,
            bottom: rect.bottom + newY - prev.y,
          };

          let clampedX = newX;
          let clampedY = newY;

          if (newButtonWithTransform.left < containerRect.left) {
            clampedX = newX + (containerRect.left - newButtonWithTransform.left);
          } else if (newButtonWithTransform.right > containerRect.right) {
            clampedX = newX - (newButtonWithTransform.right - containerRect.right);
          }

          if (newButtonWithTransform.top < containerRect.top) {
            clampedY = newY + (containerRect.top - newButtonWithTransform.top);
          } else if (newButtonWithTransform.bottom > containerRect.bottom) {
            clampedY = newY - (newButtonWithTransform.bottom - containerRect.bottom);
          }

          return {
            x: clampedX,
            y: clampedY,
          };
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [currentSlide, step, slides]);

  useEffect(() => {
    setNoButtonPos({ x: 0, y: 0 });
  }, [currentSlide]);

  const handleYes = () => {
    setAccepted(true);
    setCurrentSlide(slides.length - 1);
    triggerConfetti();
  };

  const triggerConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setIsStarting(true);
      setTimeout(() => {
        setStep("slides");
        setIsStarting(false);
      }, 600);
    }
  };

  // Selection Screen
  if (step === "select") {
    return (
      <div className="h-screen w-screen bg-gradient-to-br from-funky-navy via-funky-purple to-funky-navy grain-intense scanline flex items-center justify-center p-4">
        {/* Back button */}
        <Link
          href="/"
          className="absolute top-4 left-4 md:top-8 md:left-8 px-4 py-2 bg-white/10 hover:bg-white/20 text-white/70 hover:text-white font-mono text-sm rounded-lg transition backdrop-blur-sm border border-white/10 z-50"
        >
          ← Back
        </Link>

        <div className="relative w-full max-w-2xl bg-funky-navy/40 backdrop-blur-md border border-funky-purple/30 rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="text-center space-y-8">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="text-white/40 text-xs font-mono">SIDE A</div>
              <div className="w-12 h-[2px] bg-white/20"></div>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white tracking-widest text-shadow-lg text-shadow-black/30 mb-8">
              VALENTINE
            </h1>

            <form onSubmit={handleStart} className="space-y-6">
              {/* Name Input */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-white/70 font-mono text-sm">
                  who's this for?
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="enter their name"
                  className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white font-mono placeholder:text-white/30 focus:outline-none focus:border-funky-pink/50 focus:ring-2 focus:ring-funky-pink/20"
                  autoFocus
                />
              </div>

              {/* Pet Vibe Selector */}
              <div className="space-y-3">
                <label className="block text-white/70 font-mono text-sm">
                  choose your vibe
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {petVibes.map((vibe) => (
                    <button
                      key={vibe.value}
                      type="button"
                      onClick={() => setPetVibe(vibe.value)}
                      className={`px-4 py-3 rounded-xl font-mono text-sm transition-all ${
                        petVibe === vibe.value
                          ? "bg-funky-pink text-white border-2 border-funky-pink scale-105"
                          : "bg-black/20 text-white/60 border border-white/20 hover:bg-black/30"
                      }`}
                    >
                      <span className="text-2xl mr-2">{vibe.emoji}</span>
                      {vibe.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Prompt (Optional) */}
              <details className="group">
                <summary className="cursor-pointer text-white/50 font-mono text-sm hover:text-white/70 transition">
                  Advanced: Custom style prompt
                </summary>
                <div className="mt-3">
                  <textarea
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder="e.g., cyberpunk style, neon colors, futuristic..."
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white font-mono text-sm placeholder:text-white/30 focus:outline-none focus:border-funky-pink/50 focus:ring-2 focus:ring-funky-pink/20 resize-none"
                    rows={3}
                  />
                </div>
              </details>

              <button
                type="submit"
                disabled={!name.trim() || isStarting}
                className="w-full px-8 py-4 bg-funky-pink text-white font-mono font-bold text-lg rounded-2xl hover:scale-105 transition-transform shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isStarting ? "Loading..." : "START ✨"}
              </button>
            </form>

            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="w-12 h-[2px] bg-white/20"></div>
              <div className="text-white/40 text-xs font-mono">SIDE B</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Slides Screen (existing functionality)
  const slide = slides[currentSlide];

  return (
    <div className={`h-screen w-screen ${slide.bg} grain-intense scanline transition-colors duration-700 overflow-hidden`}>
      <div ref={containerRef} className="relative h-full w-full flex items-center justify-center p-4 md:p-6">
        <div className="relative w-full max-w-5xl h-full max-h-screen flex flex-col py-2">
          <div className="absolute top-2 right-2 md:top-4 md:right-4 z-50 text-white/50 text-xs md:text-sm font-mono bg-black/20 px-3 md:px-4 py-1 md:py-2 rounded-full backdrop-blur-sm">
            <span className="text-white/70 font-bold">
              {currentSlide + 1} / {accepted ? slides.length : slides.length - 1}
            </span>
          </div>

          <div className="flex items-center justify-between mb-3 flex-shrink-0">
            <div className="flex items-center gap-2 md:gap-4">
              <div className="text-white/40 text-xs md:text-sm font-mono">SIDE A</div>
              <div className="w-8 md:w-12 h-[2px] bg-white/20"></div>
            </div>

            <h1 className="font-serif text-3xl md:text-5xl font-bold text-white tracking-widest text-shadow-lg text-shadow-black/30">
              {slide.title}
            </h1>

            <div className="flex items-center gap-2 md:gap-4">
              <div className="w-8 md:w-12 h-[2px] bg-white/20"></div>
              <div className="text-white/40 text-xs md:text-sm font-mono">SIDE B</div>
            </div>
          </div>

          <div className={`flex-1 ${slide.frame} rounded-2xl md:rounded-3xl shadow-2xl relative p-4 md:p-8 flex flex-col min-h-0`}>
            <div className="flex-1 flex items-center justify-center min-h-0">
              <div className="relative w-full max-w-md aspect-square flex-shrink-0">
                <Image
                  src={slide.image}
                  alt="Illustration"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>

            <div className="text-center space-y-2 md:space-y-3 mt-4 flex-shrink-0">
              <p className="text-white font-serif text-2xl md:text-4xl font-bold leading-tight">
                {slide.text}
              </p>
              <p className="text-white/60 font-mono text-sm md:text-base">{slide.subtext}</p>
            </div>

            {slide.hasButtons && (
              <div className="mt-4 relative h-[100px] flex-shrink-0">
                <div className="absolute inset-0 flex items-center justify-center gap-4 md:gap-6">
                  <button
                    onClick={handleYes}
                    className="px-8 md:px-12 py-3 md:py-5 bg-meowcha-brown text-meowcha-lime font-mono font-bold text-lg md:text-2xl rounded-2xl hover:scale-110 transition-transform shadow-xl z-20 relative"
                  >
                    YES ✨
                  </button>
                  <button
                    ref={noButtonRef}
                    style={{
                      transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`,
                    }}
                    className="px-8 md:px-12 py-3 md:py-5 bg-white/30 text-meowcha-brown/60 font-mono text-lg md:text-2xl rounded-2xl cursor-pointer transition-transform duration-100 ease-out will-change-transform relative z-10"
                  >
                    no
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-3 text-center text-white/30 text-xs md:text-sm font-mono flex-shrink-0">
            use ↑↓ or ←→ to navigate
          </div>
        </div>
      </div>
    </div>
  );
}
