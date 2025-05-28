// Research Page JavaScript - Clean and Organized

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 JavaScript loaded successfully!');
    
    // Find DOM elements
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    console.log('Menu Toggle:', menuToggle);
    console.log('Main Nav:', mainNav);
    
    if (menuToggle && mainNav) {
        console.log('✅ Elements found, adding event listener');
        
        // Add event listener to toggle button
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('🎯 Menu toggle clicked!');
            
            // Toggle active classes
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            console.log('Nav active:', mainNav.classList.contains('active'));
            console.log('Toggle active:', menuToggle.classList.contains('active'));
        });
        
        // Close menu when clicking navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
                console.log('📱 Menu closed via nav link');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !mainNav.contains(e.target)) {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
        
    } else {
        console.error('❌ Menu elements not found!');
        if (!menuToggle) console.error('❌ .menu-toggle not found');
        if (!mainNav) console.error('❌ .main-nav not found');
    }
});
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Mobile Navigation Toggle
    function initMobileNav() {
        const menuToggle = document.querySelector('.menu-toggle');
        const mainNav = document.querySelector('.main-nav');
        
        if (menuToggle && mainNav) {
            menuToggle.addEventListener('click', function() {
                mainNav.classList.toggle('active');
                this.classList.toggle('active');
            });
            
            // Close menu when clicking nav links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    mainNav.classList.remove('active');
                    menuToggle.classList.remove('active');
                });
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!menuToggle.contains(e.target) && !mainNav.contains(e.target)) {
                    mainNav.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });
        }
    }

    // 2. Header Scroll Effect
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
            
            // Hide/show header
            if (currentScroll > lastScroll && currentScroll > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        });
    }

    // 3. Research Filters
    function initFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const researchCards = document.querySelectorAll('.research-card');
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Filter cards
                researchCards.forEach(card => {
                    if (filter === 'all') {
                        card.style.display = '';
                        card.classList.remove('filtered-out');
                    } else {
                        const categories = card.getAttribute('data-category');
                        if (categories && categories.includes(filter)) {
                            card.style.display = '';
                            card.classList.remove('filtered-out');
                        } else {
                            card.style.display = 'none';
                            card.classList.add('filtered-out');
                        }
                    }
                });
                
                // Handle load more button visibility
                if (filter === 'all') {
                    loadMoreBtn.style.display = document.querySelectorAll('.research-card.hidden:not(.filtered-out)').length > 0 ? 'inline-flex' : 'none';
                } else {
                    loadMoreBtn.style.display = 'none';
                }
            });
        });
    }

    // 4. Load More Functionality
    function initLoadMore() {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (!loadMoreBtn) return;
        
        loadMoreBtn.addEventListener('click', function() {
            const hiddenCards = document.querySelectorAll('.research-card.hidden:not(.filtered-out)');
            const cardsToShow = Array.from(hiddenCards).slice(0, 3);
            
            // Loading state
            this.disabled = true;
            this.innerHTML = '<span class="btn-text">Loading...</span><span class="btn-icon">⏳</span>';
            
            setTimeout(() => {
                cardsToShow.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.remove('hidden');
                        card.style.animation = 'fadeInUp 0.6s ease forwards';
                    }, index * 100);
                });
                
                // Reset button
                this.disabled = false;
                this.innerHTML = '<span class="btn-text">Load More Research</span><span class="btn-icon">↓</span>';
                
                // Hide if no more cards
                const remainingHidden = document.querySelectorAll('.research-card.hidden:not(.filtered-out)');
                if (remainingHidden.length === 0) {
                    this.style.display = 'none';
                }
            }, 300);
        });
    }

    // 5. Modal Functionality
    function initModal() {
        const modal = document.getElementById('researchModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalContent = document.getElementById('modalContent');
        
        // Research data
        const researchData = {
            'research1': {
                title: 'Intra-field Crop Yield Variability by Assimilating CubeSat LAI',
                content: `
                    <h3>Research Overview</h3>
                    <p>Advanced machine learning approach for predicting within-field crop yield using CubeSat LAI data integrated with the APSIM crop model.</p>
                    
                    <h4>Key Objectives:</h4>
                    <ul>
                        <li>Integrate high-resolution CubeSat LAI data with crop simulation models</li>
                        <li>Develop machine learning algorithms for yield prediction</li>
                        <li>Assess intra-field variability patterns</li>
                        <li>Optimize agricultural decision-making processes</li>
                    </ul>
                    
                    <h4>Impact:</h4>
                    <p>This research aims to revolutionize precision agriculture by providing farmers with accurate, field-specific yield predictions.</p>
                `
            },
            // Add more research data as needed
        };
        
        // Open modal function
        window.openModal = function(researchId) {
            const data = researchData[researchId];
            if (data && modal && modalTitle && modalContent) {
                modalTitle.textContent = data.title;
                modalContent.innerHTML = data.content;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        };
        
        // Close modal function
        window.closeModal = function() {
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        };
        
        // Close on overlay click
        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === this || e.target.classList.contains('modal-overlay')) {
                    closeModal();
                }
            });
        }
        
        // Close with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
    }

    // 6. Stats Animation
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

    // 7. Smooth Scroll
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

    // 8. Card Animations
    function animateCards() {
        const cards = document.querySelectorAll('.research-card:not(.hidden)');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                }
            });
        }, { threshold: 0.1 });
        
        cards.forEach(card => observer.observe(card));
    }

    // 9. Timeline Animation
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

    // Initialize all functions
    initMobileNav();
    initHeaderScroll();
    initFilters();
    initLoadMore();
    initModal();
    animateStats();
    initSmoothScroll();
    animateCards();
    animateTimeline();
    
    console.log('Research page initialized successfully');
});
function initImageErrorHandling() {
    document.querySelectorAll('.card-image img').forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            const parent = this.parentElement;

            if (parent && !parent.querySelector('.fallback-icon')) {
                parent.style.background = 'var(--darker-bg)';

                const fallback = document.createElement('div');
                fallback.classList.add('fallback-icon');
                fallback.textContent = '🔬';

                parent.appendChild(fallback);
            }
        });
    });
}
