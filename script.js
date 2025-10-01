// Loading Screen
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => {
            loader.style.display = 'none';
            // show FAB only after loader fully gone
            document.body.classList.add('fab-ready');
        }, 500);
    }, 3500);
});

// Authentication System
let currentUser = null;
let isLoggedIn = false;

// Users persistence
function getUsers() {
    try {
        const raw = localStorage.getItem('users');
        return raw ? JSON.parse(raw) : [];
    } catch (_) {
        return [];
    }
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function findUserByEmail(email) {
    return getUsers().find(u => (u.email || '').toLowerCase() === (email || '').toLowerCase());
}

// Check if user is logged in
function isUserLoggedIn() {
    return localStorage.getItem('user') !== null;
}

// Get current user
function getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

// Set current user
function setCurrentUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
    currentUser = user;
    isLoggedIn = true;
}

// Logout user
function logoutUser() {
    localStorage.removeItem('user');
    currentUser = null;
    isLoggedIn = false;
    updateAuthUI();
    showNotification('تم تسجيل الخروج بنجاح', 'success');
}

// Update authentication UI
function updateAuthUI() {
    const userMenu = document.getElementById('userMenu');
    const authButtons = document.getElementById('authButtons');
    
    if (isUserLoggedIn()) {
        const user = getCurrentUser();
        if (userMenu && authButtons) {
            userMenu.style.display = 'block';
            authButtons.style.display = 'none';
            
            // Update user name
            const userName = userMenu.querySelector('.user-name');
            if (userName) {
                userName.textContent = user.firstName + ' ' + user.lastName;
            }
        }
    } else {
        if (userMenu && authButtons) {
            userMenu.style.display = 'none';
            authButtons.style.display = 'flex';
        }
    }
}

// Initialize authentication UI
document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
    // Home user dropdown behavior (same as dashboard)
    const userInfo = document.querySelector('#userMenu .user-info');
    const userDropdown = document.querySelector('#userMenu .user-dropdown');
    if (userInfo && userDropdown) {
        userInfo.addEventListener('click', () => {
            userDropdown.classList.toggle('show');
        });
        document.addEventListener('click', (e) => {
            if (!userInfo.contains(e.target) && !userDropdown.contains(e.target)) {
                userDropdown.classList.remove('show');
            }
        });
    }
});

// Modal System
function showModal(title, content, buttons = []) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('customModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'customModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2 id="modalTitle">${title}</h2>
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body">
                    <p id="modalContent">${content}</p>
                    <div id="modalButtons" class="modal-buttons"></div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    // Update content
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalContent').textContent = content;
    
    // Add buttons
    const buttonsContainer = document.getElementById('modalButtons');
    buttonsContainer.innerHTML = '';
    buttons.forEach(button => {
        const btn = document.createElement('button');
        btn.className = `btn ${button.class}`;
        btn.textContent = button.text;
        btn.onclick = button.action;
        buttonsContainer.appendChild(btn);
    });
    
    // Show modal
    modal.classList.add('show');
    
    // Close modal handlers
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = closeModal;
    
    modal.onclick = (e) => {
        if (e.target === modal) {
            closeModal();
        }
    };
}

