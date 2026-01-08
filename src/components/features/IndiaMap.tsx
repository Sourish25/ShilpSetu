"use client";

import React, { useState } from "react";
// @ts-ignore
import India from "@svg-maps/india";
import { cn } from "@/lib/utils";

// Interface for the data structure from @svg-maps/india
interface MapLocation {
    id: string;
    name: string;
    path: string;
}

interface MapData {
    label: string;
    viewBox: string;
    locations: MapLocation[];
}

interface IndiaMapProps {
    onRegionSelect: (region: string | null) => void;
    selectedRegion: string | null;
}

export function IndiaMap({ onRegionSelect, selectedRegion }: IndiaMapProps) {
    const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const mapData = India as MapData;

    // Track mouse movement for tooltip
    const handleMouseMove = (e: React.MouseEvent) => {
        setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleLocationClick = (event: React.MouseEvent<SVGPathElement>) => {
        const regionName = event.currentTarget.getAttribute("name");

        // Toggle: if clicking the already selected region, deselect it.
        if (selectedRegion === regionName) {
            onRegionSelect(null);
        } else {
            onRegionSelect(regionName);
        }
    };

    return (
        /* Event listener wrapper - No filters/transforms here to allow fixed tooltip to work relative to viewport */
        <div
            className="w-full max-w-lg mx-auto"
            onMouseMove={handleMouseMove}
        >
            {/* Cursor Tooltip */}
            {hoveredRegion && (
                <div
                    className="fixed pointer-events-none z-[100] bg-stone-900/95 text-white text-xs font-medium px-3 py-1.5 rounded shadow-xl border border-stone-800 whitespace-nowrap"
                    style={{
                        left: mousePos.x + 16,
                        top: mousePos.y + 16
                    }}
                >
                    {hoveredRegion}
                </div>
            )}

            {/* Map Container with Styles */}
            <div className="relative w-full aspect-[4/5] bg-white rounded-2xl p-4 border border-stone-200 shadow-xl flex items-center justify-center">
                <svg
                    viewBox={mapData.viewBox}
                    className="svg-map w-full h-full"
                    role="presentation"
                    aria-label={mapData.label}
                >
                    {mapData.locations.map((location) => {
                        const isSelected = selectedRegion === location.name;

                        return (
                            <path
                                key={location.id}
                                id={location.id}
                                name={location.name}
                                d={location.path}
                                className={cn(
                                    "svg-map__location",
                                    isSelected ? "fill-orange-600 stroke-orange-800 z-20" : ""
                                )}
                                aria-checked={isSelected}
                                onMouseEnter={() => setHoveredRegion(location.name)}
                                onMouseLeave={() => setHoveredRegion(null)}
                                onClick={handleLocationClick}
                            />
                        );
                    })}
                </svg>
            </div>
        </div>
    );
}
