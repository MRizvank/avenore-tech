"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { translations, TranslationKey } from "./translations";

export type LangCode =
  | "en"
  | "ar"
  | "de"
  | "fr"
  | "es"
  | "zh"
  | "ja"
  | "ru"
  | "pt";

export const LANGUAGES: {
  code: LangCode;
  label: string;
  nativeLabel: string;
  flag: string;
  rtl?: boolean;
}[] = [
  { code: "en", label: "English", nativeLabel: "English", flag: "🇺🇸" },
  {
    code: "ar",
    label: "Arabic",
    nativeLabel: "العربية",
    flag: "🇰🇼",
    rtl: true,
  },
  { code: "de", label: "German", nativeLabel: "Deutsch", flag: "🇩🇪" },
  { code: "fr", label: "French", nativeLabel: "Français", flag: "🇫🇷" },
  { code: "es", label: "Spanish", nativeLabel: "Español", flag: "🇪🇸" },
  { code: "zh", label: "Chinese", nativeLabel: "中文", flag: "🇨🇳" },
  { code: "ja", label: "Japanese", nativeLabel: "日本語", flag: "🇯🇵" },
  { code: "ru", label: "Russian", nativeLabel: "Русский", flag: "🇷🇺" },
  { code: "pt", label: "Portuguese", nativeLabel: "Português", flag: "🇵🇹" },
];

function detectLanguage(pathname: string): LangCode {
  if (pathname === "/ar" || pathname.startsWith("/ar/")) return "ar";
  if (typeof window === "undefined") return "ar"; // SSR default: Arabic

  const saved = localStorage.getItem("avenore-lang") as LangCode | null;
  if (saved && LANGUAGES.find((l) => l.code === saved)) return saved;

  const browserLang = navigator.language?.toLowerCase() || "";

  if (browserLang.startsWith("ar")) return "ar";
  if (browserLang.startsWith("de")) return "de";
  if (browserLang.startsWith("fr")) return "fr";
  if (browserLang.startsWith("es")) return "es";
  if (browserLang.startsWith("zh")) return "zh";
  if (browserLang.startsWith("ja")) return "ja";
  if (browserLang.startsWith("ru")) return "ru";
  if (browserLang.startsWith("pt")) return "pt";

  return "en"; // international default
}

interface LanguageContextType {
  lang: LangCode;
  setLang: (lang: LangCode) => void;
  t: (key: TranslationKey) => string;
  isRTL: boolean;
  currentLang: (typeof LANGUAGES)[0];
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [lang, setLangState] = useState<LangCode>("ar"); // default Arabic until detected
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const detected = detectLanguage(pathname);
    const timer = setTimeout(() => {
      setLangState(detected);
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (!mounted) return;
    const config = LANGUAGES.find((l) => l.code === lang);
    const isArabicRoute = pathname === "/ar" || pathname.startsWith("/ar/");
    const isRTL = isArabicRoute || (config?.rtl ?? false);
    document.documentElement.lang = isArabicRoute ? "ar" : lang;
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    localStorage.setItem("avenore-lang", lang);
  }, [lang, mounted, pathname]);

  const setLang = (newLang: LangCode) => {
    setLangState(newLang);
  };

  const t = (key: TranslationKey): string => {
    const langDict = (translations as Record<string, Record<string, string>>)[
      lang
    ];
    if (langDict && langDict[key]) return langDict[key];
    const enDict = (translations as Record<string, Record<string, string>>)[
      "en"
    ];
    if (enDict && enDict[key]) return enDict[key];
    return key;
  };

  const isArabicRoute = pathname === "/ar" || pathname.startsWith("/ar/");
  const isRTL =
    isArabicRoute || (LANGUAGES.find((l) => l.code === lang)?.rtl ?? false);
  const currentLang = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isRTL, currentLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
