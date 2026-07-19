// App State
let state = {
    nickname: "Gamer",
    profileSetupComplete: false,
    level: 1,
    xp: 0,
    bloxcoins: 150,
    parentalPinHash: null,
    collection: {}, // cardId: quantity
    lastDailyPack: null,
    parentalGiftPending: false,
    dailyPacksOpened: 0,
    lastPackDate: null,
    parentalPacksAllowed: 0,
    lastLoginDate: null,
    loginStreak: 0
};

// Dynamic Cards Database
let CARDS_DB = [];

// Canvas Particle Engine (Dopaminergic Feedback)
const ParticleEngine = {
    canvas: null,
    ctx: null,
    particles: [],
    animationFrame: null,
    init() {
        this.canvas = document.getElementById('particles-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        // Recalculate size if window changes
        this.canvas.width = this.canvas.parentElement.clientWidth;
        this.canvas.height = this.canvas.parentElement.clientHeight;
    },
    resize() {
        if (!this.canvas) return;
        this.canvas.width = this.canvas.parentElement.clientWidth;
        this.canvas.height = this.canvas.parentElement.clientHeight;
    },
    createExplosion(x, y, count = 50, colors = ['#6366f1', '#f43f5e', '#fbbf24', '#d946ef', '#3b82f6']) {
        this.init();
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 8 + 3;
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 2, // Slight upward boost
                radius: Math.random() * 5 + 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                alpha: 1,
                decay: Math.random() * 0.02 + 0.01
            });
        }
        if (!this.animationFrame) {
            this.animate();
        }
    },
    animate() {
        if (!this.ctx || !this.canvas) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.15; // Gravity force
            p.alpha -= p.decay;
            
            if (p.alpha <= 0) {
                this.particles.splice(i, 1);
                continue;
            }
            
            this.ctx.save();
            this.ctx.globalAlpha = p.alpha;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            // Glowing sparks shadow
            this.ctx.shadowBlur = 12;
            this.ctx.shadowColor = p.color;
            this.ctx.fill();
            this.ctx.restore();
        }
        
        if (this.particles.length > 0) {
            this.animationFrame = requestAnimationFrame(() => this.animate());
        } else {
            this.animationFrame = null;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
};

// Synth Sound Engine (Web Audio API)
const AudioEngine = {
    ctx: null,
    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    },
    playTone(freq, type, duration, delay = 0) {
        this.init();
        setTimeout(() => {
            try {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = type;
                osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
                
                gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
                
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start();
                osc.stop(this.ctx.currentTime + duration);
            } catch(e) {}
        }, delay * 1000);
    },
    playClick() {
        this.playTone(600, 'sine', 0.05);
    },
    playSuccess() {
        this.playTone(523.25, 'triangle', 0.1, 0); // C5
        this.playTone(659.25, 'triangle', 0.1, 0.1); // E5
        this.playTone(783.99, 'triangle', 0.3, 0.2); // G5
    },
    playError() {
        this.playTone(150, 'sawtooth', 0.4);
    },
    playRip() {
        this.playTone(300, 'sawtooth', 0.2);
        this.playTone(200, 'sawtooth', 0.2, 0.1);
    },
    playEpicReveal() {
        this.playTone(440, 'triangle', 0.1);
        this.playTone(554, 'triangle', 0.1, 0.05);
        this.playTone(659, 'triangle', 0.1, 0.1);
        this.playTone(880, 'sine', 0.5, 0.15);
    },
    playLegendaryReveal() {
        const tones = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
        tones.forEach((t, i) => {
            this.playTone(t, 'sawtooth', 0.4 + i*0.05, i * 0.08);
        });
    }
};

// Pin Lock System Variables
let currentPinInput = "";
let parentZoneAttempts = 0;
let parentZoneLockTime = 0;

// Initialize App
window.addEventListener('DOMContentLoaded', () => {
    loadState();
    
    // Fetch DB (with cache buster to prevent rendering old cached database)
    fetch('cards_db.json?v=' + new Date().getTime())
        .then(res => res.json())
        .then(data => {
            CARDS_DB = data;
            renderLobby();
            checkDailyLoginBonus(); // Run daily login bonus check
        })
        .catch(err => {
            console.error("Error loading JSON database, using fallback", err);
        });

    switchView('lobby');
    setupPackRipGesture();
    updateUIHeader();
    checkParentalGiftAlert();
    ParticleEngine.init();
    
    if (!state.profileSetupComplete) {
        document.getElementById('profile-setup-modal').classList.remove('hidden');
    }
});

// Save Profile Setup
function saveProfileSetup() {
    const input = document.getElementById('setup-nickname');
    const name = input.value.trim();
    if (!name) {
        AudioEngine.playError();
        alert("¡Por favor, ingresa tu nombre para que el álbum sea tuyo!");
        return;
    }
    state.nickname = name;
    state.profileSetupComplete = true;
    saveState();
    AudioEngine.playSuccess();
    document.getElementById('profile-setup-modal').classList.add('hidden');
    renderLobby();
    checkDailyLoginBonus(); // Check login bonus immediately after profile creation
}

let pendingDailyBonusCoins = 0;

function checkDailyLoginBonus() {
    if (!state.profileSetupComplete) return;

    const today = new Date().toDateString();
    
    if (state.lastLoginDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();
        
        if (state.lastLoginDate === yesterdayStr) {
            state.loginStreak += 1;
        } else {
            state.loginStreak = 1;
        }
        
        // Bonus formula: 15 + streak * 5 (capped at 50 coins)
        const bonus = Math.min(50, 15 + state.loginStreak * 5);
        pendingDailyBonusCoins = bonus;
        
        document.getElementById('daily-login-text').innerText = `¡Gracias por volver a entrenar hoy! Día ${state.loginStreak} de racha.`;
        document.getElementById('daily-login-badge').innerText = `+${bonus} BloxCoins 🪙`;
        document.getElementById('daily-login-streak').innerText = `Racha actual: ${state.loginStreak} ${state.loginStreak === 1 ? 'día' : 'días'}`;
        
        document.getElementById('daily-login-modal').classList.remove('hidden');
        AudioEngine.playSuccess();
    }
}

