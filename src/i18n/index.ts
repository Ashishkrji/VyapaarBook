import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './locales/en.json';
import hi from './locales/hi.json';
import mr from './locales/mr.json';
import gu from './locales/gu.json';
import ta from './locales/ta.json';
import te from './locales/te.json';
import bn from './locales/bn.json';
import kn from './locales/kn.json';
import ml from './locales/ml.json';
import pa from './locales/pa.json';
import ur from './locales/ur.json';

const LANGUAGE_KEY = '@vyapaarbook_language';

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  mr: { translation: mr },
  gu: { translation: gu },
  ta: { translation: ta },
  te: { translation: te },
  bn: { translation: bn },
  kn: { translation: kn },
  ml: { translation: ml },
  pa: { translation: pa },
  ur: { translation: ur },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export const loadLanguage = async () => {
  try {
    const language = await AsyncStorage.getItem(LANGUAGE_KEY);
    if (language) {
      await i18n.changeLanguage(language);
    }
  } catch (error) {
    console.error('Error loading language:', error);
  }
};

export const saveLanguage = async (languageCode: string) => {
  try {
    await AsyncStorage.setItem(LANGUAGE_KEY, languageCode);
    await i18n.changeLanguage(languageCode);
  } catch (error) {
    console.error('Error saving language:', error);
  }
};

export default i18n;
