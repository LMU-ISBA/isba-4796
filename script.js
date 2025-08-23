// ISBA 4796 Capstone Proposal Development - Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initSmoothScrolling();
    initIntersectionObserver();
    initEmailProtection();
    initAccessibilityFeatures();
});

/**
 * Smooth scrolling for navigation links
 */
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-list a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calculate offset to account for sticky navigation
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update focus for accessibility
                targetSection.focus({ preventScroll: true });
            }
        });
    });
}

/**
 * Intersection Observer for animations and active nav states
 */
function initIntersectionObserver() {
    // Options for intersection observer
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };
    
    // Create intersection observer for section animations
    const animationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class to cards and content
                const cards = entry.target.querySelectorAll('.card, .workshop-card, .grade-item, .date-item, .objectives-list li');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animate-in');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Create intersection observer for active navigation
    const navObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Update active navigation link
                updateActiveNav(entry.target.id);
            }
        });
    }, {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    });
    
    // Observe all sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        animationObserver.observe(section);
        navObserver.observe(section);
    });
}

/**
 * Update active navigation link
 */
function updateActiveNav(activeSectionId) {
    const navLinks = document.querySelectorAll('.nav-list a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        const href = link.getAttribute('href');
        if (href === `#${activeSectionId}`) {
            link.classList.add('active');
        }
    });
}

/**
 * Email protection with user confirmation
 */
function initEmailProtection() {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = this.href.replace('mailto:', '');
            const confirmed = confirm(`Open email client to send message to ${email}?`);
            
            if (confirmed) {
                window.location.href = this.href;
            }
        });
    });
}

/**
 * Accessibility enhancements
 */
function initAccessibilityFeatures() {
    // Add keyboard navigation support for cards
    const interactiveCards = document.querySelectorAll('.card, .workshop-card');
    
    interactiveCards.forEach(card => {
        // Make cards focusable
        card.setAttribute('tabindex', '0');
        
        // Add keyboard event handlers
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                // Trigger hover effect on keyboard interaction
                this.classList.add('keyboard-focus');
                
                // Remove focus after animation
                setTimeout(() => {
                    this.classList.remove('keyboard-focus');
                }, 300);
            }
        });
    });
    
    // Add skip links functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.focus();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
    
    // Enhance focus visibility
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}

/**
 * Utility function to throttle scroll events
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Handle window resize events
 */
window.addEventListener('resize', throttle(function() {
    // Recalculate positions if needed
    // This can be extended for any resize-dependent functionality
}, 250));

/**
 * Handle scroll events for additional effects
 */
window.addEventListener('scroll', throttle(function() {
    const scrollTop = window.pageYOffset;
    const nav = document.querySelector('.nav');
    
    // Add/remove shadow to navigation based on scroll position
    if (scrollTop > 10) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}, 16));

/**
 * Error handling for missing elements
 */
function safeQuerySelector(selector, callback) {
    const element = document.querySelector(selector);
    if (element && typeof callback === 'function') {
        callback(element);
    }
}

/**
 * Console message for developers
 */
console.log('%cISBA 4796 - Capstone Proposal Development', 'color: #0076A5; font-size: 16px; font-weight: bold;');
console.log('Spring 2025 | University of Colorado Boulder');
console.log('Built with accessibility and performance in mind ♿🚀');