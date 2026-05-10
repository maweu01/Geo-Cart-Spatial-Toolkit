# GeoCart Spatial Toolkit

**Professional geospatial tools for GeoCart Surveys & Engineering**

A production-ready, fully static geospatial web platform. Runs entirely on GitHub Pages, Vercel, or localhost. Zero backend required. Zero server dependencies.

---

## Platform Overview

| Module | Description | Technologies |
|--------|-------------|--------------|
| 01 — Coordinate Converter | DD ↔ DMS ↔ UTM conversion with Kenya CRS support | Vanilla JS, WGS84 math |
| 02 — Area & Distance Calculator | Interactive map drawing with real-time measurements | Leaflet.js, Leaflet.Draw, Turf.js |
| 03 — Drone Flight Log | Aviation mission logging system with CSV import/export | LocalStorage, Vanilla JS |
| 04 — Survey Symbol Reference | Complete GIS & cartographic symbol library (SVG) | Inline SVG |
| 05 — Kenya Coordinate Guide | Educational CRS reference for Kenya | HTML/CSS |
| 06 — GeoJSON / KML Viewer | Drag-and-drop file rendering and inspection | Leaflet.js, DOMParser |

---

## Quick Start

### Option A — GitHub Pages (Recommended)

1. Fork or clone this repository
2. Push to your GitHub account
3. In your repo: **Settings → Pages → Branch: main → / (root) → Save**
4. Your site will be live at: `https://yourusername.github.io/geocart-spatial-toolkit/`

### Option B — Localhost

```bash
# Python 3
python -m http.server 8080

# Node.js (npx)
npx serve .

# PHP
php -S localhost:8080
```

Then open: `http://localhost:8080`

### Option C — Vercel Static

```bash
npm i -g vercel
vercel --prod
```

---

## Folder Structure

```
geocart/
├── index.html                        # Dashboard / Module launcher
├── README.md
├── LICENSE
├── .gitignore
│
├── assets/
│   ├── css/
│   │   └── main.css                  # Global styles, themes, components
│   ├── js/
│   │   └── app.js                    # Shared utilities: Store, Toast, Export
│   └── icons/
│       └── favicon.svg
│
├── modules/
│   ├── coordinate-converter/
│   │   └── index.html                # Module 01
│   ├── area-calculator/
│   │   └── index.html                # Module 02
│   ├── flight-log/
│   │   └── index.html                # Module 03
│   ├── survey-symbols/
│   │   └── index.html                # Module 04
│   ├── kenya-guide/
│   │   └── index.html                # Module 05
│   └── geojson-viewer/
│       └── index.html                # Module 06
│
├── data/                             # Static GeoJSON reference data (optional)
└── docs/                             # Additional documentation (optional)
```

---

## Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Mapping | Leaflet.js | 1.9.4 |
| Draw Tools | Leaflet.Draw | 1.0.4 |
| Spatial Analysis | Turf.js | 6.x |
| Fonts | IBM Plex Sans, JetBrains Mono | Google Fonts |
| Storage | Browser LocalStorage | — |
| Backend | **None** | — |

---

## Design System

### Color Tokens (Dark Theme)

| Token | Value | Use |
|-------|-------|-----|
| `--bg-base` | `#070c17` | Page background |
| `--bg-surface` | `#0d1526` | Navigation, panels |
| `--bg-card` | `#111e33` | Cards, sections |
| `--accent` | `#00d4c8` | Primary accent, links |
| `--accent-blue` | `#3d7fff` | Secondary accent |
| `--text-primary` | `#d8e8f5` | Headings, values |
| `--text-muted` | `#4a6380` | Labels, hints |

### Typography

- **UI Text**: IBM Plex Sans
- **Code / Coordinates**: JetBrains Mono
- **Values / Data**: JetBrains Mono

---

## Module Details

### Module 01 — Coordinate Converter

**Conversions supported:**
- Decimal Degrees → DMS
- DMS → Decimal Degrees
- WGS84 → UTM (auto zone detection)
- UTM → WGS84

**Implementation:** Pure JavaScript WGS84 math. No external CRS library required.

**Kenya reference points included:** Nairobi, Mombasa, Kisumu, Eldoret, Nakuru, Malindi

---

### Module 02 — Area & Distance Calculator

**Drawing tools:**
- Polygon (area + perimeter)
- Polyline (distance)
- Point marker

**Output:** Area in m², ha, km² | Distance in m, km

**Basemaps:** OpenStreetMap, Esri Satellite, OpenTopoMap, CartoDB Dark

**File I/O:** GeoJSON import/export

---

### Module 03 — Drone Flight Log

