"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Product } from "@/data/products";
import { artisans } from "@/data/artisans";

interface ProductCardProps {
    product: Product;
    className?: string;
    isLarge?: boolean;
}

export function ProductCard({ product, className = "", isLarge = false }: ProductCardProps) {
    const artisan = artisans.find((a) => a.id === product.artisanId);

    return (
        <Link href={`/product/${product.id}`} className={`group block ${className}`}>
            <motion.div
                whileHover={{ y: -4 }}
                className={`relative overflow-hidden rounded-sm bg-white shadow-sm transition-all hover:shadow-lg ${isLarge ? "aspect-[4/3]" : "aspect-square"
                    }`}
            >
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <p className="font-serif text-xl font-medium mb-1">{product.title}</p>
                        {artisan && (
                            <Link
                                href={`/artisan/${artisan.id}`}
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-2 hover:bg-white/20 p-1.5 rounded-full transition-colors -ml-1.5"
                            >
                                <div className="relative w-6 h-6 rounded-full overflow-hidden border border-white/50">
                                    <Image src={artisan.image} alt={artisan.name} fill className="object-cover" />
                                </div>
                                <p className="text-stone-200 text-sm hover:text-white transition-colors">By {artisan.name}</p>
                            </Link>
                        )}
                    </div>
                </div>
            </motion.div>

            <div className="mt-4 flex justify-between items-start">
                <div>
                    <h3 className="font-serif text-lg text-[var(--color-text-main)] group-hover:text-[var(--color-action)] transition-colors">
                        {product.title}
                    </h3>
                    <p className="text-sm text-stone-500">{product.category}</p>
                </div>
                <span className="font-medium text-[var(--color-text-main)]">
                    ₹{product.price.toLocaleString()}
                </span>
            </div>
        </Link>
    );
}
