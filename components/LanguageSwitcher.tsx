"use client";
import { usePathname } from "next/navigation";
import React from "react";

const locales = ['en', 'pt', 'id', 'es', 'ru'];

export default function LanguageSwitcher() {
  const pathname = usePathname();

  const getPathForLocale = (locale: string) => {
    if (!pathname) return `/${locale}`;
    const segments = pathname.split('/');

    // Check if the first segment is a locale
    // segments[0] is usually empty string for paths starting with /
    if (segments.length > 1 && locales.includes(segments[1])) {
      segments[1] = locale;
      return segments.join('/');
    }

    // If no locale in path (unlikely with middleware, but possible for assets or special routes),
    // prepend the locale.
    return `/${locale}${pathname === '/' ? '' : pathname}`;
  };

  return (
      <div className="hidden md:flex gap-2 text-xs font-bold">
        {locales.map((l) => {
             const isActive = pathname?.startsWith(`/${l}`);
             return (
                <a
                  key={l}
                  href={getPathForLocale(l)}
                  className={`px-2 py-1 rounded transition-colors ${isActive ? 'bg-neon-green text-black' : 'text-gray-500 hover:text-white'}`}
                >
                  {l.toUpperCase()}
                </a>
             );
        })}
      </div>
  );
}
