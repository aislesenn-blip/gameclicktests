"use client";
import React, { useState, useRef } from "react";

const ReactionGame = () => {
  const [gameState, setGameState] = useState<"waiting" | "ready" | "click" | "result">("waiting");
  const [time, setTime] = useState(0);
  const [startTime, setStartTime] = useState(0);

  const startTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleStart = () => {
    setGameState("ready");
    const delay = Math.random() * 2000 + 1000;
    startTimeout.current = setTimeout(() => {
      setGameState("click");
      setStartTime(Date.now());
    }, delay);
  };

  const handleClick = () => {
    if (gameState === "ready") {
      clearTimeout(startTimeout.current!);
      setGameState("waiting");
      alert("Too soon! Wait for green.");
    } else if (gameState === "click") {
      const now = Date.now();
      const reaction = now - startTime;
      setTime(reaction);
      setGameState("result");
    } else if (gameState === "result") {
      handleStart();
    } else {
      handleStart();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`w-full h-[500px] flex flex-col items-center justify-center cursor-pointer select-none rounded-xl transition-colors duration-200 ${
        gameState === "waiting" || gameState === "result"
          ? "bg-gray-800 hover:bg-gray-700"
          : gameState === "ready"
          ? "bg-red-600"
          : "bg-neon-green"
      }`}
    >
      {gameState === "waiting" && (
        <h2 className="text-4xl font-bold text-white animate-pulse">
          Click anywhere to start
        </h2>
      )}
      {gameState === "ready" && (
        <h2 className="text-4xl font-bold text-white">Wait for Green...</h2>
      )}
      {gameState === "click" && (
        <h2 className="text-6xl font-bold text-black scale-125 transition-transform">
          CLICK!
        </h2>
      )}
      {gameState === "result" && (
        <div className="text-center">
          <h2 className="text-6xl font-bold text-white mb-4">
            {time} ms
          </h2>
          <p className="text-xl text-neon-green">
            {time < 200 ? "⚡ Superhuman" : time < 250 ? "🚀 Fast" : "🐢 Slow"}
          </p>
          <p className="text-gray-400 mt-8">Click to try again</p>
        </div>
      )}
    </div>
  );
};

export default ReactionGame;
