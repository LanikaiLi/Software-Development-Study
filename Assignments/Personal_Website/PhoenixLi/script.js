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

(function () {
    var SKILLS = [
        { name: 'HTML / CSS', category: 'build' },
        { name: 'JavaScript', category: 'build' },
        { name: 'React', category: 'build' },
        { name: 'Git', category: 'build' },
        { name: 'Python', category: 'build' },
        { name: 'SQL', category: 'data' },
        { name: 'dbt (Data Build Tool)', category: 'data' },
        { name: 'Data Management Platforms', category: 'data' },
        { name: 'Kafka & Flink', category: 'data' },
        { name: 'Databricks & Snowflake & BigQuery', category: 'data' },
        { name: 'AWS/GCP/Azure', category: 'cloud' },
        { name: 'Terraform & Atmos', category: 'cloud' },
        { name: 'Datadog', category: 'cloud' },
        { name: 'CI/CD', category: 'cloud' },
        { name: 'Zapier', category: 'cloud' },
        { name: 'Gen AI', category: 'people' },
        { name: 'Empathy-driven UX Thinking', category: 'people' },
        { name: 'Empathy-driven User Experience', category: 'people' },
        { name: 'Empathy-driven Product Design', category: 'people' },
        { name: 'Heart-touching Public Speaking', category: 'people' }
    ];

    var row = document.getElementById('skillsRow');
    var filterGroup = document.querySelector('.skills-filters');

    if (!row || !filterGroup) {
        return;
    }

    function renderSkills(filterCategory) {
        var cat = filterCategory === 'all' ? null : filterCategory;
        row.textContent = '';
        for (var i = 0; i < SKILLS.length; i++) {
            if (cat && SKILLS[i].category !== cat) {
                continue;
            }
            var chip = document.createElement('span');
            chip.className = 'skill';
            chip.textContent = SKILLS[i].name;
            row.appendChild(chip);
        }
    }

    function setActiveFilter(activeKey) {
        var buttons = filterGroup.querySelectorAll('.skills-filter-btn');
        for (var i = 0; i < buttons.length; i++) {
            var b = buttons[i];
            var isActive = b.getAttribute('data-category') === activeKey;
            b.classList.toggle('active', isActive);
            b.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        }
    }

    filterGroup.addEventListener('click', function (e) {
        var btn = e.target.closest('button[data-category]');
        if (!btn || !filterGroup.contains(btn)) {
            return;
        }
        var key = btn.getAttribute('data-category');
        if (!key) {
            return;
        }
        setActiveFilter(key);
        renderSkills(key);
    });

    renderSkills('all');
})();
