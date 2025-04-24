# Image Gallery v2 📸

A responsive, Firebase-backed photo gallery built with Vite, React, TypeScript, Tailwind CSS, and shadcn/ui.  
**Live Demo**: [https://perryong.github.io/image-gallery-v2/](https://perryong.github.io/image-gallery-v2/)

## ✨ Features

| UX Delight | Description |
|------------|-------------|
| 🔍 **Search + Filter** | Full-text search bar and automatic category tabs generated from each image’s `category` metadata. |
| 🖼 **Adaptive Grid** | Masonry-like layout scaling from 1 to 4 columns, with skeleton placeholders for stable loading. |
| 🔎 **Modal Viewer** | Keyboard navigation (←/→/Esc), zoom controls, next/previous buttons, and an image counter. |
| ⚡ **Instant Loading** | Images fetched from Firebase Storage, cached locally, with thumbnails and full-size URLs resolved on the fly. |
| ☁️ **Zero-Backend Deploy** | CI pipeline deploys a static build to GitHub Pages on every merge to `main`. |

## 🛠 Tech Stack

- **Vite**: Ultra-fast dev server and build tool
- **React 18** + **TypeScript**
- **Tailwind CSS** + **shadcn/ui** + **Radix Primitives**
- **Firebase Storage**: CDN and metadata store
- **GitHub Actions** + **gh-pages**: CI/CD pipeline

## 🚀 Quick Start

1. **Clone & Install**
   ```bash
   git clone https://github.com/Perryong/image-gallery-v2.git
   cd image-gallery-v2
   npm install
   ```

2. **Configure Environment Variables**
   ```bash
   cp .env.example .env
   ```
   Add your Firebase credentials to `.env`:
   ```
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   ```
   Optionally, for the Weather widget:
   ```
   VITE_OPENWEATHER_KEY=...
   ```

3. **Run the Dev Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) to view the gallery.

## 💾 Adding Images

1. Upload images to Firebase Storage (any folder structure).
2. Optionally, add a `category` metadata key (e.g., `travel`, `wedding`, `food`). Images without a category default to `misc`.
3. Reload the gallery to auto-discover new files.

## 🏗 Build & Deploy

### Local Production Build
```bash
npm run build    # Outputs static files to /dist
npm run preview  # Serves the build locally
```

### CI → GitHub Pages
The `.github/workflows/deploy.yml` pipeline:
- Checks out code, sets up Node, and installs dependencies
- Runs `npm run build` to generate static files in `/dist`
- Deploys to the `gh-pages` branch using `JamesIves/github-pages-deploy-action`
- Hosts the site at `https://<user>.github.io/image-gallery-v2/`

Pushes or merged PRs to `main` trigger this workflow automatically.

## 📂 Project Structure

```
src/
 ├─ assets/                 # Static images/icons
 ├─ components/
 │   ├─ gallery/            # PhotoGallery + ImageModal
 │   └─ ui/                 # shadcn-wrapped primitives
 ├─ lib/
 │   ├─ firebase.ts         # Firebase initialization
 │   └─ useFirebaseImages.ts# Custom hook to list images
 ├─ providers/              # Context providers
 └─ App.tsx                 # Route & shell
.github/
 └─ workflows/deploy.yml    # CI pipeline
public/                     # Static assets copied as-is
```

## 🤝 Contributing

1. Fork the repo and create a feature branch.
2. Commit changes and push to your fork.
3. Open a pull request with a clear description.
4. For large refactors or features, open an issue first.
5. Use [Conventional Commits](https://www.conventionalcommits.org/) (e.g., `feat: …`, `fix: …`) for changelog generation.

## 📜 License

No license file provided; default is "All rights reserved."  
To reuse code or assets, open an issue or contact the author.

---

Built with ❤️ by Perry Ong — 2025