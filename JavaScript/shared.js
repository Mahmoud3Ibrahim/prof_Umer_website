// Shared JavaScript functionality for all pages

// Mobile Navigation Toggle
function initMobileNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !mainNav.contains(e.target)) {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }
}

// Header scroll effect
function initHeaderScroll() {
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.glass-header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(10, 15, 28, 0.95)';
            } else {
                header.style.background = 'rgba(10, 15, 28, 0.8)';
            }
        }
    });
}

// Parallax background effect
function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.animated-bg');
        if (parallax) {
            const speed = scrolled * 0.3;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
}

// Number animation counter
function animateNumbers() {
    const observerOptions = {
        threshold: 0.7,
        rootMargin: '0px'
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numberElements = entry.target.querySelectorAll('.stat-number, .achievement-number');
                
                numberElements.forEach(element => {
                    const finalNumber = element.textContent;
                    const isPlus = finalNumber.includes('+');
                    const number = parseInt(finalNumber.replace('+', ''));
                    
                    if (!isNaN(number)) {
                        let current = 0;
                        const increment = number / 50;
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= number) {
                                element.textContent = finalNumber;
                                clearInterval(timer);
                            } else {
                                element.textContent = Math.floor(current) + (isPlus ? '+' : '');
                            }
                        }, 30);
                    }
                });
                
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe stat containers
    document.querySelectorAll('.stat-card, .achievement-card, .stat-item').forEach(card => {
        statsObserver.observe(card);
    });
}

// Card animations on scroll
function initCardAnimations() {
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // Observe all animatable cards
    document.querySelectorAll('.glass-card, .certificate-card, .research-card, .education-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        cardObserver.observe(card);
    });
}

// Enhanced hover effects for cards
function initCardHoverEffects() {
    // Certificate cards
    document.querySelectorAll('.certificate-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Research cards
    document.querySelectorAll('.research-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.01)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Achievement cards
    document.querySelectorAll('.achievement-card, .stat-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Smooth scrolling for internal links
function initSmoothScrolling() {
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
}

// Loading state management
function initLoadingState() {
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
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

// Initialize performance-optimized scroll listener
function initOptimizedScroll() {
    window.addEventListener('scroll', requestTick);
}

// Contact form handling (if exists)
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    if (contactForm && successMessage) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>⏳</span><span>Sending...</span>';
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                // Show success message
                successMessage.classList.add('show');
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.remove('show');
                }, 5000);
            }, 1000);
        });
    }
}

// Form validation enhancement
function initFormValidation() {
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#ef4444';
            } else {
                this.style.borderColor = 'var(--glass-border)';
            }
        });

        input.addEventListener('input', function() {
            if (this.style.borderColor === 'rgb(239, 68, 68)') {
                this.style.borderColor = 'var(--glass-border)';
            }
        });
    });
}

// Copy to clipboard functionality
function initCopyToClipboard() {
    document.querySelectorAll('a[href^="mailto:"]').forEach(emailLink => {
        emailLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = this.getAttribute('href').replace('mailto:', '');
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(() => {
                    showNotification('Email copied to clipboard!');
                    setTimeout(() => {
                        window.location.href = this.getAttribute('href');
                    }, 1500);
                }).catch(() => {
                    window.location.href = this.getAttribute('href');
                });
            } else {
                window.location.href = this.getAttribute('href');
            }
        });
    });
}

// Show notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--gradient-primary);
        color: white;
        padding: 1rem 2rem;
        border-radius: 25px;
        z-index: 10000;
        font-weight: 600;
        box-shadow: var(--shadow-primary);
        animation: fadeIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Touch device detection
function initTouchSupport() {
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
}

// Initialize all functionality
function initializeSharedFeatures() {
    initMobileNavigation();
    initHeaderScroll();
    initParallaxEffect();
    animateNumbers();
    initCardAnimations();
    initCardHoverEffects();
    initSmoothScrolling();
    initLoadingState();
    initOptimizedScroll();
    initContactForm();
    initFormValidation();
    initCopyToClipboard();
    initTouchSupport();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSharedFeatures();
    console.log('Shared features initialized successfully');
});

// Export functions for individual page use
window.SharedFeatures = {
    initMobileNavigation,
    initHeaderScroll,
    initParallaxEffect,
    animateNumbers,
    initCardAnimations,
    initCardHoverEffects,
    initSmoothScrolling,
    showNotification
};
initImageErrorHandling();
