# Valentine 2026

A cassette-inspired Valentine's Day proposal app with lo-fi aesthetics and interactive physics.

## Features

- 🎵 Retro cassette/vinyl aesthetic with grain and scanline effects
- 🎹 Keyboard navigation (arrow keys)
- 🧲 Magnetic repulsion physics for the "no" button
- ✨ Confetti celebration on acceptance
- 📱 Fully responsive design
- 🎨 Custom cat illustrations
- 💫 Smooth animations and transitions

## Tech Stack

- Next.js 16 with App Router
- React 19
- TypeScript
- Tailwind CSS v4.1
- Bun runtime
- canvas-confetti

## Getting Started

```bash
# Install dependencies
bun install

# Run development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

1. Enter the person's name on the start screen
2. Navigate through 4 slides using arrow keys (↑↓ or ←→)
3. On the final slide, try to click "no" (spoiler: you can't)
4. Click "YES ✨" to reveal the celebration slide
5. Enjoy the confetti!

## Customization

Edit the slides array in `app/page.tsx` to change:
- Text content
- Colors and backgrounds
- Images
- Number of slides

## License

MIT

---

Made with 💜 by [Crafter Station](https://crafterstation.com)
