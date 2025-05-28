// Contact Page Specific JavaScript

// Contact Form Enhanced Handling
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

            // Validate form
            if (!validateForm(formObject)) {
                return;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>⏳</span><span>Sending...</span>';
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');

            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                // Show success message
                successMessage.classList.add('show');
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
                
                // Show notification
                showNotification('Message sent successfully! I will get back to you soon.');
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.remove('show');
                }, 5000);
            }, 2000);
        });
    }
}

// Form Validation
function validateForm(formData) {
    const errors = [];
    
    // Required fields validation
    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
        highlightField('name', true);
    } else {
        highlightField('name', false);
    }
    
    if (!formData.email || !isValidEmail(formData.email)) {
        errors.push('Please enter a valid email address');
        highlightField('email', true);
    } else {
        highlightField('email', false);
    }
    
    if (!formData.subject) {
        errors.push('Please select a subject');
        highlightField('subject', true);
    } else {
        highlightField('subject', false);
    }
    
    if (!formData.message || formData.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
        highlightField('message', true);
    } else {
        highlightField('message', false);
    }
    
    if (errors.length > 0) {
        showNotification('Please fix the following errors:\n' + errors.join('\n'), 'error');
        return false;
    }
    
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Field highlighting
function highlightField(fieldId, hasError) {
    const field = document.getElementById(fieldId);
    if (field) {
        if (hasError) {
            field.style.borderColor = '#ef4444';
            field.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
        } else {
            field.style.borderColor = 'var(--glass-border)';
            field.style.backgroundColor = 'var(--glass-bg)';
        }
    }
}

// Enhanced notification function
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    const icon = type === 'success' ? '✅' : '❌';
    notification.innerHTML = `<span>${icon}</span><span>${message}</span>`;
    
    if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
    }
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, type === 'error' ? 5000 : 3000);
}

// Real-time form validation
function initRealTimeValidation() {
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.style.borderColor === 'rgb(239, 68, 68)') {
                validateField(this);
            }
        });
    });
}

// Individual field validation
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    switch (field.id) {
        case 'name':
            isValid = value.length >= 2;
            break;
        case 'email':
            isValid = isValidEmail(value);
            break;
        case 'subject':
            isValid = value !== '';
            break;
        case 'message':
            isValid = value.length >= 10;
            break;
        default:
            isValid = true;
    }
    
    highlightField(field.id, !isValid);
    return isValid;
}

// Copy email to clipboard with enhanced feedback
function initEmailCopyFunctionality() {
    document.querySelectorAll('a[href^="mailto:"]').forEach(emailLink => {
        emailLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = this.getAttribute('href').replace('mailto:', '');
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(() => {
                    showNotification('Email copied to clipboard!');
                    
                    // Add visual feedback to the clicked element
                    const originalColor = this.style.color;
                    this.style.color = 'var(--accent-cyan)';
                    this.style.transform = 'scale(1.05)';
                    
                    setTimeout(() => {
                        this.style.color = originalColor;
                        this.style.transform = 'scale(1)';
                        // Open default email client after feedback
                        window.location.href = this.getAttribute('href');
                    }, 1500);
                }).catch(() => {
                    // Fallback: open email client directly
                    window.location.href = this.getAttribute('href');
                });
            } else {
                // Fallback for older browsers
                window.location.href = this.getAttribute('href');
            }
        });
    });
}

// Enhanced hover effects for contact methods
function initContactMethodEffects() {
    document.querySelectorAll('.contact-method').forEach(method => {
        method.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            
            // Add pulse effect to icon
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.animation = 'pulse 1s infinite';
            }
        });
        
        method.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            // Remove pulse effect
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.animation = '';
            }
        });
    });
}

// Social links enhanced effects
function initSocialLinkEffects() {
    // CHANGED: from '.social-link' to '.contact-social-link'
    document.querySelectorAll('.contact-social-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            
            // Add rotation to icon
            const icon = this.querySelector('.social-link-icon');
            if (icon) {
                icon.style.transform = 'rotate(5deg)';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            // Reset icon rotation
            const icon = this.querySelector('.social-link-icon');
            if (icon) {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
}

// Character counter for textarea
function initCharacterCounter() {
    const messageField = document.getElementById('message');
    if (messageField) {
        const counter = document.createElement('div');
        counter.className = 'character-counter';
        counter.style.cssText = `
            text-align: right;
            margin-top: 0.5rem;
            font-size: 0.8rem;
            color: var(--text-muted);
        `;
        
        messageField.parentNode.appendChild(counter);
        
        function updateCounter() {
            const length = messageField.value.length;
            const minLength = 10;
            counter.textContent = `${length} characters (minimum ${minLength})`;
            
            if (length < minLength) {
                counter.style.color = 'var(--text-muted)';
            } else {
                counter.style.color = 'var(--accent-cyan)';
            }
        }
        
        messageField.addEventListener('input', updateCounter);
        updateCounter();
    }
}

// Auto-resize textarea
function initAutoResizeTextarea() {
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    });
}

// Form progress indicator
function initFormProgress() {
    const form = document.getElementById('contactForm');
    const requiredFields = form.querySelectorAll('[required]');
    
    const progressBar = document.createElement('div');
    progressBar.className = 'form-progress';
    progressBar.style.cssText = `
        height: 4px;
        background: var(--glass-bg);
        border-radius: 2px;
        margin-bottom: 2rem;
        overflow: hidden;
    `;
    
    const progressFill = document.createElement('div');
    progressFill.style.cssText = `
        height: 100%;
        background: var(--gradient-primary);
        width: 0%;
        transition: width 0.3s ease;
    `;
    
    progressBar.appendChild(progressFill);
    form.insertBefore(progressBar, form.firstChild);
    
    function updateProgress() {
        let filledFields = 0;
        requiredFields.forEach(field => {
            if (field.value.trim() !== '') {
                filledFields++;
            }
        });
        
        const progress = (filledFields / requiredFields.length) * 100;
        progressFill.style.width = progress + '%';
    }
    
    requiredFields.forEach(field => {
        field.addEventListener('input', updateProgress);
    });
}

// Initialize all contact page features
function initContactPage() {
    initContactForm();
    initRealTimeValidation();
    initEmailCopyFunctionality();
    initContactMethodEffects();
    initSocialLinkEffects();
    initCharacterCounter();
    initAutoResizeTextarea();
    initFormProgress();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initContactPage();
    console.log('Contact page features initialized successfully');
});

// Add CSS for pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(0, 102, 204, 0.7); }
        70% { box-shadow: 0 0 0 10px rgba(0, 102, 204, 0); }
        100% { box-shadow: 0 0 0 0 rgba(0, 102, 204, 0); }
    }
    
    .character-counter {
        font-family: var(--font-mono);
    }
    
    .form-progress {
        position: relative;
    }
    
    .form-progress::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(90deg, transparent, rgba(0, 102, 204, 0.3), transparent);
        animation: shimmer 2s infinite;
    }
    
    @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
    }
`;
document.head.appendChild(style);
