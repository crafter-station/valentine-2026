# Valentine 2026 - Implementation Plan

## ✅ Completed (Phase 1)

### Landing Page
- [x] Hero section with "Ask them to be your Valentine" headline
- [x] Interactive preview carousel with arrow navigation
- [x] CTA button "Create yours" → /create route
- [x] Crafter Station branding placeholder (logo needs installation)
- [x] Responsive design with cassette aesthetic

### Customization Flow
- [x] Pet vibe selector (cats/dogs/bunnies/foxes) with emojis
- [x] Custom prompt input (collapsible advanced section)
- [x] Name input validation
- [x] Two-step wizard (select → slides)
- [x] fal.ai API route skeleton (`/api/generate-mascots`)

### Core Experience
- [x] All 5 cassette slides functional
- [x] Magnetic repulsion physics working
- [x] Keyboard navigation (↑↓ ←→)
- [x] Confetti celebration on acceptance
- [x] Viewport-constrained buttons
- [x] Tailwind v4 with PostCSS configured

---

## 🚧 In Progress / Next Steps

### Phase 2: AI Image Generation (Priority 1)

**Goal:** Replace static cat images with AI-generated mascots based on user selection

**Steps:**
1. Complete `/api/generate-mascots` route:
   - Add proper error handling
   - Implement retry logic for fal.ai failures
   - Add loading states
   - Return fallback images if generation fails

2. Create image generation hook:
   ```tsx
   // app/hooks/useGenerateMascots.ts
   const { generate, isGenerating, progress, images } = useGenerateMascots({
     petVibe: "cats",
     customPrompt: "",
   });
   ```

3. Update `/create` page:
   - Show loading skeleton during generation
   - Display generated images in slides
   - Add "Regenerate" button per slide
   - Store generated URLs in state

4. Environment setup:
   - Add `FAL_API_KEY` to `.env.local`
   - Update `.env.example`

**Files to create:**
- `app/hooks/useGenerateMascots.ts`
- `app/components/ImageSkeleton.tsx`
- `.env.example`

---

### Phase 3: Elements Components (Priority 2)

**Goal:** Add AI badge generation and Crafter Station logo

**Steps:**
1. Initialize shadcn properly:
   ```bash
   bunx shadcn@latest init
   ```

2. Install Elements components:
   ```bash
   bunx shadcn@latest add "@elements/generate-badge"
   bunx shadcn@latest add "@elements/use-ai-avatar"
   bunx shadcn@latest add "@elements/crafter-logo"
   ```

3. Create badge component:
   ```tsx
   // app/components/ValentineBadge.tsx
   // - Uses @elements/ai-badge with Atropos 3D
   // - Photo upload for Valentine's photo
   // - AI transformation using useAiAvatar
   // - Download button using generate-badge
   ```

4. Add to final slide (slide 5):
   - Photo upload input
   - Badge preview with 3D effect
   - Download PNG button
   - Share buttons

**Dependencies needed:**
- `uploadthing` for photo storage
- Atropos (should come with @elements/ai-badge)

**Files to create:**
- `components.json` (shadcn config)
- `app/components/ValentineBadge.tsx`
- `app/api/uploadthing/route.ts`

---

### Phase 4: Share System (Priority 3)

**Goal:** Viral loop with WhatsApp, copy link, and Web Share API

**Steps:**
1. Generate shareable slugs:
   ```tsx
   // lib/generateSlug.ts
   // Format: {name}-valentine-{random-4-char}
   // Example: "alice-valentine-x7k9"
   ```

2. Create share API route:
   ```tsx
   // app/api/share/route.ts
   // POST: Save card data, return slug
   // GET: Retrieve card data by slug
   ```

3. Add share buttons to slide 5:
   - 📱 Mobile: Web Share API
   - 💻 Desktop: Copy link button
   - 💬 WhatsApp: Direct link `https://wa.me/?text=...`

4. Create shareable view:
   ```tsx
   // app/[slug]/page.tsx
   // Read-only view of Valentine card
   // Meta tags for social preview
   ```

**Share URL format:**
```
https://valentine-2026.crafter.run/alice-valentine-x7k9
```

**WhatsApp integration:**
```typescript
const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
  `${name} made you a special Valentine! 💝\n\nhttps://valentine-2026.crafter.run/${slug}`
)}`;
```

**Files to create:**
- `lib/generateSlug.ts`
- `app/api/share/route.ts`
- `app/[slug]/page.tsx`
- `app/[slug]/opengraph-image.tsx` (dynamic OG images)

---

### Phase 5: Authentication (Priority 4)

**Goal:** User accounts to save and manage Valentine cards

**Steps:**
1. Use `/clerk` skill to set up:
   ```bash
   # This will be done when you return
   # Needs CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY
   ```

2. Auth providers to enable:
   - Google OAuth (primary)
   - GitHub OAuth
   - Email/Password (fallback)

3. Protected routes:
   - `/dashboard` - List of user's created cards
   - `/create` - Requires auth to save
   - Public routes: `/`, `/ [slug]`

4. Middleware setup:
   ```tsx
   // middleware.ts
   // Protect /dashboard and /create
   // Allow public access to landing and shared cards
   ```

**User flow:**
1. User creates card → prompted to sign in to save
2. After auth → card auto-saved to database
3. Dashboard shows all user's cards
4. Edit/delete functionality

**Files to create:**
- `middleware.ts`
- `app/dashboard/page.tsx`
- `app/sign-in/[[...sign-in]]/page.tsx`
- `app/sign-up/[[...sign-up]]/page.tsx`

---

### Phase 6: Database (Priority 5)

**Goal:** Persist Valentine cards with Neon Postgres

**Schema:**
```sql
CREATE TABLE valentines_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,  -- Clerk user ID
  recipient_name TEXT NOT NULL,
  pet_vibe TEXT NOT NULL CHECK (pet_vibe IN ('cats', 'dogs', 'bunnies', 'foxes')),
  custom_prompt TEXT,
  images JSONB NOT NULL,  -- Array of image URLs
  badge_url TEXT,         -- Generated badge image
  share_slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_user_cards ON valentines_cards(user_id);
CREATE INDEX idx_share_slug ON valentines_cards(share_slug);
```

**Steps:**
1. Install Drizzle ORM:
   ```bash
   bun add drizzle-orm @neondatabase/serverless
   bun add -D drizzle-kit
   ```

2. Create schema:
   ```tsx
   // drizzle/schema.ts
   ```

3. Set up connection:
   ```tsx
   // lib/db.ts
   // Uses DATABASE_URL from env
   ```

4. Create/update API routes:
   - `POST /api/cards` - Create card
   - `GET /api/cards` - List user's cards
   - `GET /api/cards/[id]` - Get specific card
   - `PUT /api/cards/[id]` - Update card
   - `DELETE /api/cards/[id]` - Delete card

**Environment variables needed:**
```env
DATABASE_URL=postgresql://...
```

**Files to create:**
- `drizzle/schema.ts`
- `drizzle.config.ts`
- `lib/db.ts`
- `app/api/cards/route.ts`
- `app/api/cards/[id]/route.ts`

---

### Phase 7: Dashboard (Priority 6)

**Goal:** User dashboard to manage all Valentine cards

**Features:**
- Grid of all user's cards
- Preview thumbnail
- Quick stats (views, shares - future)
- Edit/Delete actions
- "Create new" button

**Layout:**
```
┌─────────────────────────────────────┐
│  Dashboard - My Valentines          │
├─────────────────────────────────────┤
│  [Create New +]                     │
│                                     │
│  ┌──────┐  ┌──────┐  ┌──────┐     │
│  │ Card │  │ Card │  │ Card │     │
│  │  1   │  │  2   │  │  3   │     │
│  └──────┘  └──────┘  └──────┘     │
└─────────────────────────────────────┘
```

**Files to create:**
- `app/dashboard/page.tsx`
- `app/components/CardGrid.tsx`
- `app/components/CardPreview.tsx`

---

### Phase 8: Polish & Viral Features (Priority 7)

**Features to add:**

1. **Social Proof Counter:**
   ```tsx
   // On landing page
   "1,234 Valentines created today ✨"
   ```

2. **Countdown to Feb 14:**
   ```tsx
   // Hero section
   "Only X days until Valentine's Day!"
   ```

3. **Copy improvements:**
   - Landing hero: More compelling
   - Slide text: Personalize with {name}
   - Share messages: Engaging templates

4. **Analytics:**
   - Track card creations
   - Track share clicks
   - Calculate viral coefficient

5. **SEO & OG Images:**
   - Dynamic OG images for shared cards
   - Meta tags for social sharing
   - sitemap.xml

**Files to create:**
- `app/components/SocialProof.tsx`
- `app/components/Countdown.tsx`
- `lib/analytics.ts`

---

## 📋 Environment Variables Needed

```env
# fal.ai
FAL_API_KEY=your_fal_api_key

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Database
DATABASE_URL=postgresql://...

# Uploadthing (for badge photos)
UPLOADTHING_TOKEN=...

# Optional: Analytics
NEXT_PUBLIC_POSTHOG_KEY=...
```

---

## 🎯 Priority Order for Implementation

When you return, tackle in this order:

1. **AI Image Generation** (30 min) - Core differentiator
2. **Share System** (45 min) - Viral loop critical
3. **Elements Components** (30 min) - Badge & logo
4. **Clerk Auth** (20 min) - Use /clerk skill
5. **Database** (40 min) - Persistence
6. **Dashboard** (30 min) - User management
7. **Polish** (ongoing) - Refinements

Total estimated: ~4 hours for MVP with all core features

---

## 🚀 Quick Start (When You Return)

```bash
cd ~/Programming/crafter-station/valentine-2026

# 1. Add environment variables
cp .env.example .env.local
# Edit .env.local with your keys

# 2. Install remaining deps
bun add drizzle-orm @neondatabase/serverless uploadthing @clerk/nextjs

# 3. Set up Clerk (use skill)
# (this will be interactive)

# 4. Set up database
bunx drizzle-kit generate
bunx drizzle-kit push

# 5. Test everything
bun dev
```

---

## 📝 Notes

- **fal.ai quota**: Free tier has limits, consider caching generated images
- **Clerk pricing**: Free tier supports 10k MAUs
- **Neon pricing**: Free tier includes 3 projects
- **Vercel deployment**: Already configured
- **Domain**: valentine-2026.crafter.run already set up

---

## 🐛 Known Issues / TODOs

- [ ] Landing page needs actual Crafter Station logo
- [ ] Custom prompt doesn't trigger image regeneration yet
- [ ] No loading states during image generation
- [ ] Badge component not integrated
- [ ] Share URLs don't exist yet
- [ ] No user authentication
- [ ] No database persistence
- [ ] README needs update with new features

---

## 💡 Future Enhancements (Post-MVP)

- Multi-language support (ES/EN toggle)
- Voice message recording for slides
- Video generation instead of static slides
- Email notifications for Valentine responses
- Remix/fork existing cards
- Templates marketplace
- Premium themes (paid)
- Custom domain support for users
