// Dashboard JavaScript

// Sidebar Navigation
document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll('.dashboard-section');

    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            menuItems.forEach(menuItem => menuItem.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Show corresponding section
            const targetSection = this.getAttribute('data-section');
            const section = document.getElementById(targetSection);
            if (section) {
                section.classList.add('active');
            }
        });
    });

    // Initialize learning chart
    initLearningChart();
    
    // Initialize user dropdown
    initUserDropdown();
    
    // Initialize mobile sidebar
    initMobileSidebar();

    // Render dynamic data from enrollments
    renderEnrollmentsIntoDashboard();
});

// Learning Chart
function initLearningChart() {
    const canvas = document.getElementById('learningChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const data = {
        labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
        datasets: [{
            label: 'ساعات التعلم',
            data: [12, 19, 15, 25, 22, 30],
            borderColor: '#667eea',
            backgroundColor: 'rgba(102, 126, 234, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: '#f0f0f0'
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    };

    new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });
}

// Render enrollments
function renderEnrollmentsIntoDashboard() {
    if (!window.Enrollments || !window.COURSES) return;

    const user = (function(){ try { return JSON.parse(localStorage.getItem('user')); } catch(_) { return null; } })();
    const enrollments = user ? window.Enrollments.getAllForUser(user.id || user.email) : [];

    // Overview stats
    const coursesStat = document.querySelector('.stats-grid .stat-card:nth-child(1) .stat-content h3');
    const videosStat = document.querySelector('.stats-grid .stat-card:nth-child(2) .stat-content h3');
    const certsStat = document.querySelector('.stats-grid .stat-card:nth-child(3) .stat-content h3');
    const hoursStat = document.querySelector('.stats-grid .stat-card:nth-child(4) .stat-content h3');

    if (coursesStat) coursesStat.textContent = String(enrollments.length);
    if (videosStat) videosStat.textContent = String(enrollments.reduce((s, e) => s + (window.COURSES[e.courseId]?.videosCount || 0), 0));
    if (certsStat) certsStat.textContent = String(0);
    if (hoursStat) hoursStat.textContent = String(enrollments.reduce((s, e) => s + (window.COURSES[e.courseId]?.hours || 0), 0));

    // My courses list with progress
    const myCoursesSection = document.querySelector('#my-courses .courses-grid');
    if (myCoursesSection) {
        myCoursesSection.innerHTML = '';
        if (enrollments.length === 0) {
            myCoursesSection.innerHTML = '<p style="padding:1rem">لا توجد دورات مسجلة بعد.</p>';
        } else {
            enrollments.forEach(e => {
                const c = window.COURSES[e.courseId];
                if (!c) return;
                const card = document.createElement('div');
                card.className = 'course-card';
                const percent = window.UserData && user ? (window.UserData.getCourseProgressPercent(user.id || user.email, c.id)) : 0;
                card.innerHTML = `
                    <div class="course-image"></div>
                    <div class="course-content">
                        <h3>${c.title}</h3>
                        <p>المستوى: ${c.level}</p>
                        <div class="course-progress">
                            <div class="progress-info">
                                <span>التقدم: ${percent}%</span>
                            </div>
                            <div class="progress-bar"><div class="progress-fill" style="width: ${percent}%"></div></div>
                        </div>
                        <div class="course-actions">
                            <a href="course-detail.html?id=${encodeURIComponent(c.id)}" class="btn btn-primary">متابعة</a>
                        </div>
                    </div>
                `;
                myCoursesSection.appendChild(card);
            });
        }
    }
    // Personalize greeting
    const greetingName = document.querySelector('#overview .section-header h1');
    if (greetingName && user) {
        const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim();
        greetingName.textContent = `مرحباً، ${fullName || 'طالب'}`;
    }
}

// User Dropdown
function initUserDropdown() {
    const userInfo = document.querySelector('.user-info');
    const userDropdown = document.querySelector('.user-dropdown');

    if (userInfo && userDropdown) {
        userInfo.addEventListener('click', function() {
            userDropdown.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!userInfo.contains(e.target) && !userDropdown.contains(e.target)) {
                userDropdown.classList.remove('show');
            }
        });
    }
}

// Mobile Sidebar
function initMobileSidebar() {
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.querySelector('.sidebar');

    if (hamburger && sidebar) {
        hamburger.addEventListener('click', function() {
            sidebar.classList.toggle('open');
        });

        // Close sidebar when clicking on menu item
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                sidebar.classList.remove('open');
            });
        });
    }
}

// Progress Animation
function animateProgress() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Initialize progress animation when progress section is shown
document.addEventListener('DOMContentLoaded', function() {
    const progressSection = document.getElementById('progress');
    const menuItem = document.querySelector('[data-section="progress"]');
    
    if (menuItem && progressSection) {
        menuItem.addEventListener('click', function() {
            setTimeout(animateProgress, 300);
        });
    }
});

