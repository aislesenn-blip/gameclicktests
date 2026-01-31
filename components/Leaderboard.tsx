"use client";
import React from "react";
import Link from "next/link";

const Leaderboard = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-3xl text-neon-green font-bold mb-8 text-center uppercase tracking-widest">
        Global Rankings
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* CPS 10s */}
        <div className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
          <div className="bg-gray-800 p-4 border-b border-gray-700 flex justify-between items-center">
            <h3 className="font-bold text-white">CPS Test (10s)</h3>
            <Link href="/cps-test" className="text-xs text-neon-green hover:underline">PLAY</Link>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="text-gray-500 bg-gray-900/50">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">Player</th>
                <th className="p-3 text-right">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              <tr className="bg-neon-green/5">
                <td className="p-3 text-yellow-400 font-bold">1</td>
                <td className="p-3 text-white">🇺🇸 SwiftClicker</td>
                <td className="p-3 text-right font-mono text-neon-green">24.2 CPS</td>
              </tr>
              <tr>
                <td className="p-3 text-gray-400">2</td>
                <td className="p-3 text-gray-300">🇰🇷 MinJi</td>
                <td className="p-3 text-right font-mono">22.8 CPS</td>
              </tr>
              <tr>
                <td className="p-3 text-gray-400">3</td>
                <td className="p-3 text-gray-300">🇧🇷 Carlos_PvP</td>
                <td className="p-3 text-right font-mono">21.5 CPS</td>
              </tr>
              <tr>
                <td className="p-3 text-gray-400">4</td>
                <td className="p-3 text-gray-300">🇩🇪 Hans</td>
                <td className="p-3 text-right font-mono">19.9 CPS</td>
              </tr>
              <tr>
                <td className="p-3 text-gray-400">5</td>
                <td className="p-3 text-gray-300">🇮🇩 IndoGamer</td>
                <td className="p-3 text-right font-mono">18.4 CPS</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Reaction */}
        <div className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
          <div className="bg-gray-800 p-4 border-b border-gray-700 flex justify-between items-center">
            <h3 className="font-bold text-white">Reaction Time</h3>
            <Link href="/reaction-time" className="text-xs text-neon-green hover:underline">PLAY</Link>
          </div>
           <table className="w-full text-left text-sm">
            <thead className="text-gray-500 bg-gray-900/50">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">Player</th>
                <th className="p-3 text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              <tr className="bg-neon-green/5">
                <td className="p-3 text-yellow-400 font-bold">1</td>
                <td className="p-3 text-white">🇯🇵 Akira</td>
                <td className="p-3 text-right font-mono text-neon-green">104 ms</td>
              </tr>
              <tr>
                <td className="p-3 text-gray-400">2</td>
                <td className="p-3 text-gray-300">🇺🇸 ShroudLik</td>
                <td className="p-3 text-right font-mono">112 ms</td>
              </tr>
              <tr>
                <td className="p-3 text-gray-400">3</td>
                <td className="p-3 text-gray-300">🇨🇳 Zoom</td>
                <td className="p-3 text-right font-mono">115 ms</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Typing */}
        <div className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
          <div className="bg-gray-800 p-4 border-b border-gray-700 flex justify-between items-center">
            <h3 className="font-bold text-white">Typing (60s)</h3>
             <Link href="/typing-test" className="text-xs text-neon-green hover:underline">PLAY</Link>
          </div>
           <table className="w-full text-left text-sm">
            <thead className="text-gray-500 bg-gray-900/50">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">Player</th>
                <th className="p-3 text-right">WPM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              <tr className="bg-neon-green/5">
                <td className="p-3 text-yellow-400 font-bold">1</td>
                <td className="p-3 text-white">🇺🇸 TypistGod</td>
                <td className="p-3 text-right font-mono text-neon-green">220 WPM</td>
              </tr>
              <tr>
                <td className="p-3 text-gray-400">2</td>
                <td className="p-3 text-gray-300">🇷🇺 Ivanov</td>
                <td className="p-3 text-right font-mono">215 WPM</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