function claimDailyLoginBonus() {
    const today = new Date().toDateString();
    state.lastLoginDate = today;
    state.bloxcoins += pendingDailyBonusCoins;
    saveState();
    
    document.getElementById('daily-login-modal').classList.add('hidden');
    AudioEngine.playClick();
    renderLobby();
}

// Load State from LocalStorage
function loadState() {
    const saved = localStorage.getItem('knowblox_state');
    if (saved) {
        try {
            state = { ...state, ...JSON.parse(saved) };
        } catch (e) {
            console.error("Error loading state", e);
        }
    }
    
    // Simulate initial pack items if state is fresh and empty
    if (Object.keys(state.collection).length === 0) {
        // Starter pack coins
        state.bloxcoins = 150;
    }
}

// Save State to LocalStorage
function saveState() {
    localStorage.setItem('knowblox_state', JSON.stringify(state));
    updateUIHeader();
}

// Switch SPA views
function switchView(viewId) {
    AudioEngine.playClick();
    
    document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    
    const activeView = document.getElementById(`view-${viewId}`);
    if (activeView) activeView.classList.remove('hidden');
    
    // Highlight Nav bar
    const navBtn = Array.from(document.querySelectorAll('.nav-item')).find(btn => 
        btn.getAttribute('onclick').includes(viewId)
    );
    if (navBtn) navBtn.classList.add('active');

    // Trigger views initializers
    if (viewId === 'album') {
        renderAlbum();
    } else if (viewId === 'fusion') {
        renderFusion();
    } else if (viewId === 'parent') {
        initParentZone();
    } else if (viewId === 'lobby') {
        renderLobby();
        checkParentalGiftAlert(); // Trigger immediate check when returning to lobby
    } else if (viewId === 'trivia') {
        initTriviaView();
    }
}

function initTriviaView() {
    document.getElementById('trivia-intro').classList.remove('hidden');
    document.getElementById('trivia-game').classList.add('hidden');
    document.getElementById('trivia-result').classList.add('hidden');
}

// Render Lobby status
function renderLobby() {
    document.getElementById('user-name').innerText = state.nickname;
    
    // Daily Status Check
    const dailyBtn = document.getElementById('btn-claim-daily');
    const dailyStatus = document.getElementById('daily-status');
    const today = new Date().toDateString();
    
    if (state.lastDailyPack === today) {
        dailyBtn.disabled = true;
        dailyBtn.classList.add('btn-locked');
        dailyBtn.classList.remove('btn-primary');
        dailyStatus.innerText = "Reclamado hoy. ¡Vuelve mañana!";
    } else {
        dailyBtn.disabled = false;
        dailyBtn.classList.remove('btn-locked');
        dailyBtn.classList.add('btn-primary');
        dailyStatus.innerText = "¡Listo para abrir!";
    }
    
    // Progress calculation
    const totalUniqueCards = CARDS_DB.length;
    const ownedUniqueCards = Object.keys(state.collection).length;
    const progressPercent = Math.min(100, Math.round((ownedUniqueCards / totalUniqueCards) * 100));
    
    document.getElementById('album-progress-bar').style.width = `${progressPercent}%`;
    document.getElementById('album-progress-text').innerText = `${ownedUniqueCards} / ${totalUniqueCards} Barajitas (${progressPercent}%)`;
    
    // Check and show daily packs opened count
    if (state.lastPackDate !== today) {
        state.dailyPacksOpened = 0;
    }
    const remainingPacks = Math.max(0, 5 - state.dailyPacksOpened);
    const shopP = document.querySelector('.shop-card p');
    if (shopP) {
        let extraText = "";
        if (state.parentalPacksAllowed > 0) {
            extraText = `<br><span style="color:#d946ef; font-size:11px; font-weight:600;"><i class="fa-solid fa-gift"></i> ¡Tienes ${state.parentalPacksAllowed} sobres extra permitidos por papá!</span>`;
        }
        shopP.innerHTML = `Contiene 3 cartas aleatorias<br><small style="color:var(--text-muted)">Sobres hoy: ${state.dailyPacksOpened}/5 (Quedan ${remainingPacks})${extraText}</small>`;
    }
}

// Update Topbar levels and coins
function updateUIHeader() {
    document.getElementById('user-level').innerText = state.level;
    document.getElementById('user-coins').innerText = state.bloxcoins;
}

// Reward Injection check
function checkParentalGiftAlert() {
    if (state.parentalGiftPending) {
        document.getElementById('reward-notification').classList.remove('hidden');
        AudioEngine.playSuccess();
    }
}

function closeRewardNotification() {
    state.parentalGiftPending = false;
    state.bloxcoins += 300;
    state.parentalPacksAllowed += 3; // Allow 3 extra packs to bypass the limit
    saveState();
    document.getElementById('reward-notification').classList.add('hidden');
    AudioEngine.playClick();
}

// ----------------------------------------------------
// PACK OPENER MECHANICS
// ----------------------------------------------------
let pendingPacks = 0;
let revealedCards = [];

