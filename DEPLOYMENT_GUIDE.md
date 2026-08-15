# Production Deployment & Porkbun DNS Mapping Guide 🍁

This guide walks you through deploying the **Canadian AI City Platform** to **Vercel** (100% free tier, zero server maintenance) and configuring your **Porkbun** domains with multi-tenant routing and free SSL/TLS certificates.

---

## ⚡ Method 1: Deploy with Vercel CLI (Fastest, 2 Minutes)

Open your terminal in the project directory:
`C:\Users\notmy\.gemini\antigravity\scratch\canadian-city-chatbots`

Run:
```bash
npx vercel
```
1. **Set up and deploy?** ➡️ Type `y`
2. **Which scope?** ➡️ Select your personal Vercel account
3. **Link to existing project?** ➡️ Type `n`
4. **Project name?** ➡️ `canadian-city-chatbots`
5. **In which directory is code located?** ➡️ Press `Enter` (`./`)
6. **Want to modify settings?** ➡️ Type `n`

Once finished, deploy to production:
```bash
npx vercel --prod
```

---

## 🐙 Method 2: Deploy via GitHub (Recommended for Continuous Updates)

1. Create a free repository on [GitHub.com](https://github.com/new) named `canadian-city-chatbots`.
2. In your terminal, link and push your code:
   ```bash
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/canadian-city-chatbots.git
   git push -u origin master
   ```
3. Go to [vercel.com/new](https://vercel.com/new), select **Import Git Repository**, choose your repository, and click **Deploy**.

---

## 🔑 Add Production Environment Variables in Vercel

In your Vercel Dashboard ➡️ Go to **Settings** ➡️ **Environment Variables** ➡️ Add:

| Key | Value | Purpose |
| :--- | :--- | :--- |
| `GROQ_API_KEY` | `your_groq_api_key_here` | Ultra-fast Llama-3 AI Engine |
| `GEMINI_API_KEY` | `your_gemini_api_key_here` | Google Gemini Fallback Model |
| `UPSTASH_VECTOR_REST_URL` | `your_upstash_vector_rest_url` | Live Local Knowledge Vectors |
| `UPSTASH_VECTOR_REST_TOKEN` | `your_upstash_vector_rest_token` | Vector Authentication |

---

## 🌐 Porkbun DNS Configuration for Your Domains

In your Vercel Project ➡️ Go to **Settings** ➡️ **Domains** ➡️ Add all your registered domains:
- `chatyyc.com` & `www.chatyyc.com`
- `chatyyz.com` & `www.chatyyz.com`
- `chatyvr.com` & `www.chatyvr.com`
- `chatyul.com` & `www.chatyul.com`
- `chatyeg.com` & `www.chatyeg.com`
- `chatyow.com` & `www.chatyow.com`
- `chatywg.com` & `www.chatywg.com`
- `chatyhz.com` & `www.chatyhz.com`
- `chatyyj.com` & `www.chatyyj.com`
- `chatyyt.com` & `www.chatyyt.com`

---

### 📝 DNS Records to Enter in Porkbun:

Log in to **[Porkbun.com](https://porkbun.com)** ➡️ Click **Details** on each domain ➡️ Click **DNS Records** (Edit) ➡️ Add these 2 records for each domain:

#### 1. Apex Domain (`@` / root):
- **Type**: `A`
- **Host / Name**: *(Leave blank or `@`)*
- **Answer / Points to**: `76.76.21.21`
- **TTL**: `600` (or Default)

#### 2. Subdomain (`www`):
- **Type**: `CNAME`
- **Host / Name**: `www`
- **Answer / Points to**: `cname.vercel-dns.com`
- **TTL**: `600` (or Default)

---

### 🚀 Automatic Multi-Tenant Verification:
Once DNS propagates (usually 2–10 minutes):
- Visiting **`https://chatyyc.com`** ➡️ Automatically renders Calgary with Red/Amber theme, Stephen Ave, TELUS Spark, and Saddledome resos.
- Visiting **`https://chatyyz.com`** ➡️ Automatically renders Toronto with Royal Blue theme, King West, Toronto Zoo, and Mirvish tickets.
- Visiting **`https://chatyvr.com`** ➡️ Automatically renders Vancouver with Emerald theme, Gastown, and Stanley Park.
- Free SSL certificates will be generated automatically by Vercel!
