"use client";

import { Star, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const MOCK_REVIEWS = [
    {
        id: 1,
        user: "Ananya Sharma",
        rating: 5,
        date: "2 days ago",
        comment: "Absolutely stunning craftsmanship. The silk feels so premium and the intricate zari work is breathtaking. Worth every rupee!",
        likes: 12
    },
    {
        id: 2,
        user: "David Miller",
        rating: 5,
        date: "1 week ago",
        comment: "I bought this as a gift for my wife and she loves it. The packaging was eco-friendly which I really appreciated. Fast shipping to the US.",
        likes: 8
    },
    {
        id: 3,
        user: "Priya Singh",
        rating: 4,
        date: "2 weeks ago",
        comment: "Beautiful product, exactly as described. The color is slightly more vibrant in person than in the photos, which was a pleasant surprise.",
        likes: 5
    }
];

interface ReviewSectionProps {
    productId?: string;
}

export function ReviewSection({ productId }: ReviewSectionProps) {
    return (
        <section className="py-16 bg-stone-50">
            <div className="container mx-auto px-6 max-w-5xl">
                <h2 className="font-serif text-3xl font-bold text-[var(--color-text-main)] mb-8">Customer Reviews</h2>

                <div className="grid md:grid-cols-3 gap-12">
                    {/* Rating Summary */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
                            <div className="text-center mb-4">
                                <span className="text-5xl font-bold text-[var(--color-text-main)]">4.8</span>
                                <div className="flex justify-center text-yellow-400 gap-1 my-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} fill="currentColor" className="w-5 h-5" />
                                    ))}
                                </div>
                                <p className="text-stone-500 text-sm">Based on 128 reviews</p>
                            </div>

                            <div className="space-y-2">
                                {[5, 4, 3, 2, 1].map((rating) => (
                                    <div key={rating} className="flex items-center gap-3 text-sm">
                                        <span className="w-3">{rating}</span>
                                        <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-yellow-400 rounded-full"
                                                style={{ width: rating === 5 ? '80%' : rating === 4 ? '15%' : '5%' }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Button className="w-full mt-6 bg-transparent border border-[var(--color-action)] text-[var(--color-action)] hover:bg-[var(--color-action)] hover:text-white transition-all">
                                Write a Review
                            </Button>
                        </div>
                    </div>

                    {/* Reviews List */}
                    <div className="md:col-span-2 space-y-6">
                        {MOCK_REVIEWS.map((review, idx) => (
                            <motion.div
                                key={review.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-6 rounded-xl shadow-sm border border-stone-100"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-stone-200 rounded-full flex items-center justify-center font-bold text-stone-600">
                                            {review.user[0]}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[var(--color-text-main)]">{review.user}</h4>
                                            <div className="flex items-center gap-2">
                                                <div className="flex text-yellow-400 text-xs">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} fill={i < review.rating ? "currentColor" : "none"} className="w-3 h-3" />
                                                    ))}
                                                </div>
                                                <span className="text-xs text-stone-400">• {review.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-stone-600 leading-relaxed mb-4">
                                    {review.comment}
                                </p>
                                <div className="flex items-center gap-4 text-stone-400 text-sm">
                                    <button className="flex items-center gap-1 hover:text-[var(--color-action)] transition-colors">
                                        <ThumbsUp className="w-4 h-4" />
                                        Helpful ({review.likes})
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
