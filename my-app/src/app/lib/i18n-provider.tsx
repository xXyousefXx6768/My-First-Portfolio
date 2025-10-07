"use client";
import React, { createContext, useContext } from "react";

type I18nContextType = {
  locale: string;
  messages: Record<string, any>;
};

const I18nContext = createContext<I18nContextType>({
  locale: "en",
  messages: {},
});

export function I18nProvider({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, any>;
}) {
  return (
    <I18nContext.Provider value={{ locale, messages }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslations(namespace?: string) {
  const { messages } = useContext(I18nContext);

  return (key: string) => {
    if (namespace && messages[namespace]) {
      return messages[namespace][key] || key;
    }
    return messages[key] || key;
  };
}
