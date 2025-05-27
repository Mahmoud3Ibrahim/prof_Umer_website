// Mobile Navigation Toggle
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !mainNav.contains(e.target)) {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.glass-header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 15, 28, 0.95)';
    } else {
        header.style.background = 'rgba(10, 15, 28, 0.8)';
    }
});

// Animate numbers on scroll
const observerOptions = {
    threshold: 0.7,
    rootMargin: '0px'
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const achievementNumber = entry.target.querySelector('.achievement-number');
            if (achievementNumber) {
                const finalNumber = achievementNumber.textContent;
                const isPlus = finalNumber.includes('+');
                const number = parseInt(finalNumber.replace('+', ''));
                
                let current = 0;
                const increment = number / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        achievementNumber.textContent = finalNumber;
                        clearInterval(timer);
                    } else {
                        achievementNumber.textContent = Math.floor(current) + (isPlus ? '+' : '');
                    }
                }, 30);
                
                statsObserver.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

// Observe achievement cards
document.querySelectorAll('.achievement-card').forEach(card => {
    statsObserver.observe(card);
});

// Add parallax effect to background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.animated-bg');
    const speed = scrolled * 0.5;
    parallax.style.transform = `translateY(${speed}px)`;
});

// Expertise cards hover effects
document.querySelectorAll('.expertise-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Achievement cards hover effects
document.querySelectorAll('.achievement-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dr. Umer Altaf website loaded successfully');
    
    // Add loading animation
    document.body.classList.add('loaded');
    
    // Initialize any other components if needed
    initializeComponents();
});

function initializeComponents() {
    // Any additional initialization code
    
    // Add intersection observer for cards animation
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // Observe all cards for animation
    document.querySelectorAll('.expertise-card, .achievement-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        cardObserver.observe(card);
    });
}

// Performance optimization for scroll events
let ticking = false;
function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
}

function updateOnScroll() {
    ticking = false;
}

window.addEventListener('scroll', requestTick);

// Handle keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        if (mainNav && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    }
});

// Add touch support for mobile devices
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
}

// Preload images for better performance
function preloadImages() {
    const images = [
        // Add any image paths that need preloading
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
preloadImages();