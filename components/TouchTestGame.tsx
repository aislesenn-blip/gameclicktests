"use client";
import React, { useRef, useEffect, useState } from "react";

const TouchTestGame = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isTouching, setIsTouching] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const draw = (e: React.TouchEvent | React.MouseEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Handle both mouse and touch
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const points = (e as any).touches ? (e as any).touches : [e];

        for (let i = 0; i < points.length; i++) {
            const touch = points[i];
            const x = touch.clientX; // Simplified relative to viewport for fullscreen
            const y = touch.clientY;

            ctx.beginPath();
            ctx.arc(x, y, 20, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(57, 255, 20, 0.5)"; // Neon Green
            ctx.fill();
        }
    };

    return (
        <div className="w-full h-[600px] relative bg-black overflow-hidden border border-neon-green/50 rounded-lg group">
            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full touch-none cursor-crosshair"
                onTouchStart={(e) => { setIsTouching(true); draw(e); }}
                onTouchMove={(e) => { if(isTouching) draw(e); }}
                onTouchEnd={() => setIsTouching(false)}
                onMouseDown={(e) => { setIsTouching(true); draw(e); }}
                onMouseMove={(e) => { if(isTouching && (e.buttons === 1)) draw(e); }}
                onMouseUp={() => setIsTouching(false)}
            />
            <div className="absolute top-4 left-4 bg-black/70 p-4 rounded border border-neon-green pointer-events-none">
                <h2 className="text-neon-green font-bold text-xl">TOUCH SCREEN TEST</h2>
                <p className="text-white text-sm">Swipe anywhere. Check for dead zones.</p>
            </div>
        </div>
    );
};

export default TouchTestGame;
