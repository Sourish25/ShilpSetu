"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface IndiaMapProps {
    onRegionSelect: (region: string | null) => void;
    selectedRegion: string | null;
}

export function IndiaMap({ onRegionSelect, selectedRegion }: IndiaMapProps) {
    const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

    // Simplified paths for the states we have artisans for. 
    // In a real app, this would be a full D3/TopoJSON map. 
    // For this prototype, we use a stylized geometric representation or simplified paths.
    // Coordinates are approximate for visual representation in a 400x500 box.

    const regions = [
        {
            id: "Kashmir",
            name: "Jammu & Kashmir",
            path: "M140 20 L160 10 L190 20 L200 50 L180 80 L130 70 L120 40 Z", // Top Tip
            color: "fill-indigo-100",
            hoverColor: "fill-indigo-300",
            activeColor: "fill-indigo-500",
        },
        {
            id: "Rajasthan",
            name: "Rajasthan",
            path: "M80 120 L130 110 L160 140 L150 190 L100 210 L60 180 Z", // West
            color: "fill-amber-100",
            hoverColor: "fill-amber-300",
            activeColor: "fill-amber-500",
        },
        {
            id: "Gujarat",
            name: "Gujarat",
            path: "M30 200 L80 190 L110 210 L110 250 L60 260 L20 230 Z", // West Coast
            color: "fill-orange-100", // Earthy
            hoverColor: "fill-orange-300",
            activeColor: "fill-orange-500",
        },
        {
            id: "UP",
            name: "Uttar Pradesh",
            path: "M160 120 L240 120 L260 160 L220 180 L170 170 Z", // North Central
            color: "fill-pink-100", // Silk/Varanasi
            hoverColor: "fill-pink-300",
            activeColor: "fill-pink-500",
        },
        {
            id: "Bihar",
            name: "Bihar",
            path: "M240 130 L290 130 L300 160 L270 180 L250 160 Z", // East
            color: "fill-emerald-100", // Madhubani nature
            hoverColor: "fill-emerald-300",
            activeColor: "fill-emerald-500",
        },
    ];

    return (
        <div className="relative w-full max-w-md mx-auto aspect-[4/5] drop-shadow-xl">
            {/* Tooltip */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 h-8 pointer-events-none z-10">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: hoveredRegion || selectedRegion ? 1 : 0, y: 0 }}
                    className="bg-stone-900 text-white text-xs px-3 py-1 rounded-full shadow-lg whitespace-nowrap"
                >
                    {hoveredRegion || selectedRegion || "Explore India"}
                </motion.div>
            </div>

            <svg viewBox="0 0 400 500" className="w-full h-full drop-shadow-md">
                {/* Background Outline indicating the rest of India (Abstract) */}
                <path
                    d="M140 20 L200 50 L280 100 L350 120 L380 200 L350 350 L200 480 L50 350 L20 230 L60 180 L80 120 L130 70 Z"
                    className="fill-stone-50 stroke-stone-200 stroke-2"
                />

                {/* Interactive Regions */}
                {regions.map((region) => {
                    const isActive = selectedRegion === region.name;
                    const isHovered = hoveredRegion === region.name;

                    return (
                        <motion.path
                            key={region.id}
                            d={region.path}
                            className={cn(
                                "cursor-pointer stroke-white stroke-2 transition-colors duration-300",
                                isActive ? region.activeColor : isHovered ? region.hoverColor : region.color
                            )}
                            whileHover={{ scale: 1.05, zIndex: 10 }}
                            onMouseEnter={() => setHoveredRegion(region.name)}
                            onMouseLeave={() => setHoveredRegion(null)}
                            onClick={() => onRegionSelect(isActive ? null : region.name)}
                        />
                    );
                })}
            </svg>
        </div>
    );
}
