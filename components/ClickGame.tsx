"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Howl } from "howler";

const CLICK_SOUND_URL = "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3";

const ClickGame = () => {
  const t = useTranslations("ui");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [rank, setRank] = useState("");
  const [cps, setCps] = useState(0);
  const [mode, setMode] = useState("standard");

  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    soundRef.current = new Howl({
      src: [CLICK_SOUND_URL],
      volume: 0.5,
      preload: true,
    });

    return () => {
      soundRef.current?.unload();
    };
  }, []);

  const finishGame = useCallback(() => {
    setIsActive(false);
    setIsFinished(true);

    // Use functional update to get latest score
    setScore(currentScore => {
        const finalCps = currentScore / 10;
        setCps(finalCps);

        let r = "";
        if (finalCps < 5) {
          r = t("rank_noob");
        } else if (finalCps < 10) {
          r = t("rank_pro");
        } else {
          r = t("rank_god");
        }
        setRank(r);
        return currentScore;
    });
  }, [t]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 0.1;
          if (newTime <= 0) {
            clearInterval(interval);
            finishGame();
            return 0;
          }
          return newTime;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isActive, finishGame]);

  const handleClick = () => {
    if (isFinished) return;

    if (!isActive) {
      setIsActive(true);
    }

    setScore((prev) => prev + 1);
    soundRef.current?.play();
  };

  const resetGame = () => {
    setScore(0);
    setTimeLeft(10);
    setIsActive(false);
    setIsFinished(false);
    setRank("");
    setCps(0);
  };

  const shareResult = () => {
    const text = t("share_txt", { score: cps.toFixed(1) });
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
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto p-4 space-y-8 select-none">
      <h1 className="text-4xl md:text-6xl font-bold text-neon-green text-center neon-text mb-4">
        {t("h1")}
      </h1>

      <div className="bg-gray-900 border-2 border-neon-green p-6 rounded-lg w-full text-center shadow-[0_0_15px_rgba(57,255,20,0.3)] relative overflow-hidden">

        <div className="grid grid-cols-2 gap-4 mb-6 text-neon-green relative z-10">
            <div className="flex flex-col">
                <span className="text-sm opacity-70">TIMER</span>
                <span className="font-mono text-4xl">{timeLeft.toFixed(1)}s</span>
            </div>
            <div className="flex flex-col">
                <span className="text-sm opacity-70">SCORE</span>
                <span className="font-mono text-4xl">{score}</span>
            </div>
        </div>

        <button
          onClick={handleClick}
          disabled={isFinished}
          className={`w-full h-64 md:h-80 bg-black border-4 rounded-xl flex items-center justify-center text-2xl md:text-4xl font-bold transition-all duration-75 active:scale-95 select-none relative z-10
            ${isActive ? "border-neon-green text-neon-green animate-pulse shadow-[inset_0_0_20px_rgba(57,255,20,0.5)]" : "border-gray-700 text-gray-500 hover:border-neon-green hover:text-neon-green"}
            ${isFinished ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          `}
        >
          {isActive ? "CLICK FAST!" : t("start_btn")}
        </button>
      </div>

      {isFinished && (
        <div className="w-full bg-gray-900/90 border border-neon-green p-6 rounded-lg text-center space-y-4 animate-fade-in shadow-[0_0_20px_rgba(57,255,20,0.2)]">
          <h2 className="text-3xl font-bold text-white">
            CPS: <span className="text-neon-green text-5xl">{cps.toFixed(2)}</span>
          </h2>
          <p className="text-xl text-neon-green font-bold animate-pulse">{rank}</p>

          <div className="flex gap-4 justify-center mt-6">
            <button
              onClick={resetGame}
              className="px-8 py-3 bg-neon-green text-black font-bold rounded hover:bg-white hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all transform hover:-translate-y-1"
            >
              RETRY
            </button>
            <button
              onClick={shareResult}
              className="px-8 py-3 border border-neon-green text-neon-green font-bold rounded hover:bg-neon-green/10 transition-all transform hover:-translate-y-1"
            >
              SHARE
            </button>
          </div>
        </div>
      )}

      <div className="w-full text-center">
        <h3 className="text-neon-green text-lg mb-2 uppercase tracking-widest opacity-80">{t("modes")}</h3>
        <div className="flex gap-2 justify-center flex-wrap">
          {["Standard", "Jitter", "Butterfly", "Drag"].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m.toLowerCase())}
              className={`px-4 py-1 border rounded text-sm transition-colors uppercase ${
                mode === m.toLowerCase()
                  ? "bg-neon-green text-black border-neon-green font-bold"
                  : "bg-transparent text-gray-500 border-gray-800 hover:border-neon-green hover:text-neon-green"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClickGame;