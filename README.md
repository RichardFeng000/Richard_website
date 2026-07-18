# Ruiding Feng Website

This repository contains three related portfolio experiences built with Vue 3 and Vite:

- `/` - an interactive terminal portfolio.
- `/information` - a clean official profile page.
- `/vfx` - a VFX reel site with video-first scrolling.
- `/resume` - an optional direct full-page resume PDF preview.

The project is intentionally minimal: Vue single-file components, Vite multi-page entry points, static assets under `public/`, and no UI framework.

## Local Development

```bash
npm install
npm run dev
```

The dev server usually starts at `http://127.0.0.1:5173/`. If that port is occupied, Vite will choose the next available port.

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Site Map

The Vite build has three HTML entry points configured in `vite.config.ts`:

- `index.html` -> `/`
- `information/index.html` -> `/information`
- `resume/index.html` -> `/resume`
- `vfx/index.html` -> `/vfx`

Runtime routing is handled in `src/App.vue` by checking `window.location.pathname` and rendering the matching Vue view.

## 1. Terminal Portfolio

Route: `/`

Primary file: `src/App.vue`

The main site is a terminal-style interactive portfolio. It uses a dark CRT-inspired visual language, command input, typed history, autocomplete behavior, overlays, and a robot/avatar panel.

### Core Interaction

The terminal supports typed commands, command history, autocomplete hints, and special command output views.

Main visible commands include:

- `help` - lists available commands.
- `about` - prints the biographical profile.
- `skills` - prints categorized technical skills.
- `projects` - shows the Affordance2Action project.
- `resume` - opens the embedded resume viewer.
- `contact` - prints email, GitHub, and LinkedIn.
- `links` - prints external links.
- `scan`, `theme`, `clear`, `sudo`, `hack` - system-style interactive commands.

Hidden command:

- `door` - prints direct links to the official profile and the VFX site:
  - `https://www.ruiding-feng.com/information`
  - `https://www.ruiding-feng.com/vfx`

### Resume Handling

The resume is imported from:

```text
materials/Resume_Ruiding_Feng.pdf
```

The terminal opens it in an in-page viewer and also provides a download action.

### Technical Notes

- Built as a Vue component in `src/App.vue`.
- Uses Vue reactive state for command history, terminal input, overlays, resume modal, avatar state, and command routing.
- Uses direct browser path detection to switch between the terminal, information page, and VFX page.
- Global styling lives in `src/style.css`.
- The terminal panel has its own bounded scroll area so long command history does not grow the whole layout.

## 2. Official Information Page

Route: `/information`

Primary file: `src/InformationView.vue`

This is the formal profile page. It is intentionally simpler than the terminal site and presents identity, contact links, research focus, vision, highlights, news, and publications in a conventional web layout.

### Content Direction

The page presents Ruiding Feng as focused on:

- Computer Vision
- Robotics

It also includes the publication:

```text
Affordance2Action: Task-Conditioned Scene-Level Affordance Grounding for Real-Time Manipulation
```

The publication links to:

```text
https://arxiv.org/html/2606.04172v1
```

### Technical Notes

- Rendered through `InformationView.vue`.
- Activated when the path is `/information`, `/information/`, or `/information/index.html`.
- The app adds `page-information` classes to `body` and `html` for page-specific overflow behavior.
- Designed as a readable profile page rather than an interactive terminal.

## 3. Resume Page

Route: `/resume`

Primary file: `src/ResumeView.vue`

This route is a dedicated full-page PDF preview for:

```text
materials/Resume_Ruiding_Feng.pdf
```

The page uses a full viewport iframe so the resume occupies the entire browser window without the terminal modal frame.

## 4. VFX Website

Route: `/vfx`

Primary file: `src/VfxView.vue`

The VFX site is a video-first reel page inspired by the scrolling behavior of `https://www.yannihe.com/`. It uses a black editorial layout, centered serif identity header, and large video panels.

### Header

The header contains:

- `RUIDING FENG`
- `VFX Artist`
- Navigation links:
  - `Home`
  - `Demo`
  - `Resume`
  - `About Me`

