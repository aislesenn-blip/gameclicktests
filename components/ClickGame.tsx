"use client";
import React, { useState, useEffect } from "react";
import { clickSound, unlockSound } from "@/lib/sound";
import { useTranslations } from "next-intl";

interface ClickGameProps {
  duration?: number;
  mode?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ClickGame: React.FC<ClickGameProps> = ({ duration = 10, mode = "standard" }) => {
  const t = useTranslations("game");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [cps, setCps] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const handleClick = () => {
    if (isFinished) return;

    // Attempt unlock on first interaction
    unlockSound();

    if (!isActive) setIsActive(true);

    setScore((prev) => prev + 1);

    if (!isMuted) {
      clickSound.play();
    }
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
    const text = `${t('score')}: ${cps.toFixed(2)} CPS!`;
    const shareData = {
      title: "Palmtweets CPS Test",
      text: text,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      navigator.share(shareData).catch(console.error);
    } else {
      navigator.clipboard.writeText(`${text} ${window.location.href}`);
      alert(t('share'));
    }
  };

  return (
    <div className="w-full flex flex-col items-center relative">
      {/* Sound Toggle */}
      <button
        onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
        className="absolute top-0 right-0 p-2 text-neon-green hover:bg-neon-green/10 rounded-full transition-colors z-20"
        title={isMuted ? "Unmute Sound" : "Mute Sound"}
      >
        {isMuted ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
          </svg>
        )}
      </button>

      <div className="grid grid-cols-2 w-full max-w-md gap-4 mb-4">
        <div className="bg-gray-800 border border-neon-green/50 p-4 rounded text-center">
          <div className="text-neon-green/70 text-sm">{t('timer')}</div>
          <div className="text-4xl font-mono text-white">{timeLeft.toFixed(1)}s</div>
        </div>
        <div className="bg-gray-800 border border-neon-green/50 p-4 rounded text-center">
          <div className="text-neon-green/70 text-sm">{t('score')}</div>
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
          {isActive ? t('active') : t('start')}
        </span>
        {isActive && <div className="absolute inset-0 bg-neon-green/5 animate-pulse" />}
      </button>

      {isFinished && (
        <div className="mt-8 text-center animate-fade-in w-full bg-gray-900/80 p-6 rounded-lg border border-neon-green">
          <h2 className="text-5xl font-bold text-neon-green drop-shadow-[0_0_10px_rgba(57,255,20,1)]">
            {cps.toFixed(2)} CPS
          </h2>
          <p className="text-xl mt-2 text-white">
            Rank: {cps < 5 ? t('slow') : cps < 8 ? t('fast') : t('superhuman')}
          </p>
          <div className="flex gap-4 justify-center mt-6">
            <button
                onClick={resetGame}
                className="px-8 py-3 bg-neon-green text-black font-bold rounded hover:bg-white transition-colors shadow-[0_0_20px_rgba(57,255,20,0.5)]"
            >
                {t('try_again')}
            </button>
            <button
                onClick={shareResult}
                className="px-8 py-3 border border-neon-green text-neon-green font-bold rounded hover:bg-neon-green/10 transition-colors"
            >
                {t('share')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClickGame;