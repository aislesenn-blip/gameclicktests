"use client";
import React, { useState } from "react";

const PacketLossTestGame = () => {
    const [running, setRunning] = useState(false);
    const [results, setResults] = useState({ ping: 0, jitter: 0, loss: 0 });
    const [logs, setLogs] = useState<string[]>([]);

    const startTest = () => {
        setRunning(true);
        setLogs(["Initializing WebSocket stream...", "Pinging server region: US-East..."]);

        // Simulation since real packet loss requires native/backend
        let pings = 0;
        let lost = 0;
        const total = 50;
        let totalPing = 0;
        let lastPing = 0;
        let totalJitter = 0;

        const interval = setInterval(() => {
            pings++;
            const isLost = Math.random() > 0.95; // 5% fake loss chance
            const ping = Math.floor(Math.random() * 40) + 20; // 20-60ms

            if (isLost) {
                lost++;
                setLogs(prev => [`Packet ${pings}: TIMEOUT (Loss)`, ...prev].slice(0, 6));
            } else {
                totalPing += ping;
                if (lastPing > 0) totalJitter += Math.abs(ping - lastPing);
                lastPing = ping;
                setLogs(prev => [`Packet ${pings}: ${ping}ms`, ...prev].slice(0, 6));
            }

            setResults({
                ping: Math.round(totalPing / (pings - lost || 1)),
                jitter: Math.round(totalJitter / (pings - lost || 1)),
                loss: Math.round((lost / pings) * 100)
            });

            if (pings >= total) {
                clearInterval(interval);
                setRunning(false);
                setLogs(prev => ["TEST COMPLETE", ...prev]);
            }
        }, 100);
    };

    return (
        <div className="w-full flex flex-col items-center gap-6 p-6 bg-gray-900 border border-neon-green rounded-xl">
            <h2 className="text-2xl text-neon-green font-bold">PACKET LOSS & PING TEST</h2>

            <div className="grid grid-cols-3 gap-4 w-full max-w-2xl text-center">
                <div className="bg-black p-4 rounded border border-gray-700">
                    <div className="text-gray-400 text-xs uppercase">Avg Ping</div>
                    <div className="text-3xl text-white font-mono">{results.ping}<span className="text-sm text-gray-500">ms</span></div>
                </div>
                <div className="bg-black p-4 rounded border border-gray-700">
                    <div className="text-gray-400 text-xs uppercase">Jitter</div>
                    <div className="text-3xl text-white font-mono">{results.jitter}<span className="text-sm text-gray-500">ms</span></div>
                </div>
                <div className="bg-black p-4 rounded border border-gray-700">
                    <div className="text-gray-400 text-xs uppercase">Packet Loss</div>
                    <div className={`text-3xl font-mono ${results.loss > 0 ? "text-red-500" : "text-neon-green"}`}>{results.loss}<span className="text-sm text-gray-500">%</span></div>
                </div>
            </div>

            <div className="w-full max-w-2xl h-40 bg-black rounded border border-gray-800 p-2 font-mono text-xs overflow-y-auto text-green-400">
                {logs.map((l, i) => <div key={i}>{l}</div>)}
            </div>

            {!running && (
                <button onClick={startTest} className="px-8 py-3 bg-neon-green text-black font-bold rounded hover:bg-white transition-colors uppercase tracking-widest shadow-[0_0_20px_rgba(57,255,20,0.4)]">
                    Start Network Test
                </button>
            )}
        </div>
    );
};

export default PacketLossTestGame;
