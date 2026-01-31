"use client";
import React, { useState } from "react";

const AimTrainerGame = () => {
    const [score, setScore] = useState(0);
    const [target, setTarget] = useState({ top: '50%', left: '50%' });

    const moveTarget = () => {
        const top = Math.random() * 90 + 5 + '%';
        const left = Math.random() * 90 + 5 + '%';
        setTarget({ top, left });
    };

    const hit = (e: React.MouseEvent) => {
        e.stopPropagation();
        setScore(s => s + 1);
        moveTarget();
    };

    return (
        <div className="w-full h-[500px] bg-black border border-neon-green relative overflow-hidden cursor-crosshair">
            <div className="absolute top-4 left-4 text-white font-mono text-2xl">Score: {score}</div>
            <div
                onMouseDown={hit}
                className="absolute w-8 h-8 bg-neon-green rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer shadow-[0_0_10px_#39ff14]"
                style={{ top: target.top, left: target.left }}
            >
                 <div className="w-full h-full bg-white rounded-full scale-50"></div>
            </div>
        </div>
    );
};

export default AimTrainerGame;
