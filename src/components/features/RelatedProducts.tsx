"use client";

import { Product, products } from "@/data/products";
import { ProductCard } from "./ProductCard";

interface RelatedProductsProps {
    currentProductId: string;
    category: string;
}

export function RelatedProducts({ currentProductId, category }: RelatedProductsProps) {
    // Filter products: same category, exclude current, limit to 4
    const related = products
        .filter((p) => p.category === category && p.id !== currentProductId)
        .slice(0, 4);

    if (related.length === 0) return null;

    return (
        <section className="py-16 bg-[var(--color-primary-bg)] border-t border-stone-100">
            <div className="container mx-auto px-6">
                <h2 className="font-serif text-2xl font-bold text-[var(--color-text-main)] mb-8">
                    You May Also Like
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {related.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
