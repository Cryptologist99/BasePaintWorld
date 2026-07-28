# BasePaint World - TODO

## Visual polish / fullscreen pass (not started)
- [ ] Remove `.container` max-width/centering/border treatment on the game screens (939, 927) so it doesn't feel boxed-in
- [ ] Check body/html overflow and canvas scaling so the game canvas fills the viewport without page scroll (same technique used on spot-the-difference-game.html could likely extend here)
- [ ] Test resizing more broadly across screens (verify the fit-to-screen approach holds up at various window sizes, not just the cases already spot-checked)
- [ ] Consider shifting "Return to Overworld" button(s) to the side (like the spot-the-difference sidebar), or otherwise applying the same one-page resizing treatment to canvas-viewer.html and other static screens

## Content & features
- [ ] Revisit/improve the Y-sorting system
- [ ] Add more objects to the overworld screens (939, 927)
- [ ] New door animation
- [ ] Achievement(s) specific to the Hospital canvas (927)
- [x] Background music (bgm.mp3 loops, resumes playback position across room navigations via sessionStorage rather than restarting - see assets/audio.js)
- [ ] Seamless bgm across rooms (currently resumes position on navigation but still has a brief gap/reload each time). Two options considered: (1) iframe shell - persistent top-level page holds the `<audio>`, an inner `<iframe>` swaps between rooms; smaller lift but needs manual pushState/postMessage to keep the URL meaningful. (2) Full SPA rewrite - merge all rooms into one page, switch view via JS instead of navigation; architecturally clean but requires namespacing each room's globals (player, mapCtx, overlayRegions, etc.) since they currently collide across files.
- [ ] Update achievement names
- [ ] Add an About page

## Robustness
- [ ] Loading states / error handling (e.g. what shows while assets are still loading, or if an asset fails)
- [ ] Achievement notification queue overlap check (do toasts ever visually collide with other UI?)
- [ ] Mobile responsive sanity check (touch controls aren't implemented yet either)
