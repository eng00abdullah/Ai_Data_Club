import { Locale } from './i18n'

export const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      events: 'Events',
      team: 'Team',
      gallery: 'Gallery',
      achievements: 'Achievements',
      contact: 'Contact',
    },
    hero: {
      title: 'AI & Data Club',
      subtitle: 'Innovation University',
      description: 'Helping students become job-ready for the AI & Data market',
      cta: 'Join Us',
      ctaSecondary: 'Learn More',
    },
    about: {
      title: 'About the Club',
      description: 'We are a community of passionate students dedicated to exploring and mastering the fields of Artificial Intelligence and Data Science.',
    },
    vision: {
      title: 'Our Vision',
      description: 'To become the leading student community in AI & Data, empowering students to excel in the rapidly evolving tech industry.',
    },
    mission: {
      title: 'Our Mission',
      description: 'To provide comprehensive education, hands-on experience, and networking opportunities that prepare students for successful careers in AI & Data.',
    },
    events: {
      title: 'Upcoming Events',
      noEvents: 'No upcoming events',
      viewAll: 'View All Events',
      register: 'Register',
      learnMore: 'Learn More',
    },
    team: {
      title: 'Our Team',
      description: 'Meet the passionate individuals driving our club forward',
    },
    gallery: {
      title: 'Gallery',
      description: 'Moments from our events and activities',
    },
    achievements: {
      title: 'Achievements',
      description: 'Our milestones and accomplishments',
    },
    contact: {
      title: 'Get in Touch',
      description: 'Have questions? We\'d love to hear from you',
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
      send: 'Send Message',
      sending: 'Sending...',
    },
    newsletter: {
      title: 'Stay Updated',
      description: 'Subscribe to our newsletter for the latest updates',
      email: 'Your email',
      subscribe: 'Subscribe',
      subscribed: 'Thank you for subscribing!',
    },
    footer: {
      rights: 'All rights reserved',
      madeWith: 'Made with',
      by: 'by AI & Data Club',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      events: 'الفعاليات',
      team: 'الفريق',
      gallery: 'المعرض',
      achievements: 'الإنجازات',
      contact: 'اتصل بنا',
    },
    hero: {
      title: 'نادي الذكاء الاصطناعي والبيانات',
      subtitle: 'جامعة الابتكار',
      description: 'نساعد الطلاب ليصبحوا جاهزين للعمل في سوق الذكاء الاصطناعي والبيانات',
      cta: 'انضم إلينا',
      ctaSecondary: 'اعرف المزيد',
    },
    about: {
      title: 'عن النادي',
      description: 'نحن مجتمع من الطلاب المتحمسين المكرسين لاستكشاف وإتقان مجالات الذكاء الاصطناعي وعلوم البيانات.',
    },
    vision: {
      title: 'رؤيتنا',
      description: 'أن نصبح المجتمع الطلابي الرائد في الذكاء الاصطناعي والبيانات، وتمكين الطلاب من التفوق في صناعة التكنولوجيا سريعة التطور.',
    },
    mission: {
      title: 'مهمتنا',
      description: 'توفير تعليم شامل وتجربة عملية وفرص للتواصل التي تعد الطلاب لمسارات مهنية ناجحة في الذكاء الاصطناعي والبيانات.',
    },
    events: {
      title: 'الفعاليات القادمة',
      noEvents: 'لا توجد فعاليات قادمة',
      viewAll: 'عرض جميع الفعاليات',
      register: 'سجل',
      learnMore: 'اعرف المزيد',
    },
    team: {
      title: 'فريقنا',
      description: 'تعرف على الأفراد المتحمسين الذين يقودون نادينا إلى الأمام',
    },
    gallery: {
      title: 'المعرض',
      description: 'لحظات من فعالياتنا وأنشطتنا',
    },
    achievements: {
      title: 'الإنجازات',
      description: 'معالمنا وإنجازاتنا',
    },
    contact: {
      title: 'تواصل معنا',
      description: 'لديك أسئلة؟ نحب أن نسمع منك',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      subject: 'الموضوع',
      message: 'الرسالة',
      send: 'إرسال الرسالة',
      sending: 'جاري الإرسال...',
    },
    newsletter: {
      title: 'ابق على اطلاع',
      description: 'اشترك في نشرتنا الإخبارية للحصول على آخر التحديثات',
      email: 'بريدك الإلكتروني',
      subscribe: 'اشترك',
      subscribed: 'شكراً لك على الاشتراك!',
    },
    footer: {
      rights: 'جميع الحقوق محفوظة',
      madeWith: 'صنع بـ',
      by: 'من قبل نادي الذكاء الاصطناعي والبيانات',
    },
  },
} as const

export function getTranslation(locale: Locale, key: string): string {
  const keys = key.split('.')
  let value: any = translations[locale]
  
  for (const k of keys) {
    value = value?.[k]
  }
  
  return value || key
}