function checkDailyPackLimit() {
    const today = new Date().toDateString();
    if (state.lastPackDate !== today) {
        state.lastPackDate = today;
        state.dailyPacksOpened = 0;
        saveState();
    }
    
    // Bypassed if parent gifted packs are available
    if (state.parentalPacksAllowed > 0) {
        return true;
    }
    
    return state.dailyPacksOpened < 5;
}

function claimDailyPack() {
    const today = new Date().toDateString();
    
    if (!checkDailyPackLimit()) {
        AudioEngine.playError();
        alert("¡Has alcanzado tu límite de 5 sobres diarios! Sigue recolectando bloques de conocimiento mañana.");
        return;
    }
    
    if (state.lastDailyPack === today) return;
    
    state.lastDailyPack = today;
    
    if (state.dailyPacksOpened < 5) {
        state.dailyPacksOpened += 1;
    } else if (state.parentalPacksAllowed > 0) {
        state.parentalPacksAllowed -= 1;
    }
    
    state.lastPackDate = today;
    saveState();
    triggerPackOpener();
}

function buyPack() {
    if (!checkDailyPackLimit()) {
        AudioEngine.playError();
        alert("¡Has alcanzado tu límite de 5 sobres diarios! Sigue recolectando bloques de conocimiento mañana.");
        return;
    }

    if (state.bloxcoins < 100) {
        AudioEngine.playError();
        alert("¡No tienes suficientes BloxCoins! Juega a la trivia para ganar más.");
        return;
    }
    state.bloxcoins -= 100;
    
    if (state.dailyPacksOpened < 5) {
        state.dailyPacksOpened += 1;
    } else if (state.parentalPacksAllowed > 0) {
        state.parentalPacksAllowed -= 1;
    }
    
    state.lastPackDate = new Date().toDateString();
    saveState();
    triggerPackOpener();
}

function triggerPackOpener() {
    switchView('pack-opener');
    document.getElementById('rip-pack-container').classList.remove('hidden', 'ripped');
    document.getElementById('revealed-cards-container').classList.add('hidden');
    document.getElementById('revealer-actions').classList.add('hidden');
}

// Swipe down to rip open
function setupPackRipGesture() {
    const pack = document.getElementById('foil-pack');
    let startY = 0;
    let isDragging = false;

    pack.addEventListener('mousedown', (e) => {
        startY = e.clientY;
        isDragging = true;
    });

    pack.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const diff = e.clientY - startY;
        if (diff > 120) {
            isDragging = false;
            ripPack();
        }
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // Touch support
    pack.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
        isDragging = true;
    });

    pack.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const diff = e.touches[0].clientY - startY;
        if (diff > 120) {
            isDragging = false;
            ripPack();
        }
    });

    pack.addEventListener('touchend', () => {
        isDragging = false;
    });
}

function ripPack() {
    AudioEngine.playRip();
    document.getElementById('rip-pack-container').classList.add('ripped');
    
    // Centered explosion of sparks
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const x = canvas.clientWidth / 2;
        const y = canvas.clientHeight / 2;
        ParticleEngine.createExplosion(x, y, 80);
    }
    
    // Wait for rip animation to finish
    setTimeout(() => {
        document.getElementById('rip-pack-container').classList.add('hidden');
        document.getElementById('revealed-cards-container').classList.remove('hidden');
        generatePackCards();
    }, 600);
}

// Helper to generate dynamic stylized SVG player illustrations
function getPlayerSVG(card) {
    if (card.iso === 'cup') {
        return `
        <svg class="player-svg" viewBox="0 0 100 70" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="cup-glow-${card.id}" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.4"/>
                    <stop offset="100%" stop-color="#091c13" stop-opacity="0"/>
                </radialGradient>
                <linearGradient id="gold-grad-${card.id}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#ffe082" />
                    <stop offset="50%" stop-color="#ffb300" />
                    <stop offset="100%" stop-color="#ff8f00" />
                </linearGradient>
            </defs>
            <rect width="100" height="70" fill="url(#cup-glow-${card.id})" />
            <path d="M35 15 L65 15 L60 40 C60 48, 40 48, 40 40 Z" fill="url(#gold-grad-${card.id})" />
            <path d="M35 20 C25 20, 25 35, 36 35" fill="none" stroke="url(#gold-grad-${card.id})" stroke-width="3" stroke-linecap="round" />
            <path d="M65 20 C75 20, 75 35, 64 35" fill="none" stroke="url(#gold-grad-${card.id})" stroke-width="3" stroke-linecap="round" />
            <rect x="47" y="44" width="6" height="12" fill="url(#gold-grad-${card.id})" />
            <ellipse cx="50" cy="56" rx="15" ry="3" fill="url(#gold-grad-${card.id})" />
            <rect x="38" y="58" width="24" height="5" fill="#3e2723" rx="1" />
            <text x="50" y="32" font-family="'Outfit', sans-serif" font-weight="800" font-size="8" fill="#5d4037" text-anchor="middle">${card.year || ''}</text>
        </svg>
        `;
    }

    const shirtColor = card.color || '#fff';
    let stripColor = '#fff';
    if (card.iso === 'ar') stripColor = '#75aadb';
    if (card.iso === 'br') stripColor = '#00e676';
    if (card.iso === 'es') stripColor = '#ffd700';
    if (card.iso === 'fr') stripColor = '#ffffff'; 
    if (card.iso === 'pt') stripColor = '#ffd700'; 
    if (card.iso === 'de') stripColor = '#ffffff';
    if (card.iso === 'it') stripColor = '#ffffff';
    if (card.iso === 'gb-eng') stripColor = '#d32f2f';

    return `
    <svg class="player-svg" viewBox="0 0 100 70" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="field-glow-${card.id}" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#2e7d32" stop-opacity="0.6"/>
                <stop offset="100%" stop-color="#091c13" stop-opacity="0"/>
            </radialGradient>
            <linearGradient id="shirt-grad-${card.id}" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="${shirtColor}"/>
                <stop offset="50%" stop-color="${shirtColor}"/>
                <stop offset="100%" stop-color="${shirtColor}"/>
            </linearGradient>
        </defs>
        <rect width="100" height="70" fill="url(#field-glow-${card.id})" />
        <circle cx="50" cy="80" r="40" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
        <path d="M25 70 C25 50, 75 50, 75 70 Z" fill="url(#shirt-grad-${card.id})" />
        ${card.iso === 'ar' ? `
            <rect x="42" y="52" width="6" height="18" fill="${stripColor}" />
            <rect x="52" y="52" width="6" height="18" fill="${stripColor}" />
        ` : ''}
        ${card.iso === 'br' ? `
            <path d="M45 52 L50 58 L55 52 Z" fill="${stripColor}" />
        ` : ''}
        ${card.iso === 'es' ? `
            <path d="M45 52 L50 58 L55 52 Z" fill="${stripColor}" />
            <line x1="32" y1="52" x2="32" y2="70" stroke="${stripColor}" stroke-width="2" />
            <line x1="68" y1="52" x2="68" y2="70" stroke="${stripColor}" stroke-width="2" />
        ` : ''}
        ${card.iso === 'fr' ? `
            <path d="M48 50 L52 50 L52 70 L48 70 Z" fill="#d32f2f" />
            <path d="M42 50 L46 50 L46 70 L42 70 Z" fill="#ffffff" />
        ` : ''}
        <text x="50" y="65" font-family="'Outfit', sans-serif" font-weight="800" font-size="10" fill="${card.iso === 'gb-eng' ? '#091c13' : '#fff'}" text-anchor="middle" opacity="0.9">${card.number || 10}</text>
        <rect x="45" y="42" width="10" height="10" rx="2" fill="#ffd1a9" />
        <circle cx="50" cy="34" r="10" fill="#ffd1a9" />
        <path d="M38 32 C38 22, 62 22, 62 32 C58 24, 42 24, 38 32 Z" fill="#424242" />
        <rect x="10" y="45" width="16" height="10" rx="3" fill="rgba(0,0,0,0.5)" />
        <text x="18" y="52" font-family="'Outfit', sans-serif" font-weight="800" font-size="6" fill="#fff" text-anchor="middle">${card.position || 'DEL'}</text>
    </svg>
    `;
}

