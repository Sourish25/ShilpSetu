"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { artisans } from "@/data/artisans";
import { VerificationModal } from "@/components/features/VerificationModal";
import { RelatedProducts } from "@/components/features/RelatedProducts";
import { ReviewSection } from "@/components/features/ReviewSection";
import { useCart } from "@/context/CartContext";

import { motion } from "framer-motion";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    // Unwrap params using React.use()
    const resolvedParams = use(params);
    const product = products.find((p) => p.id === resolvedParams.id);
    const { addToCart } = useCart();

    if (!product) {
        notFound();
    }

    const artisan = artisans.find((a) => a.id === product.artisanId);

    return (
        <div className="min-h-screen bg-white font-sans">
            <Navbar />

            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
                {/* LEFT: VISUALS */}
                <div className="relative h-[50vh] lg:h-screen lg:sticky lg:top-0 overflow-hidden bg-stone-100">
                    <div className="w-full h-full">
                        {/* Simulating "Looping Video" with Image + Scale effect */}
                        <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
                            className="w-full h-full relative"
                        >
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </motion.div>
                    </div>

                    <div className="absolute top-20 left-6 z-10">
                        <Link href="/">
                            <Button variant="ghost" size="icon" className="bg-white/50 backdrop-blur-md rounded-full hover:bg-white text-[var(--color-text-main)] transition-all shadow-sm">
                                <ArrowLeft className="w-5 h-5" />
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* RIGHT: DETAILS */}
                <div className="p-8 md:p-16 lg:pt-32 space-y-12 bg-white">
                    {/* Header */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-[var(--color-accent)] font-medium text-sm tracking-wide">
                            <span className="uppercase">{product.category}</span>
                            <span className="w-1 h-1 bg-[var(--color-accent)] rounded-full"></span>
                            <span>Handmade in {artisan?.location.split(',')[0]}</span>
                        </div>

                        <h1 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-text-main)] leading-tight">
                            {product.title}
                        </h1>

                        <p className="text-lg text-stone-600 leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    {/* Artisan Card */}
                    {artisan && (
                        <VerificationModal
                            artisanName={artisan.name}
                            location={artisan.location}
                            trigger={
                                <div className="bg-[var(--color-primary-bg)] rounded-sm p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 border border-stone-200 hover:border-[var(--color-action)]/30 transition-colors cursor-pointer group">
                                    <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 border border-stone-100">
                                        <Image
                                            src={artisan.image}
                                            alt={artisan.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="space-y-2 text-center sm:text-left">
                                        <div>
                                            <h3 className="font-serif text-lg font-bold text-[var(--color-text-main)]">{artisan.name}</h3>
                                            <div className="flex items-center justify-center sm:justify-start gap-1 text-[var(--color-accent)] text-sm font-medium group-hover:underline">
                                                <ShieldCheck className="w-4 h-4" />
                                                <span>Verified by Shilp Mitra</span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-stone-500 italic">
                                            &quot;{artisan.story}&quot;
                                        </p>
                                    </div>
                                </div>
                            }
                        />
                    )}

                    {/* Transparency Chart */}
                    <div className="space-y-4">
                        <h3 className="font-serif text-xl font-bold">Price Transparency</h3>
                        <div className="flex h-4 w-full rounded-full overflow-hidden bg-stone-100">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${product.transparency.artisan}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="h-full bg-[var(--color-action)]"
                                title={`Artisan: ${product.transparency.artisan}%`}
                            />
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${product.transparency.materials}%` }}
                                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                                className="h-full bg-stone-400"
                                title={`Materials: ${product.transparency.materials}%`}
                            />
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${product.transparency.platform}%` }}
                                transition={{ duration: 1, delay: 1, ease: "easeOut" }}
                                className="h-full bg-stone-200"
                                title={`Platform: ${product.transparency.platform}%`}
                            />
                        </div>
                        <div className="flex justify-between text-xs text-stone-500 font-medium">
                            <div className="flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-[var(--color-action)]"></div>
                                Direct to Artisan ({product.transparency.artisan}%)
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-stone-400"></div>
                                Materials ({product.transparency.materials}%)
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-stone-200"></div>
                                Platform Fee ({product.transparency.platform}%)
                            </div>
                        </div>
                    </div>

                    {/* Action Area */}
                    <div className="pt-8 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div>
                            <p className="text-sm text-stone-500 mb-1">Total Price</p>
                            <p className="font-serif text-4xl font-bold text-[var(--color-action)]">₹{product.price.toLocaleString()}</p>
                        </div>
                        <Button
                            size="lg"
                            onClick={() => {
                                addToCart(product);
                                const btn = document.activeElement as HTMLElement;
                                if (btn) {
                                    btn.innerText = "Added to Bag!";
                                    setTimeout(() => btn.innerText = "Add to Bag", 2000);
                                }
                            }}
                            className="w-full sm:w-auto px-12 h-14 text-lg bg-[var(--color-action)] hover:bg-[var(--color-action)]/90 shadow-lg hover:shadow-xl transition-all"
                        >
                            Add to Bag
                        </Button>
                    </div>
                </div>
            </div>

            <ReviewSection productId={product.id} />
            <RelatedProducts currentProductId={product.id} category={product.category} />
            <Footer />
        </div>
    );
}
