# DEEPAVALI 🪔

Personalized, cinematic Deepavali festival experience website built with **Next.js 15**, **React 19**, **TypeScript**, **Tailwind CSS**, **HTML5 Canvas**, **Neon PostgreSQL**, **Drizzle ORM**, and **Vercel Blob**.

Transforms visitor photographs into an isolated, transparent human portrait revealed in warm golden light and surrounded by dynamic, physics-driven spark cracker bursts.

---

## ✨ Key Features

- **Ghost Portrait + Gradual Golden Reveal**: The visitor's isolated cutout is subtly layered into a dual composition—a soft 8% opacity ghost portrait in the background and a warm, glowing rim-lit foreground reveal.
- **Dynamic Cracker Burst Simulation**: HTML5 Canvas particle system emitting radial sparks with drag, gravity, glowing trails, and fading embers. Includes safe zones protecting the subject's face and greeting typography.
- **Human-Only Segmentation**: The source image is cleanly separated from original backgrounds (trees, streets, walls) via background-removal provider adapters.
- **Festive Designed Atmosphere**: Deep cinematic midnight theme (`#08080C`), flickering brass diyas, ambient floating golden dust, and traditional rangoli floor silhouettes.
- **Interactive Bursts**: Visitors can tap or click anywhere on screen to burst fireworks.
- **Mobile-First Responsive Layout**: Crafted for modern phone viewports (360px baseline, 320px–412px, tablets, and desktop) with touch targets $\ge 44 \times 44$ px and safe-area insets.
- **Privacy & Security**: Strict server-side magic byte validation, private storage with opaque keys, configurable 24-hour retention auto-cleanup, and no public discovery of uploaded media.
- **Accessibility & Motion Control**: Full support for `prefers-reduced-motion` and a visible "Skip Intro" option.
- **Administration Dashboard**: Manage greeting copy, attribution, spark budgets, ghost opacity, and feature flags.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 15 (App Router) + React 19 |
| **Language** | TypeScript (Strict) |
| **Styling** | Tailwind CSS + Google Fonts (`Cinzel` & `Inter`) |
| **Particles** | Native HTML5 Canvas (`requestAnimationFrame`) |
| **Database** | Neon Serverless PostgreSQL |
| **ORM** | Drizzle ORM + Drizzle Kit |
| **Media Storage** | Vercel Blob (Private) |
| **Deployment** | Vercel |

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 20+ (recommended v22+)
- npm or pnpm

### 2. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configure your environment variables:
```env
# Neon PostgreSQL Connection String
DATABASE_URL=postgresql://user:password@ep-sample.us-east-2.aws.neon.tech/neondb?sslmode=require

# Vercel Blob Storage Token
BLOB_READ_WRITE_TOKEN=

# Background Removal Provider ("mock", "removebg", or "replicate")
BACKGROUND_REMOVAL_PROVIDER=mock
BACKGROUND_REMOVAL_API_KEY=

# Authentication Secret for Admin Dashboard
AUTH_SECRET=
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing & Quality Checks

Run the automated test suite:
```bash
npm test
```

Run TypeScript strict type checking:
```bash
npm run typecheck
```

Build for production:
```bash
npm run build
```

---

## 🗄️ Database Commands

Generate Drizzle migrations:
```bash
npm run db:generate
```

Apply migrations to Neon PostgreSQL:
```bash
npm run db:migrate
```

Open Drizzle Studio:
```bash
npm run db:studio
```

---

## 📂 Project Architecture

```
├── public/                 # Static assets
├── src/
│   ├── app/
│   │   ├── (visitor)/      # Landing & Greeting experience
│   │   ├── setup/          # Photo upload & cutout preview
│   │   ├── admin/          # Admin management console
│   │   ├── api/
│   │   │   ├── upload/     # Validated photo processing
│   │   │   ├── media/[id]/ # Authenticated media proxy
│   │   │   └── admin/      # Admin settings & retention cleanup
│   │   ├── layout.tsx      # App shell & metadata
│   │   └── globals.css     # Theme tokens & animations
│   ├── components/
│   │   ├── scene/          # Signature greeting & canvas particle engine
│   │   └── upload/         # Camera roll upload & transparency preview
│   ├── db/                 # Neon connection & Drizzle schema
│   ├── lib/
│   │   ├── particles/      # Spark particle physics engine
│   │   ├── segmentation/   # Background removal adapters
│   │   ├── storage/        # Private Vercel Blob client
│   │   └── validation.ts   # Magic-byte file validation
│   └── types/              # Domain models & scene phases
├── tests/                  # Unit tests (Node.js test runner)
└── drizzle.config.ts       # Drizzle kit configuration
```

---

## 📄 License
Private & Proprietary. Created for Deepavali 2026.
