"use client";
import React, { useState, useEffect } from "react";

const GamepadTestGame = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [gamepad, setGamepad] = useState<any>(null);

    useEffect(() => {
        const handleGamepadConnected = (e: GamepadEvent) => {
            console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
                e.gamepad.index, e.gamepad.id,
                e.gamepad.buttons.length, e.gamepad.axes.length);
            setGamepad(e.gamepad);
        };

        window.addEventListener("gamepadconnected", handleGamepadConnected);

        const interval = setInterval(() => {
            const gps = navigator.getGamepads();
            if (gps[0]) setGamepad(gps[0]); // Just take first one for demo
        }, 100);

        return () => {
            window.removeEventListener("gamepadconnected", handleGamepadConnected);
            clearInterval(interval);
        }
    }, []);

    return (
        <div className="w-full flex flex-col items-center gap-6 p-4 bg-gray-900 border border-neon-green rounded-xl min-h-[400px] justify-center">
            <h2 className="text-2xl text-neon-green font-bold uppercase">Gamepad Tester</h2>

            {!gamepad ? (
                <div className="text-gray-400 animate-pulse text-center">
                    <p className="text-xl">Connect your Controller...</p>
                    <p className="text-sm mt-2">Press any button to wake it up.</p>
                </div>
            ) : (
                <div className="w-full max-w-2xl">
                    <div className="mb-4 text-white font-mono text-xs break-all border-b border-gray-700 pb-2">{gamepad.id}</div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        {gamepad.buttons.map((b: { pressed: boolean, value: number }, i: number) => (
                            <div key={i} className={`p-2 rounded border text-center transition-all ${b.pressed ? "bg-neon-green text-black border-neon-green shadow-[0_0_15px_rgba(57,255,20,0.8)]" : "bg-black border-gray-800 text-gray-500"}`}>
                                B{i}
                            </div>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-neon-green text-sm uppercase">Axes (Drift Check)</h3>
                        {gamepad.axes.map((axis: number, i: number) => (
                            <div key={i} className="flex items-center gap-4">
                                <span className="text-gray-400 text-xs w-8">AX{i}</span>
                                <div className="flex-1 h-4 bg-gray-800 rounded relative overflow-hidden">
                                    <div
                                        className="absolute top-0 bottom-0 w-2 bg-neon-green transition-all"
                                        style={{ left: `${(axis + 1) * 50}%` }}
                                    ></div>
                                </div>
                                <span className="text-white font-mono text-xs w-12">{axis.toFixed(4)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GamepadTestGame;
