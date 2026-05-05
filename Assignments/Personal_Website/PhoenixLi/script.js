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

(function () {
    var grid = document.querySelector('.hobby-grid');
    var quoteEl = document.getElementById('lifeQuoteText');
    var attrEl = document.getElementById('lifeQuoteAttr');

    if (!grid || !quoteEl || !attrEl) {
        return;
    }

    var LIFE_BLURBS = {
        reading: {
            text: 'One of my favorite quotes: I swear by my life and my love of it that I will never live for the sake of another man, nor ask another man to live for mine.',
            attr: 'Atlas Shrugged'
        },
        'muay-thai': {
            text: 'My favorite lesson learned from muay thai is that defensing sometimes is more important than attacking, especially when it comes to protect your own body.',
            attr: 'On the mats'
        },
        ideas: {
            text: 'Nothing beats the moment something that lived only in my head becomes real — a project shipped, a problem solved, an idea someone else can use.',
            attr: 'Building in public'
        },
        travel: {
            text: 'One thing I learned from and really like about traveling is inclusion, diversity, and acceptance for the people who are different from us.',
            attr: 'Somewhere with a boarding pass'
        }
    };

    function setQuote(key) {
        var item = LIFE_BLURBS[key];
        if (!item) {
            return;
        }
        quoteEl.textContent = item.text;
        if (item.attr) {
            attrEl.textContent = '— ' + item.attr;
            attrEl.removeAttribute('hidden');
        } else {
            attrEl.textContent = '';
            attrEl.setAttribute('hidden', '');
        }
    }

    function setSelected(activeBtn) {
        var buttons = grid.querySelectorAll('.hobby-card');
        for (var i = 0; i < buttons.length; i++) {
            var pressed = buttons[i] === activeBtn;
            buttons[i].setAttribute('aria-pressed', pressed ? 'true' : 'false');
        }
    }

    grid.addEventListener('click', function (e) {
        var btn = e.target.closest('.hobby-card');
        if (!btn || !grid.contains(btn)) {
            return;
        }
        var key = btn.getAttribute('data-hobby');
        if (!key) {
            return;
        }
        setSelected(btn);
        setQuote(key);
    });
})();
