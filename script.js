// ─────────────────────────────────────────────────────────────────────
// Mandy's Blackout Tour - Presentation Scripts
// ─────────────────────────────────────────────────────────────────────

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    const sections = document.querySelectorAll('section');
    const current = Math.round(window.scrollY / window.innerHeight);

    if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        const next = Math.min(current + 1, sections.length - 1);
        sections[next].scrollIntoView({ behavior: 'smooth' });
    }

    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const prev = Math.max(current - 1, 0);
        sections[prev].scrollIntoView({ behavior: 'smooth' });
    }

    // Press 'r' to restart
    if (e.key === 'r' || e.key === 'R') {
        restartPresentation();
    }
});

// Animation Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.anim').forEach(el => observer.observe(el));

// Restart Presentation
function restartPresentation() {
    // Reset all animations
    document.querySelectorAll('.anim').forEach(el => {
        el.classList.remove('visible');
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Re-trigger first section animations after scroll
    setTimeout(() => {
        document.querySelectorAll('section:first-of-type .anim').forEach(el => {
            el.classList.add('visible');
        });
    }, 600);
}

// Initialize first section animations on load
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelectorAll('section:first-of-type .anim').forEach(el => {
            el.classList.add('visible');
        });
    }, 200);
});

// Touch swipe support for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const sections = document.querySelectorAll('section');
    const current = Math.round(window.scrollY / window.innerHeight);
    const swipeThreshold = 50;

    if (touchStartY - touchEndY > swipeThreshold) {
        // Swipe up - go to next section
        const next = Math.min(current + 1, sections.length - 1);
        sections[next].scrollIntoView({ behavior: 'smooth' });
    }

    if (touchEndY - touchStartY > swipeThreshold) {
        // Swipe down - go to previous section
        const prev = Math.max(current - 1, 0);
        sections[prev].scrollIntoView({ behavior: 'smooth' });
    }
}
