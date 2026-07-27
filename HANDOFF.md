# BasePaint World - Session Handoff

Context for picking up work in Claude Code. This session (claude.ai chat) was building
toward a "demo-ready in 2 days" push. See TODO.md and PROJECT_DOCS.md for full project
context — this doc is specifically about what's IN PROGRESS or PENDING right now.

## In Progress / Just Completed (verify these landed in local files)

1. **Y-sorting ported to Canvas 927** (canvas-navigator-927.html)
   - Same flood-fill region system as canvas-navigator.html (939)
   - Replaced the old single-canvas overlay draw with per-region Y-sorted draw calls
   - Door sprite animation still draws right after background, before Y-sorted layers
   - **Verify:** confirm `overlayRegions`, `floodFillRegion()`, and the updated `render()`
     function actually made it into your local canvas-navigator-927.html

2. **Achievements expanded to one per canvas** (assets/achievements.json)
   - Added 12 new achievements: `visit_939`, `visit_927`, `visit_201`, `visit_375`,
     `visit_237`, `visit_561`, `visit_700`, `visit_576`, `visit_327`, `visit_624`,
     `visit_587`, `visit_823` — using real BasePaint themes (Tiny Village, Hospital,
     Stained Glass Window, Bakery, Beer!, Love Your Pet Day, BasePaint Artist Studio,
     The Cat Got Into the Paint!, Cupcakes vs Muffins, Darkroom, BasePaint Antiques,
     An Amazing Bookshelf) alongside the original 4 edge achievements.
   - Ported the FULL achievement system (CSS + button + modal + JS) into
     canvas-navigator-927.html and canvas-viewer.html — previously ONLY
     canvas-navigator.html (939) had it.
   - canvas-viewer.html now calls `unlockAchievement('visit_' + canvasNumber)`
     dynamically based on the `?canvas=` URL param, gated behind an
     `achievementsReady` promise so it doesn't fire before achievements.json loads.
   - canvas-navigator-927.html calls `unlockAchievement('visit_927')` in `initializeGame()`.
   - **NOT YET DONE:** canvas-navigator.html (939) still needs
     `unlockAchievement('visit_939')` added to its `initializeGame()` function
     (was about to do this when we switched to Claude Code). Location was around
     line 1020 in that file.

## Not Started Yet

3. **Visual polish / fullscreen pass** — this was the next big task, not started.
   User's complaint: "it feels like a game in a window and there's weirdness with
   scrolling... not sure how to fix it so it's more of a fullscreen experience."
   Likely needs: removing the `.container` max-width/centering/border treatment on
   the game screens (939, 927), checking body/html overflow and canvas scaling so
   the game canvas fills the viewport without page scroll, revisiting the
   `.canvas-container` border/padding box that currently makes it look boxed-in.

## Reference: Full TODO List

See TODO.md in project root for the full prioritized list. As of this handoff:
- Priority 1 (core loop works end-to-end): ✅ complete
- Priority 2 (fill gaps): Y-sorting on 927 ✅, file-inputs hidden on both ✅,
  clear-all achievements tested ✅, canvas info button text ✅
- Priority 3 (polish): per-canvas achievements ✅ (just completed above),
  fullscreen/visual polish ⬜ (not started), loading states/error handling ⬜,
  notification queue overlap check ⬜, mobile responsive sanity check ⬜

## Key Files Reference

- `canvas-navigator.html` — Canvas 939 (main overworld), 12 doors
- `canvas-navigator-927.html` — Canvas 927 (navigable, no doors, bottom edge exits to 939)
- `canvas-viewer.html` — universal static viewer, `?canvas=XXX`, any key returns to overworld
- `start-screen.html` — menu, defaults to "Enter the Canvas"
- `assets/achievements.json` — 16 achievements total (4 edge + 12 visit)
- `assets/basepaint_themes.json` — all ~1000 BasePaint canvas themes (scraped via
  scrape_basepaint_api.py using BasePaint's own API, not OpenSea)
