// Research page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // 1. Header Scroll Effect
    function initHeaderScroll() {
        const header = document.querySelector('.glass-header');
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Background change on scroll
            if (currentScroll > 100) {
                header.style.background = 'rgba(10, 15, 28, 0.95)';
            } else {
                header.style.background = 'rgba(10, 15, 28, 0.8)';
            }
            
            lastScroll = currentScroll;
        });
    }

    // 2. Stats Animation
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    entry.target.dataset.animated = 'true';
                    
                    const finalValue = entry.target.textContent;
                    const hasPlus = finalValue.includes('+');
                    const number = parseInt(finalValue.replace('+', ''));
                    
                    let current = 0;
                    const increment = number / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            entry.target.textContent = finalValue;
                            clearInterval(timer);
                        } else {
                            entry.target.textContent = Math.floor(current) + (hasPlus ? '+' : '');
                        }
                    }, 30);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => observer.observe(stat));
    }

    // 3. Card Animations
    function animateCards() {
        const cards = document.querySelectorAll('.interest-card, .publication-item, .collaboration-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `all 0.6s ease ${index * 0.05}s`;
            observer.observe(card);
        });
    }

    // 4. Timeline Animation
    function animateTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeIn 0.8s ease forwards';
                }
            });
        }, { threshold: 0.3 });
        
        timelineItems.forEach(item => observer.observe(item));
    }

    // 5. Impact Stats Animation
    function animateImpactStats() {
        const impactNumbers = document.querySelectorAll('.impact-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    entry.target.dataset.animated = 'true';
                    
                    const finalValue = entry.target.textContent;
                    const hasPlus = finalValue.includes('+');
                    const number = parseInt(finalValue.replace('+', ''));
                    
                    if (!isNaN(number)) {
                        let current = 0;
                        const increment = number / 50;
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= number) {
                                entry.target.textContent = finalValue;
                                clearInterval(timer);
                            } else {
                                entry.target.textContent = Math.floor(current) + (hasPlus ? '+' : '');
                            }
                        }, 30);
                    }
                }
            });
        }, { threshold: 0.5 });
        
        impactNumbers.forEach(stat => observer.observe(stat));
    }

    // 6. Smooth Scroll
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // Initialize all functions
    initHeaderScroll();
    animateStats();
    animateCards();
    animateTimeline();
    animateImpactStats();
    initSmoothScroll();

    console.log('Research page initialized successfully (cleaned version)');
});