// Generate 3 random cards for pack including Ultra Specials (0.5% chance)
function generatePackCards() {
    const holder = document.getElementById('cards-holder');
    holder.innerHTML = '';
    revealedCards = [];
    
    for (let i = 0; i < 3; i++) {
        const rand = Math.random() * 100;
        let selectedRarity = 'common';
        let isUltra = false;
        
        if (rand < 0.5) {
            isUltra = true;
        } else if (rand < 2.5) {
            selectedRarity = 'legendary';
        } else if (rand < 10.5) {
            selectedRarity = 'epic';
        } else if (rand < 30.5) {
            selectedRarity = 'rare';
        } else {
            selectedRarity = 'common';
        }
        
        // Filter DB
        let pool = [];
        if (isUltra) {
            pool = CARDS_DB.filter(c => c.rarity === 'legendary');
        } else {
            pool = CARDS_DB.filter(c => c.rarity === selectedRarity);
        }
        
        if (pool.length === 0) {
            pool = CARDS_DB; // fallback
        }
        
        const card = pool[Math.floor(Math.random() * pool.length)];
        revealedCards.push(card);
    }
    
    // Render cards facedown
    revealedCards.forEach((card, index) => {
        const wrap = document.createElement('div');
        wrap.className = 'card-wrapper';
        wrap.dataset.index = index;
        
        wrap.innerHTML = `
            <div class="card-inner">
                <div class="card-back">
                    <i class="fa-solid fa-futbol"></i>
                </div>
                <div class="card-front ${card.rarity} ${card.themeClass}" id="card-reveal-${index}">
                    <div class="card-front-header">
                        <span class="card-category-tag" style="background:${card.color}">${card.category}</span>
                        <span class="card-rarity-tag">${card.rarity}</span>
                    </div>
                    <div class="card-image-container">
                        ${getPlayerSVG(card)}
                        ${card.iso !== 'cup' ? `<img class="card-flag" src="https://flagcdn.com/w40/${card.iso}.png" alt="${card.category}">` : ''}
                    </div>
                    <div class="card-front-title">${card.title}</div>
                    ${card.position ? `
                    <div class="card-stats-grid">
                        <div class="stat-item">
                            <span class="stat-label">Pos</span>
                            <span class="stat-value">${card.position}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Goles</span>
                            <span class="stat-value">${card.goals}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">UCL</span>
                            <span class="stat-value">${card.champions}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Mundial</span>
                            <span class="stat-value">${card.worldCups}</span>
                        </div>
                    </div>
                    ` : `
                    <div class="card-stats-grid" style="grid-template-columns: 1fr;">
                        <div class="stat-item">
                            <span class="stat-label">Logro / Año</span>
                            <span class="stat-value" style="color:var(--accent); font-size:8px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${card.achievement} (${card.year})</span>
                        </div>
                    </div>
                    `}
                    <div class="card-front-fact">${card.fact}</div>
                </div>
            </div>
        `;
        
        wrap.addEventListener('click', () => revealSingleCard(index, wrap));
        holder.appendChild(wrap);
    });
}

