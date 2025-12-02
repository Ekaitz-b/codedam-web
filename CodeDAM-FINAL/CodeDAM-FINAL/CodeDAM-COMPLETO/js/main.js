/* ===========================
   CodeDAM - Main JavaScript
   Scroll animations & Search
   =========================== */

// === SCROLL ANIMATIONS ===
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.observeElements();
        this.handleHeaderScroll();
    }

    observeElements() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('aos-animate');
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        document.querySelectorAll('[data-aos]').forEach(el => {
            observer.observe(el);
        });
    }

    handleHeaderScroll() {
        const header = document.getElementById('header');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });
    }
}

// === SEARCH FUNCTIONALITY ===
class SearchManager {
    constructor() {
        this.searchInput = document.getElementById('search-input');
        this.searchButton = document.getElementById('search-button');
        this.init();
    }

    init() {
        if (!this.searchInput || !this.searchButton) return;

        this.searchButton.addEventListener('click', () => this.performSearch());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch();
            }
        });

        // Suggestion tags
        document.querySelectorAll('.suggestion-tag').forEach(tag => {
            tag.addEventListener('click', () => {
                const searchTerm = tag.getAttribute('data-search');
                this.searchInput.value = searchTerm;
                this.performSearch();
            });
        });
    }

    performSearch() {
        const query = this.searchInput.value.toLowerCase().trim();
        if (!query) return;

        const cards = document.querySelectorAll('.course-card');
        let found = false;
        let firstMatch = null;

        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            const isMatch = text.includes(query);

            if (isMatch) {
                card.style.display = 'block';
                card.classList.add('search-highlight');
                found = true;
                if (!firstMatch) firstMatch = card;
            } else {
                card.style.display = 'none';
                card.classList.remove('search-highlight');
            }
        });

        if (found && firstMatch) {
            setTimeout(() => {
                firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);

            // Remove highlight after 2 seconds
            setTimeout(() => {
                cards.forEach(card => card.classList.remove('search-highlight'));
            }, 2000);
        } else {
            this.showNoResults(query);
            // Reset display
            cards.forEach(card => card.style.display = 'block');
        }
    }

    showNoResults(query) {
        // Simple alert for now - could be improved with a modal
        alert(`No se encontraron resultados para: "${query}"\n\nIntenta con términos como: Java, SQL, Android, Git, HTML, CSS`);
    }
}

// === SMOOTH SCROLL ===
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#' || href === '') return;

                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// === MOBILE MENU ===
class MobileMenu {
    constructor() {
        this.menuBtn = document.getElementById('mobileMenuBtn');
        this.navMenu = document.querySelector('.navbar-menu');
        this.isOpen = false;
        this.init();
    }

    init() {
        if (!this.menuBtn) return;

        this.menuBtn.addEventListener('click', () => this.toggle());

        // Close on link click
        document.querySelectorAll('.navbar-menu a').forEach(link => {
            link.addEventListener('click', () => {
                if (this.isOpen) this.toggle();
            });
        });
    }

    toggle() {
        this.isOpen = !this.isOpen;
        this.menuBtn.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        document.body.style.overflow = this.isOpen ? 'hidden' : '';
    }
}

// === INITIALIZE ===
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimations();
    new SearchManager();
    new SmoothScroll();
    new MobileMenu();

    // Add search highlight styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .search-highlight {
            animation: highlightPulse 0.8s ease;
            border-color: var(--accent-blue) !important;
        }
        
        @keyframes highlightPulse {
            0%, 100% {
                box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
            }
            50% {
                box-shadow: 0 0 0 20px rgba(59, 130, 246, 0);
            }
        }
    `;
    document.head.appendChild(style);
});

// === PERFORMANCE ===
// Lazy load images if any
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}
