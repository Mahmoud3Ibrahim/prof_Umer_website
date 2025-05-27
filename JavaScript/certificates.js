// Certificates Page Specific JavaScript

// Certificate data for modal display
const certificateData = {
    certificate1: {
        title: "Google Data Analytics Specialization",
        provider: "Google via Coursera",
        image: "../Images/certificate1.jpg",
        description: "Comprehensive program covering data analysis fundamentals, data cleaning, visualization, and statistical analysis using industry-standard tools.",
        skills: ["Google Analytics", "SQL", "Data Visualization", "Tableau", "R Programming", "Data Cleaning"],
        duration: "6 months",
        completionDate: "2023"
    },
    certificate2: {
        title: "Improving Deep Neural Networks",
        provider: "DeepLearning.AI",
        image: "../Images/certificate2.jpg",
        description: "Advanced course focusing on hyperparameter tuning, regularization techniques, and optimization methods to improve neural network performance.",
        skills: ["Neural Networks", "Hyperparameter Tuning", "Regularization", "Optimization", "Batch Normalization", "Dropout"],
        duration: "4 weeks",
        completionDate: "2023"
    },
    certificate3: {
        title: "Structuring Machine Learning Projects",
        provider: "DeepLearning.AI",
        image: "../Images/certificate3.jpg",
        description: "Strategic approach to machine learning projects, covering best practices for project management and implementation strategies.",
        skills: ["Project Management", "ML Strategy", "Error Analysis", "Data Strategy", "Model Evaluation", "A/B Testing"],
        duration: "2 weeks",
        completionDate: "2023"
    },
    certificate4: {
        title: "Neural Networks and Deep Learning",
        provider: "DeepLearning.AI",
        image: "../Images/certificate4.jpg",
        description: "Foundational course in neural networks and deep learning, covering the mathematical foundations and practical implementation.",
        skills: ["Neural Networks", "Deep Learning", "Python", "TensorFlow", "Backpropagation", "Gradient Descent"],
        duration: "4 weeks",
        completionDate: "2023"
    },
    certificate5: {
        title: "Managing the Company of the Future",
        provider: "University of London, London Business School",
        image: "../Images/certificate5.jpg",
        description: "Executive education program focusing on strategic management, leadership, and organizational transformation for future business challenges.",
        skills: ["Strategic Management", "Leadership", "Innovation", "Business Strategy", "Change Management", "Digital Transformation"],
        duration: "8 weeks",
        completionDate: "2022"
    },
    certificate6: {
        title: "Oracle Certified Professional",
        provider: "Oracle Corporation",
        image: "../Images/certificate6.jpg",
        description: "Professional certification demonstrating expertise in Oracle database technologies, advanced SQL, PL/SQL programming, and database administration.",
        skills: ["Oracle Database", "SQL", "PL/SQL", "Database Administration", "Performance Tuning", "Database Security"],
        duration: "Professional Certification",
        completionDate: "2020"
    }
};

