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

  // Get animal name from petVibe
  const getAnimalName = (vibe: PetVibe) => {
    const names = {
      cats: "cat",
      dogs: "dog",
      bunnies: "bunny",
      foxes: "fox",
    };
    return names[vibe];
  };

  const animal = getAnimalName(petVibe);

  const slides = [
    {
      title: "MEMORIES",
      text: "Every moment with you feels like a favorite song on repeat",
      subtext: "the kind you never skip",
      image: `/images/${petVibe}/funky-${animal}.jpg`,
      bg: "bg-gradient-to-br from-funky-navy via-funky-purple to-funky-navy",
      frame: "bg-funky-navy/40 backdrop-blur-md border border-funky-purple/30",
      hasButtons: false,
    },
    {
      title: "VIBES",
      text: "You're the perfect playlist",
      subtext: "every track hits different",
      image: `/images/${petVibe}/tipsy-${animal}.jpg`,
      bg: "bg-gradient-to-br from-tipsy-burgundy via-tipsy-wine to-tipsy-burgundy",
      frame: "bg-tipsy-burgundy/40 backdrop-blur-md border border-tipsy-rose/30",
      hasButtons: false,
    },
    {
      title: "FEELS",
      text: "Like a cloudy day with you",
      subtext: "somehow it's still the best day",
      image: `/images/${petVibe}/cloudy-${animal}.jpg`,
      bg: "bg-gradient-to-br from-cloudy-teal via-cloudy-mint to-cloudy-teal",
      frame: "bg-cloudy-teal/40 backdrop-blur-md border border-cloudy-mint/30",
      hasButtons: false,
    },
    {
      title: "QUESTION",
      text: "So... wanna be my Valentine?",
      subtext: "pick your answer wisely",
      image: `/images/${petVibe}/meowcha-${animal}.jpg`,
      bg: "bg-gradient-to-br from-meowcha-olive via-meowcha-lime/20 to-meowcha-olive",
      frame: "bg-meowcha-olive/40 backdrop-blur-md border border-meowcha-lime/30",
      hasButtons: true,
    },
    {
      title: "YAYYY",
      text: "Best decision ever!",
      subtext: "let's make this Valentine's unforgettable",
      image: `/images/${petVibe}/celebration-${animal}.jpg`,
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
      <div className="h-screen w-screen bg-background grain-intense flex items-center justify-center p-4">
        {/* Back button */}
        <Link
          href="/"
          className="absolute top-4 left-4 md:top-8 md:left-8 px-4 py-2 bg-background/80 hover:bg-accent text-muted-foreground hover:text-foreground font-mono text-sm rounded-lg transition backdrop-blur-sm border border-border z-50"
        >
          ← Back
        </Link>

        <div className="relative w-full max-w-2xl bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Decorative gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-3xl pointer-events-none" />

          <div className="relative text-center space-y-8">
            <div className="flex items-center justify-center gap-4 mb-8 animate-in fade-in duration-700 delay-100">
              <div className="text-muted-foreground text-xs font-mono uppercase tracking-wider">SIDE A</div>
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent"></div>
            </div>

            <div className="mb-8 space-y-3 animate-in fade-in duration-700 delay-200">
              <h1 className="font-display text-3xl md:text-5xl font-extrabold text-foreground bg-clip-text">
                Just Start.
              </h1>
              <p className="font-serif italic text-lg md:text-xl text-primary/90">
                Create something beautiful
              </p>
            </div>

            <form onSubmit={handleStart} className="space-y-8 animate-in fade-in duration-700 delay-300">
              {/* Name Input */}
              <div className="space-y-3 text-left">
                <label htmlFor="name" className="block text-muted-foreground font-mono text-sm uppercase tracking-wide">
                  Who's this for?
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter their name..."
                  className="w-full px-5 py-4 bg-background/50 backdrop-blur-sm border border-input/50 rounded-2xl text-foreground font-sans text-lg placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 hover:border-input"
                  autoFocus
                />
              </div>

              {/* Pet Vibe Selector */}
              <div className="space-y-4 text-left">
                <label className="block text-muted-foreground font-mono text-sm uppercase tracking-wide">
                  Choose your vibe
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {petVibes.map((vibe, index) => (
                    <button
                      key={vibe.value}
                      type="button"
                      onClick={() => setPetVibe(vibe.value)}
                      style={{ animationDelay: `${index * 50}ms` }}
                      className={`group relative px-5 py-4 rounded-2xl font-sans font-medium text-base transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 ${
                        petVibe === vibe.value
                          ? "bg-primary text-primary-foreground border-2 border-primary shadow-lg shadow-primary/25 scale-[1.02]"
                          : "bg-secondary/50 backdrop-blur-sm text-secondary-foreground border-2 border-border/50 hover:border-primary/50 hover:bg-secondary/80 hover:scale-[1.02]"
                      }`}
                    >
                      <span className="text-3xl mr-3 inline-block group-hover:scale-110 transition-transform duration-300">{vibe.emoji}</span>
                      <span>{vibe.label}</span>
                      {petVibe === vibe.value && (
                        <div className="absolute inset-0 rounded-2xl bg-primary/10 animate-pulse pointer-events-none" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Prompt (Optional) */}
              <details className="group">
                <summary className="cursor-pointer text-muted-foreground font-mono text-sm hover:text-foreground transition">
                  Advanced: Custom style prompt
                </summary>
                <div className="mt-3">
                  <textarea
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder="e.g., cyberpunk style, neon colors, futuristic..."
                    className="w-full px-4 py-3 bg-background border border-input rounded-xl text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:border-ring focus:ring-2 focus:ring-ring/20 resize-none"
                    rows={3}
                  />
                </div>
              </details>

              <button
                type="submit"
                disabled={!name.trim() || isStarting}
                className="group relative w-full px-8 py-5 bg-primary text-primary-foreground font-sans font-bold text-lg rounded-2xl hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 shadow-xl disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isStarting ? (
                    <>
                      <span className="animate-spin">⚡</span>
                      Loading...
                    </>
                  ) : (
                    <>
                      START
                      <span className="group-hover:rotate-12 transition-transform duration-300">✨</span>
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </form>

            <div className="flex items-center justify-center gap-4 mt-8 animate-in fade-in duration-700 delay-500">
              <div className="w-12 h-[1px] bg-gradient-to-l from-transparent via-border to-transparent"></div>
              <div className="text-muted-foreground text-xs font-mono uppercase tracking-wider">SIDE B</div>
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
        <div className="relative w-full max-w-5xl h-full max-h-screen flex flex-col py-2 animate-in fade-in duration-500">
          <div className="absolute top-2 right-2 md:top-4 md:right-4 z-50 text-white/50 text-xs md:text-sm font-mono bg-black/20 px-3 md:px-4 py-1 md:py-2 rounded-full backdrop-blur-sm animate-in slide-in-from-right duration-700">
            <span className="text-white/70 font-bold">
              {currentSlide + 1} / {accepted ? slides.length : slides.length - 1}
            </span>
          </div>

          <div className="flex items-center justify-between mb-3 flex-shrink-0 animate-in slide-in-from-top duration-700">
            <div className="flex items-center gap-2 md:gap-4">
              <div className="text-white/40 text-xs md:text-sm font-mono">SIDE A</div>
              <div className="w-8 md:w-12 h-[2px] bg-white/20"></div>
            </div>

            <h1 className="font-serif text-2xl md:text-4xl font-bold text-white tracking-widest text-shadow-lg text-shadow-black/30">
              {slide.title}
            </h1>

            <div className="flex items-center gap-2 md:gap-4">
              <div className="w-8 md:w-12 h-[2px] bg-white/20"></div>
              <div className="text-white/40 text-xs md:text-sm font-mono">SIDE B</div>
            </div>
          </div>

          <div className={`flex-1 ${slide.frame} rounded-2xl md:rounded-3xl shadow-2xl relative p-4 md:p-8 flex flex-col min-h-0 animate-in fade-in duration-500`}>
            <div className="flex-1 flex items-center justify-center min-h-0">
              <div className="relative w-full max-w-md aspect-square flex-shrink-0 animate-in zoom-in duration-700 cat-float">
                <Image
                  src={slide.image}
                  alt="Illustration"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>

            <div className="text-center space-y-2 md:space-y-3 mt-4 flex-shrink-0 animate-in slide-in-from-bottom duration-700 delay-200">
              <p className="text-white font-serif text-xl md:text-3xl font-bold leading-tight">
                {slide.text}
              </p>
              <p className="text-white/60 font-mono text-xs md:text-sm">{slide.subtext}</p>
            </div>

            {slide.hasButtons && (
              <div className="mt-4 relative h-[100px] flex-shrink-0 animate-in fade-in duration-700 delay-300">
                <div className="absolute inset-0 flex items-center justify-center gap-4 md:gap-6">
                  <button
                    onClick={handleYes}
                    className="px-6 md:px-10 py-2 md:py-4 bg-meowcha-brown text-meowcha-lime font-mono font-bold text-base md:text-xl rounded-2xl hover:scale-110 transition-all duration-200 shadow-xl hover:shadow-meowcha-lime/50 z-20 relative"
                  >
                    YES ✨
                  </button>
                  <button
                    ref={noButtonRef}
                    style={{
                      transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`,
                    }}
                    className="px-6 md:px-10 py-2 md:py-4 bg-white/30 text-meowcha-brown/60 font-mono text-base md:text-xl rounded-2xl cursor-pointer transition-transform duration-100 ease-out will-change-transform relative z-10"
                  >
                    no
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-3 text-center text-white/30 text-xs md:text-sm font-mono flex-shrink-0 animate-in fade-in duration-700 delay-100">
            use ↑↓ or ←→ to navigate
          </div>
        </div>
      </div>
    </div>
  );
}
