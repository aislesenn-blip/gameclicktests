"use client";

import React from "react";

// Placeholder for AdSense Client ID.
// In production, this would likely come from process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID
const AD_CLIENT_ID = "";

interface AdUnitProps {
  size?: "responsive" | "sidebar" | "bottom";
  className?: string;
}

const AdUnit: React.FC<AdUnitProps> = ({ size = "responsive", className = "" }) => {
  // Conditional Rendering: If no Client ID is set, render nothing.
  if (!AD_CLIENT_ID) {
    return null;
  }

  return (
    <div
      className={`bg-gray-900/50 border border-neon-green/20 flex flex-col items-center justify-center text-neon-green/30 text-xs uppercase tracking-widest backdrop-blur-sm shadow-[0_0_10px_rgba(57,255,20,0.05)] overflow-hidden ${
        size === "responsive" ? "w-full h-24 md:h-32 rounded-lg" :
        size === "sidebar" ? "w-[300px] h-[600px] sticky top-24 rounded-lg hidden lg:flex" :
        "w-full h-60 mt-8 rounded-lg"
      } ${className}`}
    >
      <span className="mb-2 opacity-50">ADVERTISEMENT</span>
      <div className="w-8 h-8 border-2 border-neon-green/30 rounded-full animate-pulse"></div>
    </div>
  );
};

export default AdUnit;