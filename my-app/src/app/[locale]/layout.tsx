import type { Metadata } from "next";
import { Geist, Geist_Mono, Michroma } from "next/font/google";
import { I18nProvider } from "../lib/i18n-provider";
import ToasterProvider from "../Components/ToasterProvider";

import "../globals.css";
import LenisScrollProvider from "../Providers/lenis-provider";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }, { locale: "de" }];
}

const michroma = Michroma({
  variable: "--font-michroma",
  subsets: ["latin"],
  weight: ["400"], // مهم تضيف الوزن
});

export const metadata: Metadata = {
  title: "My App",
  description: "Using external fonts with Next.js",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;

  // تحميل الترجمة يدوي
  let messages;
  try {
    messages = (await import(`../locales/${locale}.json`)).default;
  } catch (error) {
    messages = (await import(`../locales/en.json`)).default;
  }

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={` ${michroma.variable} overflow-x-hidden`}>
        <I18nProvider locale={locale} messages={messages}>
          <LenisScrollProvider>
                {children}
                <ToasterProvider  />
          </LenisScrollProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
