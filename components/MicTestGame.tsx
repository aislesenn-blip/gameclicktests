"use client";
import React, { useState, useEffect, useRef } from "react";

const MicTestGame = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [volume, setVolume] = useState(0);
    const [error, setError] = useState("");
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyzerRef = useRef<AnalyserNode | null>(null);
    const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);

    const startMic = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            analyzerRef.current = audioContextRef.current.createAnalyser();
            sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
            sourceRef.current.connect(analyzerRef.current);
            setIsRecording(true);
            visualize();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError("Microphone access denied. Please allow permissions.");
            console.error(err);
        }
    };

    const visualize = () => {
        if (!analyzerRef.current || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const bufferLength = analyzerRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const draw = () => {
            if (!isRecording) return;
            requestAnimationFrame(draw);
            analyzerRef.current!.getByteFrequencyData(dataArray);

            ctx.fillStyle = 'rgb(0, 0, 0)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const barWidth = (canvas.width / bufferLength) * 2.5;
            let barHeight;
            let x = 0;

            // Simple volume calc
            let sum = 0;
            for(let i = 0; i < bufferLength; i++) {
                sum += dataArray[i];
            }
            setVolume(sum / bufferLength);

            for(let i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i] / 2;
                ctx.fillStyle = `rgb(${barHeight + 100}, 255, 20)`; // Greenish
                ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                x += barWidth + 1;
            }
        };
        draw();
    };

    useEffect(() => {
        return () => {
            if (audioContextRef.current) audioContextRef.current.close();
        };
    }, []);

    return (
        <div className="w-full flex flex-col items-center gap-6 p-4 bg-gray-900 border border-neon-green rounded-xl">
            <h2 className="text-2xl text-neon-green font-bold">MICROPHONE TEST</h2>
            {error && <p className="text-red-500 font-bold">{error}</p>}

            <canvas ref={canvasRef} width={600} height={200} className="w-full h-48 bg-black rounded border border-gray-700"></canvas>

            <div className="flex gap-4">
                {!isRecording ? (
                    <button onClick={startMic} className="px-6 py-2 bg-neon-green text-black font-bold rounded hover:bg-white transition-colors">
                        START MIC TEST
                    </button>
                ) : (
                    <div className="text-white animate-pulse font-mono">MIC ACTIVE - VOL: {Math.round(volume)}</div>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                <button className="p-4 border border-gray-700 rounded hover:border-neon-green text-white">TEST LEFT SPEAKER</button>
                <button className="p-4 border border-gray-700 rounded hover:border-neon-green text-white">TEST RIGHT SPEAKER</button>
            </div>
        </div>
    );
};

export default MicTestGame;