**Fields recorded per mission:**
- Date, Pilot, Drone/Aircraft
- Mission type (Mapping/Survey/Inspection/Delivery/Training/Other)
- Location, Duration (minutes)
- Battery cycles, GSD/Altitude
- Weather conditions
- Mission notes, Maintenance notes

**Data storage:** Browser LocalStorage (`geocart-flightlogs`)

**Features:** Sort, search, filter by mission type, paginate, export CSV, import CSV

**Important:** Starts completely empty. No sample data. No placeholder records.

---

### Module 04 — Survey Symbol Reference

**Categories:**
- Roads (6 symbols)
- Buildings (6 symbols)
- Vegetation (5 symbols)
- Water (6 symbols)
- Boundaries (5 symbols)
- Utilities (4 symbols)
- Aviation (5 symbols)
- Survey Control (6 symbols)

**Total: 43 SVG symbols**

All symbols rendered as inline SVG. Searchable. Click any symbol for detail overlay with description and usage notes.

---

### Module 05 — Kenya Coordinate Guide

**Sections covered:**
1. WGS84 reference ellipsoid parameters
2. Geographic vs Projected CRS comparison
3. UTM projection mechanics
4. Kenya UTM Zones 36, 37, 38 in detail
5. Full EPSG code table including legacy Arc 1960
6. Coordinate examples (Nairobi, Mombasa, Kisumu)
7. GIS best practices (7 rules)
8. Survey recommendations by discipline

---

### Module 06 — GeoJSON / KML Viewer

**Supported formats:**
- `.geojson` / `.json`
- `.kml` (parsed client-side via DOMParser)
- `.gpx` (waypoints, tracks, routes)

**Features:**
- Multi-file loading (each layer gets a unique colour)
- Feature property inspection
- Geometry statistics
- Bounding box display
- Export all loaded features as GeoJSON
- Map coordinate display

**No data leaves the browser.** All parsing happens client-side.

---

## Data Storage

| Module | Storage Key | Format |
|--------|------------|--------|
| Flight Log | `geocart-flightlogs` | JSON array |
| Theme preference | `geocart-theme` | String |

To clear all data: open browser DevTools → Application → Local Storage → Clear.

---

## Offline Usage

After the first page load (which fetches Leaflet, Turf, and Google Fonts from CDN), most functionality works offline:

| Feature | Offline? |
|---------|---------|
| Coordinate Converter | ✓ Full offline |
| Flight Log | ✓ Full offline |
| Symbol Reference | ✓ Full offline |
| Kenya Guide | ✓ Full offline |
| Area Calculator (no tiles) | ✓ Math works |
| Area Calculator (map tiles) | ✗ Requires network |
| GeoJSON Viewer (no tiles) | ✓ Parsing works |

For full offline map support, consider using a Service Worker to cache tile layers.

---

## Browser Compatibility

| Browser | Support |
|---------|---------|
| Chrome 90+ | ✓ Full |
| Firefox 88+ | ✓ Full |
| Safari 14+ | ✓ Full |
| Edge 90+ | ✓ Full |
| Mobile Chrome | ✓ Full |
| Mobile Safari | ✓ Full |

---

## Security

- No user authentication
- No server-side code
- No data transmission
- No cookies
- No tracking
- All data stays in the user's browser

---

## Future Upgrade Recommendations

### Near-term
- [ ] Add a Service Worker for full offline support (cache CDN assets + tile layers)
- [ ] Add print/PDF export for flight logs
- [ ] Add photo attachment support to flight logs (base64 in LocalStorage or IndexedDB)
- [ ] Add coordinate batch converter (paste multiple rows)

### Medium-term
- [ ] Integrate Kenya CORS station locations as a reference layer
- [ ] Add Survey of Kenya trig beacon lookup
- [ ] Add KCAA no-fly zone overlay (static GeoJSON)
- [ ] Add project management module (group surveys by project)
- [ ] Add equipment/asset register module

### Long-term
- [ ] IndexedDB for larger flight log datasets (LocalStorage limited to ~5MB)
- [ ] PWA (Progressive Web App) wrapper for mobile app experience
- [ ] Optional: Supabase backend for team data sharing
- [ ] QR code generation for field control points

---

## Contributing

This platform is designed and maintained by **GeoCart Surveys & Engineering**.

To extend the platform:
1. Add a new folder under `/modules/`
2. Create `index.html` using the existing module template
3. Link from `index.html` (the dashboard)
4. Follow the CSS variable system and `app.js` utilities

---

## License

MIT License — See `LICENSE` file.

---

## Contact

**GeoCart Surveys & Engineering**  
*Professional Geospatial Solutions*

---

*GeoCart Spatial Toolkit — Built for production. Deployed on GitHub Pages.*
