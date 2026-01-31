"use client";
import React, { useState, useEffect, useRef } from "react";
import { clickSound, unlockSound } from "@/lib/sound";

interface MousePrecisionProps {
  mode?: string;
  duration?: number;
}

const MousePrecisionGame: React.FC<MousePrecisionProps> = ({ duration = 30 }) => {
  const [gameState, setGameState] = useState<"start" | "playing" | "finished">("start");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [target, setTarget] = useState({ top: '50%', left: '50%', size: 40 });
  const containerRef = useRef<HTMLDivElement>(null);

  const moveTarget = () => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    const size = Math.random() > 0.5 ? 40 : 30; // vary size slightly
    const maxTop = height - size;
    const maxLeft = width - size;
    const top = Math.random() * maxTop;
    const left = Math.random() * maxLeft;

    setTarget({ top: `${top}px`, left: `${left}px`, size });
  };

  const handleStart = () => {
    setGameState("playing");
    setScore(0);
    setTimeLeft(duration);
    moveTarget();
    unlockSound();
  };

  const handleTargetClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (gameState !== "playing") return;

    setScore(s => s + 1);
    clickSound.play();
    moveTarget();
  };

  const handleMiss = () => {
      // Optional: Penalty?
  };

  useEffect(() => {
    if (gameState === "playing") {
      const interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setGameState("finished");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameState]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex justify-between w-full max-w-2xl mb-4 text-xl font-mono text-neon-green">
        <div>Time: {timeLeft}s</div>
        <div>Score: {score}</div>
      </div>

      <div
        ref={containerRef}
        onClick={handleMiss}
        className="w-full max-w-3xl h-[400px] md:h-[500px] bg-gray-900 border-2 border-neon-green/30 rounded-xl relative overflow-hidden cursor-crosshair select-none shadow-[0_0_20px_rgba(57,255,20,0.1)]"
      >
        {gameState === "start" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
             <button
                onClick={handleStart}
                className="px-8 py-4 bg-neon-green text-black font-bold text-2xl rounded hover:scale-105 transition"
             >
                 START AIM TEST
             </button>
          </div>
        )}

        {gameState === "finished" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10 animate-fade-in">
             <h2 className="text-5xl font-bold text-white mb-4">Time&apos;s Up!</h2>
             <p className="text-2xl text-neon-green mb-8">{score} Targets Hit</p>
             <button
                onClick={handleStart}
                className="px-6 py-3 border border-neon-green text-neon-green font-bold rounded hover:bg-neon-green/10"
             >
                 TRY AGAIN
             </button>
          </div>
        )}

        {gameState === "playing" && (
          <div
            onMouseDown={handleTargetClick}
            onTouchStart={(e) => { e.preventDefault(); handleTargetClick(e as unknown as React.MouseEvent); }}
            className="absolute rounded-full bg-neon-green shadow-[0_0_15px_rgba(57,255,20,0.8)] active:scale-90 transition-transform duration-75"
            style={{
                top: target.top,
                left: target.left,
                width: target.size,
                height: target.size
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MousePrecisionGame;
