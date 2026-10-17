document.addEventListener("DOMContentLoaded", () => {
    
    // -------------------------------------------------
    // 1. Scroll Animation Logic (Intersection Observer)
    // -------------------------------------------------
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1 
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));


    // -------------------------------------------------
    // 2. Pose Filter Logic (Kids, Seniors, All)
    // -------------------------------------------------
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.card');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                cards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => { card.style.opacity = '1'; }, 50);
                    } else {
                        card.style.opacity = '0';
                        setTimeout(() => { card.style.display = 'none'; }, 300);
                    }
                });
            });
        });
    }

    // -------------------------------------------------
    // 3. Text Resize Logic (Accessibility for Seniors)
    // -------------------------------------------------
    const resizeBtn = document.getElementById('text-resize-btn');
    
    if (resizeBtn) {
        resizeBtn.addEventListener('click', () => {
            document.documentElement.classList.toggle('large-text');
            if (document.documentElement.classList.contains('large-text')) {
                resizeBtn.textContent = 'A-'; 
            } else {
                resizeBtn.textContent = 'A+'; 
            }
        });
    }

    // -------------------------------------------------
    // 4. Local Habit Tracker (Streak Counter)
    // -------------------------------------------------
    const completeBtn = document.getElementById('complete-routine-btn');
    const streakCountEl = document.getElementById('streak-count');
    const trackerMessage = document.getElementById('tracker-message');

    if (completeBtn && streakCountEl) {
        let streak = parseInt(localStorage.getItem('yogaStreak')) || 0;
        let lastDate = localStorage.getItem('lastYogaDate');
        
        streakCountEl.textContent = streak;
        const today = new Date().toISOString().split('T')[0];

        if (lastDate === today) {
            completeBtn.style.display = 'none';
            trackerMessage.style.display = 'block';
            trackerMessage.textContent = "You've already completed your routine today. See you tomorrow!";
        }

        completeBtn.addEventListener('click', () => {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];

            if (lastDate === yesterdayStr) {
                streak++; 
            } else {
                streak = 1; 
            }

            localStorage.setItem('yogaStreak', streak);
            localStorage.setItem('lastYogaDate', today);

            streakCountEl.textContent = streak;
            completeBtn.style.display = 'none';
            trackerMessage.style.display = 'block';
            trackerMessage.textContent = "Awesome job! Your progress is saved.";
        });
    }

    // -------------------------------------------------
    // 5. Custom Breathing Timers
    // -------------------------------------------------
    const breathSelect = document.getElementById('breath-select');
    const breatheCircle = document.querySelector('.breathe-circle');

    if (breathSelect && breatheCircle) {
        breatheCircle.classList.add(breathSelect.value);
        breathSelect.addEventListener('change', (e) => {
            breatheCircle.classList.remove('breathe-normal', 'breathe-sleep', 'breathe-focus');
            breatheCircle.classList.add(e.target.value);
        });
    }

    // -------------------------------------------------
    // 6. Print Routine Logic
    // -------------------------------------------------
    const printBtn = document.getElementById('print-btn');
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }

    // -------------------------------------------------
    // 7. High Contrast Theme (Dark Mode)
    // -------------------------------------------------
    const themeBtn = document.getElementById('theme-toggle-btn');
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'dark') {
        document.documentElement.classList.add('dark-theme');
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark-theme');
            if (document.documentElement.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }
});