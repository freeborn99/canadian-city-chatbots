# 🇨🇦 Canadian City AI Chatbots (Zero-Cost Multi-Tenant Monorepo)

An ultra-performant, zero-cost, multi-tenant AI chatbot network and automated civic scraper serving **10 Canadian metropolitan domains** from a unified Next.js 15 App Router codebase and Upstash Vector database.

![Architecture Diagram](https://img.shields.io/badge/Architecture-Multi--Tenant_Monorepo-blue?style=for-the-badge)
![Next.js 15](https://img.shields.io/badge/Next.js-15_(App_Router)-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-Glassmorphism-38bdf8?style=for-the-badge&logo=tailwindcss)
![Upstash Vector](https://img.shields.io/badge/Upstash-Vector_RAG-00e699?style=for-the-badge&logo=upstash)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-Cron_Scraper-2088FF?style=for-the-badge&logo=github-actions)

---

## 🏙️ 10 Canadian Domains & City Themes

| Domain | Tenant ID | City | Province | Color Theme | Accent Theme |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `chatyyz.com` | `yyz` | Toronto | Ontario | `blue-500` | Electric Blue & Cyan |
| `chatyvr.com` | `yvr` | Vancouver | British Columbia | `emerald-500` | Pacific Emerald & Teal |
| `chatyul.com` | `yul` | Montreal | Quebec | `indigo-500` | Quartier Indigo & Purple |
| `chatyyc.com` | `yyc` | Calgary | Alberta | `red-500` | Stampede Crimson & Sunset Amber |
| `chatyeg.com` | `yeg` | Edmonton | Alberta | `orange-500` | River Valley Amber & Gold |
| `chatyow.com` | `yow` | Ottawa | Ontario | `teal-500` | Capital Teal & Mint |
| `chatywg.com` | `ywg` | Winnipeg | Manitoba | `cyan-500` | Prairie Frost Cyan |
| `chatyhz.com` | `yhz` | Halifax | Nova Scotia | `sky-500` | Atlantic Ocean Sky Blue |
| `chatyyj.com` | `yyj` | Victoria | British Columbia | `green-500` | Garden City Rainforest Green |
| `chatyyt.com` | `yyt` | St. John's | Newfoundland & Labrador | `violet-500` | Jellybean Row Violet & Fog |

---

## 📁 Monorepo Structure

```
/
├── .github/
│   └── workflows/
│       └── scrape.yml             # GitHub Action running every 6 hours
├── packages/
│   └── scraper/                   # Node.js Cheerio & Upstash Vector scraper
│       ├── src/
│       │   ├── config.ts          # 10 Canadian city scrape URLs
│       │   ├── scraper.ts         # Cheerio HTML parser & content cleaner
│       │   ├── upstash.ts         # Text chunker & vector upsert logic
│       │   └── index.ts           # Orchestrator & CLI runner
│       ├── package.json
│       └── tsconfig.json
├── apps/
│   └── web/                       # Next.js 15 App Router web application
│       ├── src/
│       │   ├── app/
│       │   │   ├── [tenantId]/    # Dynamic rewritten city page
│       │   │   ├── api/chat/      # Vercel AI SDK + Upstash RAG route
│       │   │   ├── globals.css    # Glassmorphism & dynamic ambient gradients
│       │   │   ├── layout.tsx     # Root layout
│       │   │   └── page.tsx       # Root landing route
│       │   ├── components/
│       │   │   ├── chat/          # Glassmorphism chat container, messages, inputs
│       │   │   └── layout/        # Dynamic city header, glass sidebar, switcher
│       │   └── lib/
│       │       ├── tenants.ts     # Domain-to-city map & metadata
│       │       └── upstash.ts     # Upstash Vector client query engine
│       ├── middleware.ts          # Host-based multi-tenant URL rewriter
│       ├── tailwind.config.ts
│       ├── next.config.ts
│       └── package.json
├── package.json                   # Root monorepo workspace
├── turbo.json                     # Turborepo task pipeline
└── README.md
```

---

## ⚡ Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create `.env.local` inside `apps/web/`:
```bash
# apps/web/.env.local

# Upstash Vector (Free tier at https://console.upstash.com/vector)
UPSTASH_VECTOR_REST_URL=https://your-index-url.upstash.io
UPSTASH_VECTOR_REST_TOKEN=your-upstash-vector-rest-token

# AI Provider (Free tier at https://console.groq.com or https://aistudio.google.com)
GROQ_API_KEY=gsk_your_groq_api_key
# or
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key
```

### 3. Start Next.js Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

> **💡 Testing all 10 cities locally:**
> - Click the **City Switcher** at the top right of the UI.
> - Or visit [http://localhost:3000?city=yvr](http://localhost:3000?city=yvr) or [http://localhost:3000/yyc](http://localhost:3000/yyc).
> - The entire glassmorphism ambient background, starter cards, city name, and trivia will dynamically morph into the chosen city!

---

## 🤖 Running the Automated Scraper

The scraper fetches municipal announcements and event calendars for all 10 cities, chunks the text, and stores embeddings in Upstash Vector with `{ tenantId: '[id]', timestamp: Date.now() }`.

### Run Scraper Manually:
```bash
npm run scrape
```

### Configure GitHub Actions Scraper Schedule:
1. In your GitHub repository, go to **Settings > Secrets and variables > Actions**.
2. Add secrets:
   - `UPSTASH_VECTOR_REST_URL`
   - `UPSTASH_VECTOR_REST_TOKEN`
3. The workflow in `.github/workflows/scrape.yml` will automatically execute every 6 hours (`0 */6 * * *`) or on demand via `workflow_dispatch`.

---

## 🌐 Production Porkbun & Vercel Setup

1. **Deploy `apps/web` to Vercel**:
   - Set Root Directory to `apps/web`.
   - Add environment variables (`UPSTASH_VECTOR_REST_URL`, `UPSTASH_VECTOR_REST_TOKEN`, `GROQ_API_KEY`).
2. **Add Domains to Vercel Project**:
   - Go to **Project Settings > Domains** and add all 10 domains (`chatyyz.com`, `chatyvr.com`, `chatyyc.com`, etc.).
3. **Porkbun DNS Records**:
   - Add CNAME or A records pointing each domain to `cname.vercel-dns.com` or `76.76.21.21`.
4. **Middleware Automatic Routing**:
   - When a visitor navigates to `https://chatyyc.com`, `middleware.ts` reads `Host: chatyyc.com`, matches `yyc`, and seamlessly serves `/yyc` while keeping `chatyyc.com` in the URL bar.
