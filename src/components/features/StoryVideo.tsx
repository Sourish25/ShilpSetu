"use client";

import React, { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
import { cn } from "@/lib/utils";

interface StoryVideoProps {
    src: string;
    poster?: string;
    className?: string;
    title?: string;
}

export function StoryVideo({ src, poster, className, title }: StoryVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [progress, setProgress] = useState(0);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            setProgress(progress);
        }
    };

    return (
        <div className={cn("relative group overflow-hidden rounded-xl bg-black shadow-2xl", className)}>
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                className="w-full h-full object-cover"
                loop
                playsInline
                onTimeUpdate={handleTimeUpdate}
                onClick={togglePlay}
            />

            {/* Overlay Gradient */}
            <div className={cn(
                "absolute inset-0 bg-black/40 transition-opacity duration-300 flex items-center justify-center cursor-pointer",
                isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
            )}
                onClick={togglePlay}
            >
                {/* Play Button */}
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/40 transition-transform transform group-hover:scale-110">
                    {isPlaying ? (
                        <Pause className="w-8 h-8 text-white fill-current" />
                    ) : (
                        <Play className="w-8 h-8 text-white fill-current ml-1" />
                    )}
                </div>
            </div>

            {/* Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {title && <h3 className="text-white font-medium text-sm mb-2">{title}</h3>}

                {/* Progress Bar */}
                <div className="w-full h-1 bg-white/30 rounded-full mb-3 overflow-hidden">
                    <div
                        className="h-full bg-[var(--color-action)] transition-all duration-100 ease-linear"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="flex justify-between items-center text-white">
                    <button onClick={toggleMute} className="hover:text-[var(--color-action)] transition-colors">
                        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                    <button className="hover:text-[var(--color-action)] transition-colors">
                        <Maximize className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
