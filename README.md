# Valentine 2026 💝

A cassette-inspired Valentine's Day proposal app with AI-generated mascots and interactive physics. Create personalized, viral-ready Valentine cards with lo-fi aesthetics.

## ✨ Features

### 🎨 Customization
- **Smart Presets**: Choose your mascot vibe (cats, dogs, bunnies, foxes)
- **AI-Generated Art**: Unique mascots for each theme via fal.ai (coming soon)
- **Custom Prompts**: Advanced users can define their own style
- **Personalization**: Add your Valentine's name

### 🎵 Interactive Experience
- **Cassette Aesthetic**: Retro lo-fi design with grain and scanline effects
- **Keyboard Navigation**: Navigate slides with arrow keys (↑↓ or ←→)
- **Magnetic Physics**: Playful "no" button with repulsion mechanics
- **Celebration**: Confetti animation on acceptance

### 🚀 Viral Features (Coming Soon)
- **AI Badge Generation**: Create downloadable Valentine badges with photos
- **Share System**: WhatsApp integration, copy link, Web Share API
- **User Accounts**: Save and manage multiple Valentine cards
- **Dashboard**: Track all your creations

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Runtime**: React 19
- **Styling**: Tailwind CSS v4.1
- **TypeScript**: Strict mode
- **Package Manager**: Bun
- **AI Images**: fal.ai Flux Pro (coming soon)
- **Auth** (planned): Clerk
- **Database** (planned): Neon Postgres
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh) 1.0+
- Node.js 22+ (for Next.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/crafter-station/valentine-2026.git
cd valentine-2026

# Install dependencies
bun install

# Run development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
valentine-2026/
├── app/
│   ├── (landing)/          # Landing page with preview
│   │   └── page.tsx
│   ├── create/             # Valentine creation wizard
│   │   └── page.tsx
│   ├── api/
│   │   └── generate-mascots/  # AI image generation API
│   │       └── route.ts
│   ├── globals.css         # Tailwind v4 + custom effects
│   └── layout.tsx
├── public/
│   └── images/             # Default mascot images
├── IMPLEMENTATION_PLAN.md  # Detailed development roadmap
└── README.md
```

## 🎨 Design Philosophy

### Lo-Fi Cassette Aesthetic
- Retro cassette/vinyl inspired design
- Grain texture overlays
- CRT scanline animations
- Warm, nostalgic color palettes

### Color Themes
- **Funky**: Navy & purple with cosmic vibes
- **Tipsy**: Burgundy & rose with romantic feel
- **Cloudy**: Teal & orange with dreamy mood
- **Meowcha**: Olive & lime with zen aesthetic
- **Celebration**: Pink & peach with festive energy

## 🚧 Roadmap

See [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) for detailed development plan.

### Phase 1: Core Experience ✅
- [x] Landing page with interactive preview carousel
- [x] Pet vibe customization flow
- [x] Interactive cassette slides
- [x] Magnetic repulsion physics
- [x] Tailwind v4 setup with PostCSS

### Phase 2: AI & Viral Features 🚧
- [ ] Dynamic AI image generation
- [ ] Share system (WhatsApp, copy link)
- [ ] AI badge with photo upload
- [ ] Social proof counter

### Phase 3: Persistence 📅
- [ ] Clerk authentication
- [ ] Neon database integration
- [ ] User dashboard
- [ ] Save/edit/delete cards

### Phase 4: Polish ✨
- [ ] SEO & OG images
- [ ] Analytics tracking
- [ ] Performance optimization
- [ ] Accessibility audit

## 🎯 How It Works

### User Flow
1. **Landing** → See preview carousel and "Create yours" CTA
2. **Customize** → Enter name, choose pet vibe (cats/dogs/bunnies/foxes), optional custom prompt
3. **Experience** → Navigate through 5 themed slides with keyboard
4. **Proposal** → Try to click "no" (spoiler: you can't)
5. **Celebrate** → Accept and enjoy confetti celebration
6. **Share** (coming soon) → Generate badge, share via WhatsApp

### Keyboard Controls
- `↑` or `←` - Previous slide
- `↓` or `→` - Next slide
- Final slide unlocks only after acceptance

## 🤝 Contributing

Valentine 2026 is a [Crafter Station](https://crafterstation.com) project. We welcome contributions!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Use Bun for package management
- Follow conventional commits
- Keep TypeScript strict
- Maintain cassette aesthetic
- Test on mobile and desktop

## 📝 License

MIT License

## 🙏 Acknowledgments

- **Crafter Station** - Building Peru's tech ecosystem
- **fal.ai** - AI image generation
- **Vercel** - Deployment platform
- **Tailwind CSS** - Styling framework

## 🔗 Links

- **Live Demo**: [valentine-2026.crafter.run](https://valentine-2026.crafter.run)
- **GitHub**: [crafter-station/valentine-2026](https://github.com/crafter-station/valentine-2026)
- **Crafter Station**: [crafterstation.com](https://crafterstation.com)
- **Documentation**: [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md)

## 💜 Made with Love

Created by [Crafter Station](https://crafterstation.com) for Valentine's Day 2026.

Share the love, ship in public. ✨

---

**Note**: This is an active development project. Features marked as "coming soon" are in progress. Check [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) for the latest status and detailed implementation steps.