The header is ordinary page content, not an internal scrolling container. The page uses the browser/body scroll behavior rather than a custom nested scroller.

The `Resume` item switches the VFX content area to a black resume page and centers a floating PDF preview below the navigation without leaving `/vfx`.

### Demo Interaction

The demo section is designed as a categorized media index:

- All VFX media items are grouped by category.
- Current categories are `FX`, `Unreal Engine`, `Houdini procedure`, and `Lighting work`.
- Item names follow the source file names, such as `TopGun`, `Mechanic`, `ParticleDissolve`, `GameThorne`, `Vessel`, `Flower`, and `UE`.
- Each media item is clickable.
- Clicking a video opens a floating playback window; clicking a still frame opens the image in the same floating viewer.
- The floating player lets the viewer inspect the selected clip without leaving the VFX page.
- This demo interaction is separate from the large scrolling reel sections.

### Video Structure

The VFX page currently has four major visual sections:

1. First fixed-mask screen:
   - Loops through `vfx-01`, `vfx-03`, and `vfx-09`.
   - Sources:
     - `vfx-01-TopGun.mp4`
     - `vfx-03-ParticleDissolve.mp4`
     - `vfx-09-flower.mov`

2. ED A3 fixed-mask screen:
   - Plays only `vfx-10-UE.mp4`.
   - Source copied from:
     - `/Users/fengruiding/Downloads/RuidingF_ED_A3.MP4`
   - Stored in:
     - `public/vfx/source/vfx-10-UE.mp4`

3. Second fixed-mask screen:
   - Loops through `vfx-02`, `vfx-07`, and `vfx-08`.
   - Sources:
     - `vfx-02-Mechanic.mp4`
     - `vfx-07-GameThorne.mp4`
     - `vfx-08-vessel.mov`

4. Final three-image row:
   - Shows `vfx-04`, `vfx-05`, and `vfx-06` as lighting work PNG still frames in one row.
   - This row is normal content and does not participate in the fixed-mask scroll logic.

### Fixed-Mask Scroll Logic

The first three large screens use the restored fixed-mask behavior:

- Each screen has a full-viewport media layer.
- The video itself is fixed relative to the viewport.
- Scrolling changes the visible mask area.
- The result is that the video appears locked in place while the page reveals or hides portions of each screen.
- The final fixed screen exits into the normal three-image row.

This differs from ordinary section scrolling because the video does not simply move upward with the document while it is in the masked phase.

### Asset Locations

Video sources:

```text
public/vfx/source/
```

Poster images:

```text
public/vfx/
```

Important current media files:

```text
public/vfx/source/vfx-01-TopGun.mp4
public/vfx/source/vfx-02-Mechanic.mp4
public/vfx/source/vfx-03-ParticleDissolve.mp4
public/vfx/source/vfx-04-demo-reel.png
public/vfx/source/vfx-05-demo-reel.png
public/vfx/source/vfx-06-demo-reel.png
public/vfx/source/vfx-07-GameThorne.mp4
public/vfx/source/vfx-08-vessel.mov
public/vfx/source/vfx-09-flower.mov
public/vfx/source/vfx-10-UE.mp4
```

### Technical Notes

- `VfxView.vue` stores the video metadata in the `works` array.
- The first screen uses `fxHeroWorks`.
- The ED A3 screen uses `edWork`.
- The second screen uses `proceduralWorks`.
- The final row uses `tripleWorks`.
- Video rotation and quality should be handled at the source level before adding assets.
- Do not replace the source videos with compressed versions unless that is an explicit goal.

## Styling

Global styles are in:

```text
src/style.css
```

Page-specific component styles are inside:

```text
src/InformationView.vue
src/VfxView.vue
```

The app applies route-specific classes to both `body` and `html`:

- `page-information`
- `page-vfx`

These classes control page-level overflow behavior.

## Deployment Notes

The production domain currently used in the app is:

```text
https://www.ruiding-feng.com/
```

Important routes:

```text
https://www.ruiding-feng.com/
https://www.ruiding-feng.com/information
https://www.ruiding-feng.com/vfx
```

Before deploying, run:

```bash
npm run build
```

The build output is written to:

```text
dist/
```