let revealedCount = 0;
function revealSingleCard(index, element) {
    if (element.classList.contains('flipped')) return;
    
    const card = revealedCards[index];
    
    // Card coordinates for explosion
    const rect = element.getBoundingClientRect();
    const parentRect = document.getElementById('view-pack-opener').getBoundingClientRect();
    const x = rect.left - parentRect.left + rect.width / 2;
    const y = rect.top - parentRect.top + rect.height / 2;
    
    // Choose colors based on rarity
    let colors = ['#6366f1', '#3b82f6']; // Common
    if (card.category === 'Ultra Especiales') colors = ['#d946ef', '#f43f5e', '#fff', '#fbbf24'];
    else if (card.rarity === 'rare') colors = ['#94a3b8', '#3b82f6', '#fff'];
    else if (card.rarity === 'epic') colors = ['#ec4899', '#f43f5e', '#a855f7'];
    else if (card.rarity === 'legendary') colors = ['#fbbf24', '#f59e0b', '#fff'];
    
    const count = card.category === 'Ultra Especiales' ? 80 : (card.rarity === 'legendary' ? 50 : (card.rarity === 'epic' ? 30 : 15));
    
    // Trigger explosion particles
    ParticleEngine.createExplosion(x, y, count, colors);
    
    // Card flip shake animation
    element.classList.add('shake');
    setTimeout(() => element.classList.remove('shake'), 400);

    // Play sound depending on rarity
    if (card.category === 'Ultra Especiales') {
        AudioEngine.playLegendaryReveal();
        AudioEngine.playSuccess(); // Extra double sound for Ultra Specials
    } else if (card.rarity === 'legendary') {
        AudioEngine.playLegendaryReveal();
    } else if (card.rarity === 'epic') {
        AudioEngine.playEpicReveal();
    } else {
        AudioEngine.playTone(350, 'triangle', 0.1);
    }
    
    element.classList.add('flipped');
    
    // Add holographic mouse move listeners for Legendary/Ultra cards
    if (card.rarity === 'legendary' || card.category === 'Ultra Especiales') {
        setupHologramEffect(element.querySelector('.card-front'));
    }
    
    // Check if all revealed
    const flipped = document.querySelectorAll('.card-wrapper.flipped').length;
    if (flipped === 3) {
        document.getElementById('revealer-actions').classList.remove('hidden');
    }
}

function finishPackOpening() {
    // Add to collection
    revealedCards.forEach(card => {
        if (state.collection[card.id]) {
            state.collection[card.id] += 1;
        } else {
            state.collection[card.id] = 1;
        }
    });
    
    // Level up check (simply grant xp per pack opened)
    state.xp += 30;
    if (state.xp >= state.level * 100) {
        state.xp = state.xp - (state.level * 100);
        state.level += 1;
        AudioEngine.playSuccess();
        alert(`¡Felicidades! Subiste al nivel ${state.level}`);
    }
    
    saveState();
    switchView('lobby');
}

// ----------------------------------------------------
// HOLOGRAPHIC TILT EFFECT
// ----------------------------------------------------
function setupHologramEffect(element) {
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left; //x position within the element.
        const y = e.clientY - rect.top;  //y position within the element.
        
        const px = (x / rect.width) * 100;
        const py = (y / rect.height) * 100;
        
        // Tilt animation
        const rotX = ((y / rect.height) - 0.5) * -20;
        const rotY = ((x / rect.width) - 0.5) * 20;
        
        element.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
        element.style.setProperty('--hologram-pos', `${px}% ${py}%`);
        
        // Dynamic background style update
        element.style.backgroundImage = `
            linear-gradient(180deg, #1c1503 0%, #09090b 100%),
            radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.15) 0%, transparent 60%)
        `;
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.transform = 'rotateX(0deg) rotateY(0deg)';
        element.style.backgroundImage = `linear-gradient(180deg, #1c1503 0%, #09090b 100%)`;
    });
    
    // Mobile Gyroscope Simulator / Event
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', (e) => {
            const rotX = Math.min(10, Math.max(-10, e.beta / 3));
            const rotY = Math.min(10, Math.max(-10, e.gamma / 3));
            element.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
        }, true);
    }
}

// ----------------------------------------------------
// ALBUM SYSTEM
// ----------------------------------------------------
let activeCategory = "Todos";

