"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

const LiveWorldCps = () => {
    // Only fetch translation on client or ensure it handles missing keys gracefully if needed,
    // but here we just need generic labels or can hardcode country names as they are proper nouns usually.
    // However, to satisfy "Full Localization", we might want to localize country names if possible,
    // but the task is about hydration mismatch first.

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const t = useTranslations("mobile_nav"); // Just to have hook

    const [events, setEvents] = useState<{country: string, cps: number, user: string}[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const countries = ["🇺🇸 USA", "🇧🇷 BRA", "🇮🇩 IDN", "🇷🇺 RUS", "🇪🇸 ESP", "🇩🇪 GER", "🇫🇷 FRA"];
        const users = ["Player_X", "SpeedDemon", "ClickGod", "NoobMaster", "ProGamer"];

        // Initial population
        const initialEvents = Array.from({length: 5}).map(() => ({
             country: countries[Math.floor(Math.random() * countries.length)],
             cps: Number((Math.random() * 15 + 5).toFixed(1)),
             user: users[Math.floor(Math.random() * users.length)] + Math.floor(Math.random() * 100)
        }));
        setEvents(initialEvents);

        const interval = setInterval(() => {
            const newEvent = {
                country: countries[Math.floor(Math.random() * countries.length)],
                cps: Number((Math.random() * 15 + 5).toFixed(1)),
                user: users[Math.floor(Math.random() * users.length)] + Math.floor(Math.random() * 100)
            };
            setEvents(prev => [newEvent, ...prev].slice(0, 10));
        }, 800);

        return () => clearInterval(interval);
    }, []);

    // Render nothing until mounted on client to prevent hydration mismatch of random data
    if (!isMounted) return <div className="w-full max-w-2xl mx-auto h-[300px] bg-black border border-neon-green rounded flex items-center justify-center text-neon-green">Loading Feed...</div>;

    return (
        <div className="w-full max-w-2xl mx-auto bg-black border border-neon-green p-4 rounded">
            <h3 className="text-neon-green font-bold text-center mb-4 uppercase tracking-widest animate-pulse">Live World Feed</h3>
            <div className="space-y-2">
                {events.map((e, i) => (
                    <div key={i} className="flex justify-between text-sm font-mono border-b border-gray-800 pb-1 animate-fade-in">
                        <span className="text-gray-400">{e.country}</span>
                        <span className="text-white">{e.user}</span>
                        <span className="text-neon-green font-bold">{e.cps} CPS</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LiveWorldCps;
