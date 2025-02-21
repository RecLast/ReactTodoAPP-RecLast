import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Cog6ToothIcon, LanguageIcon, TrashIcon, ArrowDownTrayIcon, ArrowUpTrayIcon, UserIcon } from '@heroicons/react/24/outline';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';

const Settings: React.FC = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'language' | 'cache' | 'login'>('language');
  const tasks = useSelector((state: RootState) => state.tasks.items);
  const projects = useSelector((state: RootState) => state.projects.items);

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
  };

  const handleCacheAction = (action: 'clear' | 'download' | 'upload') => {
    switch (action) {
      case 'clear':
        // Clear specific items instead of all localStorage
        localStorage.removeItem('tasks');
        localStorage.removeItem('projects');
        localStorage.removeItem('preferredLanguage');
        // Force a full page reload
        window.location.href = window.location.origin + window.location.pathname;
        break;
      case 'download':
        const cacheData = {
          language: i18n.language,
          tasks,
          projects
        };
        const blob = new Blob([JSON.stringify(cacheData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'todo-app-cache.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        break;
      case 'upload':
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';
        input.onchange = (e) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              try {
                const content = e.target?.result as string;
                const data = JSON.parse(content);
                
                // Validate cache data structure
                if (!data.tasks || !Array.isArray(data.tasks) || 
                    !data.projects || !Array.isArray(data.projects) || 
                    !data.language || typeof data.language !== 'string') {
                  throw new Error('Invalid cache file format');
                }

                // Update Redux store with new data
                dispatch({
                  type: 'tasks/setTasks',
                  payload: { items: data.tasks, loading: false, error: null }
                });
                dispatch({
                  type: 'projects/setProjects',
                  payload: { items: data.projects }
                });

                // Set language preference
                i18n.changeLanguage(data.language);
                localStorage.setItem('preferredLanguage', data.language);

                // Force a clean reload after state updates
                window.location.reload();
                
                // The page will reload automatically after state updates
              } catch (error) {
                console.error('Error handling cache file:', error);
              }
            };
            reader.readAsText(file);
          }
        };
        input.click();
        break;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 my-1 mx-2 rounded-lg text-gray-600 hover:bg-gray-100"
      >
        <Cog6ToothIcon className="w-5 h-5" />
        {t('settings')}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-lg shadow-lg p-4 z-50">
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setActiveTab('language')}
              className={`flex-1 py-1 px-2 rounded ${activeTab === 'language' ? 'bg-primary text-white' : 'text-gray-600'}`}
            >
              <LanguageIcon className="w-4 h-4 mx-auto" />
            </button>
            <button
              onClick={() => setActiveTab('cache')}
              className={`flex-1 py-1 px-2 rounded ${activeTab === 'cache' ? 'bg-primary text-white' : 'text-gray-600'}`}
            >
              <ArrowDownTrayIcon className="w-4 h-4 mx-auto" />
            </button>
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-1 px-2 rounded ${activeTab === 'login' ? 'bg-primary text-white' : 'text-gray-600'}`}
            >
              <UserIcon className="w-4 h-4 mx-auto" />
            </button>
          </div>

          {activeTab === 'language' && (
            <div className="space-y-2">
              <button
                onClick={() => handleLanguageChange('en')}
                className={`w-full text-left px-3 py-2 rounded ${i18n.language === 'en' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100'}`}
              >
                English
              </button>
              <button
                onClick={() => handleLanguageChange('tr')}
                className={`w-full text-left px-3 py-2 rounded ${i18n.language === 'tr' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100'}`}
              >
                Türkçe
              </button>
            </div>
          )}

          {activeTab === 'cache' && (
            <div className="space-y-2">
              <button
                onClick={() => handleCacheAction('clear')}
                className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100"
              >
                <TrashIcon className="w-4 h-4" />
                {t('clearCache')}
              </button>
              <button
                onClick={() => handleCacheAction('download')}
                className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100"
              >
                <ArrowDownTrayIcon className="w-4 h-4" />
                {t('downloadCache')}
              </button>
              <button
                onClick={() => handleCacheAction('upload')}
                className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100"
              >
                <ArrowUpTrayIcon className="w-4 h-4" />
                {t('uploadCache')}
              </button>
            </div>
          )}

          {activeTab === 'login' && (
            <div className="p-3 text-center text-gray-500">
              {t('loginNotAvailable')}
            </div>
          )}
          </div>
        </>
      )}
    </div>
  );
};

export default Settings;