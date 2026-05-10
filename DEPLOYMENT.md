# GeoCart Spatial Toolkit — Deployment Guide

## GitHub Pages Deployment (Step-by-Step)

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `geocart-spatial-toolkit` (or any name)
3. Set to **Public** (required for free GitHub Pages)
4. Do NOT initialise with README (you already have one)
5. Click **Create repository**

### Step 2: Push Code to GitHub

Open terminal in the `geocart/` folder:

```bash
# Initialise git
git init

# Add all files
git add .

# First commit
git commit -m "Initial release: GeoCart Spatial Toolkit v1.0.0"

# Link to your GitHub repo (replace with your URL)
git remote add origin https://github.com/YOUR-USERNAME/geocart-spatial-toolkit.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Scroll to **Pages** in the left sidebar
4. Under **Source**: Select **Deploy from a branch**
5. Under **Branch**: Select `main` → `/ (root)`
6. Click **Save**

### Step 4: Access Your Site

After 1–2 minutes, your site will be live at:

```
https://YOUR-USERNAME.github.io/geocart-spatial-toolkit/
```

GitHub will display the URL in the Pages settings section.

---

## Custom Domain (Optional)

To use `tools.geocartsurveys.com` instead:

1. In repo Settings → Pages → Custom domain
2. Enter: `tools.geocartsurveys.com`
3. Click Save

In your DNS provider, add:
```
Type: CNAME
Name: tools
Value: YOUR-USERNAME.github.io
```

Add a file named `CNAME` in the root of your repo:
```
tools.geocartsurveys.com
```

---

## Vercel Deployment

### Option A — Vercel CLI

```bash
npm install -g vercel
cd geocart/
vercel --prod
```

Follow the prompts. Vercel will detect it as a static site automatically.

### Option B — Vercel Dashboard

1. Go to https://vercel.com/new
2. Import from GitHub
3. Select your `geocart-spatial-toolkit` repo
4. Framework Preset: **Other**
5. Root Directory: `/` (leave default)
6. Click **Deploy**

---

## Localhost Development

### Python 3 (No installation needed on most systems)

```bash
cd geocart/
python -m http.server 8080
# Open: http://localhost:8080
```

### Node.js (npx serve)

```bash
cd geocart/
npx serve . -p 8080
# Open: http://localhost:8080
```

### VS Code Live Server Extension

1. Install "Live Server" extension in VS Code
2. Right-click `index.html` → **Open with Live Server**

---

## Updating the Deployed Site

After making changes:

```bash
git add .
git commit -m "Update: description of changes"
git push
```

GitHub Pages will automatically redeploy within ~1 minute.

---

## Verifying Deployment

After deployment, check these URLs work:

| Page | URL |
|------|-----|
| Dashboard | `/index.html` |
| Coordinate Converter | `/modules/coordinate-converter/index.html` |
| Area Calculator | `/modules/area-calculator/index.html` |
| Flight Log | `/modules/flight-log/index.html` |
| Survey Symbols | `/modules/survey-symbols/index.html` |
| Kenya Guide | `/modules/kenya-guide/index.html` |
| GeoJSON Viewer | `/modules/geojson-viewer/index.html` |

---

## Troubleshooting

**Blank page / styles not loading?**
- Check that paths use relative URLs (`../../assets/css/main.css`)
- Ensure you're serving from the `geocart/` root, not a subdirectory
- Check browser console for 404 errors

**Map tiles not loading?**
- Requires internet connection (tiles come from OpenStreetMap CDN)
- Check browser console for CORS or mixed-content errors

**LocalStorage data missing?**
- Data is browser-specific. Clearing browser data removes flight logs.
- Export CSV regularly for backup.

**GitHub Pages showing 404?**
- Wait 2–5 minutes after enabling Pages
- Ensure the branch is `main` and root is `/`
- Confirm the repo is Public

---

*GeoCart Spatial Toolkit — Production Deployment Guide*