// View certificate modal function
function viewCertificate(certificateId) {
    const certificate = certificateData[certificateId];
    if (!certificate) return;

    const modal = document.getElementById('certificateModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalDetails = document.getElementById('modalDetails');

    // Set modal content
    modalTitle.textContent = certificate.title;
    modalImage.src = certificate.image;
    modalImage.alt = certificate.title;

    // Create detailed content
    modalDetails.innerHTML = `
        <div class="certificate-modal-info">
            <div class="modal-provider">
                <strong>Provider:</strong> ${certificate.provider}
            </div>
            <div class="modal-duration">
                <strong>Duration:</strong> ${certificate.duration}
            </div>
            <div class="modal-completion">
                <strong>Completed:</strong> ${certificate.completionDate}
            </div>
            <div class="modal-description">
                <strong>Description:</strong>
                <p>${certificate.description}</p>
            </div>
            <div class="modal-skills">
                <strong>Skills Acquired:</strong>
                <div class="modal-skills-list">
                    ${certificate.skills.map(skill => `<span class="modal-skill-chip">${skill}</span>`).join('')}
                </div>
            </div>
        </div>
    `;

    // Show modal
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Close certificate modal function
function closeCertificateModal() {
    const modal = document.getElementById('certificateModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Initialize certificate cards hover effects
function initCertificateHoverEffects() {
    document.querySelectorAll('.certificate-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            
            // Add glow effect to badge
            const badge = this.querySelector('.certificate-badge');
            if (badge) {
                badge.style.boxShadow = '0 8px 25px rgba(0, 102, 204, 0.4)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            // Reset badge glow
            const badge = this.querySelector('.certificate-badge');
            if (badge) {
                badge.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
            }
        });
    });
}

// Initialize skill chips hover effects
function initSkillChipEffects() {
    document.querySelectorAll('.skill-chip').forEach(chip => {
        chip.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 5px 15px rgba(0, 102, 204, 0.3)';
        });
        
        chip.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
}

// Initialize stats animation
function initStatsAnimation() {
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

    // Observe stats section
    document.querySelectorAll('.stat-item').forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Initialize certificate cards animation on scroll
function initCertificateAnimation() {
    const certificateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.certificate-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        certificateObserver.observe(card);
    });
}

// Modal keyboard navigation
function initModalKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        const modal = document.getElementById('certificateModal');
        if (modal.classList.contains('show')) {
            if (e.key === 'Escape') {
                closeCertificateModal();
            }
        }
    });
}

// Initialize certificate search/filter functionality
function initCertificateFilter() {
    // Create filter buttons dynamically
    const filterContainer = document.createElement('div');
    filterContainer.className = 'certificate-filters';
    filterContainer.innerHTML = `
        <button class="filter-btn active" data-filter="all">All Certificates</button>
        <button class="filter-btn" data-filter="data-analytics">Data Analytics</button>
        <button class="filter-btn" data-filter="deep-learning">Deep Learning</button>
        <button class="filter-btn" data-filter="management">Management</button>
        <button class="filter-btn" data-filter="database">Database</button>
    `;

    // Insert filter container
    const certificatesSection = document.querySelector('.certificates-section');
    const sectionHeader = certificatesSection.querySelector('.section-header');
    sectionHeader.appendChild(filterContainer);

    // Add filter functionality
    const filterButtons = filterContainer.querySelectorAll('.filter-btn');
    const certificateCards = document.querySelectorAll('.certificate-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            certificateCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else {
                    const badge = card.querySelector('.certificate-badge .badge-text').textContent.toLowerCase();
                    if (badge.includes(filter.replace('-', ' '))) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
}

// Enhanced view certificate button effects
function initViewButtonEffects() {
    document.querySelectorAll('.view-certificate-btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        });
    });
}

// Initialize all certificate page features
function initCertificatesPage() {
    initCertificateHoverEffects();
    initSkillChipEffects();
    initStatsAnimation();
    initCertificateAnimation();
    initModalKeyboardNavigation();
    initCertificateFilter();
    initViewButtonEffects();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initCertificatesPage();
    console.log('Certificates page features initialized successfully');
});

// Add CSS for modal content and filter buttons
const style = document.createElement('style');
style.textContent = `
    .certificate-modal-info {
        color: var(--text-secondary);
        line-height: 1.6;
    }
    
    .certificate-modal-info > div {
        margin-bottom: 1rem;
    }
    
    .certificate-modal-info strong {
        color: var(--text-primary);
        display: block;
        margin-bottom: 0.5rem;
    }
    
    .modal-skills-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 0.5rem;
    }
    
    .modal-skill-chip {
        background: var(--primary-blue);
        color: white;
        padding: 0.3rem 0.8rem;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: 500;
    }
    
    .certificate-filters {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 2rem;
        justify-content: center;
    }
    
    .filter-btn {
        background: var(--glass-bg);
        border: 1px solid var(--glass-border);
        color: var(--text-secondary);
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .filter-btn:hover,
    .filter-btn.active {
        background: var(--primary-blue);
        color: white;
        transform: translateY(-2px);
    }
    
    @media (max-width: 768px) {
        .certificate-filters {
            flex-direction: column;
            align-items: center;
        }
        
        .filter-btn {
            width: 100%;
            max-width: 200px;
        }
    }
`;
document.head.appendChild(style);