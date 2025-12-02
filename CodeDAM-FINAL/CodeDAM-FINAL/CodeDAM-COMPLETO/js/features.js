/* ===========================
   CodeDAM - Enhanced Features
   Dark Mode + Easter Eggs
   =========================== */

// === DARK MODE SYSTEM ===
class DarkModeManager {
    constructor() {
        this.isDark = localStorage.getItem('theme') === 'dark';
        this.toggle = document.getElementById('themeToggle');
        this.sunIcon = this.toggle?.querySelector('.sun-icon');
        this.moonIcon = this.toggle?.querySelector('.moon-icon');
        this.init();
    }

    init() {
        // Apply saved theme
        if (this.isDark) {
            document.body.classList.add('dark-mode');
            this.updateIcons();
        }

        // Toggle button
        this.toggle?.addEventListener('click', () => this.toggleTheme());

        // Update AstroBot colors
        this.updateAstroBotColors();
    }

    toggleTheme() {
        this.isDark = !this.isDark;
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
        this.updateIcons();
        this.updateAstroBotColors();
        
        // Smooth transition
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }

    updateIcons() {
        if (this.isDark) {
            this.sunIcon.style.display = 'none';
            this.moonIcon.style.display = 'block';
        } else {
            this.sunIcon.style.display = 'block';
            this.moonIcon.style.display = 'none';
        }
    }

    updateAstroBotColors() {
        if (window.astroBot) {
            window.astroBot.updateModeColors();
        }
    }
}

// === EASTER EGG 1: KONAMI CODE ===
class KonamiCodeEasterEgg {
    constructor() {
        this.sequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
                        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        this.userSequence = [];
        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => {
            this.userSequence.push(e.key);
            
            // Keep only last 10 keys
            if (this.userSequence.length > 10) {
                this.userSequence.shift();
            }

            // Check if matches
            if (this.checkSequence()) {
                this.activate();
            }
        });
    }

    checkSequence() {
        return this.sequence.every((key, index) => 
            key === this.userSequence[index]
        );
    }

    activate() {
        // Matrix Mode
        this.userSequence = []; // Reset
        
        const matrixOverlay = document.createElement('div');
        matrixOverlay.className = 'matrix-overlay';
        matrixOverlay.innerHTML = '<canvas id="matrixCanvas"></canvas>';
        document.body.appendChild(matrixOverlay);

        this.startMatrix();

        // Show message
        setTimeout(() => {
            const message = document.createElement('div');
            message.className = 'easter-egg-message';
            message.textContent = '🎮 KONAMI CODE ACTIVATED! 🎮';
            document.body.appendChild(message);

            setTimeout(() => {
                message.remove();
                matrixOverlay.remove();
            }, 5000);
        }, 1000);
    }

    startMatrix() {
        const canvas = document.getElementById('matrixCanvas');
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chars = '01アイウエオカキクケコサシスセソタチツテト';
        const fontSize = 16;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0F0';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);
        setTimeout(() => clearInterval(interval), 5000);
    }
}

// === EASTER EGG 2: SECRET LOGO CLICKS ===
class LogoClickEasterEgg {
    constructor() {
        this.clicks = 0;
        this.resetTimeout = null;
        this.logo = document.querySelector('.logo');
        this.init();
    }

    init() {
        this.logo?.addEventListener('click', (e) => {
            e.preventDefault();
            this.clicks++;

            // Reset counter after 2 seconds
            clearTimeout(this.resetTimeout);
            this.resetTimeout = setTimeout(() => {
                this.clicks = 0;
            }, 2000);

            if (this.clicks === 10) {
                this.activate();
                this.clicks = 0;
            }
        });
    }

    activate() {
        // Multiply AstroBots
        if (!window.astroBot) return;

        const message = document.createElement('div');
        message.className = 'easter-egg-message';
        message.textContent = '🤖 ASTROBOT ARMY ACTIVATED! 🤖';
        document.body.appendChild(message);

        // Create 4 more bots
        for (let i = 0; i < 4; i++) {
            setTimeout(() => {
                const clone = window.astroBot.element.cloneNode(true);
                clone.style.left = (Math.random() * (window.innerWidth - 100)) + 'px';
                clone.style.top = (Math.random() * (window.innerHeight - 120)) + 'px';
                document.body.appendChild(clone);

                // Remove after 10 seconds
                setTimeout(() => {
                    clone.style.transition = 'opacity 0.5s ease';
                    clone.style.opacity = '0';
                    setTimeout(() => clone.remove(), 500);
                }, 10000);
            }, i * 500);
        }

        setTimeout(() => message.remove(), 3000);
    }
}

