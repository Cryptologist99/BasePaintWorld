// Shared audio for BasePaint World: background music + one-shot SFX.
// Drop files into assets/ using these exact names:
//   assets/bgm.mp3                 - looping background track
//   assets/sfx-canvas-enter.mp3    - played when entering a canvas from the start screen
//   assets/sfx-achievement.wav     - played when an achievement unlocks
(function () {
    const BGM_SRC = 'assets/bgm.mp3';
    const BGM_VOLUME = 0.35;
    // Every page (room) navigation is a full reload, so the <audio> element
    // can't literally survive between pages. Instead we persist playback
    // position across the navigation and resume from there (nudged forward
    // by however long the navigation took) so the track doesn't reset to 0:00
    // every time the player walks through a door.
    const BGM_TIME_KEY = 'bpw_bgm_time';
    const BGM_SAVED_AT_KEY = 'bpw_bgm_saved_at';
    let bgm = null;

    function initBGM() {
        if (bgm) return;
        bgm = new Audio(BGM_SRC);
        bgm.loop = true;
        bgm.volume = BGM_VOLUME;

        const savedTime = parseFloat(sessionStorage.getItem(BGM_TIME_KEY));
        const savedAt = parseFloat(sessionStorage.getItem(BGM_SAVED_AT_KEY));
        if (!isNaN(savedTime)) {
            const elapsed = !isNaN(savedAt) ? Math.max(0, (Date.now() - savedAt) / 1000) : 0;
            let resumeTime = savedTime + elapsed;
            let resumeApplied = false;

            // Seeking a fresh element only works once the browser considers the
            // target position seekable, which for a large file may not be true
            // at loadedmetadata. Assigning currentTime too early silently clamps
            // it back to 0 (a "restart"). So retry across several media events
            // until the seek actually sticks.
            const applyResume = () => {
                if (resumeApplied || isNaN(bgm.duration) || !bgm.duration) return;
                const target = resumeTime % bgm.duration;
                const seekable = bgm.seekable;
                const canSeek = seekable.length > 0 && seekable.end(seekable.length - 1) >= target;
                if (!canSeek) return;
                bgm.currentTime = target;
                if (Math.abs(bgm.currentTime - target) < 1) {
                    resumeApplied = true;
                }
            };

            ['loadedmetadata', 'loadeddata', 'canplay', 'canplaythrough', 'progress', 'playing'].forEach(evt => {
                bgm.addEventListener(evt, applyResume);
            });
        }

        const tryPlay = () => bgm.play().catch(() => {});
        tryPlay();

        // Browsers block audio autoplay until a user gesture - retry once on first interaction.
        const resume = () => {
            tryPlay();
            document.removeEventListener('pointerdown', resume);
            document.removeEventListener('keydown', resume);
        };
        document.addEventListener('pointerdown', resume, { once: true });
        document.addEventListener('keydown', resume, { once: true });

        const persist = () => {
            sessionStorage.setItem(BGM_TIME_KEY, String(bgm.currentTime));
            sessionStorage.setItem(BGM_SAVED_AT_KEY, String(Date.now()));
        };
        window.addEventListener('pagehide', persist);
        window.addEventListener('beforeunload', persist);
    }

    function playSFX(src, volume = 0.6) {
        const sfx = new Audio(src);
        sfx.volume = volume;
        sfx.play().catch(() => {});
    }

    window.GameAudio = {
        playSFX,
        playEnterCanvas: () => playSFX('assets/sfx-canvas-enter.mp3'),
        playAchievement: () => playSFX('assets/sfx-achievement.wav')
    };

    document.addEventListener('DOMContentLoaded', initBGM);
})();