function renderAlbum() {
    const tabs = document.getElementById('category-tabs');
    const content = document.getElementById('album-page-content');
    
    // Get unique categories list
    const categories = ["Todos", ...new Set(CARDS_DB.map(c => c.category))];
    
    // Render tabs
    tabs.innerHTML = categories.map(cat => `
        <button class="tab-btn ${cat === activeCategory ? 'active' : ''}" onclick="selectCategory('${cat}')">
            ${cat}
        </button>
    `).join('');
    
    // Render stickers grid
    const filteredDB = activeCategory === "Todos" ? CARDS_DB : CARDS_DB.filter(c => c.category === activeCategory);
    
    content.innerHTML = filteredDB.map(card => {
        const count = state.collection[card.id] || 0;
        const indexInDB = CARDS_DB.findIndex(c => c.id === card.id) + 1;
        
        if (count > 0) {
            // Card collected
            return `
                <div class="card-wrapper" onclick="openCardModal('${card.id}')">
                    <div class="card-front ${card.rarity} ${card.themeClass}" style="transform:none; border-style:solid;">
                        <div class="card-front-header">
                            <span class="card-category-tag" style="background:${card.color}; font-size:7px; padding:1px 4px;">${card.category}</span>
                            ${count > 1 ? `<span class="duplicate-badge" style="position:absolute; top:-5px; right:-5px; width:16px; height:16px; background:#ec4899; color:#fff; font-size:9px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:800;">${count - 1}</span>` : ''}
                        </div>
                        <div class="card-image-container" style="height: 45px; margin: 2px 0;">
                            ${getPlayerSVG(card)}
                        </div>
                        <div class="card-front-title" style="font-size:9px; margin:2px 0; font-weight:800;">${card.title}</div>
                        ${card.position ? `
                        <div class="card-stats-grid" style="padding:1px; margin-bottom:2px; font-size:6px; transform: scale(0.95);">
                            <div class="stat-item" style="font-size:6px;">
                                <span class="stat-value" style="font-size:7px;">⚽${card.goals}</span>
                            </div>
                            <div class="stat-item" style="font-size:6px;">
                                <span class="stat-value" style="font-size:7px;">🏆${card.worldCups}</span>
                            </div>
                            <div class="stat-item" style="font-size:6px;">
                                <span class="stat-value" style="font-size:7px;">🇪🇺${card.champions}</span>
                            </div>
                            <div class="stat-item" style="font-size:6px;">
                                <span class="stat-value" style="font-size:7px; font-weight:800; color:var(--primary);">${card.position}</span>
                            </div>
                        </div>
                        ` : `
                        <div class="card-stats-grid" style="padding:1px; margin-bottom:2px; font-size:6px; transform: scale(0.95); grid-template-columns: 1fr;">
                            <div class="stat-item" style="font-size:6px;">
                                <span class="stat-value" style="font-size:7px; color:var(--accent); font-weight:800;">${card.year}</span>
                            </div>
                        </div>
                        `}
                    </div>
                </div>
            `;
        } else {
            // Silhouette
            return `
                <div class="card-silhouette">
                    <span class="card-silhouette-num">#${indexInDB}</span>
                    <i class="fa-solid fa-lock"></i>
                    <div class="card-silhouette-title">${card.title}</div>
                </div>
            `;
        }
    }).join('');
}

function selectCategory(cat) {
    activeCategory = cat;
    renderAlbum();
}

function openCardModal(cardId) {
    const card = CARDS_DB.find(c => c.id === cardId);
    if (!card) return;
    
    const placeholder = document.getElementById('modal-card-placeholder');
    placeholder.innerHTML = `
        <div class="detailed-card card-front ${card.rarity} ${card.themeClass}">
            <div class="card-front-header">
                <span class="card-category-tag" style="background:${card.color}">${card.category}</span>
                <span class="card-rarity-tag">${card.rarity}</span>
            </div>
            <div class="card-image-container" style="height: 120px;">
                ${getPlayerSVG(card)}
                ${card.iso !== 'cup' ? `<img class="card-flag" src="https://flagcdn.com/w40/${card.iso}.png" alt="${card.category}" style="width:24px; height:18px;">` : ''}
            </div>
            <div class="card-front-title" style="font-size:16px; margin:8px 0;">${card.title}</div>
            ${card.position ? `
            <div class="card-stats-grid" style="padding:6px; margin-bottom:8px;">
                <div class="stat-item">
                    <span class="stat-label">Posición</span>
                    <span class="stat-value" style="font-size:11px;">${card.position}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Goles</span>
                    <span class="stat-value" style="font-size:11px;">${card.goals}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Champions</span>
                    <span class="stat-value" style="font-size:11px;">${card.champions}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Mundiales</span>
                    <span class="stat-value" style="font-size:11px;">${card.worldCups}</span>
                </div>
            </div>
            ` : `
            <div class="card-stats-grid" style="padding:6px; margin-bottom:8px; grid-template-columns: 1fr;">
                <div class="stat-item">
                    <span class="stat-label">Hito / Logro histórico</span>
                    <span class="stat-value" style="font-size:12px; color:var(--accent); font-weight:800;">${card.achievement} (${card.year})</span>
                </div>
            </div>
            `}
            <div class="card-front-fact" style="font-size:10px; height:auto; max-height: 60px;">${card.fact}</div>
        </div>
    `;
    
    // Add hologram to detailed card if legendary
    if (card.rarity === 'legendary') {
        setupHologramEffect(placeholder.querySelector('.detailed-card'));
    }
    
    document.getElementById('card-modal').classList.remove('hidden');
    AudioEngine.playClick();
}

function closeCardModal() {
    document.getElementById('card-modal').classList.add('hidden');
    AudioEngine.playClick();
}

// ----------------------------------------------------
// FUSION MACHINE (Recycling duplicates)
// ----------------------------------------------------
let selectedFusionCards = [];

function renderFusion() {
    selectedFusionCards = [];
    updateFusionSlots();
    
    // Find all cards with duplicates (quantity > 1)
    const duplicatesGrid = document.getElementById('duplicates-grid');
    duplicatesGrid.innerHTML = '';
    
    let hasDuplicates = false;
    
    CARDS_DB.forEach(card => {
        const count = state.collection[card.id] || 0;
        const duplicateCount = count - 1;
        
        if (duplicateCount > 0) {
            hasDuplicates = true;
            const item = document.createElement('div');
            item.className = 'duplicate-item';
            item.innerHTML = `
                <div class="duplicate-badge">${duplicateCount}</div>
                <div style="font-weight:600; font-size:12px; margin-bottom:4px; text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">${card.title}</div>
                <div style="font-size:10px; color:${card.color}; font-weight:800;">${card.category}</div>
            `;
            item.addEventListener('click', () => addCardToFusion(card.id));
            duplicatesGrid.appendChild(item);
        }
    });
    
    if (!hasDuplicates) {
        duplicatesGrid.innerHTML = `<p style="grid-column: span 3; text-align:center; color:var(--text-muted); font-size:13px; padding:20px;">¡No tienes cartas repetidas para fusionar! Abre más sobres.</p>`;
    }
}