// Assignment Status Update
function updateAssignmentStatus(assignmentId, status) {
    const assignment = document.querySelector(`[data-assignment="${assignmentId}"]`);
    if (!assignment) return;

    const statusElement = assignment.querySelector('.assignment-status');
    if (!statusElement) return;

    statusElement.className = `assignment-status ${status}`;
    
    if (status === 'completed') {
        statusElement.innerHTML = '<i class="fas fa-check-circle"></i><span>مكتمل</span>';
    } else if (status === 'pending') {
        statusElement.innerHTML = '<i class="fas fa-clock"></i><span>معلق</span>';
    }
}

// Exam Timer
function startExamTimer(duration, examId) {
    const timerElement = document.querySelector(`[data-exam="${examId}"] .exam-timer`);
    if (!timerElement) return;

    let timeLeft = duration;
    
    const timer = setInterval(() => {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;
        
        timerElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            timerElement.textContent = 'انتهى الوقت';
            // Auto submit exam
            submitExam(examId);
        }
        
        timeLeft--;
    }, 1000);
}

// Submit Exam
function submitExam(examId) {
    // Show confirmation modal
    showModal('تأكيد التسليم', 'هل أنت متأكد من تسليم الامتحان؟', [
        {
            text: 'إلغاء',
            class: 'btn-secondary',
            action: () => closeModal()
        },
        {
            text: 'تسليم',
            class: 'btn-primary',
            action: () => {
                // Submit exam logic
                console.log(`Submitting exam: ${examId}`);
                closeModal();
                showNotification('تم تسليم الامتحان بنجاح', 'success');
            }
        }
    ]);
}

// Certificate Download
function downloadCertificate(certificateId) {}

// Message Actions
function markMessageAsRead(messageId) {
    const message = document.querySelector(`[data-message="${messageId}"]`);
    if (!message) return;

    message.classList.remove('unread');
    const unreadBadge = message.querySelector('.unread-badge');
    if (unreadBadge) {
        unreadBadge.remove();
    }
}

function deleteMessage(messageId) {
    const message = document.querySelector(`[data-message="${messageId}"]`);
    if (!message) return;

    showModal('تأكيد الحذف', 'هل أنت متأكد من حذف هذه الرسالة؟', [
        {
            text: 'إلغاء',
            class: 'btn-secondary',
            action: () => closeModal()
        },
        {
            text: 'حذف',
            class: 'btn-danger',
            action: () => {
                message.remove();
                closeModal();
                showNotification('تم حذف الرسالة', 'success');
            }
        }
    ]);
}

// Course Enrollment
function enrollInCourse(courseId) {
    // Check if user is logged in
    if (!isUserLoggedIn()) {
        showAuthModal();
        return;
    }

    // Show enrollment modal
    showModal('تأكيد الاشتراك', 'هل تريد الاشتراك في هذه الدورة؟', [
        {
            text: 'إلغاء',
            class: 'btn-secondary',
            action: () => closeModal()
        },
        {
            text: 'اشتراك',
            class: 'btn-primary',
            action: () => {
                // Process enrollment
                processEnrollment(courseId);
                closeModal();
            }
        }
    ]);
}

function processEnrollment(courseId) {
    // Show loading
    showNotification('جاري معالجة الاشتراك...', 'info');
    
    // Simulate API call
    setTimeout(() => {
        showNotification('تم الاشتراك في الدورة بنجاح!', 'success');
        // Redirect to course
        window.location.href = 'course-detail.html';
    }, 2000);
}

// Statistics Update
function updateStatistics() {
    const stats = {
        courses: 5,
        videos: 120,
        certificates: 3,
        hours: 45
    };

    Object.keys(stats).forEach(key => {
        const element = document.querySelector(`[data-stat="${key}"]`);
        if (element) {
            animateCounter(element, stats[key]);
        }
    });
}

// Counter Animation
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 30);
}

// Real-time Notifications
function initRealTimeNotifications() {
    // Simulate real-time notifications
    setInterval(() => {
        const notifications = [
            'لديك واجب جديد في دورة الرياضيات',
            'تم إضافة فيديو جديد في دورة الجبر',
            'لديك امتحان غداً في دورة التفاضل',
            'تم إصدار شهادة جديدة لك'
        ];
        
        const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
        
        // Show notification only if user is active
        if (!document.hidden) {
            showNotification(randomNotification, 'info');
        }
    }, 30000); // Every 30 seconds
}

// Initialize real-time notifications
document.addEventListener('DOMContentLoaded', function() {
    initRealTimeNotifications();
    updateStatistics();
});

// Export functions for global use
window.Dashboard = {
    updateAssignmentStatus,
    startExamTimer,
    submitExam,
    downloadCertificate,
    markMessageAsRead,
    deleteMessage,
    enrollInCourse,
    updateStatistics
};

