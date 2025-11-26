// Particle Background Animation
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = `rgba(102, 126, 234, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

let particles = [];

function initParticles() {
    particles = [];
    const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    // Connect nearby particles
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                ctx.strokeStyle = `rgba(102, 126, 234, ${0.15 - distance / 1000})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Scroll animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Skills bar animation
const skillsSection = document.getElementById('skills');
let skillsAnimated = false;

new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated) {
            document.querySelectorAll('.skill-progress').forEach(bar => {
                bar.style.animation = 'none';
                setTimeout(() => bar.style.animation = '', 10);
            });
            skillsAnimated = true;
        }
    });
}, { threshold: 0.3 }).observe(skillsSection);

// Parallax for Education & Experience
window.addEventListener("scroll", () => {
    const sc = window.pageYOffset;

    document.querySelectorAll("#education .parallax-bg, #experience .parallax-bg")
        .forEach(bg => bg.style.transform = `translateY(${sc * 0.15}px)`);

    document.querySelectorAll("#education .parallax-mid, #experience .parallax-mid")
        .forEach(mid => mid.style.transform = `translateY(${sc * 0.3}px)`);
});

// Initialize EmailJS
emailjs.init("juA9kqjUCLZ0uhcrZ");

// FINAL CONTACT FORM HANDLER (ONLY ONE)
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let subject = document.getElementById("subject");
    let message = document.getElementById("message");

    function triggerShake(input) {
        input.classList.add("shake");
        setTimeout(() => input.classList.remove("shake"), 400);
    }

    let hasError = false;

    if (name.value.trim() === "") { triggerShake(name); hasError = true; }
    if (email.value.trim() === "" || !email.value.includes("@")) { triggerShake(email); hasError = true; }
    if (subject.value.trim() === "") { triggerShake(subject); hasError = true; }
    if (message.value.trim() === "") { triggerShake(message); hasError = true; }

    if (hasError) {
        return;
    }

    emailjs.send("service_a9npipd", "template_yugjbvg", {
        name: name.value,
        email: email.value,
        subject: subject.value,
        message: message.value,
    })
    .then(() => {
        document.getElementById("successPopup").style.display = "flex";
        setTimeout(() => {
            document.getElementById("successPopup").style.display = "none";
        }, 2000);
        document.getElementById("contactForm").reset();
    })
    .catch((error) => {
        console.error("EmailJS Error:", error);
    });
});

const typewriter = document.querySelector(".typewriter");

if (typewriter) {
  const text = "Full Stack Developer";
  let i = 0;

  function typing() {
    typewriter.textContent = text.substring(0, i);
    i++;

    if (i <= text.length) {
      setTimeout(typing, 90);
    } else {
      setTimeout(() => {
        i = 0;
        typewriter.textContent = "";
        typing();
      }, 1500);
    }
  }

  typing();
}


// Floating Particle Trail with Random Neon Colors
document.addEventListener("mousemove", (e) => {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    // Neon palette
    const colors = ["#6a5cff", "#8a6cff", "#ff59e0", "#4aa8ff", "#b55cff"];
    const color = colors[Math.floor(Math.random() * colors.length)];

    particle.style.background = `radial-gradient(circle, ${color}, #00000000)`;

    particle.style.left = e.clientX + "px";
    particle.style.top = e.clientY + "px";

    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 900);
});

// Boot-Up Screen
document.body.style.overflow = "hidden";

setTimeout(() => {
    document.body.style.overflow = "auto";
}, 1600);


