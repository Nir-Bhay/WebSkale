/* ===============================================
   WebScale - Main JavaScript
   =============================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Page Loader
    initPageLoader();
    
    // Navigation
    initNavigation();
    
    // Smooth Scroll
    initSmoothScroll();
    
    // Scroll Animations
    initScrollAnimations();
    
    // Portfolio Filter
    initPortfolioFilter();
    
    // Stats Counter
    initStatsCounter();
    
    // Contact Form
    initContactForm();
    
    // Active Nav Link on Scroll
    initActiveNavOnScroll();
});

/* ===============================================
   Page Loader
   =============================================== */
function initPageLoader() {
    const loader = document.getElementById('pageLoader');
    
    // Hide loader after page load
    window.addEventListener('load', function() {
        setTimeout(function() {
            loader.classList.add('hidden');
            
            // Trigger hero animations after loader hides
            triggerHeroAnimations();
        }, 500);
    });
}

function triggerHeroAnimations() {
    const heroElements = document.querySelectorAll('.hero .animate-fade-left, .hero .animate-fade-right');
    heroElements.forEach(function(element) {
        element.classList.add('animated');
    });
}

/* ===============================================
   Navigation
   =============================================== */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking on a link
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/* ===============================================
   Smooth Scroll
   =============================================== */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            
            if (target) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ===============================================
   Scroll Animations
   =============================================== */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-fade-up, .animate-fade-left:not(.hero .animate-fade-left), .animate-fade-right:not(.hero .animate-fade-right)');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(function(element) {
        observer.observe(element);
    });
}

/* ===============================================
   Portfolio Filter
   =============================================== */
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    
    filterButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(function(btn) {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter cards
            portfolioCards.forEach(function(card) {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    setTimeout(function() {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(function() {
                        card.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
}

/* ===============================================
   Stats Counter
   =============================================== */
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateCounters();
            }
        });
    }, observerOptions);
    
    const statsRow = document.querySelector('.stats-row');
    if (statsRow) {
        observer.observe(statsRow);
    }
    
    function animateCounters() {
        stats.forEach(function(stat) {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = function() {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            };
            
            updateCounter();
        });
    }
}

/* ===============================================
   Contact Form
   =============================================== */
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !phone || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(function() {
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification ' + type;
    notification.innerHTML = message;
    
    // Style the notification
    notification.style.cssText = '\
        position: fixed;\
        top: 100px;\
        right: 20px;\
        padding: 16px 24px;\
        border-radius: 8px;\
        font-size: 0.9375rem;\
        font-weight: 500;\
        z-index: 9999;\
        animation: slideIn 0.3s ease;\
        max-width: 350px;\
    ';
    
    if (type === 'success') {
        notification.style.background = '#10b981';
        notification.style.color = '#ffffff';
    } else {
        notification.style.background = '#ef4444';
        notification.style.color = '#ffffff';
    }
    
    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = '\
            @keyframes slideIn {\
                from { transform: translateX(100%); opacity: 0; }\
                to { transform: translateX(0); opacity: 1; }\
            }\
            @keyframes slideOut {\
                from { transform: translateX(0); opacity: 1; }\
                to { transform: translateX(100%); opacity: 0; }\
            }\
        ';
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove after 4 seconds
    setTimeout(function() {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(function() {
            notification.remove();
        }, 300);
    }, 4000);
}

/* ===============================================
   Active Nav Link on Scroll
   =============================================== */
function initActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const navbarHeight = document.getElementById('navbar').offsetHeight;
        
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

/* ===============================================
   Parallax Effect (Subtle)
   =============================================== */
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroShapes = document.querySelectorAll('.hero-shape');
    
    heroShapes.forEach(function(shape, index) {
        const speed = 0.05 * (index + 1);
        shape.style.transform = 'translateY(' + (scrolled * speed) + 'px)';
    });
});
