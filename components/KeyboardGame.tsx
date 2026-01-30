"use client";
import React, { useState, useEffect } from "react";

const KEYBOARD_LAYOUT = [
  ["Esc", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"],
  ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
  ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
  ["Caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter"],
  ["Shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "Shift"],
  ["Ctrl", "Win", "Alt", "Space", "Alt", "Win", "Menu", "Ctrl"]
];

const KeyboardGame = () => {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [lastPress, setLastPress] = useState("");

  const handleKeyDown = (e: KeyboardEvent) => {
    e.preventDefault();
    const key = e.key.toUpperCase();
    let displayKey = key;

    if (e.code === 'Space') displayKey = 'SPACE';

    setLastPress(displayKey);
    setPressedKeys((prev) => {
        const next = new Set(prev);
        next.add(displayKey);
        return next;
    });
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const isKeyPressed = (keyLabel: string) => {
      if (keyLabel === "Space") return pressedKeys.has("SPACE") || pressedKeys.has(" ");
      if (keyLabel === "Shift") return pressedKeys.has("SHIFT");
      if (keyLabel === "Ctrl") return pressedKeys.has("CONTROL");
      if (keyLabel === "Alt") return pressedKeys.has("ALT");
      if (keyLabel === "Win") return pressedKeys.has("META");
      if (keyLabel === "Esc") return pressedKeys.has("ESCAPE");
      return pressedKeys.has(keyLabel.toUpperCase());
  }

  const getKeyClass = (key: string) => {
    const isPressed = isKeyPressed(key);
    return `
      flex items-center justify-center p-1 md:p-2 m-0.5 md:m-1 rounded border transition-all duration-100 font-bold text-[10px] md:text-sm select-none
      ${isPressed
        ? "bg-neon-green text-black border-neon-green shadow-[0_0_15px_rgba(57,255,20,0.8)] scale-95"
        : "bg-gray-800 text-gray-400 border-gray-700"}
      ${key === "Space" ? "w-40 md:w-64" : "min-w-[2rem] md:min-w-[3.5rem] h-8 md:h-14"}
    `;
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 flex flex-col items-center">
      <div className="mb-8 text-center animate-fade-in">
        <h2 className="text-2xl text-neon-green/80 mb-2">LAST PRESSED KEY</h2>
        <div className="text-6xl font-bold text-white h-24 flex items-center justify-center font-mono drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] border-2 border-neon-green/30 rounded-xl px-12 bg-gray-900/50">
          {lastPress || "..."}
        </div>
      </div>

      <div className="bg-gray-900/80 p-2 md:p-6 rounded-xl border border-neon-green/30 shadow-2xl backdrop-blur-md overflow-x-auto">
        <div className="min-w-[600px]">
            {KEYBOARD_LAYOUT.map((row, i) => (
            <div key={i} className="flex justify-center">
                {row.map((key, j) => (
                <div key={`${key}-${j}`} className={getKeyClass(key)}>
                    {key}
                </div>
                ))}
            </div>
            ))}
        </div>
      </div>

      <button
        onClick={() => { setPressedKeys(new Set()); setLastPress(""); }}
        className="mt-8 px-6 py-2 bg-gray-800 text-gray-300 border border-gray-600 rounded hover:bg-red-900/50 hover:text-red-400 hover:border-red-500 transition-colors"
      >
        RESET TEST
      </button>
    </div>
  );
};

export default KeyboardGame;
