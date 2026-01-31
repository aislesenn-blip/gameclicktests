"use client";
import React, { useState, useEffect } from "react";

const COLORS = [
  { name: "White", val: "#FFFFFF", text: "black" },
  { name: "Black", val: "#000000", text: "white" },
  { name: "Red", val: "#FF0000", text: "white" },
  { name: "Green", val: "#00FF00", text: "black" },
  { name: "Blue", val: "#0000FF", text: "white" },
  { name: "Yellow", val: "#FFFF00", text: "black" },
  { name: "Cyan", val: "#00FFFF", text: "black" },
  { name: "Magenta", val: "#FF00FF", text: "white" },
];

const DeadPixelGame = () => {
  const [index, setIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const nextColor = () => {
    setIndex((prev) => (prev + 1) % COLORS.length);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextColor();
      if (e.key === 'ArrowLeft') setIndex((prev) => (prev - 1 + COLORS.length) % COLORS.length);
      if (e.key === 'F11') setIsFullscreen(!isFullscreen);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // COLORS constant

  const color = COLORS[index];

  return (
    <div
      onClick={nextColor}
      style={{ backgroundColor: color.val, color: color.text }}
      className="w-full h-[500px] md:h-[700px] flex flex-col items-center justify-center cursor-pointer select-none transition-colors duration-100 relative rounded-xl overflow-hidden"
    >
      <div className="absolute top-4 right-4 text-sm opacity-50">
        Click or Arrows to change
      </div>

      {!isFullscreen && (
        <button
            onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
            className="absolute bottom-10 px-6 py-2 border-2 rounded hover:bg-black/10 transition font-bold z-10"
            style={{ borderColor: color.text }}
        >
            GO FULLSCREEN (F11)
        </button>
      )}

      <h2 className="text-4xl font-bold opacity-20 hover:opacity-100 transition-opacity">
        {color.name}
      </h2>
    </div>
  );
};

export default DeadPixelGame;
