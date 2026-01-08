"use client";

import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { artisans } from "@/data/artisans";
import { products } from "@/data/products";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/features/ProductCard";
import { MapPin, BadgeCheck, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function ArtisanPage() {
    const params = useParams();
    const artisan = artisans.find((a) => a.id === params.id);

    if (!artisan) {
        notFound();
    }

    const artisanProducts = products.filter((p) => p.artisanId === artisan.id);

    return (
        <div className="min-h-screen bg-[var(--color-primary-bg)] font-sans">
            <Navbar />

            <main className="pt-24 pb-16">
                {/* Header Profile Section */}
                <section className="container mx-auto px-6 mb-20">
                    <div className="flex flex-col md:flex-row gap-12 items-center md:items-start max-w-5xl mx-auto">

                        {/* Portrait */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className="relative w-64 h-64 md:w-80 md:h-80 shrink-0"
                        >
                            <div className="absolute inset-0 rounded-full border-4 border-white shadow-xl overflow-hidden">
                                <Image
                                    src={artisan.image}
                                    alt={artisan.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            {artisan.verified && (
                                <div className="absolute bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg border-4 border-[var(--color-primary-bg)]" title="Verified Artisan">
                                    <BadgeCheck className="w-8 h-8" />
                                </div>
                            )}
                        </motion.div>

                        {/* Bio Info */}
                        <div className="text-center md:text-left space-y-6 pt-4">
                            <div>
                                <motion.h1
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="font-serif text-5xl font-bold text-[var(--color-text-main)] mb-2"
                                >
                                    {artisan.name}
                                </motion.h1>
                                <p className="text-xl text-[var(--color-action)] font-medium">{artisan.role}</p>
                            </div>

                            <div className="flex flex-wrap justify-center md:justify-start gap-6 text-stone-500">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5" />
                                    <span>{artisan.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5" />
                                    <span>Joined {artisan.joinedDate}</span>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-100 italic text-stone-600 text-lg leading-relaxed relative">
                                <span className="text-6xl text-stone-200 absolute -top-4 -left-2 font-serif">“</span>
                                {artisan.story}
                                <span className="text-6xl text-stone-200 absolute -bottom-8 -right-2 font-serif">”</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Collection Section */}
                <section className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center gap-4 mb-10">
                            <h2 className="font-serif text-3xl font-bold text-[var(--color-text-main)]">
                                Crafted by {artisan.name}
                            </h2>
                            <div className="h-px bg-stone-200 flex-1"></div>
                            <span className="text-stone-400 font-medium">{artisanProducts.length} Items</span>
                        </div>

                        {artisanProducts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {artisanProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 text-stone-400 bg-stone-50 rounded-lg border border-dashed border-stone-200">
                                <p>No products listed yet.</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
