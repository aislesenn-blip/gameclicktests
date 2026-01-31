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
      title: t("time_modes"),
      links: [
        { href: `/${locale}/cps/1-second`, label: t("cps_1s") },
        { href: `/${locale}/cps/5-seconds`, label: t("cps_5s") },
        { href: `/${locale}/cps/10-seconds`, label: t("cps_10s") },
        { href: `/${locale}/cps/60-seconds`, label: t("cps_60s") },
        { href: `/${locale}/cps/stress-test`, label: t("stress") },
      ],
    },
    {
      title: t("click_modes"),
      links: [
        { href: `/${locale}/cps/jitter`, label: t("jitter") },
        { href: `/${locale}/cps/butterfly`, label: t("butterfly") },
        { href: `/${locale}/cps/drag`, label: t("drag") },
        { href: `/${locale}/cps/spacebar`, label: t("spacebar") },
        { href: `/${locale}/cps/combo`, label: t("combo") },
      ],
    },
    {
      title: t("game_challenges"),
      links: [
        { href: `/${locale}/cps/minecraft`, label: t("minecraft") },
        { href: `/${locale}/cps/pubg`, label: t("pubg") },
        { href: `/${locale}/cps/roblox`, label: t("roblox") },
        { href: `/${locale}/cps/valorant`, label: t("valorant") },
        { href: `/${locale}/cps/fortnite`, label: t("fortnite") },
      ],
    },
    {
      title: t("hardware_tests"),
      links: [
        { href: `/${locale}/reaction-time`, label: t("reaction") },
        { href: `/${locale}/typing-test`, label: t("typing") },
        { href: `/${locale}/keyboard-test`, label: t("keyboard") },
        { href: `/${locale}/mouse-test`, label: t("mouse") },
        { href: `/${locale}/dead-pixel`, label: t("dead_pixel") },
        { href: `/${locale}/scroll-test`, label: t("scroll") },
        { href: `/${locale}/aim-trainer`, label: t("aim") },
      ],
    },
    {
      title: t("community"),
      links: [
        { href: `/${locale}/live-cps`, label: t("live") },
        { href: `/${locale}/leaderboard`, label: t("leaderboard") },
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
