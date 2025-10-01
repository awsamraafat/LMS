// Shared exams bank
window.EXAMS = {
    'basic-math': {
        'امتحان شامل للاحصاء': [
            { id: 'q1', type: 'mcq', text: 'إذا كان متوسط 5 أعداد هو 10، فما مجموعهم؟', options: ['10', '20', '30', '50'], correct: 3 },
            { id: 'q2', type: 'mcq', text: 'الانحراف المعياري يقيس:', options: ['الميل المركزي', 'التشتت', 'الالتواء', 'التفرطح'], correct: 1 },
            { id: 'q3', type: 'mcq', text: 'إذا كانت الوسيط = 12، فهذا يعني أن:', options: ['نصف القيم ≤ 12', 'نصف القيم ≥ 12', 'كلاهما صحيح', 'لا شيء مما سبق'], correct: 2 }
        ],
        'امتحان تجريبي': [
            { id: 't1', type: 'mcq', text: 'سؤال تجريبي 1', options: ['أ', 'ب', 'ج', 'د'], correct: 0 },
            { id: 't2', type: 'mcq', text: 'سؤال تجريبي 2', options: ['أ', 'ب', 'ج', 'د'], correct: 1 },
            { id: 't3', type: 'mcq', text: 'سؤال تجريبي 3', options: ['أ', 'ب', 'ج', 'د'], correct: 2 },
            { id: 't4', type: 'mcq', text: 'سؤال تجريبي 4', options: ['أ', 'ب', 'ج', 'د'], correct: 3 },
            { id: 't5', type: 'mcq', text: 'سؤال تجريبي 5', options: ['أ', 'ب', 'ج', 'د'], correct: 0 },
            { id: 't6', type: 'mcq', text: 'سؤال تجريبي 6', options: ['أ', 'ب', 'ج', 'د'], correct: 1 },
            { id: 't7', type: 'mcq', text: 'سؤال تجريبي 7', options: ['أ', 'ب', 'ج', 'د'], correct: 2 },
            { id: 't8', type: 'mcq', text: 'سؤال تجريبي 8', options: ['أ', 'ب', 'ج', 'د'], correct: 3 },
            { id: 't9', type: 'mcq', text: 'سؤال تجريبي 9', options: ['أ', 'ب', 'ج', 'د'], correct: 0 },
            { id: 't10', type: 'mcq', text: 'سؤال تجريبي 10', options: ['أ', 'ب', 'ج', 'د'], correct: 1 },
            { id: 't11', type: 'mcq', text: 'سؤال تجريبي 11', options: ['أ', 'ب', 'ج', 'د'], correct: 2 },
            { id: 't12', type: 'mcq', text: 'سؤال تجريبي 12', options: ['أ', 'ب', 'ج', 'د'], correct: 3 },
            { id: 't13', type: 'mcq', text: 'سؤال تجريبي 13', options: ['أ', 'ب', 'ج', 'د'], correct: 0 },
            { id: 't14', type: 'mcq', text: 'سؤال تجريبي 14', options: ['أ', 'ب', 'ج', 'د'], correct: 1 },
            { id: 't15', type: 'mcq', text: 'سؤال تجريبي 15', options: ['أ', 'ب', 'ج', 'د'], correct: 2 },
            { id: 't16', type: 'mcq', text: 'سؤال تجريبي 16', options: ['أ', 'ب', 'ج', 'د'], correct: 3 },
            { id: 't17', type: 'mcq', text: 'سؤال تجريبي 17', options: ['أ', 'ب', 'ج', 'د'], correct: 0 },
            { id: 't18', type: 'mcq', text: 'سؤال تجريبي 18', options: ['أ', 'ب', 'ج', 'د'], correct: 1 },
            { id: 't19', type: 'mcq', text: 'سؤال تجريبي 19', options: ['أ', 'ب', 'ج', 'د'], correct: 2 },
            { id: 't20', type: 'mcq', text: 'سؤال تجريبي 20', options: ['أ', 'ب', 'ج', 'د'], correct: 3 }
        ]
    }
    ,
    'calculus': {
        'امتحان شامل تفاضل و تكامل': [
            { id: 'c1', type: 'mcq', text: 'إذا كان f(x)=x^3 - 5x، فما f\'(x)؟', options: ['3x^2 - 5', '3x^2 + 5', 'x^2 - 5', '3x - 5'], correct: 0 },
            { id: 'c2', type: 'mcq', text: 'مشتقة sin(2x) هي:', options: ['2cos(2x)', 'cos(2x)', '2sin(2x)', '-2sin(2x)'], correct: 0 },
            { id: 'c3', type: 'mcq', text: '∫ 2x dx =', options: ['x^2 + C', 'x^2/2 + C', '2x^2 + C', 'ln(x) + C'], correct: 0 },
            { id: 'c4', type: 'mcq', text: 'إذا كان v(t)=3t^2، فالتغير في الإزاحة s بين t=0 و t=2 يساوي:', options: ['4', '8', '12', '24'], correct: 2 },
            { id: 'c5', type: 'mcq', text: 'd/dx[e^{3x}] =', options: ['3e^{3x}', 'e^{3x}', '3x e^{3x}', '0'], correct: 0 },
            { id: 'c6', type: 'mcq', text: '∫ cos(x) dx =', options: ['sin(x) + C', '-sin(x) + C', 'cos(x) + C', 'sec(x) + C'], correct: 0 },
            { id: 'c7', type: 'mcq', text: 'd/dx[ln(x^2)] =', options: ['2/x', '1/x^2', 'ln(x)/x', '2ln(x)'], correct: 0 },
            { id: 'c8', type: 'mcq', text: '∫ 1/x dx =', options: ['ln|x| + C', 'x ln(x) + C', 'x + C', '1/(x^2) + C'], correct: 0 },
            { id: 'c9', type: 'mcq', text: 'إذا كان y = (x^2+1)(x-3)، فما y\'(x)؟', options: ['(2x)(x-3)+(x^2+1)', '(2x)(x-3)+(x^2+1)(1)', '2x + (x-3)', '2x(x^2+1)'], correct: 1 },
            { id: 'c10', type: 'mcq', text: 'حد معدل التغير اللحظي يُمثَّل بـ:', options: ['Δy/Δx', 'dy/dx', '∫ y dx', 'y/x'], correct: 1 },
            { id: 'c11', type: 'mcq', text: 'مشتقة tan(x) هي:', options: ['sec^2(x)', 'tan(x)', 'sin(x)', 'cos(x)'], correct: 0 },
            { id: 'c12', type: 'mcq', text: '∫ 0 dx =', options: ['C', 'x + C', '0', '1 + C'], correct: 0 },
            { id: 'c13', type: 'mcq', text: 'قاعدة السلسلة تستخدم عندما تكون الدالة:', options: ['مركبة من دوال', 'خطية', 'ثابتة', 'جذرية فقط'], correct: 0 },
            { id: 'c14', type: 'mcq', text: '∫ x dx =', options: ['x^2/2 + C', 'x^2 + C', 'ln(x) + C', '2x + C'], correct: 0 },
            { id: 'c15', type: 'mcq', text: 'إذا كان f\'(x)=0 لجميع x، فإن f(x) هي:', options: ['ثابتة', 'خطية', 'تربيعية', 'أسية'], correct: 0 },
            { id: 'c16', type: 'mcq', text: '∫ e^x dx =', options: ['e^x + C', 'x e^x + C', 'ln(x) + C', 'ثابت'], correct: 0 },
            { id: 'c17', type: 'mcq', text: 'd/dx[\sqrt{x}] =', options: ['1/(2\sqrt{x})', '2\sqrt{x}', '1/\sqrt{x}', '\sqrt{x}/2'], correct: 0 },
            { id: 'c18', type: 'mcq', text: '∫ 3x^2 dx =', options: ['x^3 + C', 'x^3/3 + C', '3x^3 + C', '9x + C'], correct: 0 },
            { id: 'c19', type: 'mcq', text: 'مشتقة ثابت k تساوي:', options: ['0', 'k', '1', 'لا شيء'], correct: 0 },
            { id: 'c20', type: 'mcq', text: '∫ sin(x) dx =', options: ['-cos(x) + C', 'cos(x) + C', 'sin(x) + C', 'tan(x) + C'], correct: 0 }
        ]
    }
};


