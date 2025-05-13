
const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
const numStars = 600;
let lastScrollY = window.scrollY;


function createStar() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        baseY: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5, 
        depth: Math.random() * 5 + 1,
        speed: Math.random() * 2 + 0.5,
        opacity: Math.random()
    };
}


for (let i = 0; i < numStars; i++) {
    stars.push(createStar());
}


function drawStars(scrollY) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let scrollDirection = scrollY > lastScrollY ? 1 : -1;

    stars.forEach((star, index) => {
        
        let parallaxY = star.baseY + scrollDirection * Math.sin(scrollY * 0.009 + index) * star.depth * 5;

        // X-Position bleibt konstant
        ctx.beginPath();
        ctx.arc(star.x, parallaxY, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
    });

    lastScrollY = scrollY;
}

function animateStars() {
    for (let star of stars) {
        star.opacity += (Math.random() - 0.5) * 0.02;
        if (star.opacity < 0.1) star.opacity = 0.1;
        if (star.opacity > 1) star.opacity = 1;
    }
}

// Animationsschleife starten
function animateCanvas() {
    drawStars(window.scrollY);
    animateStars();
    requestAnimationFrame(animateCanvas);
}

// Fenstergröße anpassen und Sterne neu generieren
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = [];
    for (let i = 0; i < numStars; i++) {
        stars.push(createStar());
    }
});

// Scroll-Ereignis für den Parallax-Effekt hinzufügen
window.addEventListener('scroll', () => {
    drawStars(window.scrollY);
});

animateCanvas();


// --- Chart.js Diagramme ---
document.addEventListener("DOMContentLoaded", function () {
    function createDonutChart(elementId, percentage, color) {
        const ctx = document.getElementById(elementId).getContext('2d');

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [percentage, 100 - percentage],
                    backgroundColor: [color, 'rgba(0,0,0,0)'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                cutout: '70%',
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false },
                },
                animation: {
                    animateRotate: true,
                    animateScale: true,
                }
            },
            plugins: [{
                id: 'textPlugin',
                beforeDraw: function (chart) {
                    let width = chart.width,
                        height = chart.height,
                        ctx = chart.ctx;

                    ctx.restore();
                    let fontSize = (height / 6).toFixed(2);
                    ctx.font = fontSize + "px Montserrat";
                    ctx.textBaseline = "middle";
                    ctx.textAlign = "center";

                    let text = chart.data.datasets[0].data[0] + "%";
                    let x = width / 2;
                    let y = height / 2;

                    ctx.fillStyle = "#ffffff";  // Farbe des Textes
                    ctx.fillText(text, x, y);
                    ctx.save();
                }
            }]
        });
    }

    createDonutChart('htmlChart', 80, 'rgba(235, 111, 54, 0.7)');
    createDonutChart('cssChart', 70, 'rgba(86, 165, 255, 0.7)');
    createDonutChart('jsChart', 60, 'rgba(255, 219, 99, 0.7)');
    createDonutChart('pythonChart', 80, 'rgba(214, 55, 24, 0.7)');
    createDonutChart('csharpChart', 50, 'rgba(116, 24, 214, 0.7)');
});

window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navigation');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});
