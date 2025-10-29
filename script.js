document.addEventListener('DOMContentLoaded', function () {
    initNavbar();
    initTypingEffect();
    initOrbitAnimations();
    initSunPhotoModal();
    initSmoothScroll();
    initSectionAnimations();
    initContactForm();
});

function initNavbar() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

function initTypingEffect() {
    const typingText = document.getElementById('typing-text');
    if (!typingText) return;

    const phrases = ['DevOps Engineer ', 'Cloud Enthusiast '];
    let index = 0, charIndex = 0, deleting = false;

    function type() {
        const text = phrases[index];
        typingText.textContent = deleting
            ? text.substring(0, charIndex--)
            : text.substring(0, charIndex++);

        if (!deleting && charIndex === text.length) {
            deleting = true;
            setTimeout(type, 1500);
        } else if (deleting && charIndex === 0) {
            deleting = false;
            index = (index + 1) % phrases.length;
            setTimeout(type, 300);
        } else {
            setTimeout(type, deleting ? 50 : 100);
        }
    }
    type();
}

function initOrbitAnimations() {
    const planets = document.querySelectorAll('.random-orbit');
    planets.forEach((planet, index) => {
        const radius = 120 + index * 40;
        const duration = 15 + Math.random() * 10;
        const direction = Math.random() > 0.5 ? 'normal' : 'reverse';
        const startAngle = Math.random() * 360;

        const animName = `orbit${index}`;
        const style = document.createElement('style');
        style.textContent = `
        @keyframes ${animName} {
            from { transform: rotate(${startAngle}deg) translateX(${radius}px) rotate(-${startAngle}deg); }
            to { transform: rotate(${startAngle + 360}deg) translateX(${radius}px) rotate(-${startAngle + 360}deg); }
        }`;
        document.head.appendChild(style);

        planet.style.animation = `${animName} ${duration}s linear infinite ${direction}`;
    });
}

function initSunPhotoModal() { /* Optional feature placeholder */ }

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

function initSectionAnimations() {
    const elements = document.querySelectorAll('.slide-in-left, .slide-in-right, .slide-in-up');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.style.opacity = 1;
        });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));
}

// ✅ NEW: Web3Forms Integration (replaces EmailJS)
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const result = await response.json();
        if (result.success) {
            alert("✅ Message sent successfully!");
            form.reset();
        } else {
            alert("❌ Failed to send message. Please try again later.");
        }
    });
}