// === EASTER EGG 3: SECRET SEARCH COMMAND ===
class SearchCommandEasterEgg {
    constructor() {
        this.searchInput = document.getElementById('search-input');
        this.commands = ['god mode', 'dev mode', 'hacker', 'matrix', 'secret'];
        this.init();
    }

    init() {
        this.searchInput?.addEventListener('keyup', (e) => {
            const value = e.target.value.toLowerCase().trim();
            
            if (this.commands.includes(value) && e.key === 'Enter') {
                e.preventDefault();
                this.activate(value);
                this.searchInput.value = '';
            }
        });
    }

    activate(command) {
        const features = {
            'god mode': {
                title: '⚡ GOD MODE ACTIVATED ⚡',
                effects: ['Todas las features desbloqueadas', 'Progreso al 100%', 'Acceso premium']
            },
            'dev mode': {
                title: '👨‍💻 DEVELOPER MODE ACTIVATED 👨‍💻',
                effects: ['Console logs visible', 'Debug mode ON', 'Performance stats']
            },
            'hacker': {
                title: '🕶️ HACKER MODE ACTIVATED 🕶️',
                effects: ['Matrix theme enabled', 'Green terminal style', 'Elite status']
            },
            'matrix': {
                title: '💚 MATRIX MODE ACTIVATED 💚',
                effects: ['Follow the white rabbit', 'Red pill or blue pill?', 'Wake up, Neo...']
            },
            'secret': {
                title: '🎁 SECRET UNLOCKED 🎁',
                effects: ['Easter egg master!', 'Hidden features found', 'You are awesome!']
            }
        };

        const config = features[command];
        
        const modal = document.createElement('div');
        modal.className = 'easter-egg-modal';
        modal.innerHTML = `
            <div class="easter-egg-modal-content">
                <h2>${config.title}</h2>
                <ul>
                    ${config.effects.map(effect => `<li>✓ ${effect}</li>`).join('')}
                </ul>
                <button onclick="this.parentElement.parentElement.remove()">¡GENIAL!</button>
            </div>
        `;
        document.body.appendChild(modal);

        // Apply visual effect
        if (command === 'matrix' || command === 'hacker') {
            document.body.style.filter = 'hue-rotate(90deg)';
            setTimeout(() => {
                document.body.style.filter = '';
            }, 3000);
        }
    }
}

// === EASTER EGG 4: MIDNIGHT MESSAGE ===
class MidnightEasterEgg {
    constructor() {
        this.checkTime();
        // Check every minute
        setInterval(() => this.checkTime(), 60000);
    }

    checkTime() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();

        // At midnight (00:00)
        if (hours === 0 && minutes === 0) {
            this.activate();
        }

        // At 3:00 AM (developer hours)
        if (hours === 3 && minutes === 0) {
            this.activateDeveloperHours();
        }
    }

    activate() {
        const message = document.createElement('div');
        message.className = 'easter-egg-message midnight-message';
        message.innerHTML = `
            <h3>🌙 ¡Es medianoche! 🌙</h3>
            <p>¿Aún despierto programando?</p>
            <p>Recuerda: El código puede esperar, tu salud no.</p>
            <p>💙 Descansa un poco</p>
        `;
        document.body.appendChild(message);

        // Auto enable dark mode
        if (!document.body.classList.contains('dark-mode')) {
            const darkMode = new DarkModeManager();
            darkMode.toggleTheme();
        }

        setTimeout(() => {
            message.style.opacity = '0';
            setTimeout(() => message.remove(), 500);
        }, 8000);
    }

    activateDeveloperHours() {
        const message = document.createElement('div');
        message.className = 'easter-egg-message';
        message.innerHTML = `
            <h3>👨‍💻 Son las 3 AM 👨‍💻</h3>
            <p>Las horas mágicas del desarrollador...</p>
            <p>El código fluye, los bugs huyen 🐛</p>
        `;
        document.body.appendChild(message);

        setTimeout(() => message.remove(), 5000);
    }
}

// === INITIALIZE ALL ===
document.addEventListener('DOMContentLoaded', () => {
    // Dark Mode
    window.darkModeManager = new DarkModeManager();

    // Easter Eggs
    window.konamiCode = new KonamiCodeEasterEgg();
    window.logoClick = new LogoClickEasterEgg();
    window.searchCommand = new SearchCommandEasterEgg();
    window.midnightEgg = new MidnightEasterEgg();

    console.log('%c🎮 Easter Eggs Loaded!', 'color: #10b981; font-size: 20px; font-weight: bold;');
    console.log('%cTry: Konami Code, 10 clicks on logo, search commands, or wait for midnight!', 'color: #3b82f6;');
});
