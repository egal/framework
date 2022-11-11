import i18next from 'i18next';
import common from './translations/ru/common.json';
import models from './translations/ru/models.json';
import resource from './translations/ru/resource.json';

i18next.init({
  fallbackLng: 'ru',
  lng: 'ru',
  interpolation: { escapeValue: false }, // React already does escaping
  resources: {
    ru: {
      common,
      models,
      resource,
    },
  },
});

export default i18next;
