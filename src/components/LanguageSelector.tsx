import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => changeLanguage('en')}
        className={`flex items-center justify-center w-8 h-8 rounded-full overflow-hidden border-2 ${i18n.language === 'en' ? 'border-primary' : 'border-transparent'}`}
        title="English"
      >
        <img
          src="https://flagcdn.com/w40/gb.png"
          alt="English"
          className="w-full h-full object-cover"
        />
      </button>
      <button
        onClick={() => changeLanguage('tr')}
        className={`flex items-center justify-center w-8 h-8 rounded-full overflow-hidden border-2 ${i18n.language === 'tr' ? 'border-primary' : 'border-transparent'}`}
        title="Türkçe"
      >
        <img
          src="https://flagcdn.com/w40/tr.png"
          alt="Türkçe"
          className="w-full h-full object-cover"
        />
      </button>
    </div>
  );
};

export default LanguageSelector;