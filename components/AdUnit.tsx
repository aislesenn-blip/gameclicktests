"use client";
"use client";

import React from "react";

interface AdUnitProps {
  size?: "responsive" | "sidebar";
  className?: string;
}

const AdUnit: React.FC<AdUnitProps> = ({ size = "responsive", className = "" }) => {
  return (
    <div
      className={`bg-gray-800 border border-neon-green/30 flex items-center justify-center text-neon-green/50 text-xs uppercase tracking-widest ${
        size === "responsive" ? "w-full h-24 md:h-32" : "w-64 h-96 sticky top-4"
      } ${className}`}
    >
      Ad Space ({size})
    </div>
  );
};

export default AdUnit;