// --- Particle Background Animation ---
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const mouse = { x: null, y: null, radius: 150 };

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
    }
    update() {
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if (distance < mouse.radius) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) this.x += 5;
            if (mouse.x > this.x && this.x > this.size * 10) this.x -= 5;
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) this.y += 5;
            if (mouse.y > this.y && this.y > this.size * 10) this.y -= 5;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 3) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 2) - 1;
        let directionY = (Math.random() * 2) - 1;
        particlesArray.push(new Particle(x, y, directionX, directionY, size, '#ffffff'));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
}

window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});

init();
animate();

// --- Background Music Controls ---
const audio = document.getElementById('bgAudio');
const musicIcon = document.getElementById('music-icon');
const statusText = document.getElementById('music-status-text');

// මුල්ම ක්ලික් එකේදී music play කිරීම (Browser auto-play block කිරීම වැළැක්වීමට)
document.addEventListener('click', function() {
    if (audio && audio.paused) {
        audio.play().catch(e => console.log("Audio play deferred"));
    }
}, { once: true });

function toggleMusic() {
    if (!audio) return;
    if (audio.muted) {
        audio.muted = false;
        updateMusicUI(false);
    } else {
        audio.muted = true;
        updateMusicUI(true);
    }
}

function updateMusicUI(isMuted) {
    if (isMuted) {
        musicIcon.innerHTML = '🔇';
        statusText.innerHTML = 'MUSIC OFF';
        statusText.style.color = '#ff4b2b';
    } else {
        musicIcon.innerHTML = '🔊';
        statusText.innerHTML = 'MUSIC ON';
        statusText.style.color = '#00dfc1';
    }
}

// --- Dynamic Navbar Scroll Effect ---
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.8)';
            navbar.style.padding = '8px 25px';
            navbar.style.width = '90%';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.05)';
            navbar.style.padding = '12px 30px';
            navbar.style.width = '95%';
        }
    }
});