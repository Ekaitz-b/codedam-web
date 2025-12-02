/* ================================
   ASTRO BOT 2.0 - Premium Edition
   Modern, Smooth & Detailed
   ================================ */

class AstroBot {
    constructor() {
        // Position & Movement
        this.x = Math.random() * (window.innerWidth - 120);
        this.y = Math.random() * (window.innerHeight - 140);
        this.targetX = this.x;
        this.targetY = this.y;
        this.vx = 0;
        this.vy = 0;
        this.speed = 0.15;
        this.friction = 0.95;
        
        // Bot state
        this.mode = localStorage.getItem('astro-mode') || 'friendly';
        this.isHovered = false;
        this.isDragging = false;
        this.dragOffsetX = 0;
        this.dragOffsetY = 0;
        
        // Poop system
        this.lastPoop = Date.now();
        this.poopInterval = this.getRandomPoopInterval();
        
        // Animation
        this.animationFrame = null;
        this.hoverOffset = 0;
        this.eyeBlinkTimer = 0;
        this.isBlinking = false;
        
        this.init();
    }
    
    /* === INITIALIZATION === */
    init() {
        this.injectStyles();
        this.createBotElement();
        this.startMovement();
        this.startPoopCycle();
        this.setupEventHandlers();
    }
    
    injectStyles() {
        if (document.getElementById('astro-bot-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'astro-bot-styles';
        styles.textContent = `
            .astro-bot-container {
                position: fixed;
                z-index: 9999;
                cursor: grab;
                user-select: none;
                filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
                transition: filter 0.3s ease;
            }
            
            .astro-bot-container:hover {
                filter: drop-shadow(0 8px 20px rgba(59, 130, 246, 0.3));
            }
            
            .astro-bot-container.dragging {
                cursor: grabbing;
                filter: drop-shadow(0 12px 30px rgba(59, 130, 246, 0.4));
            }
            
            .astro-bot-svg {
                width: 100px;
                height: 120px;
                display: block;
            }
            
            .bot-body {
                transition: all 0.3s ease;
            }
            
            .astro-bot-container:hover .bot-body {
                filter: brightness(1.1);
            }
            
            .eye {
                transition: all 0.15s ease;
            }
            
            .eye.blink {
                transform: scaleY(0.1);
            }
            
            .antenna-light {
                animation: antennaPulse 2s ease-in-out infinite;
            }
            
            @keyframes antennaPulse {
                0%, 100% { opacity: 1; filter: brightness(1); }
                50% { opacity: 0.4; filter: brightness(1.5); }
            }
            
            .hover-particle {
                opacity: 0.6;
            }
            
            .astro-bot-container:hover .hover-particle {
                opacity: 1;
            }
            
            /* Speech Bubble */
            .speech-bubble {
                position: absolute;
                bottom: 125px;
                left: 50%;
                transform: translateX(-50%) scale(0);
                background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
                border: 2px solid #3b82f6;
                border-radius: 16px;
                padding: 12px 18px;
                min-width: 160px;
                max-width: 220px;
                text-align: center;
                font-size: 0.9rem;
                font-weight: 500;
                color: #0f172a;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
                z-index: 10000;
                pointer-events: none;
                opacity: 0;
                transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            
            .speech-bubble.show {
                opacity: 1;
                transform: translateX(-50%) scale(1);
            }
            
            .speech-bubble::after {
                content: '';
                position: absolute;
                bottom: -10px;
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                height: 0;
                border-left: 10px solid transparent;
                border-right: 10px solid transparent;
                border-top: 10px solid #3b82f6;
            }
            
            /* Binary Poop */
            .binary-poop {
                position: fixed;
                font-family: 'JetBrains Mono', 'Courier New', monospace;
                font-size: 16px;
                font-weight: bold;
                z-index: 9998;
                pointer-events: none;
                text-shadow: 0 0 8px currentColor;
                animation: poopDrop 2s ease-out forwards;
            }
            
            @keyframes poopDrop {
                0% {
                    transform: translateY(0) scale(0.5);
                    opacity: 0;
                }
                20% {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
                100% {
                    transform: translateY(50px) scale(1);
                    opacity: 1;
                }
            }
            
            /* Mode Toggle Button */
            .mode-toggle-btn {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 56px;
                height: 56px;
                border-radius: 50%;
                background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
                transition: all 0.3s ease;
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .mode-toggle-btn:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 20px rgba(59, 130, 246, 0.5);
            }
            
            .mode-toggle-btn:active {
                transform: scale(0.95);
            }
            
            .mode-toggle-btn.sergeant-mode {
                background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
                box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
            }
            
            .mode-toggle-btn.sergeant-mode:hover {
                box-shadow: 0 6px 20px rgba(239, 68, 68, 0.5);
            }
            
            /* Responsive */
            @media (max-width: 768px) {
                .astro-bot-svg {
                    width: 80px;
                    height: 96px;
                }
                
                .speech-bubble {
                    font-size: 0.8rem;
                    min-width: 140px;
                    max-width: 180px;
                    bottom: 100px;
                }
                
                .mode-toggle-btn {
                    width: 48px;
                    height: 48px;
                    font-size: 1.2rem;
                    bottom: 15px;
                    right: 15px;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    /* === CREATE BOT === */
    createBotElement() {
        const container = document.createElement('div');
        container.className = 'astro-bot-container';
        container.style.left = this.x + 'px';
        container.style.top = this.y + 'px';
        
        container.innerHTML = `
            <svg class="astro-bot-svg" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <!-- Gradients -->
                    <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#60a5fa;stop-opacity:1" />
                    </linearGradient>
                    
                    <linearGradient id="darkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#1e293b;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#334155;stop-opacity:1" />
                    </linearGradient>
                    
                    <radialGradient id="glowGradient">
                        <stop offset="0%" style="stop-color:#06b6d4;stop-opacity:0.8" />
                        <stop offset="100%" style="stop-color:#06b6d4;stop-opacity:0" />
                    </radialGradient>
                    
                    <!-- Filters -->
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                    
                    <filter id="shadow">
                        <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.3"/>
                    </filter>
                </defs>
                
                <!-- Main Body -->
                <g class="bot-main-body">
                    <!-- Body shape -->
                    <ellipse class="bot-body" cx="50" cy="70" rx="32" ry="42" 
                             fill="url(#bodyGradient)" filter="url(#shadow)"/>
                    
                    <!-- Body shine -->
                    <ellipse cx="50" cy="65" rx="28" ry="35" 
                             fill="url(#glowGradient)" opacity="0.3"/>
                    
                    <!-- Tech panel lines -->
                    <line x1="22" y1="55" x2="78" y2="55" 
                          stroke="#e0e7ff" stroke-width="2" opacity="0.6"/>
                    <line x1="22" y1="65" x2="78" y2="65" 
                          stroke="#e0e7ff" stroke-width="2" opacity="0.6"/>
                    <line x1="22" y1="75" x2="78" y2="75" 
                          stroke="#e0e7ff" stroke-width="2" opacity="0.6"/>
                    <line x1="22" y1="85" x2="78" y2="85" 
                          stroke="#e0e7ff" stroke-width="2" opacity="0.6"/>
                    
                    <!-- Chest panel -->
                    <rect x="40" y="75" width="20" height="15" rx="3" 
                          fill="url(#darkGradient)" opacity="0.6"/>
                    <circle cx="50" cy="82.5" r="3" fill="#06b6d4" opacity="0.8">
                        <animate attributeName="opacity" 
                                 values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite"/>
                    </circle>
                </g>
                
                <!-- Head -->
                <g class="bot-head">
                    <!-- Head container -->
                    <ellipse cx="50" cy="35" rx="28" ry="25" 
                             fill="url(#bodyGradient)" filter="url(#shadow)"/>
                    
                    <!-- Head shine -->
                    <ellipse cx="50" cy="32" rx="24" ry="20" 
                             fill="url(#glowGradient)" opacity="0.3"/>
                    
                    <!-- Face panel -->
                    <rect x="30" y="28" width="40" height="22" rx="5" 
                          fill="url(#darkGradient)"/>
                    
                    <!-- Eyes -->
                    <g class="bot-eyes">
                        <circle class="eye eye-left" cx="40" cy="38" r="5" 
                                fill="#06b6d4" filter="url(#glow)"/>
                        <circle cx="40" cy="36" r="2" fill="#ffffff" opacity="0.8"/>
                        
                        <circle class="eye eye-right" cx="60" cy="38" r="5" 
                                fill="#06b6d4" filter="url(#glow)"/>
                        <circle cx="60" cy="36" r="2" fill="#ffffff" opacity="0.8"/>
                    </g>
                    
                    <!-- Mouth indicator -->
                    <rect x="45" y="45" width="10" height="2" rx="1" 
                          fill="#06b6d4" opacity="0.5"/>
                </g>
                
                <!-- Antenna -->
                <g class="bot-antenna">
                    <line x1="50" y1="10" x2="50" y2="20" 
                          stroke="#60a5fa" stroke-width="2.5" stroke-linecap="round"/>
                    
                    <!-- Antenna base -->
                    <circle cx="50" cy="20" r="3" fill="#60a5fa"/>
                    
                    <!-- Antenna light -->
                    <circle class="antenna-light" cx="50" cy="8" r="4" fill="#06b6d4" 
                            filter="url(#glow)"/>
                    <circle cx="50" cy="8" r="2" fill="#ffffff" opacity="0.9"/>
                </g>
                
                <!-- Hover particles -->
                <g class="hover-particles">
                    <circle class="hover-particle" cx="30" cy="110" r="2.5" 
                            fill="#06b6d4" opacity="0.6">
                        <animate attributeName="cy" values="110;115;110" 
                                 dur="1.5s" repeatCount="indefinite"/>
                    </circle>
                    <circle class="hover-particle" cx="45" cy="113" r="2" 
                            fill="#06b6d4" opacity="0.5">
                        <animate attributeName="cy" values="113;118;113" 
                                 dur="1.8s" repeatCount="indefinite"/>
                    </circle>
                    <circle class="hover-particle" cx="55" cy="113" r="2" 
                            fill="#06b6d4" opacity="0.5">
                        <animate attributeName="cy" values="113;118;113" 
                                 dur="1.6s" repeatCount="indefinite"/>
                    </circle>
                    <circle class="hover-particle" cx="70" cy="110" r="2.5" 
                            fill="#06b6d4" opacity="0.6">
                        <animate attributeName="cy" values="110;115;110" 
                                 dur="1.7s" repeatCount="indefinite"/>
                    </circle>
                </g>
            </svg>
            
            <div class="speech-bubble"></div>
        `;
        
        document.body.appendChild(container);
        this.element = container;
        this.svgElement = container.querySelector('.astro-bot-svg');
        this.bubble = container.querySelector('.speech-bubble');
        
        // Create mode toggle button
        this.createModeToggle();
        
        // Update colors based on mode
        this.updateModeColors();
    }
    
    createModeToggle() {
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'mode-toggle-btn';
        toggleBtn.innerHTML = this.mode === 'friendly' ? '😊' : '😤';
        toggleBtn.title = 'Cambiar modo del bot';
        
        toggleBtn.addEventListener('click', () => {
            this.mode = this.mode === 'friendly' ? 'sergeant' : 'friendly';
            localStorage.setItem('astro-mode', this.mode);
            toggleBtn.innerHTML = this.mode === 'friendly' ? '😊' : '😤';
            toggleBtn.className = `mode-toggle-btn ${this.mode === 'sergeant' ? 'sergeant-mode' : ''}`;
            this.updateModeColors();
            this.showMessage(this.mode === 'friendly' ? 
                '¡Modo amigable activado! 😊' : 
                '¡Modo sargento activado! 😤');
        });
        
        document.body.appendChild(toggleBtn);
    }
    
    updateModeColors() {
        const bodyGradient = this.svgElement.querySelector('#bodyGradient');
        const eyes = this.svgElement.querySelectorAll('.eye');
        const antennaLight = this.svgElement.querySelector('.antenna-light');
        const particles = this.svgElement.querySelectorAll('.hover-particle');
        
        if (this.mode === 'sergeant') {
            // Sergeant mode: Red/dark colors
            bodyGradient.querySelector('stop:first-child').setAttribute('style', 'stop-color:#1e293b;stop-opacity:1');
            bodyGradient.querySelector('stop:last-child').setAttribute('style', 'stop-color:#334155;stop-opacity:1');
            eyes.forEach(eye => eye.setAttribute('fill', '#ef4444'));
            antennaLight.setAttribute('fill', '#ef4444');
            particles.forEach(p => p.setAttribute('fill', '#ef4444'));
        } else {
            // Friendly mode: Blue colors
            bodyGradient.querySelector('stop:first-child').setAttribute('style', 'stop-color:#3b82f6;stop-opacity:1');
            bodyGradient.querySelector('stop:last-child').setAttribute('style', 'stop-color:#60a5fa;stop-opacity:1');
            eyes.forEach(eye => eye.setAttribute('fill', '#06b6d4'));
            antennaLight.setAttribute('fill', '#06b6d4');
            particles.forEach(p => p.setAttribute('fill', '#06b6d4'));
        }
    }
    
    /* === MOVEMENT SYSTEM === */
    startMovement() {
        const move = () => {
            if (this.isDragging) {
                this.animationFrame = requestAnimationFrame(move);
                return;
            }
            
            // Smooth target following
            const dx = this.targetX - this.x;
            const dy = this.targetY - this.y;
            
            this.vx += dx * 0.02;
            this.vy += dy * 0.02;
            
            // Apply friction
            this.vx *= this.friction;
            this.vy *= this.friction;
            
            // Update position
            this.x += this.vx;
            this.y += this.vy;
            
            // Boundaries
            this.x = Math.max(0, Math.min(this.x, window.innerWidth - 120));
            this.y = Math.max(0, Math.min(this.y, window.innerHeight - 140));
            
            // Update DOM
            this.element.style.left = this.x + 'px';
            this.element.style.top = this.y + 'px';
            
            // Blink animation
            this.handleBlinking();
            
            this.animationFrame = requestAnimationFrame(move);
        };
        
        move();
        
        // Set new random target every 3-5 seconds
        setInterval(() => {
            if (!this.isDragging && !this.isHovered) {
                this.setRandomTarget();
            }
        }, 3000 + Math.random() * 2000);
    }
    
    setRandomTarget() {
        this.targetX = Math.random() * (window.innerWidth - 120);
        this.targetY = Math.random() * (window.innerHeight - 140);
    }
    
    handleBlinking() {
        this.eyeBlinkTimer++;
        
        if (!this.isBlinking && this.eyeBlinkTimer > 180) { // Every ~3 seconds
            if (Math.random() < 0.3) {
                this.blink();
            }
            this.eyeBlinkTimer = 0;
        }
    }
    
    blink() {
        this.isBlinking = true;
        const eyes = this.svgElement.querySelectorAll('.eye');
        eyes.forEach(eye => eye.classList.add('blink'));
        
        setTimeout(() => {
            eyes.forEach(eye => eye.classList.remove('blink'));
            this.isBlinking = false;
        }, 150);
    }
    
    /* === EVENT HANDLERS === */
    setupEventHandlers() {
        // Click to show message
        this.element.addEventListener('click', (e) => {
            if (!this.isDragging) {
                this.showMessage(this.getRandomMessage());
            }
        });
        
        // Drag & Drop
        this.element.addEventListener('mousedown', (e) => this.startDrag(e));
        document.addEventListener('mousemove', (e) => this.drag(e));
        document.addEventListener('mouseup', () => this.endDrag());
        
        // Touch support
        this.element.addEventListener('touchstart', (e) => this.startDrag(e.touches[0]));
        document.addEventListener('touchmove', (e) => this.drag(e.touches[0]));
        document.addEventListener('touchend', () => this.endDrag());
        
        // Hover
        this.element.addEventListener('mouseenter', () => {
            this.isHovered = true;
        });
        
        this.element.addEventListener('mouseleave', () => {
            this.isHovered = false;
        });
        
        // Window resize
        window.addEventListener('resize', () => {
            this.x = Math.max(0, Math.min(this.x, window.innerWidth - 120));
            this.y = Math.max(0, Math.min(this.y, window.innerHeight - 140));
        });
    }
    
    startDrag(e) {
        this.isDragging = true;
        this.element.classList.add('dragging');
        this.dragOffsetX = e.clientX - this.x;
        this.dragOffsetY = e.clientY - this.y;
    }
    
    drag(e) {
        if (!this.isDragging) return;
        
        this.x = e.clientX - this.dragOffsetX;
        this.y = e.clientY - this.dragOffsetY;
        
        this.x = Math.max(0, Math.min(this.x, window.innerWidth - 120));
        this.y = Math.max(0, Math.min(this.y, window.innerHeight - 140));
        
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    }
    
    endDrag() {
        if (this.isDragging) {
            this.isDragging = false;
            this.element.classList.remove('dragging');
            this.targetX = this.x;
            this.targetY = this.y;
            this.vx = 0;
            this.vy = 0;
        }
    }
    
    /* === MESSAGES === */
    getRandomMessage() {
        const messages = {
            friendly: [
                "¡Hola! ¿Cómo va el estudio? 😊",
                "¡Ánimo! Lo estás haciendo genial 💪",
                "Recuerda hacer pausas ☕",
                "¡Sigue así! Cada línea de código cuenta 🚀",
                "¿Necesitas ayuda? Estoy aquí 🤗",
                "¡Gran trabajo! Vas por buen camino 🌟",
                "Pequeños pasos, grandes logros 🎯",
                "¡Tú puedes! El código es tu amigo 💙"
            ],
            sergeant: [
                "¡TÚ! ¡A PROGRAMAR AHORA! 💻",
                "¿Procrastinando? ¡INACEPTABLE! 😤",
                "¡CÉNTRATE O FORMATEO TU DISCO! 💾",
                "Los bugs no se arreglan solos... 🐛",
                "¡CÓDIGO LIMPIO O NADA! 🛠️",
                "Tu deadline no va a esperarte ⏰",
                "¡Instagram NO! ¡IDE SÍ! 👨‍💻",
                "¿Errores en consola? ¡SOLUCIÓNALOS YA! ⚠️"
            ]
        };
        
        const modeMessages = messages[this.mode];
        return modeMessages[Math.floor(Math.random() * modeMessages.length)];
    }
    
    showMessage(text) {
        this.bubble.textContent = text;
        this.bubble.classList.add('show');
        
        setTimeout(() => {
            this.bubble.classList.remove('show');
        }, 3000);
    }
    
    /* === POOP SYSTEM === */
    getRandomPoopInterval() {
        return 10000 + Math.random() * 15000; // 10-25 seconds
    }
    
    startPoopCycle() {
        setInterval(() => {
            const timeSinceLastPoop = Date.now() - this.lastPoop;
            
            if (timeSinceLastPoop >= this.poopInterval) {
                this.doPoop();
                this.lastPoop = Date.now();
                this.poopInterval = this.getRandomPoopInterval();
            }
        }, 1000);
    }
    
    doPoop() {
        const poop = document.createElement('div');
        poop.className = 'binary-poop';
        
        // Generate binary code
        const length = 4 + Math.floor(Math.random() * 4); // 4-7 digits
        let binary = '';
        for (let i = 0; i < length; i++) {
            binary += Math.random() < 0.5 ? '0' : '1';
        }
        
        poop.textContent = binary;
        poop.style.left = (this.x + 50) + 'px';
        poop.style.top = (this.y + 100) + 'px';
        poop.style.color = this.mode === 'friendly' ? '#10b981' : '#ef4444';
        
        document.body.appendChild(poop);
        
        // Fade out and remove
        setTimeout(() => {
            poop.style.transition = 'opacity 1s ease';
            poop.style.opacity = '0';
            setTimeout(() => poop.remove(), 1000);
        }, 6000);
    }
}

/* === INITIALIZE === */
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.astroBot = new AstroBot();
    }, 500);
});
