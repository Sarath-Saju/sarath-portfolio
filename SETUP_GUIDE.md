# 🚀 Sarath's Portfolio — Complete Setup Guide

> Follow these steps in order. Every command is exact — just copy & paste!

---

## 📁 YOUR FOLDER STRUCTURE

```
sarath-portfolio/
├── index.html              ← Frontend homepage
├── style.css               ← All styles
├── script.js               ← All JavaScript
├── .gitignore              ← Tells Git what to ignore
├── .github/
│   └── workflows/
│       └── deploy.yml      ← CI/CD pipeline
└── backend/
    ├── server.js           ← Node.js + Express server
    ├── package.json        ← Backend dependencies
    └── .env.example        ← Environment variable template
```

---

## STEP 1 — Install Git on Windows

1. Go to: https://git-scm.com/download/win
2. Download and run the installer
3. Click **Next** on everything (default settings are fine)
4. After install, open **Command Prompt** or **PowerShell** and type:

```bash
git --version
```

✅ You should see something like: `git version 2.44.0.windows.1`

5. Set up your identity (use your real name and email):

```bash
git config --global user.name "Sarath Saju"
git config --global user.email "your.email@example.com"
```

---

## STEP 2 — Create Your Project Folder & Initialize Git

Open **Command Prompt** and type these one by one:

```bash
cd Desktop
mkdir sarath-portfolio
cd sarath-portfolio
git init
```

✅ You'll see: `Initialized empty Git repository in ...`

Now copy all your files (index.html, style.css, script.js, .gitignore, .github folder, backend folder) into `sarath-portfolio`.

---

## STEP 3 — Create GitHub Repository

1. Go to https://github.com and sign up / log in
2. Click the **+** button (top right) → **New repository**
3. Repository name: `sarath-portfolio`
4. Keep it **Public**
5. Do NOT check "Add README" (we already have files)
6. Click **Create repository**

---

## STEP 4 — Push Code to GitHub

GitHub will show you commands. Use these (replace `YOUR_USERNAME` with your GitHub username):

```bash
git add .
git commit -m "🚀 Initial commit: portfolio website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/sarath-portfolio.git
git push -u origin main
```

When it asks for username/password:
- Username: your GitHub username
- Password: use a **Personal Access Token** (not your password!)
  - Go to GitHub → Settings → Developer Settings → Personal Access Tokens → Tokens (classic) → Generate new token
  - Check `repo` scope → Generate → Copy the token → paste it as password

✅ Go to your GitHub repo — you should see all your files!

---

## STEP 5 — CI/CD: GitHub Actions Runs Automatically!

Every time you `git push`, GitHub Actions will:
1. Install dependencies
2. Check all files exist
3. Run syntax checks
4. Deploy to GitHub Pages ✨

To see it working:
1. Go to your GitHub repo
2. Click the **Actions** tab
3. Watch the pipeline run live!

---

## STEP 6 — Enable GitHub Pages (Frontend Hosting)

After your first push + Actions run:

1. Go to your GitHub repo
2. Click **Settings** → **Pages** (left sidebar)
3. Under "Branch", select `gh-pages` → `/ (root)`
4. Click **Save**

✅ Your website will be live at:
`https://YOUR_USERNAME.github.io/sarath-portfolio/`

(Takes 2-3 minutes the first time)

---

## STEP 7 — Set Up the Backend (Node.js)

Install Node.js first:
1. Go to https://nodejs.org
2. Download the **LTS version** for Windows
3. Install it (click Next on everything)

Verify installation:
```bash
node --version
npm --version
```

Set up the backend:
```bash
cd sarath-portfolio/backend
npm install
```

---

## STEP 8 — Set Up PostgreSQL Database on Render.com

1. Go to https://render.com and sign up (free)
2. Click **New +** → **PostgreSQL**
3. Name: `portfolio-db`
4. Plan: **Free**
5. Click **Create Database**
6. Wait ~2 minutes, then copy the **Internal Database URL**

---

## STEP 9 — Deploy Backend on Render.com

1. On Render dashboard, click **New +** → **Web Service**
2. Connect your GitHub account
3. Select your `sarath-portfolio` repository
4. Fill in:
   - **Name**: `sarath-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Free
5. Add **Environment Variables**:
   - Key: `DATABASE_URL` → Value: paste the Internal Database URL from Step 8
   - Key: `NODE_ENV` → Value: `production`
6. Click **Create Web Service**

✅ Your backend URL will be: `https://sarath-backend.onrender.com`

---

## STEP 10 — Connect Frontend to Backend

1. Open `script.js`
2. Find this line near the top:
   ```javascript
   const BACKEND_URL = "https://your-app-name.onrender.com";
   ```
3. Replace it with your actual Render URL:
   ```javascript
   const BACKEND_URL = "https://sarath-backend.onrender.com";
   ```
4. Open `backend/server.js`
5. Find the CORS origin array and replace with your GitHub Pages URL:
   ```javascript
   'https://YOUR_USERNAME.github.io'
   ```

6. Save files and push to GitHub:
```bash
git add .
git commit -m "✅ Connected frontend to backend"
git push
```

GitHub Actions will automatically redeploy! 🎉

---

## 🎯 FINAL RESULT

Your complete system now looks like this:

```
You write code (VS Code)
      ↓
git push (Terminal)
      ↓
GitHub Repository
      ↓
GitHub Actions (CI/CD)
  ├── Runs tests ✓
  ├── Checks files ✓
  └── Deploys to gh-pages branch ✓
      ↓
┌─────────────────┐    ┌─────────────────────────┐
│  GitHub Pages   │    │  Render.com             │
│  (Frontend)     │◄──►│  Node.js + PostgreSQL   │
│  your site live │    │  (Contact form backend) │
└─────────────────┘    └─────────────────────────┘
      ↓
Web Browser 🌐
```

---

## 🔁 DAILY WORKFLOW (After Setup)

Every time you make changes:

```bash
# Save your files in VS Code, then:
git add .
git commit -m "describe what you changed"
git push
```

That's it! GitHub Actions handles everything else automatically.

---

## ❓ Common Issues

| Problem | Solution |
|---------|----------|
| `git` not recognized | Restart terminal after installing Git |
| Push rejected | Make sure your Personal Access Token has `repo` scope |
| GitHub Pages shows 404 | Wait 5 mins, check Pages settings shows `gh-pages` branch |
| Render backend sleeping | Free tier sleeps after 15 min. First request takes ~30s to wake up |
| Form shows "Backend not connected" | Make sure you updated `BACKEND_URL` in script.js |
