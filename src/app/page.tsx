"use client";

import * as React from "react";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { artisans } from "@/data/artisans";
import { products } from "@/data/products";
import { ProductCard } from "@/components/features/ProductCard";

import { IndiaMap } from "@/components/features/IndiaMap";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  React.useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [selectedRegion, setSelectedRegion] = React.useState<string | null>(null);
  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = products.filter(p => {
    const matchCategory = selectedCategory === "All" || p.category === selectedCategory;

    let matchRegion = true;
    if (selectedRegion) {
      // Find artisan for this product
      const artisan = artisans.find(a => a.id === p.artisanId);
      // Check if artisan location contains the selected region string
      if (artisan) {
        // Simple string matching: "Kutch, Gujarat" contains "Gujarat"
        matchRegion = artisan.location.includes(selectedRegion.split(" ")[0]) || artisan.location.includes(selectedRegion.split(" ")[1] || "XYZ");
        // Better robust check:
        if (selectedRegion === "Jammu & Kashmir") matchRegion = artisan.location.includes("Kashmir");
        else if (selectedRegion === "Uttar Pradesh") matchRegion = artisan.location.includes("UP") || artisan.location.includes("Varanasi");
        else matchRegion = artisan.location.includes(selectedRegion);
      }
    }

    return matchCategory && matchRegion;
  });

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-primary-bg)]">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-[var(--color-action)] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <h2 className="font-serif text-xl text-[var(--color-text-main)]">Entering ShilpSetu...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-primary-bg)] font-sans">
      <Navbar />

      <main>
        {/* HERO SECTION */}
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
          {/* Background Image (Simulating Video with Scale) */}
          <motion.div
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0 z-0"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 30, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
              className="w-full h-full relative"
            >
              <Image
                src="/images/silk_saree_varanasi_1767859999068.png"
                alt="Artisan working"
                fill
                className="object-cover opacity-90"
                priority
              />
              <div className="absolute inset-0 bg-black/30" />
            </motion.div>
          </motion.div>

          <div className="relative z-10 text-center text-white space-y-6 px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="font-serif text-5xl md:text-7xl font-bold tracking-tight drop-shadow-lg"
            >
              Own a Piece of India&apos;s Soul.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-lg md:text-xl font-light max-w-2xl mx-auto text-stone-100 drop-shadow-md"
            >
              Handcrafted stories, woven by master artisans, delivered with transparency.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <Button
                size="lg"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                className="bg-white text-[var(--color-text-main)] hover:bg-stone-100 text-base px-8 h-12 shadow-xl border-none"
              >
                Explore Stories
              </Button>
            </motion.div>
          </div>
        </section>

        {/* JOURNEY STRIP */}
        <section className="py-16 bg-white border-b border-stone-100 overflow-hidden">
          <div className="container mx-auto px-6">
            <h2 className="font-serif text-2xl font-bold mb-8 text-[var(--color-text-main)]">Meet the Makers</h2>
            <div className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide no-scrollbar">
              {artisans.map((artisan) => (
                <Link key={artisan.id} href={`/artisan/${artisan.id}`} className="flex flex-col items-center min-w-[120px] group cursor-pointer">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-transparent group-hover:border-[var(--color-action)] transition-all mb-3">
                    <Image
                      src={artisan.image}
                      alt={artisan.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <span className="font-medium text-[var(--color-text-main)] group-hover:text-[var(--color-action)] transition-colors">{artisan.name}</span>
                  <span className="text-xs text-stone-500">{artisan.location}</span>
                </Link>
              ))}
              {/* Fake multiple artisans for the strip effect */}
              {[2, 3, 4, 5].map((i) => (
                <div key={i} className="flex flex-col items-center min-w-[120px] group cursor-pointer opacity-50 hover:opacity-100">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden bg-stone-200 mb-3">
                    {/* Placeholder for other artisans */}
                  </div>
                  <span className="font-medium text-[var(--color-text-main)]">Artisan {i}</span>
                  <span className="text-xs text-stone-500">Village</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INTERACTIVE MAP DISCOVERY */}
        <section className="py-24 bg-stone-50 overflow-hidden">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="font-serif text-4xl font-bold text-[var(--color-text-main)] mb-6">Explore by Region</h2>
              <p className="text-lg text-stone-600 mb-8 max-w-md">
                India&apos;s craftsmanship changes with its geography.
                Click on a region to discover the unique stories and techniques native to that land.
              </p>

              <div className="space-y-4">
                {selectedRegion ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 bg-white rounded-lg shadow-sm border-l-4 border-[var(--color-action)]"
                  >
                    <h3 className="font-bold text-xl mb-2 text-[var(--color-text-main)]">Filtering: {selectedRegion}</h3>
                    <p className="text-stone-600 mb-4">Showing artisan crafts from this region.</p>
                    <Button variant="outline" onClick={() => setSelectedRegion(null)}>Clear Filter</Button>
                  </motion.div>
                ) : (
                  <div className="p-6 bg-white/50 rounded-lg border border-stone-100">
                    <p className="text-stone-500 italic">Select a state on the map to filter products...</p>
                  </div>
                )}
              </div>
            </div>
            <div className="order-1 md:order-2">
              <IndiaMap selectedRegion={selectedRegion} onRegionSelect={setSelectedRegion} />
            </div>
          </div>
        </section>

        {/* CURATED COLLECTIONS */}
        <section className="py-24 bg-[var(--color-primary-bg)]">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <h2 className="font-serif text-4xl font-bold text-[var(--color-text-main)] mb-2">Curated Collections</h2>
                <p className="text-stone-500">Handpicked treasures from across the country.</p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${selectedCategory === cat
                      ? "bg-[var(--color-action)] text-white shadow-md"
                      : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Masonry-ish Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isLarge={index === 0 && selectedCategory === "All" && !selectedRegion}
                  className={index === 0 && selectedCategory === "All" && !selectedRegion ? "md:col-span-2 md:row-span-2" : ""}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
