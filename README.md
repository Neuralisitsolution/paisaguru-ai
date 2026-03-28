# PaisaGuru AI - India's #1 Personal Finance Website

Production-ready Next.js website designed to pass Google AdSense approval.

## Quick Setup (5 Minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Get FREE API Keys

**MongoDB Atlas (Database - FREE):**
1. Go to [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create free account → Build a Cluster → Choose M0 (Free Tier)
3. Go to Database Access → Add New User → Set username & password
4. Go to Network Access → Add IP Address → Allow Access from Anywhere
5. Go to Clusters → Connect → Drivers → Copy the connection string
6. It looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/paisaguru`

**Google Gemini API (AI Content - FREE):**
1. Go to [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the key (starts with `AIza...`)

### Step 3: Configure Environment
```bash
cp .env.example .env.local
```

Edit `.env.local` and paste your keys:
```
MONGODB_URI=mongodb+srv://YOUR_USER:YOUR_PASS@cluster0.xxxxx.mongodb.net/paisaguru?retryWrites=true&w=majority
GEMINI_API_KEY=AIzaSy...your-key-here
ADMIN_PASSWORD=your-secret-password
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Step 4: Run the Website
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

## What's Included

### Pages (31 Routes)
- **Home** - News ticker, featured articles, calculator grid, market snapshot
- **8 Calculators** - Income Tax, SIP, EMI, FD, PPF, Gratuity, HRA, NPS
- **Article System** - Dynamic articles with author bios, TOC, sharing
- **10 Category Pages** - Income Tax, Investments, Insurance, Loans, etc.
- **Quiz System** - Daily quiz, category quizzes, leaderboard
- **Admin Panel** (`/admin`) - Article management, AdSense checklist, analytics
- **Legal Pages** - Privacy Policy, Terms, Disclaimer, About, Contact

### AdSense-Ready Features
- Expert author profiles (Rajesh Kumar CFP, Priya Sharma CA, etc.)
- "Expert Reviewed" and "Fact Checked" badges
- Financial disclaimer on every article
- Schema markup (Article, FAQ, Calculator, Organization)
- Sitemap.xml and robots.txt auto-generated
- Reading progress bar, table of contents
- Mobile responsive (Tailwind CSS)

### AI Content Engine
- Google Gemini-powered article generation
- 5 prompt templates (How-to, Comparison, News Analysis, Case Study, Ultimate Guide)
- Quality checker (scores 0-100, minimum 60 to publish)
- Duplicate content checker
- RSS news fetcher for auto-content

### Admin Panel
- **Password:** Default is `paisaguru2025` (change in .env.local)
- Generate articles with AI
- Review, approve, reject articles
- Mark as "Expert Reviewed"
- AdSense readiness checklist (16 items)

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- MongoDB Atlas
- Google Gemini API
- Recharts (calculator charts)
- RSS Parser

## Deployment
Works with Vercel (recommended), Railway, or any Node.js host.
Add your environment variables in the hosting platform's settings.
