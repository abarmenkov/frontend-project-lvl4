import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import filter from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import LanguageDetector from 'i18next-browser-languagedetector';
import store from './store/index.js';
import AuthProvider from './providers/AuthProvider.js';
import App from './App.js';
import ru from './locales/ru.js';
import en from './locales/en.js';
import ChatProvider from './providers/ChatProvider.js';

const rollbarConfig = {
  accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  payload: {
    environment: 'production',
  },
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const initApp = async (socket) => {
  const i18n = i18next.createInstance();
  await i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: 'ru',
      lng: 'ru',
      resources: {
        ru,
        en,
      },
    });
  filter.clearList();
  filter.add(filter.getDictionary('ru'));
  filter.add(filter.getDictionary('en'));
  return (
    <StoreProvider store={store}>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <ChatProvider socket={socket}>
            <I18nextProvider i18n={i18n}>
              <AuthProvider>
                <App />
              </AuthProvider>
            </I18nextProvider>
          </ChatProvider>
        </ErrorBoundary>
      </RollbarProvider>
    </StoreProvider>
  );
};

export default initApp;
