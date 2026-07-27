# BasePaint World — Handoff (2026-07-27)

## Project
Browser-based pixel art exploration game on BasePaint.xyz CC0 canvases. Vanilla JS, HTML5 Canvas, no build step. Git repo: `github.com/Cryptologist99/BasePaintWorld`. Local: `C:\Vibe\BasePaintWorld\Game`.

## Files
| File | Purpose |
|------|---------|
| `index.html` | Start screen |
| `canvas-navigator.html` | Canvas 939 overworld (main) |
| `canvas-navigator-927.html` | Canvas 927 hospital |
| `canvas-viewer.html` | Universal static canvas viewer |
| `spot-the-difference-game.html` | Spot-the-difference minigame |
| `assets/achievements.json` | 19 achievements (1 secret: konami_code) |
| `TODO.md` | Task list |

## Design System
- BG: `#1E2735`, Accent: `#fde047`, Header: `#073eb1`
- Font: Roboto Mono
- Persistent header (36px) on all pages; links back to `basepaint.xyz`
- "BasePaint World" brand in header links to `index.html` (same tab)

## Marker Color System (map PNG overlay layer)
| Color | Hex | Behavior |
|-------|-----|----------|
| Magenta | `#FF00FF` | Collision (solid wall) |
| Cyan | `#00FFFF` | Door / transition |
| Yellow | `#FFFF00` | Always-above overlay (non-collision) |
| Orange | `#FF8000` | Always-above overlay + collision |
| Green | `#00FF00` | True Y-sorted overlay (non-collision) — player walks behind when north, in front when south |

Green is the newest addition. User will repaint tree canopies / walk-around objects green in Aseprite map files for 939 and 927.

## Achievement System
- Stored in `localStorage` key `basepaint_achievements`
- JSON: `assets/achievements.json` — 19 entries, `"secret": true` hides from modal until unlocked
- Race condition fix: `achievementsLoaded` flag gates `checkGameReady()`
- Konami code (up up down down left right left right B A) unlocks secret achievement + dev panels
- Dev panel visibility stored separately in `basepaint_devmode_visible` localStorage key
- Achievement order: edge alerts → spot-the-difference (Eagle Eye, Speed Spotter <30s) → canvas visits → konami (secret)

## Known-Good Features
- Y-sorting fully implemented in both 939 and 927
- Spot-the-difference: responsive one-page layout, confetti on completion, click-accuracy fix, side panel at >=900px
- Canvas-info button: smooth min-width/max-width animation, icon centered
- Edge message popup: #1E2735 bg, #fde047 border, "You've reached the X edge" as primary text
- Mint button on start screen opens in new tab
- All pages: Roboto Mono font, site-header

## TODO (priority order)
1. Visual polish / fullscreen — boxed-in container on 939 and 927
2. Return to Overworld button — treatment on canvas-viewer.html (may move to side)
3. Resizing — test all pages at different viewport sizes
4. Add objects to overworld — user will paint green (#00FF00) areas in Aseprite first
5. New door animation
6. Hospital achievements — specific to canvas 927
7. About page
8. Update achievement display names
9. Background music
10. Loading states / error handling
11. Achievement notification overlap check
12. Mobile / touch controls

## Last Commit State
Y-sorting changes in 927 just finished but NOT yet committed. Run:

  git add canvas-navigator-927.html
  git commit -m "Add green Y-sorted overlay color to canvas 927"
  git push
