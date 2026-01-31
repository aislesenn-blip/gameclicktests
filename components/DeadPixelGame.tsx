"use client";
import React, { useState, useEffect } from "react";
// import { useTranslations } from "next-intl";

const DeadPixelGame = () => {
    // const t = useTranslations("game");
    const [colorIndex, setColorIndex] = useState(0);
    const colors = ["#FFFFFF", "#000000", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF", "#FF00FF"];

    const toggleColor = () => {
        setColorIndex((prev) => (prev + 1) % colors.length);
    };

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                setColorIndex((prev) => (prev + 1) % colors.length);
            } else if (e.key === 'ArrowLeft') {
                setColorIndex((prev) => (prev - 1 + colors.length) % colors.length);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            onClick={toggleColor}
            className="w-full h-[500px] flex items-center justify-center cursor-pointer border border-neon-green relative group"
            style={{ backgroundColor: colors[colorIndex] }}
        >
            <div className="absolute top-4 left-4 bg-black/50 p-2 rounded text-white text-xs pointer-events-none group-hover:opacity-100 transition-opacity">
                Click or Press Space to Change Color
            </div>
            <button
                onClick={(e) => { e.stopPropagation(); toggleFullScreen(); }}
                className="absolute bottom-4 right-4 bg-black/80 text-neon-green px-4 py-2 rounded border border-neon-green z-10"
            >
                FULL SCREEN
            </button>
        </div>
    );
};

export default DeadPixelGame;
