# GRID SPHERE Landing Page

A high-performance scrollytelling experience built with Next.js 14, Framer Motion, and HTML5 Canvas.

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Generate Image Sequence:**
   You need 40 frames of the assembly animation. Place them in `public/images/assembly-frames/`.
   Naming convention: `frame_001.webp`, `frame_002.webp`, ..., `frame_040.webp`.

   If you have a video of the assembly, you can use FFmpeg to extract frames:
   ```bash
   ffmpeg -i your_video.mp4 -vf "fps=30,scale=1920:-1" -q:v 2 public/images/assembly-frames/frame_%03d.webp
   ```
   *Note: Ensure you have exactly 40 frames or adjust the `TOTAL_FRAMES` constant in `components/ScrollAssembly.tsx`.*

3. **Run the development server:**
   ```bash
   npm run dev
   ```

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Animation:** Framer Motion (useScroll, useTransform)
- **Rendering:** HTML5 Canvas (RequestAnimationFrame)
- **Styling:** Tailwind CSS (Spotify-inspired palette)

## Palette
- Background: `#191414`
- Primary: `#1DB954`
- Text: `#FFFFFF` / `#B3B3B3`
