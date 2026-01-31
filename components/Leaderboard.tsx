"use client";
import React from "react";

const Leaderboard = () => {
    // Mock data for demo
    const leaders = [
        { rank: 1, name: "ClickGod_99", country: "🇺🇸", cps: 24.5 },
        { rank: 2, name: "SpeedyGonzales", country: "🇲🇽", cps: 22.1 },
        { rank: 3, name: "MinecraftPro", country: "🇧🇷", cps: 20.8 },
        { rank: 4, name: "FastFinger", country: "🇰🇷", cps: 19.5 },
        { rank: 5, name: "Unknown", country: "🇷🇺", cps: 18.2 },
    ];

    return (
        <div className="w-full max-w-2xl mx-auto">
            <table className="w-full text-left text-sm text-gray-400">
                <thead className="bg-gray-900 text-neon-green uppercase font-bold">
                    <tr>
                        <th className="p-3">Rank</th>
                        <th className="p-3">Player</th>
                        <th className="p-3">Country</th>
                        <th className="p-3">CPS</th>
                    </tr>
                </thead>
                <tbody>
                    {leaders.map((l) => (
                        <tr key={l.rank} className="border-b border-gray-800 hover:bg-gray-900/50">
                            <td className="p-3 font-bold text-white">#{l.rank}</td>
                            <td className="p-3">{l.name}</td>
                            <td className="p-3">{l.country}</td>
                            <td className="p-3 text-neon-green font-bold">{l.cps}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;