function addCardToFusion(cardId) {
    if (selectedFusionCards.length >= 5) {
        alert("Ya has seleccionado las 5 cartas necesarias.");
        return;
    }
    
    // Check if enough duplicates are actually available (factoring in what's already selected)
    const card = CARDS_DB.find(c => c.id === cardId);
    const totalCount = state.collection[cardId] || 0;
    const selectedCount = selectedFusionCards.filter(id => id === cardId).length;
    const availableDuplicates = totalCount - 1 - selectedCount;
    
    if (availableDuplicates <= 0) {
        alert("No tienes más repetidas disponibles de esta carta.");
        return;
    }
    
    selectedFusionCards.push(cardId);
    AudioEngine.playClick();
    updateFusionSlots();
    renderFusion(); // refresh grid numbers
}

function removeCardFromFusion(index) {
    selectedFusionCards.splice(index, 1);
    AudioEngine.playClick();
    updateFusionSlots();
    renderFusion(); // refresh grid numbers
}

function updateFusionSlots() {
    const slots = document.getElementById('fusion-slots').children;
    for (let i = 0; i < 5; i++) {
        const slot = slots[i];
        if (i < selectedFusionCards.length) {
            const cardId = selectedFusionCards[i];
            const card = CARDS_DB.find(c => c.id === cardId);
            slot.className = "slot filled";
            slot.innerHTML = `
                <div class="card-mini" style="border-left: 3px solid ${card.color}">
                    <span>${card.title.substring(0, 10)}...</span>
                </div>
            `;
            // Allow removal
            slot.onclick = () => removeCardFromFusion(i);
        } else {
            slot.className = "slot empty";
            slot.innerHTML = '<i class="fa-solid fa-plus" style="opacity: 0.1"></i>';
            slot.onclick = null;
        }
    }
    
    // Enable/disable fuse action
    const btn = document.getElementById('btn-fuse');
    if (selectedFusionCards.length === 5) {
        btn.disabled = false;
        btn.className = "btn btn-primary";
    } else {
        btn.disabled = true;
        btn.className = "btn btn-locked";
    }
}

function executeFusion() {
    if (selectedFusionCards.length !== 5) return;
    
    // Deduct duplicates from state
    selectedFusionCards.forEach(id => {
        if (state.collection[id] > 1) {
            state.collection[id] -= 1;
        }
    });
    
    AudioEngine.playTone(300, 'sawtooth', 0.5);
    AudioEngine.playTone(400, 'sawtooth', 0.5, 0.25);
    
    const core = document.getElementById('reactor-core');
    core.style.transform = "scale(1.3)";
    core.style.boxShadow = "0 0 40px var(--accent)";
    
    setTimeout(() => {
        core.style.transform = "scale(1)";
        core.style.boxShadow = "none";
        
        // Grant a free clean pack
        triggerPackOpener();
        saveState();
    }, 1200);
}

// ----------------------------------------------------
// TRIVIA SYSTEM
// ----------------------------------------------------
let triviaQuestions = [];
let currentQuestionIndex = 0;
let triviaCoinsReward = 0;
let triviaTimerInterval = null;
let triviaTimeLeft = 20;

function startTrivia() {
    AudioEngine.playClick();
    
    // Generate questions based on owned cards if possible, otherwise any card
    const ownedIds = Object.keys(state.collection);
    let pool = CARDS_DB;
    
    // Build 3 questions
    triviaQuestions = [];
    for (let i = 0; i < 3; i++) {
        // Pick a card target
        let targetCard;
        if (ownedIds.length >= 3 && Math.random() > 0.3) {
            const randomOwnedId = ownedIds[Math.floor(Math.random() * ownedIds.length)];
            targetCard = CARDS_DB.find(c => c.id === randomOwnedId);
        } else {
            targetCard = CARDS_DB[Math.floor(Math.random() * CARDS_DB.length)];
        }
        
        // Create question & options
        const questionText = `¿Qué dato curioso corresponde a la carta: "${targetCard.title}"?`;
        
        // Select distractors
        const distractors = CARDS_DB.filter(c => c.id !== targetCard.id);
        const optionsList = [targetCard.fact];
        
        // Get 2 unique distractors
        while (optionsList.length < 3) {
            const d = distractors[Math.floor(Math.random() * distractors.length)].fact;
            if (!optionsList.includes(d)) optionsList.push(d);
        }
        
        // Shuffle options
        optionsList.sort(() => Math.random() - 0.5);
        
        triviaQuestions.push({
            question: questionText,
            options: optionsList,
            answer: targetCard.fact
        });
    }
    
    currentQuestionIndex = 0;
    triviaCoinsReward = 0;
    
    document.getElementById('trivia-intro').classList.add('hidden');
    document.getElementById('trivia-result').classList.add('hidden');
    document.getElementById('trivia-game').classList.remove('hidden');
    
    showTriviaQuestion();
}

function showTriviaQuestion() {
    if (currentQuestionIndex >= triviaQuestions.length) {
        finishTrivia();
        return;
    }
    
    const qData = triviaQuestions[currentQuestionIndex];
    document.getElementById('trivia-question-number').innerText = `Pregunta ${currentQuestionIndex + 1}/3`;
    document.getElementById('trivia-question').innerText = qData.question;
    
    const optionsContainer = document.getElementById('trivia-options');
    optionsContainer.innerHTML = '';
    
    qData.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = "option-btn";
        btn.innerText = opt;
        btn.onclick = () => selectTriviaOption(btn, opt === qData.answer);
        optionsContainer.appendChild(btn);
    });
    
    // Timer Reset
    clearInterval(triviaTimerInterval);
    triviaTimeLeft = 20;
    document.getElementById('trivia-timer').innerHTML = `<i class="fa-regular fa-clock"></i> ${triviaTimeLeft}s`;
    
    triviaTimerInterval = setInterval(() => {
        triviaTimeLeft--;
        document.getElementById('trivia-timer').innerHTML = `<i class="fa-regular fa-clock"></i> ${triviaTimeLeft}s`;
        if (triviaTimeLeft <= 0) {
            clearInterval(triviaTimerInterval);
            // Treat as wrong
            handleNextQuestion(false);
        }
    }, 1000);
}

