// Shared course catalog data
window.COURSES = {
    'basic-math': {
        id: 'basic-math',
        title: 'مراجعة الاحصاء',
        level: 'beginner',
        hours: 40,
        videosCount: 120,
        description: 'مراجعة على كل شيء يخص منهج الاحصاء',
        price: 299,
        // Use YouTube playlist as course content and explicit lessons
        playlistId: 'PL0U8m2rXC6MkdItggP9yXVjyRFN2H0VEs',
        lessons: [
            { id: 'hxp21eYkXU8', title: 'مراجعة شامله', type: 'video', src: 'https://www.youtube.com/embed/hxp21eYkXU8' },
            { id: '7PSbuOggHZU', title: 'حل امتحان الاسترشادي', type: 'video', src: 'https://www.youtube.com/embed/7PSbuOggHZU' },
            { id: 'vycfUAIl9sc', title: 'حل امتحان 2022 دور اول', type: 'video', src: 'https://www.youtube.com/embed/vycfUAIl9sc' },
            { id: 'axyrQJ13Fus', title: 'حل امتحان 2021 دور اول', type: 'video', src: 'https://www.youtube.com/embed/axyrQJ13Fus' },
            { id: 'BU_dLjj_WSA', title: 'حل امتحان 2023 دور اول', type: 'video', src: 'https://www.youtube.com/embed/BU_dLjj_WSA' }
        ]
    },
    'advanced-algebra': {
        id: 'advanced-algebra',
        title: 'دورة الجبر المتقدم',
        level: 'intermediate',
        hours: 35,
        videosCount: 100,
        description: 'تعمق في مفاهيم الجبر والمعادلات وحل المسائل المعقدة.',
        price: 399,
        lessons: [
            { id: 'orX46BVUnkA', title: 'الجزء الاول', type: 'video', src: 'https://www.youtube.com/embed/orX46BVUnkA' },
            { id: '1cep3EqYIfQ', title: 'الجزء التاني', type: 'video', src: 'https://www.youtube.com/embed/1cep3EqYIfQ' },
            { id: 'B64zAj4I1fQ', title: 'الجزء التالت', type: 'video', src: 'https://www.youtube.com/embed/B64zAj4I1fQ' },
            { id: 'hhgETmONZZ8', title: 'الجزء الرابع', type: 'video', src: 'https://www.youtube.com/embed/hhgETmONZZ8' }
        ]
    },
    'calculus': {
        id: 'calculus',
        title: 'دورة التفاضل والتكامل',
        level: 'advanced',
        hours: 50,
        videosCount: 150,
        description: 'مفاهيم متقدمة في التفاضل والتكامل مع تطبيقات عملية.',
        price: 599,
        lessons: [
            { id: 'cal-1', title: 'مقدمة التفاضل', duration: '09:10', type: 'video', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { id: 'cal-2', title: 'قواعد التفاضل', duration: '16:48', type: 'video', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { id: 'cal-3', title: 'مقدمة التكامل', duration: '13:37', type: 'video', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
        ]
    }
};

// Enrollment storage helpers
window.Enrollments = {
    getAll() {
        try {
            const raw = localStorage.getItem('enrollments');
            return raw ? JSON.parse(raw) : [];
        } catch (_) { return []; }
    },
    getAllForUser(userId) {
        return this.getAll().filter(e => e.userId === userId);
    },
    getAllForCurrentUser() {
        try {
            const u = JSON.parse(localStorage.getItem('user'));
            if (!u) return [];
            return this.getAllForUser(u.id || u.email);
        } catch (_) { return []; }
    },
    isEnrolledForUser(userId, courseId) {
        return this.getAllForUser(userId).some(e => e.courseId === courseId);
    },
    addForUser(userId, courseId) {
        const list = this.getAll();
        if (!list.some(e => e.userId === userId && e.courseId === courseId)) {
            list.push({ userId, courseId, enrolledAt: Date.now() });
            localStorage.setItem('enrollments', JSON.stringify(list));
        }
    },
    // Backward-compatible helpers
    isEnrolled(courseId) {
        try {
            const u = JSON.parse(localStorage.getItem('user'));
            if (!u) return false;
            return this.isEnrolledForUser(u.id || u.email, courseId);
        } catch (_) { return false; }
    },
    add(courseId) {
        try {
            const u = JSON.parse(localStorage.getItem('user'));
            if (!u) return;
            this.addForUser(u.id || u.email, courseId);
        } catch (_) {}
    },
    addForCurrentUser(courseId) {
        this.add(courseId);
    }
};

// Per-user learning data store
window.UserData = {
    key(userId) { return `userdata:${userId}`; },
    get(userId) {
        try {
            const raw = localStorage.getItem(this.key(userId));
            return raw ? JSON.parse(raw) : { progress: {}, assignments: [], messages: [], certificates: [] };
        } catch (_) { return { progress: {}, assignments: [], messages: [], certificates: [] }; }
    },
    save(userId, data) { localStorage.setItem(this.key(userId), JSON.stringify(data)); },
    getCurrent() {
        try { const u = JSON.parse(localStorage.getItem('user')); if (!u) return null; return this.get(u.id || u.email); } catch(_) { return null; }
    },
    saveCurrent(data) {
        try { const u = JSON.parse(localStorage.getItem('user')); if (!u) return; this.save(u.id || u.email, data); } catch(_) {}
    },
    markLessonWatched(userId, courseId, lessonId) {
        const data = this.get(userId);
        if (!data.progress[courseId]) data.progress[courseId] = { watched: [] };
        if (!data.progress[courseId].watched.includes(lessonId)) {
            data.progress[courseId].watched.push(lessonId);
            this.save(userId, data);
        }
    },
    getCourseProgressPercent(userId, courseId) {
        const data = this.get(userId);
        const watched = (data.progress[courseId]?.watched || []).length;
        let total = (window.COURSES[courseId]?.lessons || []).length;
        if (!total) {
            try {
                const cacheRaw = localStorage.getItem('courseLessons');
                const cache = cacheRaw ? JSON.parse(cacheRaw) : {};
                total = (cache && cache[courseId] && cache[courseId].length) || 0;
            } catch(_) { total = 0; }
        }
        total = total || 1;
        return Math.round((watched / total) * 100);
    }
};

