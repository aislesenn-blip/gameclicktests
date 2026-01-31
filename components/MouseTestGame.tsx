"use client";
import React, { useState } from "react";

const MouseTestGame = () => {
    const [clicks, setClicks] = useState<string[]>([]);

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        const btn = e.button === 0 ? "Left" : e.button === 1 ? "Middle" : "Right";
        setClicks(prev => [`${btn} Click Detected!`, ...prev].slice(0, 10));
    };

    return (
        <div
            onMouseDown={handleMouseDown}
            onContextMenu={(e) => e.preventDefault()}
            className="w-full h-[400px] bg-gray-900 border border-neon-green rounded flex flex-col items-center justify-center cursor-crosshair"
        >
            <h3 className="text-neon-green text-xl mb-4">Click Any Mouse Button Here</h3>
            <div className="space-y-2 text-center">
                {clicks.map((c, i) => (
                    <div key={i} className="text-white font-bold animate-fade-in">{c}</div>
                ))}
            </div>
        </div>
    );
};

export default MouseTestGame;
