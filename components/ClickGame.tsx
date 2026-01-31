"use client";
import React, { useState, useEffect, useRef } from "react";
import { clickSound, unlockSound, setGlobalVolume } from "@/lib/sound";
import { useTranslations } from "next-intl";

interface ClickGameProps {
  duration?: number;
  mode?: string;
}

const ClickGame: React.FC<ClickGameProps> = ({ duration = 10, mode = "standard" }) => {
  const t = useTranslations("game");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [cps, setCps] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [showSettings, setShowSettings] = useState(false);

  // Ref to track if space was pressed (for debounce/hold prevention if needed, but CPS usually allows spam)
  // Actually, standard spacebar test allows rapid fire.
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (isFinished) return;
    unlockSound();
    if (!isActive) setIsActive(true);
    setScore((prev) => prev + 1);
    if (!isMuted) {
      clickSound.play();
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let lastTime = performance.now();

    if (isActive) {
      interval = setInterval(() => {
        const now = performance.now();
        const dt = (now - lastTime) / 1000;
        lastTime = now;

        setTimeLeft((prev) => {
          if (prev <= dt) {
            clearInterval(interval);
            setIsFinished(true);
            setIsActive(false);
            return 0;
          }
          return prev - dt;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
      if (mode === 'spacebar') {
          const handleKeyDown = (e: KeyboardEvent) => {
              if (e.code === 'Space') {
                  e.preventDefault(); // Prevent scrolling
                  if (!e.repeat) { // Optional: allow holding? Usually CPS is individual presses.
                       // Most spacebar tests are rapid fire press.
                       handleClick();
                       // Add visual feedback
                       if (buttonRef.current) {
                           buttonRef.current.classList.add('active-press');
                           setTimeout(() => buttonRef.current?.classList.remove('active-press'), 50);
                       }
                  }
              }
          };
          window.addEventListener('keydown', handleKeyDown);
          return () => window.removeEventListener('keydown', handleKeyDown);
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, isActive, isFinished, isMuted]); // deps need handleClick? handleClick uses state.
  // Better: use a ref for the handler or rely on state updates being functional.
  // Actually handleClick uses setScore(prev => ...) so it's fine.
  // But isMuted and isActive reads might be stale if closure captures them.
  // Re-binding event listener on every render is expensive? No.
  // But wait, handleClick reads `isActive` and `isFinished`.
  // If I use the effect above, `handleClick` inside it is closed over.
  // I should use a fresh handler or useLayoutEffect, or just let it re-bind.
  // Given standard React strict mode, re-binding is fine.
  // But `handleClick` needs to be fresh.

  // FIX: Make handleClick stable or use refs for mutable state?
  // Or just put handleClick in deps.

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

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = parseFloat(e.target.value);
      setVolume(v);
      setGlobalVolume(v);
      if (v === 0) setIsMuted(true);
      else setIsMuted(false);
  };

  const testSound = () => {
      unlockSound();
      clickSound.play();
  };

  const generateShareImage = async () => {
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 400;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      // Background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, 800, 400);

      // Border
      ctx.strokeStyle = '#39ff14';
      ctx.lineWidth = 10;
      ctx.strokeRect(0, 0, 800, 400);

      // Text
      ctx.fillStyle = '#39ff14';
      ctx.font = 'bold 40px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('PALMTWEETS.COM', 400, 60);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 120px monospace';
      ctx.fillText(`${cps.toFixed(2)} CPS`, 400, 200);

      const rank = cps < 5 ? t('slow') : cps < 8 ? t('fast') : t('superhuman');
      ctx.fillStyle = '#39ff14';
      ctx.font = 'bold 50px monospace';
      ctx.fillText(`Rank: ${rank}`, 400, 300);

      return new Promise<Blob | null>(resolve => canvas.toBlob(resolve));
  };

  const shareResult = async () => {
    const text = `${t('score')}: ${cps.toFixed(2)} CPS!`;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const shareData: any = {
      title: "Palmtweets CPS Test",
      text: text,
      url: window.location.href,
    };

    try {
        const blob = await generateShareImage();
        // @ts-expect-error navigator.canShare is not fully typed
        if (blob && navigator.share && navigator.canShare && navigator.canShare({ files: [new File([blob], 'score.png', { type: 'image/png' })] })) {
             shareData.files = [new File([blob], 'score.png', { type: 'image/png' })];
        }
    } catch(e) { console.error(e); }

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      navigator.share(shareData).catch(console.error);
    } else {
      navigator.clipboard.writeText(`${text} ${window.location.href}`);
      alert(t('share'));
    }
  };

  return (
    <div className="w-full flex flex-col items-center relative">
      {/* Settings Toggle */}
      <button
        onClick={(e) => { e.stopPropagation(); setShowSettings(!showSettings); }}
        className="absolute top-0 right-0 p-2 text-neon-green hover:bg-neon-green/10 rounded-full transition-colors z-20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.1-.463 1.112h-.92a2.404 2.404 0 0 1-1.902-1.159 11.042 11.042 0 0 0-2.253-2.74M19.5 9.75a3 3 0 0 0-3-3m0 0a3 3 0 0 0-3 3m0 0h6m-6 0a3 3 0 0 0 3 3m3-3a3 3 0 0 0-3-3" />
        </svg>
      </button>

      {showSettings && (
          <div className="absolute top-10 right-0 bg-gray-900 border border-neon-green p-4 rounded z-30 shadow-xl w-64">
              <label className="block text-white text-xs mb-2 uppercase">Volume</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full accent-neon-green mb-4"
              />
              <button onClick={testSound} className="w-full py-1 border border-neon-green text-neon-green text-xs rounded hover:bg-neon-green/20">
                  TEST SOUND
              </button>
          </div>
      )}

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
        ref={buttonRef}
        onMouseDown={mode === 'spacebar' ? undefined : handleClick}
        onTouchStart={mode === 'spacebar' ? undefined : handleClick}
        disabled={isFinished}
        className={`w-full h-64 bg-black border-4 rounded-xl flex items-center justify-center text-3xl font-bold transition-all active:scale-95 select-none relative overflow-hidden group ${
          isActive
            ? "border-neon-green text-neon-green shadow-[0_0_30px_rgba(57,255,20,0.4)]"
            : "border-gray-700 text-gray-500 hover:border-neon-green hover:text-neon-green"
        } ${mode === 'spacebar' ? 'active-press:scale-95' : ''}`}
      >
        <span className="relative z-10 group-hover:scale-110 transition-transform">
          {isActive ? t('active') : (mode === 'spacebar' ? 'PRESS SPACE' : t('start'))}
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
