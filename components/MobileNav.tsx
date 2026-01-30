"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const MobileNav = ({ locale }: { locale: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("mobile_nav");

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    {
      title: t("cps_cluster"),
      links: [
        { href: `/${locale}/cps/1-second`, label: t("cps_1s") },
        { href: `/${locale}/cps/5-seconds`, label: t("cps_5s") },
        { href: `/${locale}/cps/60-seconds`, label: t("cps_60s") },
        { href: `/${locale}/cps/jitter`, label: t("jitter") },
        { href: `/${locale}/cps/butterfly`, label: t("butterfly") },
        { href: `/${locale}/cps/drag`, label: t("drag") },
      ],
    },
    {
      title: t("reaction_cluster"),
      links: [
        { href: `/${locale}/reaction-time`, label: t("reaction") },
      ],
    },
    {
      title: t("typing_cluster"),
      links: [
        { href: `/${locale}/typing-test`, label: t("typing") },
      ],
    },
    {
      title: t("keyboard_cluster"),
      links: [
        { href: `/${locale}/keyboard-test`, label: t("keyboard") },
      ],
    },
  ];

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="text-neon-green p-2 focus:outline-none"
        aria-label="Toggle Menu"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-black/95 backdrop-blur-lg border-b border-neon-green/30 z-50 p-4 h-[calc(100vh-4rem)] overflow-y-auto">
          {menuItems.map((section) => (
            <div key={section.title} className="mb-6">
              <h3 className="text-neon-green font-bold uppercase tracking-widest mb-3 border-b border-gray-800 pb-1">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white text-lg hover:text-neon-green transition-colors block"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileNav;