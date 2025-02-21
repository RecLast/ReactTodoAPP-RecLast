import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      dashboard: 'Dashboard',
      dailyTasks: 'Daily Tasks',
      weeklyTasks: 'Weekly Tasks',
      monthlyTasks: 'Monthly Tasks',
      projects: 'Projects',
      addProject: 'Add Project',
      projectName: 'Project Name',
      description: 'Description',
      icon: 'Icon',
      createProject: 'Create Project',
      noProjects: 'No projects yet. Create your first project!',
      taskCompleted: 'Task Completed',
      upcomingTask: 'Upcoming Task',
      hoursLogged: 'Hours Logged',
      filesUploaded: 'Files Uploaded',
      created: 'Created',
      due: 'Due',
      priority: 'Priority',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      pendingTasks: 'Pending Tasks',
      completedTasks: 'Completed Tasks',
      noPendingTasks: 'No pending tasks',
      noCompletedTasks: 'No completed tasks',
      addTask: 'Add Task',
      loginNotAvailable: 'This feature is not yet implemented',
      clearCache: 'Clear Cache',
      downloadCache: 'Download Cache',
      uploadCache: 'Upload Cache'
    }
  },
  tr: {
    translation: {
      dashboard: 'Gösterge Paneli',
      dailyTasks: 'Günlük Görevler',
      weeklyTasks: 'Haftalık Görevler',
      monthlyTasks: 'Aylık Görevler',
      projects: 'Projeler',
      addProject: 'Proje Ekle',
      projectName: 'Proje Adı',
      description: 'Açıklama',
      icon: 'İkon',
      createProject: 'Proje Oluştur',
      noProjects: 'Henüz proje yok. İlk projenizi oluşturun!',
      taskCompleted: 'Tamamlanan Görev',
      upcomingTask: 'Yaklaşan Görev',
      hoursLogged: 'Kaydedilen Saatler',
      filesUploaded: 'Yüklenen Dosyalar',
      created: 'Oluşturuldu',
      due: 'Bitiş',
      priority: 'Öncelik',
      high: 'Yüksek',
      medium: 'Orta',
      low: 'Düşük',
      pendingTasks: 'Bekleyen Görevler',
      completedTasks: 'Tamamlanan Görevler',
      noPendingTasks: 'Bekleyen görev yok',
      noCompletedTasks: 'Tamamlanan görev yok',
      addTask: 'Görev Ekle',
      title: 'Başlık',
      dueDate: 'Tarih',
      folder: 'Klasör',
      beaker: 'Deney Tüpü',
      bookmark: 'Yer İmi',
      briefcase: 'Çanta',
      calendar: 'Takvim',
      chat: 'Sohbet',
      clipboard: 'Pano',
      code: 'Kod',
      settings: 'Ayarlar',
      terminal: 'Terminal',
      document: 'Belge',
      globe: 'Dünya',
      puzzle: 'Bulmaca',
      rocket: 'Roket',
      star: 'Yıldız',
      wrench: 'Anahtar',
      loginNotAvailable: 'Bu özellik henüz eklenmedi',
      clearCache: 'Önbelleği Temizle',
      downloadCache: 'Önbelleği İndir',
      uploadCache: 'Önbellek Yükle'
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;