function closeModal() {
    const modal = document.getElementById('customModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

// Auth Modal
function showAuthModal(type = 'login') {
    const modal = document.getElementById('authModal');
    const modalTitle = document.getElementById('modalTitle');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (type === 'login') {
        modalTitle.textContent = 'تسجيل الدخول';
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    } else {
        modalTitle.textContent = 'إنشاء حساب جديد';
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }
    
    modal.classList.add('show');
}

function hideAuthModal() {
    const modal = document.getElementById('authModal');
    modal.classList.remove('show');
}

// Form Validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^(\+20|0)?1[0-9]{9}$/;
    return phoneRegex.test(phone);
}

function validatePassword(password) {
    return password.length >= 6;
}

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    
    if (field && errorElement) {
        field.style.borderColor = '#e74c3c';
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    
    if (field && errorElement) {
        field.style.borderColor = '#e0e0e0';
        errorElement.classList.remove('show');
    }
}

// Login Form Handler
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            // Clear previous errors
            clearFieldError('loginEmail');
            clearFieldError('loginPassword');
            
            // Validate
            let hasErrors = false;
            
            if (!email) {
                showFieldError('loginEmail', 'البريد الإلكتروني مطلوب');
                hasErrors = true;
            } else if (!validateEmail(email)) {
                showFieldError('loginEmail', 'البريد الإلكتروني غير صحيح');
                hasErrors = true;
            }
            
            if (!password) {
                showFieldError('loginPassword', 'كلمة المرور مطلوبة');
                hasErrors = true;
            } else if (!validatePassword(password)) {
                showFieldError('loginPassword', 'كلمة المرور يجب أن تكون 6 أحرف على الأقل');
                hasErrors = true;
            }
            
            if (!hasErrors) {
                const existing = findUserByEmail(email);
                if (!existing) {
                    showFieldError('loginEmail', 'لا يوجد حساب بهذا البريد');
                    return;
                }
                if (existing.password !== password) {
                    showFieldError('loginPassword', 'كلمة المرور غير صحيحة');
                    return;
                }
                setCurrentUser(existing);
                updateAuthUI();
                hideAuthModal();
                showNotification('تم تسجيل الدخول بنجاح!', 'success');
            }
        });
    }
    
    // Register Form Handler
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const firstName = document.getElementById('registerFirstName').value;
            const lastName = document.getElementById('registerLastName').value;
            const email = document.getElementById('registerEmail').value;
            const phone = document.getElementById('registerPhone').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('registerConfirmPassword').value;
            const grade = document.getElementById('registerGrade').value;
            const agreeTerms = document.getElementById('agreeTerms').checked;
            
            // Clear previous errors
            ['registerFirstName', 'registerLastName', 'registerEmail', 'registerPhone', 'registerPassword', 'registerConfirmPassword', 'registerGrade'].forEach(field => {
                clearFieldError(field);
            });
            
            // Validate
            let hasErrors = false;
            
            if (!firstName) {
                showFieldError('registerFirstName', 'الاسم الأول مطلوب');
                hasErrors = true;
            }
            
            if (!lastName) {
                showFieldError('registerLastName', 'الاسم الأخير مطلوب');
                hasErrors = true;
            }
            
            if (!email) {
                showFieldError('registerEmail', 'البريد الإلكتروني مطلوب');
                hasErrors = true;
            } else if (!validateEmail(email)) {
                showFieldError('registerEmail', 'البريد الإلكتروني غير صحيح');
                hasErrors = true;
            }
            
            if (!phone) {
                showFieldError('registerPhone', 'رقم الهاتف مطلوب');
                hasErrors = true;
            } else if (!validatePhone(phone)) {
                showFieldError('registerPhone', 'رقم الهاتف غير صحيح');
                hasErrors = true;
            }
            
            if (!password) {
                showFieldError('registerPassword', 'كلمة المرور مطلوبة');
                hasErrors = true;
            } else if (!validatePassword(password)) {
                showFieldError('registerPassword', 'كلمة المرور يجب أن تكون 6 أحرف على الأقل');
                hasErrors = true;
            }
            
            if (!confirmPassword) {
                showFieldError('registerConfirmPassword', 'تأكيد كلمة المرور مطلوب');
                hasErrors = true;
            } else if (password !== confirmPassword) {
                showFieldError('registerConfirmPassword', 'كلمة المرور غير متطابقة');
                hasErrors = true;
            }
            
            if (!grade) {
                showFieldError('registerGrade', 'الصف الدراسي مطلوب');
                hasErrors = true;
            }
            
            if (!agreeTerms) {
                showNotification('يجب الموافقة على الشروط والأحكام', 'error');
                hasErrors = true;
            }
            
            if (!hasErrors) {
                const users = getUsers();
                if (users.some(u => (u.email || '').toLowerCase() === email.toLowerCase())) {
                    showFieldError('registerEmail', 'هذا البريد مسجل مسبقاً');
                    return;
                }
                const user = {
                    id: Date.now(),
                    firstName,
                    lastName,
                    email,
                    phone,
                    grade,
                    password
                };
                users.push(user);
                saveUsers(users);
                setCurrentUser(user);
                updateAuthUI();
                hideAuthModal();
                showNotification('تم إنشاء الحساب بنجاح!', 'success');
            }
        });
    }
    
    // Auth Modal Toggle
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    
    if (showRegister) {
        showRegister.addEventListener('click', (e) => {
            e.preventDefault();
            showAuthModal('register');
        });
    }
    
    if (showLogin) {
        showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            showAuthModal('login');
        });
    }
    
    // Auth Buttons
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            showAuthModal('login');
        });
    }
    
    if (registerBtn) {
        registerBtn.addEventListener('click', () => {
            showAuthModal('register');
        });
    }

    // Mobile menu auth links
    const loginLinkMobile = document.getElementById('loginLinkMobile');
    if (loginLinkMobile) {
        loginLinkMobile.addEventListener('click', (e) => {
            e.preventDefault();
            showAuthModal('login');
        });
    }
    const registerLinkMobile = document.getElementById('registerLinkMobile');
    if (registerLinkMobile) {
        registerLinkMobile.addEventListener('click', (e) => {
            e.preventDefault();
            showAuthModal('register');
        });
    }
    
    // Logout Button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            logoutUser();
        });
    }
    
    // Close Modal
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', hideAuthModal);
    }
    
    // Close modal when clicking outside
    const authModal = document.getElementById('authModal');
    if (authModal) {
        authModal.addEventListener('click', (e) => {
            if (e.target === authModal) {
                hideAuthModal();
            }
        });
    }
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Smooth scrolling for navigation links
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add animation classes to elements
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
    
    // Add slide-in animations to cards
    const cards = document.querySelectorAll('.subject-card, .course-card, .contact-item, .feature');
    cards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Add slide-in-left to about text
    const aboutText = document.querySelector('.about-text');
    if (aboutText) {
        aboutText.classList.add('slide-in-left');
        observer.observe(aboutText);
    }
    
    // Add slide-in-right to about image
    const aboutImage = document.querySelector('.about-image');
    if (aboutImage) {
        aboutImage.classList.add('slide-in-right');
        observer.observe(aboutImage);
    }
});

