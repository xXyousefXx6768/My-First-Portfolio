import { I18nProvider } from "../lib/i18n-provider";
import LenisScrollProvider from "../Providers/lenis-provider";
import CustomCursor from "../Components/custom-sections/CustomCursor";
import ToasterProvider from "../Components/ToasterProvider";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "de" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  let messages;
  try {
    messages = (await import(`../locales/${locale}.json`)).default;
  } catch {
    messages = (await import(`../locales/en.json`)).default;
  }

  return (
    <I18nProvider locale={locale} messages={messages}>
      <LenisScrollProvider>
        <CustomCursor />
        {children}
        <ToasterProvider />
      </LenisScrollProvider>
    </I18nProvider>
  );
}
