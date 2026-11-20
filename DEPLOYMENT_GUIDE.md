# Aishnar Digital-ERP · Production Deployment & User Guide

A commercial-grade, ready-to-sell enterprise operations software platform engineered for **Aishnar Digital Technologies**.

---

## 🌟 Executive Overview
* **Product Name**: **Aishnar Digital-ERP**
* **Brand Identity**: Modern, executive luxury emerald & slate theme with light/dark mode and zero clutter.
* **Architecture**: Vite + React 19 + TypeScript + Tailwind CSS v4 + Supabase Client + Netlify / Render hosting pipelines.
* **Zero Mock/Wedding Data**: Universal business operations (Client Project Delivery, Milestones, 200+ SOP Checklists, Daily Standing Duties, 100-pt Productivity Score Engine, Expenses Approvals, Attendance Geofencing, Office TV Wallboard).

---

## 🚀 Key Admin Capabilities Requested by Sir

### 1. In-App Software Sales Management Dashboard (`/sales`)
* Track deals and revenue for **selling Aishnar Digital-ERP itself**.
* **Metrics**: Monthly Recurring Revenue (MRR), Annual Run Rate (ARR), Active Client Licenses, Conversion Rate.
* **Pipeline Management**: Log new enterprise inquiries, move deals from `Inbound Lead` → `Demo Completed` → `Proposal Submitted` → `Contract Negotiation` → `Closed Won`.
* **1-Click License Provisioning**: Instantly convert won deals into active cryptographic license keys.

### 2. Direct In-App User & Tenant Activation Engine (`/activation`)
* Admins can activate new users and organizations directly from within the software without touching a database console.
* **1-Click Status Toggle**: Instantly switch users between `Active` and `Suspended / Inactive`.
* **Add & Provision User Modal**: Generate secure license keys, allocate seat quotas, assign roles (`Super Admin`, `Sales Admin`, `Project Manager`, `Team Member`, `Client Portal User`), and auto-generate credentials.

---

## 🛠️ Step-by-Step Deployment Guide

### Option 1: Deploy to Netlify (Recommended - 2 Minutes)
Netlify configuration is pre-built via `netlify.toml`.

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "feat: Aishnar Digital-ERP production release"
   git remote add origin https://github.com/narenderbegad123/aishnar-digital-erp.git
   git push -u origin main
   ```
2. **Go to Netlify Dashboard**:
   - Open [Netlify Teams](https://app.netlify.com/teams/narenderbegad123/projects).
   - Click **Add new site** → **Import an existing project** → **GitHub**.
   - Select `aishnar-digital-erp`.
3. **Build Settings** (Automatically detected via `netlify.toml`):
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. **Environment Variables** (Optional for Supabase sync):
   - Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
5. Click **Deploy Site**. Your ERP is live!

---

### Option 2: Deploy to Render (Cloud Web Service)
Render configuration is pre-configured via `render.yaml`.

1. Go to your [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** → **Static Site** (or **Blueprint**).
3. Connect your repository.
4. Set:
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
5. Click **Create Static Site**.

---

### Option 3: Supabase Integration (Live Cloud Database)
1. Go to [Supabase Dashboard](https://supabase.com/dashboard/organizations).
2. Create a new project named `aishnar-digital-erp`.
3. Go to the **SQL Editor**, paste the contents of `supabase/schema.sql`, and click **Run**.
4. Copy your **Project URL** and **anon public key** from Project Settings → API.
5. Create a `.env` file in the project root:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```
6. The ERP will automatically synchronize with your Supabase cloud database!

---

## 💻 Local Development
```bash
# Run local dev server
npm run dev

# Compile production build
npm run build

# Preview production build locally
npm run preview
```
