const canvas = document.getElementById("artCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let points = [];
const numPoints = 80;

for (let i = 0; i < numPoints; i++) {
    points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        hue: Math.random() * 360
    });
}

function draw() {
    ctx.fillStyle = "rgba(5, 5, 10, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw connecting lines
    for (let i = 0; i < numPoints; i++) {
        for (let j = i + 1; j < numPoints; j++) {
            const dx = points[i].x - points[j].x;
            const dy = points[i].y - points[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
                const alpha = 1 - dist / 150;
                const gradient = ctx.createLinearGradient(points[i].x, points[i].y, points[j].x, points[j].y);
                gradient.addColorStop(0, `hsla(${points[i].hue}, 100%, 70%, ${alpha})`);
                gradient.addColorStop(1, `hsla(${points[j].hue}, 100%, 70%, ${alpha})`);
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(points[i].x, points[i].y);
                ctx.lineTo(points[j].x, points[j].y);
                ctx.stroke();
            }
        }
    }

    // Draw glowing points
    for (let p of points) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 6);
        gradient.addColorStop(0, `hsla(${p.hue}, 100%, 70%, 1)`);
        gradient.addColorStop(1, `hsla(${p.hue}, 100%, 70%, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fill();
    }

    requestAnimationFrame(draw);
}

draw();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});