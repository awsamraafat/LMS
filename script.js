// Epic Developer Portfolio JavaScript
class EpicPortfolio {
    constructor() {
        this.currentSection = 'home';
        this.isAnimating = false;
        this.init();
    }

    init() {
        this.setupMatrixBackground();
        this.setupNavigation();
        this.setupAnimations();
        this.setupSkills();
        this.setupProjects();
        this.setupContactForm();
        this.setupMobileMenu();
        this.setupScrollEffects();
        this.setupTypingAnimation();
        this.setupParticleSystem();
        this.setupLanguageToggle();
    }

    // Matrix Background Effect
    setupMatrixBackground() {
        const canvas = document.getElementById('matrix-canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
        const matrixArray = matrix.split("");
        
        const font_size = 10;
        const columns = canvas.width / font_size;
        
        const drops = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }
        
        const draw = () => {
            ctx.fillStyle = 'rgba(10, 10, 10, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00ff88';
            ctx.font = font_size + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
                ctx.fillText(text, i * font_size, drops[i] * font_size);
                
                if (drops[i] * font_size > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };
        
        setInterval(draw, 35);
        
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // Navigation System
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = link.getAttribute('data-section');
                this.showSection(targetSection);
                this.updateActiveNav(link);
            });
        });
    }

    showSection(sectionId) {
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionId;
            
            // Trigger animations for the new section
            setTimeout(() => {
                this.triggerSectionAnimations(targetSection);
                this.isAnimating = false;
            }, 300);
        }
    }

    updateActiveNav(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    // Mobile Menu
    setupMobileMenu() {
        const navToggle = document.querySelector('.nav-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (navToggle && navLinks) {
            navToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }
    }

    // Animations
    setupAnimations() {
        // Intersection Observer for animations
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
        this.addAnimationClasses();
        
        // Observe elements
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
            observer.observe(el);
        });
    }

    addAnimationClasses() {
        // Add fade-in to various elements
        const elementsToAnimate = [
            '.skill-card',
            '.project-card',
            '.contact-card',
            '.text-block'
        ];

        elementsToAnimate.forEach(selector => {
            document.querySelectorAll(selector).forEach((el, index) => {
                el.classList.add('fade-in');
                el.style.animationDelay = `${index * 0.1}s`;
            });
        });
    }

    triggerSectionAnimations(section) {
        const animatedElements = section.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
        animatedElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, index * 100);
        });
    }

    // Skills Progress Animation
    setupSkills() {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSkillBars();
                    skillObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const skillsSection = document.querySelector('#skills');
        if (skillsSection) {
            skillObserver.observe(skillsSection);
        }
    }

    animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach((bar, index) => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width;
            }, index * 200);
        });
    }

    // Projects Filter
    setupProjects() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Filter project cards
                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    const isAllowed = (filter === 'all' || category === filter);
                    card.style.display = isAllowed ? 'block' : 'none';
                    card.classList.toggle('fade-in', isAllowed);
                });
            });
        });
    }

    // Contact Form
    setupContactForm() {
        const form = document.querySelector('#contact-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Honeypot check
            const honeypot = form.querySelector('input[name="website"]');
            if (honeypot && honeypot.value) return;
            const timeField = form.querySelector('input[name="time"]');
            if (timeField) timeField.value = new Date().toLocaleString();
            this.sendEmail(form);
        });

        // Copy functionality for contact cards
        document.querySelectorAll('.contact-copy').forEach(copyBtn => {
            copyBtn.addEventListener('click', (e) => {
                const contactCard = e.target.closest('.contact-card');
                const text = contactCard.querySelector('p').textContent;
                this.copyToClipboard(text);
                const isArabic = document.documentElement.lang === 'ar';
                const message = isArabic ? 'تم نسخ النص!' : 'Text copied!';
                this.showNotification(message, 'success');
            });
        });
    }

    sendEmail(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        const isArabic = document.documentElement.lang === 'ar';
        submitBtn.innerHTML = '<span class="loading"></span> ' + (isArabic ? 'جاري الإرسال...' : 'Sending...');
        submitBtn.disabled = true;

        const templateParams = {
            name: form.name.value,
            email: form.email.value,
            subject: form.subject.value,
            message: form.message.value,
            time: new Date().toLocaleString()
        };

        if (!window.emailjs || !(emailjs.sendForm || emailjs.send)) {
            this.showNotification(isArabic ? 'تعذر إرسال الرسالة. جرب لاحقاً.' : 'Unable to send right now. Try later.', 'error');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            return;
        }

        const { serviceId, templateId, publicKey } = EMAILJS_CONFIG;
        const sendPromise = emailjs.sendForm
            ? emailjs.sendForm(serviceId, templateId, form, { publicKey })
            : emailjs.send(serviceId, templateId, templateParams, { publicKey });

        sendPromise.then(() => {
                this.showNotification(isArabic ? 'تم إرسال رسالتك بنجاح! سأرد عليك قريباً.' : 'Message sent successfully! I\'ll get back to you soon.', 'success');
                form.reset();
            })
            .catch((err) => {
                this.showNotification(isArabic ? 'فشل إرسال الرسالة. حاول مرة أخرى.' : 'Failed to send. Please try again.', 'error');
            })
            .finally(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
    }

    // Copy to Clipboard
    copyToClipboard(text) {
        navigator.clipboard.writeText(text).catch(() => {});
    }

    // Notification System
    showNotification(message, type = 'info') {
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
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#00ff88' : type === 'error' ? '#ff4757' : '#00d4ff'};
            color: ${type === 'success' ? '#000' : '#fff'};
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 400px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            font-family: 'JetBrains Mono', monospace;
        `;

        notification.querySelector('.notification-content').style.cssText = `
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        `;

        notification.querySelector('.notification-close').style.cssText = `
            background: none;
            border: none;
            color: inherit;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background 0.3s ease;
        `;

        // Add to page
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Close button functionality
        notification.querySelector('.notification-close').addEventListener('click', () => {
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

    // Typing Animation
    setupTypingAnimation() {
        const greetingText = qs('.greeting-text');
        const subtitleEl = qs('.subtitle-text');
        const subtitleText = qs('.subtitle-text');
        
        if (greetingText) {
            this.typeWriter(greetingText, greetingText.textContent, 100);
        }
        
        // Start looping type/delete for subtitle between two titles
        if (subtitleEl) {
            this.startSubtitleTypingCycle();
        }
        
        // Start code typing animation immediately
        this.setupCodeTypingAnimation();
    }

    startSubtitleTypingCycle() {
        const subtitleElement = document.querySelector('.subtitle-text');
        if (!subtitleElement) return;

        this.clearSubtitleTimers();

        const titles = this.getSubtitleTitlesByLanguage();
        let currentTitleIndex = 0;

        const typeText = (element, text, charDelayMs, onComplete) => {
            element.textContent = '';
            let nextCharIndex = 0;
            const typeNext = () => {
                if (nextCharIndex < text.length) {
                    element.textContent += text.charAt(nextCharIndex++);
            this._subtitleTimers.push(setTimeout(typeNext, charDelayMs));
                } else if (onComplete) {
                    this._subtitleTimers.push(setTimeout(onComplete, UI_CONFIG.typing.subtitlePauseMs));
                }
            };
            typeNext();
        };

        const eraseText = (element, charDelayMs, onComplete) => {
            const eraseNext = () => {
                const currentText = element.textContent;
                if (currentText.length > 0) {
                    element.textContent = currentText.slice(0, -1);
                    this._subtitleTimers.push(setTimeout(eraseNext, charDelayMs));
                } else if (onComplete) {
                    onComplete();
                }
            };
            this._subtitleTimers.push(setTimeout(eraseNext, UI_CONFIG.typing.subtitleEraseStartDelayMs));
        };

        const runLoop = () => {
            const nextTitle = titles[currentTitleIndex % titles.length];
            typeText(subtitleElement, nextTitle, UI_CONFIG.typing.subtitleTypeMs, () => {
                eraseText(subtitleElement, UI_CONFIG.typing.subtitleEraseMs, () => {
                    currentTitleIndex++;
                    runLoop();
                });
            });
        };

        runLoop();
    }

    clearSubtitleTimers() {
        if (!this._subtitleTimers) this._subtitleTimers = [];
        this._subtitleTimers.forEach(timerId => clearTimeout(timerId));
        this._subtitleTimers = [];
    }

    getSubtitleTitlesByLanguage() {
        const isArabic = document.documentElement.lang === 'ar';
        return isArabic
            ? ['مطور ويب متكامل', 'مطور فلاتر']
            : ['Full Stack Developer', 'Flutter Developer'];
    }

    typeWriter(element, text, speed = 100) {
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

    // Code Typing Animation
    setupCodeTypingAnimation() {
        const codeLines = document.querySelectorAll('.code-line');
        const codeWindow = document.querySelector('.code-window');
        
        if (codeLines.length === 0) return;
        
        // Hide all code lines initially
        codeLines.forEach(line => {
            line.style.opacity = '0';
            line.style.transform = 'translateX(-20px)';
        });
        
        // Show code window with animation
        codeWindow.style.opacity = '0';
        codeWindow.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            codeWindow.style.transition = 'all 0.5s ease';
            codeWindow.style.opacity = '1';
            codeWindow.style.transform = 'translateY(0)';
        }, 200);
        
        // Type each line with delay
        codeLines.forEach((line, index) => {
            setTimeout(() => {
                this.typeCodeLine(line, index);
            }, 500 + (index * 400));
        });
        
        // Show compiler effect after all lines are typed
        setTimeout(() => {
            this.showCompilerEffect();
        }, 500 + (codeLines.length * 400) + 800);
    }

    // Type individual code line
    typeCodeLine(line, index) {
        const codeText = line.querySelector('.code-text');
        if (!codeText) return;
        
        const originalText = codeText.innerHTML;
        codeText.innerHTML = '';
        
        line.style.transition = 'all 0.3s ease';
        line.style.opacity = '1';
        line.style.transform = 'translateX(0)';
        
        // Add typing cursor
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        cursor.textContent = '|';
        cursor.style.animation = 'blink 1s infinite';
        cursor.style.color = '#00ff88';
        
        codeText.appendChild(cursor);
        
        // Type the text character by character
        let i = 0;
        const typeChar = () => {
            if (i < originalText.length) {
                const char = originalText.charAt(i);
                if (char === '<') {
                    // Handle HTML tags
                    const tagEnd = originalText.indexOf('>', i);
                    if (tagEnd !== -1) {
                        const tag = originalText.substring(i, tagEnd + 1);
                        codeText.innerHTML = codeText.innerHTML.replace(cursor.outerHTML, tag + cursor.outerHTML);
                        i = tagEnd + 1;
                    } else {
                        codeText.innerHTML = codeText.innerHTML.replace(cursor.outerHTML, char + cursor.outerHTML);
                        i++;
                    }
                } else {
                    codeText.innerHTML = codeText.innerHTML.replace(cursor.outerHTML, char + cursor.outerHTML);
                    i++;
                }
                setTimeout(typeChar, 20);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    cursor.remove();
                }, 500);
            }
        };
        
        setTimeout(typeChar, 200);
    }

    // Show compiler effect
    showCompilerEffect() {
        const codeWindow = document.querySelector('.code-window');
        const windowTitle = document.querySelector('.window-title');
        
        if (!codeWindow || !windowTitle) return;
        
        // Change window title to show compilation
        const originalTitle = windowTitle.textContent;
        windowTitle.textContent = 'awsam-portfolio.js - Compiling...';
        windowTitle.style.color = '#ff6b6b';
        
        // Add compilation overlay
        const compilationOverlay = document.createElement('div');
        compilationOverlay.className = 'compilation-overlay';
        compilationOverlay.innerHTML = `
            <div class="compilation-content">
                <div class="compilation-spinner"></div>
                <p>Compiling...</p>
                <div class="compilation-progress">
                    <div class="progress-bar"></div>
                </div>
            </div>
        `;
        
        compilationOverlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #00ff88;
            font-family: 'JetBrains Mono', monospace;
            z-index: 10;
            opacity: 0;
            transition: opacity 0.3s ease;
            border-radius: 8px;
        `;
        
        codeWindow.style.position = 'relative';
        codeWindow.appendChild(compilationOverlay);
        
        // Style compilation content
        const compilationContent = compilationOverlay.querySelector('.compilation-content');
        compilationContent.style.cssText = `
            text-align: center;
        `;
        
        const spinner = compilationOverlay.querySelector('.compilation-spinner');
        spinner.style.cssText = `
            width: 40px;
            height: 40px;
            border: 3px solid rgba(0, 255, 136, 0.3);
            border-top: 3px solid #00ff88;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        `;
        
        const progressContainer = compilationOverlay.querySelector('.compilation-progress');
        progressContainer.style.cssText = `
            width: 200px;
            height: 4px;
            background: rgba(0, 255, 136, 0.2);
            border-radius: 2px;
            margin: 1rem auto 0;
            overflow: hidden;
        `;
        
        const progressBar = compilationOverlay.querySelector('.progress-bar');
        progressBar.style.cssText = `
            width: 0%;
            height: 100%;
            background: linear-gradient(90deg, #00ff88, #00ccff);
            border-radius: 2px;
            transition: width 2s ease;
        `;
        
        // Show overlay
        setTimeout(() => {
            compilationOverlay.style.opacity = '1';
        }, 100);
        
        // Animate progress bar
        setTimeout(() => {
            progressBar.style.width = '100%';
        }, 500);
        
        // Complete compilation
        setTimeout(() => {
            compilationOverlay.style.opacity = '0';
            setTimeout(() => {
                compilationOverlay.remove();
                windowTitle.textContent = 'awsam-portfolio.js - Compiled ✓';
                windowTitle.style.color = '#00ff88';
                
                // Add success effect
                codeWindow.style.boxShadow = '0 0 30px rgba(0, 255, 136, 0.5)';
                
                // Show profile image after compilation
                setTimeout(() => {
                    this.showProfileImage();
                }, 1000);
                
                setTimeout(() => {
                    codeWindow.style.boxShadow = '';
                }, 2000);
            }, 300);
        }, 3000);
    }

    // Show Profile Image
    showProfileImage() {
        const codeContent = document.querySelector('.code-content');
        
        if (!codeContent) return;
        
        // Replace code content with profile image
        codeContent.innerHTML = `
            <div class="profile-container">
                <img src="images/1754339753253.jpeg" alt="Awsam Raafat" class="profile-image">
                <div class="profile-glow"></div>
            </div>
        `;
        
        // Style profile container
        const profileContainer = codeContent.querySelector('.profile-container');
        profileContainer.style.cssText = `
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: all 0.5s ease;
        `;
        
        // Style profile image
        const profileImage = profileContainer.querySelector('.profile-image');
        profileImage.style.cssText = `
            width: 100%;
            height: 100%;
            border-radius: 8px;
            border: 3px solid #00ff88;
            object-fit: cover;
            transition: all 0.3s ease;
        `;
        
        // Style profile glow
        const profileGlow = profileContainer.querySelector('.profile-glow');
        profileGlow.style.cssText = `
            position: absolute;
            top: -5px;
            left: -5px;
            right: -5px;
            bottom: -5px;
            border-radius: 12px;
            background: linear-gradient(45deg, #00ff88, #00ccff, #ff6b6b, #00ff88);
            background-size: 400% 400%;
            animation: gradientShift 3s ease infinite;
            z-index: -1;
            opacity: 0.7;
        `;
        
        // Show/hide profile image repeatedly
        let isVisible = false;
        let animationInterval;
        
        const showProfile = () => {
            profileContainer.style.opacity = '1';
            profileImage.style.transform = 'scale(1.05)';
            isVisible = true;
        };
        
        const hideProfile = () => {
            profileContainer.style.opacity = '0';
            profileImage.style.transform = 'scale(1)';
            isVisible = false;
        };
        
        // Start the show/hide animation
        const startAnimation = () => {
            showProfile();
            
            animationInterval = setInterval(() => {
                if (isVisible) {
                    hideProfile();
                } else {
                    showProfile();
                }
            }, 2000); // Change every 2 seconds
        };
        
        // Start animation after a short delay
        setTimeout(startAnimation, 100);
        
        // Add hover effects
        profileImage.addEventListener('mouseenter', () => {
            if (isVisible) {
                profileImage.style.transform = 'scale(1.1)';
                profileGlow.style.opacity = '1';
            }
        });
        
        profileImage.addEventListener('mouseleave', () => {
            if (isVisible) {
                profileImage.style.transform = 'scale(1.05)';
                profileGlow.style.opacity = '0.7';
            }
        });
        
        // Stop animation and restore code after 15 seconds
        setTimeout(() => {
            clearInterval(animationInterval);
            hideProfile();
            setTimeout(() => {
                // Restore original code content
                codeContent.innerHTML = `
                    <div class="code-line">
                        <span class="line-number">1</span>
                        <span class="code-text">
                            <span class="keyword">const</span> 
                            <span class="variable">developer</span> 
                            <span class="operator">=</span> 
                            <span class="string">'Awsam Raafat'</span><span class="semicolon">;</span>
                        </span>
                    </div>
                    <div class="code-line">
                        <span class="line-number">2</span>
                        <span class="code-text">
                            <span class="keyword">const</span> 
                            <span class="variable">skills</span> 
                            <span class="operator">=</span> 
                            <span class="bracket">[</span>
                        </span>
                    </div>
                    <div class="code-line">
                        <span class="line-number">3</span>
                        <span class="code-text">
                            &nbsp;&nbsp;<span class="string">'HTML'</span><span class="comma">,</span>
                        </span>
                    </div>
                    <div class="code-line">
                        <span class="line-number">4</span>
                        <span class="code-text">
                            &nbsp;&nbsp;<span class="string">'CSS'</span><span class="comma">,</span>
                        </span>
                    </div>
                    <div class="code-line">
                        <span class="line-number">5</span>
                        <span class="code-text">
                            &nbsp;&nbsp;<span class="string">'JavaScript'</span><span class="comma">,</span>
                        </span>
                    </div>
                    <div class="code-line">
                        <span class="line-number">6</span>
                        <span class="code-text">
                            &nbsp;&nbsp;<span class="string">'Flutter'</span>
                        </span>
                    </div>
                    <div class="code-line">
                        <span class="line-number">7</span>
                        <span class="code-text">
                            <span class="bracket">]</span><span class="semicolon">;</span>
                        </span>
                    </div>
                    <div class="code-line">
                        <span class="line-number">8</span>
                        <span class="code-text">
                            <span class="keyword">console</span><span class="dot">.</span><span class="function">log</span><span class="bracket">(</span><span class="string">'Hello World!'</span><span class="bracket">)</span><span class="semicolon">;</span>
                        </span>
                    </div>
                `;
            }, 500);
        }, 15000);
    }

    // Particle System
    setupParticleSystem() {
        const particles = document.querySelectorAll('.particle');
        
        particles.forEach(particle => {
            // Random initial position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            // Random animation duration
            const duration = Math.random() * 3 + 3;
            particle.style.animationDuration = duration + 's';
        });
    }

    // Scroll Effects
    setupScrollEffects() {
        // Parallax effect for particles
        window.addEventListener('scroll', this.throttle(() => {
            const scrolled = window.pageYOffset;
            const particles = document.querySelectorAll('.particle');
            
            particles.forEach((particle, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                particle.style.transform = `translateY(${yPos}px)`;
            });
        }, 16));

        // Update active navigation based on scroll
        window.addEventListener('scroll', this.throttle(() => {
            this.updateActiveNavOnScroll();
        }, 100));

        // Glitch effect on scroll
        window.addEventListener('scroll', this.throttle(() => {
            this.triggerGlitchEffect();
        }, 200));
    }

    updateActiveNavOnScroll() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    }

    triggerGlitchEffect() {
        const titleWords = document.querySelectorAll('.title-word');
        titleWords.forEach(word => {
            if (Math.random() < 0.1) {
                word.style.animation = 'glitch 0.3s ease-in-out';
                setTimeout(() => {
                    word.style.animation = '';
                }, 300);
            }
        });
    }

    // Counter Animation
    animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                counter.textContent = Math.floor(current);
                
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                }
            }, 16);
        });
    }

    // Utility Functions
    throttle(func, wait) {
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

    // Keyboard Navigation
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            const sections = ['home', 'about', 'skills', 'projects', 'contact'];
            const currentIndex = sections.indexOf(this.currentSection);
            
            if (e.key === 'ArrowUp' && currentIndex > 0) {
                e.preventDefault();
                this.showSection(sections[currentIndex - 1]);
                this.updateActiveNav(document.querySelector(`[data-section="${sections[currentIndex - 1]}"]`));
            } else if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
                e.preventDefault();
                this.showSection(sections[currentIndex + 1]);
                this.updateActiveNav(document.querySelector(`[data-section="${sections[currentIndex + 1]}"]`));
            }
        });
    }

    // Mouse Effects
    setupMouseEffects() {
        document.addEventListener('mousemove', (e) => {
            const particles = document.querySelectorAll('.particle');
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            particles.forEach((particle, index) => {
                const speed = (index + 1) * 0.5;
                const x = (mouseX - 0.5) * speed;
                const y = (mouseY - 0.5) * speed;
                
                particle.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }

    // Language Toggle
    setupLanguageToggle() {
        const langToggle = document.getElementById('lang-toggle');
        const langText = document.querySelector('.lang-text');
        let isArabic = false;

        const translations = {
            en: {
                // Navigation
                'nav-home': 'Home',
                'nav-about': 'About',
                'nav-skills': 'Skills',
                'nav-projects': 'Projects',
                'nav-contact': 'Contact',
                // Hero
                'hero-greeting': 'Hello, I\'m',
                'hero-name': 'Awsam Raafat',
                'hero-title': 'Full Stack Developer • Flutter Developer',
                'hero-description': 'I specialize in creating advanced web applications using cutting-edge technologies<br>Transforming ideas into stunning digital reality',
                'hero-projects': 'Projects Completed',
                'hero-experience': 'Years Experience',
                'hero-clients': 'Happy Clients',
                'hero-view-work': 'View My Work',
                'hero-download-cv': 'Download My CV',
                // About
                'about-title': 'About Me',
                'about-subtitle': 'My passion for development and innovation',
                'about-welcome': 'Welcome to my digital world',
                'about-text': 'I\'m a passionate web developer who creates exceptional digital experiences. I started my programming journey 5 years ago, and since then I haven\'t stopped learning and developing. I specialize in modern web technologies and love transforming complex ideas into clean, elegant code.',
                'about-vision': 'My Vision',
                'about-vision-text': 'I believe that technology should serve humanity, and every project should solve real problems and improve users\' lives. My goal is to create fast, secure, and scalable applications.',
                'about-tech': 'Favorite Technologies',
                // Skills
                'skills-title': 'Skills',
                'skills-subtitle': 'Technologies and tools I master',
                // Projects
                'projects-title': 'Projects',
                'projects-subtitle': 'My featured projects and achievements',
                'projects-all': 'All',
                'projects-web': 'Web Apps',
                'projects-mobile': 'Mobile Apps',
                'projects-ai': 'AI/ML',
                // Contact
                'contact-title': 'Contact Me',
                'contact-subtitle': 'Let\'s start your next project together',
                'contact-email': 'Email',
                'contact-phone': 'Phone',
                'contact-location': 'Location',
                'contact-copy': 'Copy',
                'contact-form-title': 'Send me a message',
                'contact-form-subtitle': 'I\'ll get back to you as soon as possible',
                'contact-name': 'Name',
                'contact-name-placeholder': 'Enter your name',
                'contact-email-placeholder': 'Enter your email',
                'contact-subject': 'Subject',
                'contact-subject-placeholder': 'Message subject',
                'contact-message': 'Message',
                'contact-message-placeholder': 'Write your message here...',
                'contact-send': 'Send Message',
                // Footer
                'footer-rights': 'All rights reserved.',
                'footer-made': 'Made with'
            },
            ar: {
                // Navigation
                'nav-home': 'الرئيسية',
                'nav-about': 'نبذة عني',
                'nav-skills': 'المهارات',
                'nav-projects': 'المشاريع',
                'nav-contact': 'تواصل',
                // Hero
                'hero-greeting': 'مرحباً، أنا',
                'hero-name': 'أوسم رأفت',
                'hero-title': 'مطور ويب متكامل • مطور فلاتر',
                'hero-description': 'أخصص في إنشاء تطبيقات ويب متطورة باستخدام أحدث التقنيات<br>أحول الأفكار إلى واقع رقمي مذهل',
                'hero-projects': 'مشروع مكتمل',
                'hero-experience': 'سنوات خبرة',
                'hero-clients': 'عميل راضي',
                'hero-view-work': 'شاهد أعمالي',
                'hero-download-cv': 'تحميل السيرة الذاتية',
                // About
                'about-title': 'نبذة عني',
                'about-subtitle': 'قصة شغفي بالتطوير والإبداع',
                'about-welcome': 'مرحباً بك في عالمي الرقمي',
                'about-text': 'أنا مطور ويب شغوف بإنشاء تجارب رقمية استثنائية. بدأت رحلتي في عالم البرمجة منذ 5 سنوات، ومنذ ذلك الحين لم أتوقف عن التعلم والتطوير. أخصص في تقنيات الويب الحديثة وأحب تحويل الأفكار المعقدة إلى كود بسيط وأنيق.',
                'about-vision': 'رؤيتي',
                'about-vision-text': 'أؤمن بأن التكنولوجيا يجب أن تكون في خدمة الإنسان، وأن كل مشروع يجب أن يحل مشكلة حقيقية ويحسن من حياة المستخدمين. هدفي هو إنشاء تطبيقات سريعة، آمنة، وقابلة للتطوير.',
                'about-tech': 'التقنيات المفضلة',
                // Skills
                'skills-title': 'المهارات',
                'skills-subtitle': 'التقنيات والأدوات التي أتقنها',
                // Projects
                'projects-title': 'المشاريع',
                'projects-subtitle': 'مشاريعي المميزة والإنجازات',
                'projects-all': 'الكل',
                'projects-web': 'مواقع ويب',
                'projects-mobile': 'تطبيقات موبايل',
                'projects-ai': 'ذكاء اصطناعي',
                // Contact
                'contact-title': 'تواصل معي',
                'contact-subtitle': 'دعنا نبدأ مشروعك القادم معاً',
                'contact-email': 'البريد الإلكتروني',
                'contact-phone': 'رقم الهاتف',
                'contact-location': 'الموقع',
                'contact-copy': 'نسخ',
                'contact-form-title': 'أرسل لي رسالة',
                'contact-form-subtitle': 'سأرد عليك في أقرب وقت ممكن',
                'contact-name': 'الاسم',
                'contact-name-placeholder': 'أدخل اسمك',
                'contact-email-placeholder': 'أدخل بريدك الإلكتروني',
                'contact-subject': 'الموضوع',
                'contact-subject-placeholder': 'موضوع الرسالة',
                'contact-message': 'الرسالة',
                'contact-message-placeholder': 'اكتب رسالتك هنا...',
                'contact-send': 'إرسال الرسالة',
                // Footer
                'footer-rights': 'جميع الحقوق محفوظة.',
                'footer-made': 'صُنع بـ'
            }
        };

        langToggle.addEventListener('click', () => {
            isArabic = !isArabic;
            const currentLang = isArabic ? 'ar' : 'en';
            
            // Update button text
            langText.textContent = isArabic ? 'English' : 'العربية';
            
            // Update HTML attributes
            document.documentElement.lang = currentLang;
            document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
            document.body.setAttribute('dir', isArabic ? 'rtl' : 'ltr');
            
            // Update body direction
            document.body.style.direction = isArabic ? 'rtl' : 'ltr';
            document.body.style.textAlign = isArabic ? 'right' : 'left';
            
            // Update all translatable elements
            Object.keys(translations[currentLang]).forEach(key => {
                const element = document.querySelector(`[data-translate="${key}"]`);
                if (element) {
                    if (key === 'hero-description') {
                        element.innerHTML = translations[currentLang][key];
                    } else {
                        element.textContent = translations[currentLang][key];
                    }
                }
            });

            // Restart subtitle typing cycle with new language
            this.startSubtitleTypingCycle();
            
            // Update hero title words specifically
            const titleWords = document.querySelectorAll('.title-word');
            if (titleWords.length >= 2) {
                if (isArabic) {
                    titleWords[0].textContent = 'أوسم';
                    titleWords[0].setAttribute('data-text', 'أوسم');
                    titleWords[1].textContent = 'رأفت';
                    titleWords[1].setAttribute('data-text', 'رأفت');
                } else {
                    titleWords[0].textContent = 'Awsam';
                    titleWords[0].setAttribute('data-text', 'Awsam');
                    titleWords[1].textContent = 'Raafat';
                    titleWords[1].setAttribute('data-text', 'Raafat');
                }
            }
            
            // Update placeholders
            document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
                const key = element.getAttribute('data-translate-placeholder');
                if (translations[currentLang][key]) {
                    element.placeholder = translations[currentLang][key];
                }
            });
            
            // Update code window content
            if (isArabic) {
                document.querySelector('.code-window .code-text .string').textContent = "'أوسم رأفت'";
                document.querySelector('.code-window .code-text:last-child .string').textContent = "'مرحباً بالعالم!'";
            } else {
                document.querySelector('.code-window .code-text .string').textContent = "'Awsam Raafat'";
                document.querySelector('.code-window .code-text:last-child .string').textContent = "'Hello World!'";
            }
            
            // Update terminal window content
            if (isArabic) {
                document.querySelector('.terminal-title').textContent = 'أوسم@devmaster:~$';
                document.querySelector('.terminal-line .prompt').textContent = 'أوسم@devmaster:~$';
                document.querySelector('.terminal-line:last-child .prompt').textContent = 'أوسم@devmaster:~$';
            } else {
                document.querySelector('.terminal-title').textContent = 'awsam@devmaster:~$';
                document.querySelector('.terminal-line .prompt').textContent = 'awsam@devmaster:~$';
                document.querySelector('.terminal-line:last-child .prompt').textContent = 'awsam@devmaster:~$';
            }
            
            // Profile image doesn't need translation updates
        });
    }
}

// Configuration
const EMAILJS_CONFIG = {
    serviceId: 'service_t6ey6ao',
    templateId: 'template_0v5805r',
    publicKey: 'C1oeo1j2tQEI0UpWB'
};

const UI_CONFIG = {
    typing: {
        subtitleTypeMs: 80,
        subtitleEraseMs: 40,
        subtitlePauseMs: 900,
        subtitleEraseStartDelayMs: 400
    },
    codeTyping: {
        lineDelayMs: 400,
        startDelayMs: 500
    },
    notifications: {
        autoHideMs: 5000
    }
};

// Utils
const qs = (sel, root = document) => root.querySelector(sel);
const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    const app = new EpicPortfolio();
    
    // No loading screen needed

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                // Smooth scroll to target
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active navigation
                const sectionId = targetId.substring(1);
                const navLink = document.querySelector(`[data-section="${sectionId}"]`);
                if (navLink) {
                    app.updateActiveNav(navLink);
                }
                
                // Close mobile menu if open
                const navToggle = document.querySelector('.nav-toggle');
                const navLinks = document.querySelector('.nav-links');
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    });

    // Add hover effects to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // CV download handling
    const downloadCvBtn = document.querySelector('a[href*="cv.pdf"]');
    if (downloadCvBtn) {
        downloadCvBtn.addEventListener('click', function() {});
    }

    // Add click effects to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Project details modal removed

    // Add keyboard navigation
    app.setupKeyboardNavigation();
    
    // Add mouse effects
    app.setupMouseEffects();

    // Animate counters when hero section is visible
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                app.animateCounters();
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroSection = document.querySelector('#home');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }

    
});

// project modal removed