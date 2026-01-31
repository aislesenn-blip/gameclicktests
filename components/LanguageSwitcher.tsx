"use client";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { locales, localeNames } from "@/config/locales";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const getPathForLocale = (locale: string) => {
    if (!pathname) return `/${locale}`;
    const segments = pathname.split('/');

    if (segments.length > 1 && locales.includes(segments[1])) {
      segments[1] = locale;
      return segments.join('/');
    }

    return `/${locale}${pathname === '/' ? '' : pathname}`;
  };

  const currentLocale = pathname?.split('/')[1] || 'en';
  const currentName = localeNames[currentLocale] || currentLocale.toUpperCase();

  return (
      <div className="relative z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded bg-gray-800 border border-gray-700 hover:border-neon-green text-gray-300 hover:text-white transition-all uppercase"
        >
          <span>{currentName}</span>
          <svg className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>

        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
            <div className="absolute right-0 top-full mt-2 w-48 max-h-80 overflow-y-auto bg-gray-900 border border-gray-700 rounded shadow-xl z-50 custom-scrollbar">
              <div className="py-1">
                {locales.map((l) => {
                  const isActive = currentLocale === l;
                  return (
                    <a
                      key={l}
                      href={getPathForLocale(l)}
                      className={`block px-4 py-2 text-xs font-bold hover:bg-gray-800 transition-colors ${isActive ? 'text-neon-green' : 'text-gray-400 hover:text-white'}`}
                    >
                      {localeNames[l] || l.toUpperCase()}
                    </a>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
  );
}