// Contact form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('#name').value;
        const email = contactForm.querySelector('#email').value;
        const subject = contactForm.querySelector('#subject').value;
        const message = contactForm.querySelector('#message').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('يرجى ملء جميع الحقول', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('يرجى إدخال بريد إلكتروني صحيح', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            showNotification('تم إرسال الرسالة بنجاح! سنتواصل معك قريباً', 'success');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
        font-family: 'Almarai', sans-serif;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 1000);
    }
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Initialize counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat .number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const target = parseInt(text.replace(/[^\d]/g, ''));
                if (target) {
                    animateCounter(stat, target);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Add hover effects to subject cards
document.querySelectorAll('.subject-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click effects to course cards
document.querySelectorAll('.course-card').forEach(card => {
    card.addEventListener('click', () => {
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 150);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add smooth reveal animation to elements
function revealOnScroll() {
    const reveals = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Initialize reveal on load
document.addEventListener('DOMContentLoaded', revealOnScroll);

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        if (hamburger) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Add focus management for accessibility
document.querySelectorAll('.nav-link, .btn, .subject-card, .course-card').forEach(element => {
    element.addEventListener('focus', () => {
        element.style.outline = '2px solid #667eea';
        element.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', () => {
        element.style.outline = 'none';
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    revealOnScroll();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add loading state management
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Remove any loading spinners
    const loaders = document.querySelectorAll('.loader');
    loaders.forEach(loader => {
        if (loader.id !== 'loader') {
            loader.remove();
        }
    });
});

// Add error handling for images
document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        e.target.style.display = 'none';
        console.warn('Image failed to load:', e.target.src);
    }
}, true);

// Add touch support for mobile devices
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up
            console.log('Swipe up detected');
        } else {
            // Swipe down
            console.log('Swipe down detected');
        }
    }
}

// Course card interactions
// Allow real navigation for course links, but handle enroll buttons specially
document.querySelectorAll('.course-card a').forEach(link => {
    link.addEventListener('click', (e) => {
        if (e.currentTarget.classList.contains('enroll-btn')) {
            e.preventDefault();
            const courseId = e.currentTarget.getAttribute('data-course');
            // Require login
            if (!isUserLoggedIn()) {
                showAuthModal('login');
                return;
            }
            // Enroll and redirect to course detail
            if (window.Enrollments) {
                window.Enrollments.add(courseId || 'unknown');
                showNotification('تم الاشتراك في الدورة بنجاح!', 'success');
                setTimeout(() => {
                    window.location.href = `course-detail.html?id=${encodeURIComponent(courseId || 'unknown')}`;
                }, 600);
            }
        }
        // For non-enroll links inside course cards, let default behavior continue
    });
});

// Explicitly handle enroll buttons (in case they are <button> elements)
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.enroll-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const courseId = btn.getAttribute('data-course');
            if (!isUserLoggedIn()) {
                showAuthModal('login');
                return;
            }
            if (window.Enrollments) {
                window.Enrollments.add(courseId || 'unknown');
                showNotification('تم الاشتراك في الدورة بنجاح!', 'success');
                setTimeout(() => {
                    window.location.href = `course-detail.html?id=${encodeURIComponent(courseId || 'unknown')}`;
                }, 600);
            }
        });
    });
});

// Wire course card clicks to go to details page
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.course-card').forEach(card => {
        const enroll = card.querySelector('.enroll-btn');
        const courseId = enroll ? enroll.getAttribute('data-course') : null;
        if (!courseId) return;

        card.addEventListener('click', (e) => {
            const target = e.target;
            if (target.closest && target.closest('.enroll-btn')) return; // handled above
            // Navigate to details
            window.location.href = `course-detail.html?id=${encodeURIComponent(courseId)}`;
        });
    });
});

// Subject card interactions
document.querySelectorAll('.subject-card a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        showNotification('سيتم توجيهك لدروس هذه المادة قريباً', 'info');
    });
});

// Social media link tracking
document.querySelectorAll('a[href*="facebook"], a[href*="youtube"]').forEach(link => {
    link.addEventListener('click', () => {
        console.log('Social media link clicked:', link.href);
    });
});

// Add smooth scrolling for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Export functions for potential external use
window.PlatformSite = {
    showNotification,
    typeWriter,
    animateCounter
};