"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const COUNTRIES = [
  { code: 'US', flag: '🇺🇸', name: 'USA' },
  { code: 'BR', flag: '🇧🇷', name: 'Brazil' },
  { code: 'ID', flag: '🇮🇩', name: 'Indonesia' },
  { code: 'RU', flag: '🇷🇺', name: 'Russia' },
  { code: 'ES', flag: '🇪🇸', name: 'Spain' },
  { code: 'DE', flag: '🇩🇪', name: 'Germany' },
  { code: 'FR', flag: '🇫🇷', name: 'France' },
  { code: 'JP', flag: '🇯🇵', name: 'Japan' },
  { code: 'KR', flag: '🇰🇷', name: 'South Korea' },
  { code: 'CN', flag: '🇨🇳', name: 'China' },
  { code: 'IN', flag: '🇮🇳', name: 'India' },
  { code: 'UK', flag: '🇬🇧', name: 'UK' },
];

type FeedItem = {
  id: number;
  country: typeof COUNTRIES[0];
  cps: number;
  timestamp: number;
};

const LiveWorldCps = () => {
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [globalCps, setGlobalCps] = useState(12430);
  const [onlineUsers, setOnlineUsers] = useState(452);

  // Simulation loop
  useEffect(() => {
    const interval = setInterval(() => {
      // Add random new click
      const country = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
      const cps = parseFloat((Math.random() * 10 + 5).toFixed(1)); // 5 - 15 CPS

      const newItem: FeedItem = {
        id: Date.now() + Math.random(),
        country,
        cps,
        timestamp: Date.now(),
      };

      setFeed(prev => [newItem, ...prev].slice(0, 15)); // Keep last 15
      setGlobalCps(prev => prev + Math.floor(Math.random() * 50));
      setOnlineUsers(prev => prev + (Math.random() > 0.5 ? 1 : -1));

    }, 800); // New click every 800ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
      {/* Left: Feed */}
      <div className="flex-1 bg-gray-900/50 border border-neon-green/30 rounded-xl p-4 md:p-6 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-neon-green mb-4 flex items-center gap-2">
          <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          LIVE FEED
        </h2>

        <div className="space-y-2 overflow-hidden relative min-h-[400px]">
          {feed.map((item) => (
            <div key={item.id} className="flex justify-between items-center bg-black/40 p-3 rounded border-l-4 border-neon-green animate-fade-in-left">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{item.country.flag}</span>
                <span className="text-gray-300 font-mono">{item.country.code}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-white font-bold text-xl font-mono">{item.cps} CPS</span>
                <span className="text-gray-500 text-xs">just now</span>
              </div>
            </div>
          ))}
          {feed.length === 0 && <div className="text-center text-gray-500 mt-10">Connecting to global server...</div>}
        </div>
      </div>

      {/* Right: Stats & Leaderboard */}
      <div className="w-full md:w-80 flex flex-col gap-6">

         <div className="bg-gray-800 p-6 rounded-xl border border-neon-green/50 text-center">
            <div className="text-gray-400 text-sm uppercase mb-1">Users Online</div>
            <div className="text-4xl text-white font-mono font-bold">{onlineUsers}</div>
         </div>

         <div className="bg-gray-800 p-6 rounded-xl border border-neon-green/50 text-center">
            <div className="text-gray-400 text-sm uppercase mb-1">Total Clicks (Today)</div>
            <div className="text-3xl text-neon-green font-mono font-bold">{globalCps.toLocaleString()}</div>
         </div>

         <div className="bg-black/60 p-6 rounded-xl border border-gray-700">
            <h3 className="text-white font-bold mb-4 border-b border-gray-700 pb-2">TOP 3 (10s)</h3>
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-yellow-400 font-bold">#1 🇺🇸 PlayerOne</span>
                    <span className="text-neon-green">24.5 CPS</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-bold">#2 🇰🇷 Faker</span>
                    <span className="text-neon-green">22.1 CPS</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-orange-400 font-bold">#3 🇧🇷 Loud</span>
                    <span className="text-neon-green">20.8 CPS</span>
                </div>
            </div>
         </div>

         <Link
            href="/cps-test"
            className="w-full py-4 bg-neon-green text-black font-bold text-xl text-center rounded hover:bg-white transition-all shadow-[0_0_20px_rgba(57,255,20,0.5)] animate-pulse"
         >
             JOIN THE SWARM
         </Link>

      </div>
    </div>
  );
};

export default LiveWorldCps;
