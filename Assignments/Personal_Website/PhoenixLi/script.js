(function () {
    var player = document.getElementById('vinylPlayer');
    var btn = document.getElementById('vinylBtn');
    var music = document.getElementById('bgMusic');

    if (!player || !btn || !music) {
        return;
    }

    function clearPlayingState() {
        btn.classList.remove('playing');
        player.classList.remove('playing');
    }

    function setPlayingState() {
        btn.classList.add('playing');
        player.classList.add('playing');
    }

    async function toggleMusic() {
        if (music.paused) {
            try {
                await music.play();
                setPlayingState();
            } catch (err) {
                clearPlayingState();
            }
        } else {
            music.pause();
            clearPlayingState();
        }
    }

    // One handler: touchend + click was double-firing on many devices (ghost click),
    // which toggled play then pause and removed .playing immediately.
    player.addEventListener('click', function () {
        toggleMusic();
    });
})();
