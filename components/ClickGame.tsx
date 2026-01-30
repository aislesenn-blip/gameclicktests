"use client";
import React, { useState, useEffect, useRef } from "react";
import { Howl } from "howler";

interface ClickGameProps {
  duration?: number;
  mode?: string;
}

const CLICK_SOUND_URL = "/sounds/click.mp3";

const ClickGame: React.FC<ClickGameProps> = ({ duration = 10, mode = "standard" }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [cps, setCps] = useState(0);
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    soundRef.current = new Howl({
      src: [CLICK_SOUND_URL],
      volume: 0.5,
      preload: true,
      html5: true,
    });
    return () => {
      soundRef.current?.unload();
    };
  }, []);

  const handleClick = () => {
    if (isFinished) return;
    if (!isActive) setIsActive(true);

    setScore((prev) => prev + 1);
    soundRef.current?.play();
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0.1) {
            clearInterval(interval);
            setIsFinished(true);
            setIsActive(false);
            return 0;
          }
          return prev - 0.1;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    if (isFinished) {
      setCps(score / duration);
    }
  }, [isFinished, score, duration]);

  const resetGame = () => {
    setScore(0);
    setTimeLeft(duration);
    setIsActive(false);
    setIsFinished(false);
    setCps(0);
  };

  const shareResult = () => {
    const text = `I hit ${cps.toFixed(2)} CPS in the ${duration}s ${mode} test on Palmtweets!`;
    const shareData = {
      title: "Palmtweets CPS Test",
      text: text,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      navigator.share(shareData).catch(console.error);
    } else {
      navigator.clipboard.writeText(`${text} ${window.location.href}`);
      alert("Result copied to clipboard!");
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="grid grid-cols-2 w-full max-w-md gap-4 mb-4">
        <div className="bg-gray-800 border border-neon-green/50 p-4 rounded text-center">
          <div className="text-neon-green/70 text-sm">TIMER</div>
          <div className="text-4xl font-mono text-white">{timeLeft.toFixed(1)}s</div>
        </div>
        <div className="bg-gray-800 border border-neon-green/50 p-4 rounded text-center">
          <div className="text-neon-green/70 text-sm">SCORE</div>
          <div className="text-4xl font-mono text-white">{score}</div>
        </div>
      </div>

      <button
        onClick={handleClick}
        disabled={isFinished}
        className={`w-full h-64 bg-black border-4 rounded-xl flex items-center justify-center text-3xl font-bold transition-all active:scale-95 select-none relative overflow-hidden group ${
          isActive
            ? "border-neon-green text-neon-green shadow-[0_0_30px_rgba(57,255,20,0.4)]"
            : "border-gray-700 text-gray-500 hover:border-neon-green hover:text-neon-green"
        }`}
      >
        <span className="relative z-10 group-hover:scale-110 transition-transform">
          {isActive ? "CLICK FAST!" : "START CLICKING"}
        </span>
        {isActive && <div className="absolute inset-0 bg-neon-green/5 animate-pulse" />}
      </button>

      {isFinished && (
        <div className="mt-8 text-center animate-fade-in w-full bg-gray-900/80 p-6 rounded-lg border border-neon-green">
          <h2 className="text-5xl font-bold text-neon-green drop-shadow-[0_0_10px_rgba(57,255,20,1)]">
            {cps.toFixed(2)} CPS
          </h2>
          <p className="text-xl mt-2 text-white">
            Rank: {cps < 5 ? "🐢 Snail" : cps < 8 ? "⚡ Pro" : "👑 GODLIKE"}
          </p>
          <div className="flex gap-4 justify-center mt-6">
            <button
                onClick={resetGame}
                className="px-8 py-3 bg-neon-green text-black font-bold rounded hover:bg-white transition-colors shadow-[0_0_20px_rgba(57,255,20,0.5)]"
            >
                TRY AGAIN
            </button>
            <button
                onClick={shareResult}
                className="px-8 py-3 border border-neon-green text-neon-green font-bold rounded hover:bg-neon-green/10 transition-colors"
            >
                SHARE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClickGame;