const birthDate = new Date(2007, 4, 23, 0, 0); 

const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.addEventListener('resize', resize);
resize();

class Particle {
    constructor(x, y, color, vx, vy) { this.x = x; this.y = y; this.color = color; this.vx = vx; this.vy = vy; this.alpha = 1; }
    update() { this.vx *= 0.96; this.vy *= 0.96; this.vy += 0.12; this.x += this.vx; this.y += this.vy; this.alpha -= 0.012; }
    draw() { ctx.save(); ctx.globalAlpha = this.alpha; ctx.beginPath(); ctx.arc(this.x, this.y, 2, 0, Math.PI*2); ctx.fillStyle = this.color; ctx.shadowBlur = 10; ctx.shadowColor = this.color; ctx.fill(); ctx.restore(); }
}

function createFirework(x, y) {
    const colors = ['#3b82f6', '#4ade80', '#facc15', '#f87171', '#ffffff'];
    const color = colors[Math.floor(Math.random()*colors.length)];
    for (let i = 0; i < 35; i++) {
        const ang = (Math.PI*2/35)*i;
        const spd = Math.random()*5+2;
        particles.push(new Particle(x, y, color, Math.cos(ang)*spd, Math.sin(ang)*spd));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => { if (p.alpha > 0) { p.update(); p.draw(); } else particles.splice(i, 1); });
    if (Math.random() < 0.04) createFirework(Math.random()*window.innerWidth, Math.random()*window.innerHeight*0.6);
    requestAnimationFrame(animate);
}
animate();
window.addEventListener('mousedown', e => createFirework(e.clientX, e.clientY));



window.addEventListener('pointerdown', e => {
    createFirework(e.clientX, e.clientY);
});
