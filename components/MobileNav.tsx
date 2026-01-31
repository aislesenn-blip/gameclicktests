"use client";
import React, { useState } from "react";
import Link from "next/link";
// Removed useTranslations hook to use props passed from Server Component
// import { useTranslations } from "next-intl";

interface MobileNavProps {
  locale: string;
  labels: Record<string, string>;
}

const MobileNav = ({ locale, labels }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  // const t = useTranslations("mobile_nav"); // Replaced by labels prop

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    {
      title: labels.time_modes,
      links: [
        { href: `/${locale}/cps/1-second`, label: labels.cps_1s },
        { href: `/${locale}/cps/5-seconds`, label: labels.cps_5s },
        { href: `/${locale}/cps/10-seconds`, label: labels.cps_10s },
        { href: `/${locale}/cps/60-seconds`, label: labels.cps_60s },
        { href: `/${locale}/cps/stress-test`, label: labels.stress },
      ],
    },
    {
      title: labels.click_modes,
      links: [
        { href: `/${locale}/cps/jitter`, label: labels.jitter },
        { href: `/${locale}/cps/butterfly`, label: labels.butterfly },
        { href: `/${locale}/cps/drag`, label: labels.drag },
        { href: `/${locale}/cps/spacebar`, label: labels.spacebar },
        { href: `/${locale}/cps/combo`, label: labels.combo },
      ],
    },
    {
      title: labels.game_challenges,
      links: [
        { href: `/${locale}/cps/minecraft`, label: labels.minecraft },
        { href: `/${locale}/cps/pubg`, label: labels.pubg },
        { href: `/${locale}/cps/roblox`, label: labels.roblox },
        { href: `/${locale}/cps/valorant`, label: labels.valorant },
        { href: `/${locale}/cps/fortnite`, label: labels.fortnite },
      ],
    },
    {
      title: labels.hardware_tests,
      links: [
        { href: `/${locale}/reaction-time`, label: labels.reaction },
        { href: `/${locale}/typing-test`, label: labels.typing },
        { href: `/${locale}/keyboard-test`, label: labels.keyboard },
        { href: `/${locale}/mouse-test`, label: labels.mouse },
        { href: `/${locale}/dead-pixel`, label: labels.dead_pixel },
        { href: `/${locale}/scroll-test`, label: labels.scroll },
        { href: `/${locale}/aim-trainer`, label: labels.aim },
      ],
    },
    {
      title: labels.community,
      links: [
        { href: `/${locale}/live-cps`, label: labels.live },
        { href: `/${locale}/leaderboard`, label: labels.leaderboard },
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
