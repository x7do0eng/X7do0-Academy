export const courses = [
  {
    id: 'python',
    title: { en: 'Python Core', ar: 'أساسيات بايثون' },
    icon: 'fab fa-python',
    description: {
      en: 'Master the language of modern computing. From variables to complex data structures, built for clarity.',
      ar: 'أتقن لغة الحوسبة الحديثة. من المتغيرات إلى هياكل البيانات المعقدة، مصممة بوضوح.'
    },
    lessons: 12,
    questions: 25,
    status: 'active',
    path: '/courses/python/'
  },
  {
    id: 'cpp',
    title: { en: 'C++ Systems', ar: 'أنظمة C++' },
    icon: 'fas fa-code',
    description: {
      en: 'Dive into memory management and high-performance computing.',
      ar: 'تعمق في إدارة الذاكرة والحوسبة عالية الأداء.'
    },
    lessons: 0,
    questions: 0,
    status: 'planned',
    path: '/courses/cpp/'
  },
  {
    id: 'csharp',
    title: { en: 'C# Development', ar: 'تطوير C#' },
    icon: 'fab fa-microsoft',
    description: {
      en: 'Build robust applications with the .NET ecosystem.',
      ar: 'ابنِ تطبيقات قوية باستخدام منصة .NET.'
    },
    lessons: 0,
    questions: 0,
    status: 'planned',
    path: '/courses/csharp/'
  }
];

export function getCourse(id) {
  return courses.find(c => c.id === id);
}

export function getActiveCourses() {
  return courses.filter(c => c.status === 'active');
}

export function getNavSection(page) {
  if (!page) return null;
  for (const course of courses) {
    if (page === course.id || page.startsWith(course.id + '-')) {
      return 'courses';
    }
  }
  return page;
}
