"use client";
import React, { useState, useEffect } from "react";

const WORDS = [
  "the", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog",
  "a", "quick", "movement", "of", "the", "enemy", "will", "jeopardize", "six", "gunboats",
  "typing", "speed", "test", "practice", "makes", "perfect", "keyboard", "master",
  "challenge", "yourself", "today", "record", "score", "share", "friend", "champion",
  "click", "reaction", "reflex", "mouse", "monitor", "screen", "game", "win", "lose"
];

const TypingGame = () => {
  const [text, setText] = useState("");
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  useEffect(() => {
    const words = [];
    for (let i = 0; i < 50; i++) {
      words.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
    }
    setText(words.join(" "));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);

    if (!isActive) {
      setIsActive(true);
    }

    let errs = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== text[i]) errs++;
    }
    setAccuracy(Math.max(0, 100 - (errs / Math.max(1, value.length)) * 100));
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsActive(false);
            const wordsTyped = input.trim().split(/\s+/).length;
            setWpm(wordsTyped);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, input, timeLeft]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-gray-900/50 rounded-xl border border-neon-green/30 backdrop-blur-sm">
      <div className="flex justify-between mb-6 text-neon-green font-mono text-xl">
        <div>Time: {timeLeft}s</div>
        <div>WPM: {isActive ? Math.round((input.length / 5) / ((60 - timeLeft) / 60) || 0) : wpm}</div>
        <div>Accuracy: {accuracy.toFixed(1)}%</div>
      </div>

      <div className="mb-6 p-4 bg-gray-800 rounded-lg text-lg leading-relaxed font-mono text-gray-400 select-none h-40 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 pointer-events-none"></div>
        {text.split('').map((char, index) => {
            let color = "text-gray-500";
            if (index < input.length) {
                color = input[index] === char ? "text-neon-green" : "text-red-500 bg-red-900/50";
            }
            return <span key={index} className={color}>{char}</span>;
        })}
      </div>

      <textarea
        value={input}
        onChange={handleChange}
        disabled={timeLeft === 0}
        placeholder="Start typing here..."
        className="w-full p-4 bg-black text-white border-2 border-neon-green/50 rounded-lg focus:border-neon-green outline-none h-32 font-mono text-lg resize-none shadow-[0_0_15px_rgba(57,255,20,0.1)] focus:shadow-[0_0_25px_rgba(57,255,20,0.3)] transition-all"
        autoFocus
      />

      {timeLeft === 0 && (
        <div className="mt-8 text-center animate-fade-in">
           <h2 className="text-4xl font-bold text-white mb-2">Test Complete!</h2>
           <div className="text-6xl text-neon-green font-bold mb-4">{wpm} WPM</div>
           <button
             onClick={() => window.location.reload()}
             className="px-8 py-3 bg-neon-green text-black font-bold rounded hover:bg-white transition-colors"
           >
             Restart
           </button>
        </div>
      )}
    </div>
  );
};

export default TypingGame;
