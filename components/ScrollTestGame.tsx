"use client";
import React, { useState } from "react";

const ScrollTestGame = () => {
    const [pixels, setPixels] = useState(0);

    const handleWheel = (e: React.WheelEvent) => {
        setPixels(prev => prev + Math.abs(e.deltaY));
    };

    return (
        <div
            onWheel={handleWheel}
            className="w-full h-[400px] bg-gray-900 border border-neon-green rounded flex flex-col items-center justify-center overflow-hidden"
        >
            <h3 className="text-neon-green text-2xl mb-4">SCROLL INSIDE THIS BOX</h3>
            <div className="text-6xl text-white font-mono">{Math.round(pixels)} px</div>
            <div className="text-gray-400 mt-2">Total Scrolled</div>
        </div>
    );
};

export default ScrollTestGame;
