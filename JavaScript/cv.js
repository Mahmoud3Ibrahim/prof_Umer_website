// CV Page Specific JavaScript

// Skills animation on scroll
function initSkillsAnimation() {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach((bar, index) => {
                    setTimeout(() => {
                        bar.classList.add('loaded');
                        const width = bar.style.width;
                        bar.style.width = '0%';
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 100);
                    }, index * 200);
                });
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    // Observe skills sections
    document.querySelectorAll('.skill-category').forEach(category => {
        skillsObserver.observe(category);
    });
}

// Timeline animation
function initTimelineAnimation() {
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.experience-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = `all 0.6s ease ${index * 0.1}s`;
        timelineObserver.observe(item);
    });
}

// Education cards animation
function initEducationAnimation() {
    const educationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.education-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `all 0.6s ease ${index * 0.2}s`;
        educationObserver.observe(card);
    });
}

// Enhanced hover effects for experience items
function initExperienceHoverEffects() {
    document.querySelectorAll('.experience-content:not(.company-content)').forEach(content => {
        content.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            
            // Add glow effect to marker
            const marker = this.parentElement.querySelector('.experience-marker');
            if (marker) {
                marker.style.boxShadow = '0 0 30px rgba(0, 102, 204, 0.8)';
                marker.style.transform = 'translateX(-50%) scale(1.2)';
            }
        });
        
        content.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            // Reset marker
            const marker = this.parentElement.querySelector('.experience-marker');
            if (marker) {
                marker.style.boxShadow = '0 0 20px rgba(0, 102, 204, 0.5)';
                marker.style.transform = 'translateX(-50%) scale(1)';
            }
        });
    });

    // Company headers special effects
    document.querySelectorAll('.company-content').forEach(content => {
        content.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.01)';
            this.style.boxShadow = '0 12px 40px rgba(0, 102, 204, 0.6)';
        });
        
        content.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'var(--shadow-primary)';
        });
    });
}

// Skill tags hover effects
function initSkillTagEffects() {
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 5px 15px rgba(0, 102, 204, 0.3)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
}

// Print functionality enhancement
function initPrintFeatures() {
    const printBtn = document.querySelector('.download-cv-btn');
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            // Add print-optimized class before printing
            document.body.classList.add('print-mode');
            
            // Small delay to apply styles
            setTimeout(() => {
                window.print();
                
                // Remove print class after printing
                setTimeout(() => {
                    document.body.classList.remove('print-mode');
                }, 1000);
            }, 100);
        });
    }
}

// Stats counter for summary section
function initSummaryStats() {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                
                statNumbers.forEach(element => {
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
    }, { threshold: 0.7 });

    // Observe summary stats
    document.querySelectorAll('.stat-box').forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Timeline progress indicator
function initTimelineProgress() {
    const timeline = document.querySelector('.experience-timeline');
    if (!timeline) return;

    const progressLine = document.createElement('div');
    progressLine.className = 'timeline-progress';
    progressLine.style.cssText = `
        position: absolute;
        left: 50%;
        top: 0;
        width: 2px;
        background: var(--accent-cyan);
        transform: translateX(-50%);
        height: 0%;
        transition: height 0.3s ease;
        z-index: 1;
    `;
    timeline.appendChild(progressLine);

    window.addEventListener('scroll', () => {
        const timelineRect = timeline.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (timelineRect.top < windowHeight && timelineRect.bottom > 0) {
            const progress = Math.min(1, Math.max(0, 
                (windowHeight - timelineRect.top) / (timelineRect.height + windowHeight)
            ));
            progressLine.style.height = (progress * 100) + '%';
        }
    });
}

// Initialize all CV page features
function initCVPage() {
    initSkillsAnimation();
    initTimelineAnimation();
    initEducationAnimation();
    initExperienceHoverEffects();
    initSkillTagEffects();
    initPrintFeatures();
    initSummaryStats();
    initTimelineProgress();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initCVPage();
    console.log('CV page features initialized successfully');
});

// Add CSS for additional animations
const style = document.createElement('style');
style.textContent = `
    .timeline-progress {
        box-shadow: 0 0 10px var(--accent-cyan);
    }
    
    .print-mode .animated-bg,
    .print-mode .floating-particles {
        display: none !important;
    }
    
    .print-mode .glass-card {
        background: white !important;
        backdrop-filter: none !important;
        border: 1px solid #ddd !important;
    }
    
    .print-mode .section-title,
    .print-mode .gradient-text {
        color: #0066cc !important;
        -webkit-text-fill-color: #0066cc !important;
    }
    
    .skill-progress.loaded {
        animation: fillBar 2s ease-in-out;
    }
    
    @keyframes fillBar {
        from {
            width: 0;
        }
    }
`;
document.head.appendChild(style);