function selectTriviaOption(btnElement, isCorrect) {
    clearInterval(triviaTimerInterval);
    // Disable all options
    document.querySelectorAll('.option-btn').forEach(btn => btn.onclick = null);
    
    if (isCorrect) {
        btnElement.classList.add('correct');
        AudioEngine.playSuccess();
        triviaCoinsReward += 40; // 40 coins per correct answer
    } else {
        btnElement.classList.add('wrong');
        AudioEngine.playError();
        // Highlight correct one
        document.querySelectorAll('.option-btn').forEach(btn => {
            const currentQ = triviaQuestions[currentQuestionIndex];
            if (btn.innerText === currentQ.answer) {
                btn.classList.add('correct');
            }
        });
    }
    
    setTimeout(() => {
        handleNextQuestion(isCorrect);
    }, 2000);
}

function handleNextQuestion(wasCorrect) {
    currentQuestionIndex++;
    showTriviaQuestion();
}

function finishTrivia() {
    clearInterval(triviaTimerInterval);
    document.getElementById('trivia-game').classList.add('hidden');
    document.getElementById('trivia-result').classList.remove('hidden');
    
    state.bloxcoins += triviaCoinsReward;
    saveState();
    
    const title = document.getElementById('trivia-result-title');
    const msg = document.getElementById('trivia-result-msg');
    const badge = document.getElementById('coins-won-badge');
    
    if (triviaCoinsReward > 0) {
        title.innerText = "¡Increíble!";
        msg.innerText = "Has aprendido mucho y tus BloxCoins han aumentado.";
        badge.innerText = `+${triviaCoinsReward} BloxCoins 🪙`;
        badge.style.display = 'block';
    } else {
        title.innerText = "¡Sigue intentándolo!";
        msg.innerText = "Revisa los datos de tus cartas coleccionadas y vuelve a jugar.";
        badge.style.display = 'none';
    }
}

// ----------------------------------------------------
// PARENT ZONE (PIN protected dashboard)
// ----------------------------------------------------
let parentalPinDigits = [];

function initParentZone() {
    parentalPinDigits = [];
    updatePinDots();
    
    if (!state.parentalPinHash) {
        // No PIN configured yet, ask to set one up
        document.getElementById('pin-prompt-text').innerText = "Configura tu nuevo código PIN de 4 dígitos.";
    } else {
        document.getElementById('pin-prompt-text').innerText = "Ingresa tu código PIN para entrar.";
    }
    
    document.getElementById('parent-pin-lock').classList.remove('hidden');
    document.getElementById('parent-panel').classList.add('hidden');
}

function pressPinKey(num) {
    if (parentalPinDigits.length >= 4) return;
    parentalPinDigits.push(num);
    AudioEngine.playClick();
    updatePinDots();
    
    // Auto-submit on 4th digit
    if (parentalPinDigits.length === 4) {
        setTimeout(submitPin, 200);
    }
}

function clearPinKey() {
    parentalPinDigits.pop();
    AudioEngine.playClick();
    updatePinDots();
}

function updatePinDots() {
    const dots = document.getElementById('pin-dots').children;
    for (let i = 0; i < 4; i++) {
        if (i < parentalPinDigits.length) {
            dots[i].classList.add('active');
        } else {
            dots[i].classList.remove('active');
        }
    }
}

function submitPin() {
    if (parentalPinDigits.length !== 4) return;
    
    const pinStr = parentalPinDigits.join('');
    
    // Simple SHA256 simulation using simple bit hashing (enough for frontend prototype)
    const hash = simpleHash(pinStr);
    
    if (!state.parentalPinHash) {
        // Set PIN
        state.parentalPinHash = hash;
        saveState();
        AudioEngine.playSuccess();
        alert("¡PIN configurado correctamente!");
        showParentPanel();
    } else if (state.parentalPinHash === hash) {
        // Valid PIN
        AudioEngine.playSuccess();
        showParentPanel();
    } else {
        // Invalid PIN
        AudioEngine.playError();
        parentalPinDigits = [];
        updatePinDots();
        
        // Shake screen
        const lockScr = document.getElementById('parent-pin-lock');
        lockScr.classList.add('shake');
        setTimeout(() => lockScr.classList.remove('shake'), 400);
        
        alert("Código PIN Incorrecto.");
    }
}

function showParentPanel() {
    document.getElementById('parent-pin-lock').classList.add('hidden');
    document.getElementById('parent-panel').classList.remove('hidden');
}

function lockParentZone() {
    switchView('lobby');
}

function injectParentReward() {
    state.parentalGiftPending = true;
    saveState();
    AudioEngine.playSuccess();
    alert("¡Premio configurado! Al regresar a la pantalla principal se activará la recompensa.");
    switchView('lobby');
}

function changeParentPin() {
    const newPin = document.getElementById('new-parent-pin').value;
    if (newPin.length !== 4 || isNaN(newPin)) {
        AudioEngine.playError();
        alert("El PIN debe tener exactamente 4 números.");
        return;
    }
    
    state.parentalPinHash = simpleHash(newPin);
    saveState();
    AudioEngine.playSuccess();
    alert("PIN actualizado con éxito.");
    document.getElementById('new-parent-pin').value = "";
}

// Quick hash function
function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
    }
    return hash.toString(16);
}
