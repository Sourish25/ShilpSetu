"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Truck, ArrowLeft, Package, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

export default function CheckoutPage() {
    const { items, cartTotal } = useCart();
    const [step, setStep] = useState<"form" | "success">("form");
    const [giftWrap, setGiftWrap] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            window.location.href = '/checkout/success';
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[var(--color-primary-bg)] font-sans">
            <Navbar />

            <div className="container mx-auto px-6 pt-32 pb-20 max-w-4xl">
                <AnimatePresence mode="wait">
                    {step === "form" ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid gap-12 md:grid-cols-2"
                        >
                            <div>
                                <h1 className="font-serif text-3xl font-bold mb-8 text-[var(--color-text-main)]">Guest Checkout</h1>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-4">
                                        <h3 className="font-medium text-[var(--color-text-main)]">Contact Information</h3>
                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            required
                                            className="w-full px-4 py-3 rounded-sm border border-stone-200 focus:outline-none focus:border-[var(--color-action)] transition-colors bg-white"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Full Name"
                                            required
                                            className="w-full px-4 py-3 rounded-sm border border-stone-200 focus:outline-none focus:border-[var(--color-action)] transition-colors bg-white"
                                        />
                                    </div>

                                    <div className="space-y-4 pt-4">
                                        <h3 className="font-medium text-[var(--color-text-main)]">Shipping Address</h3>
                                        <input
                                            type="text"
                                            placeholder="Address Line 1"
                                            required
                                            className="w-full px-4 py-3 rounded-sm border border-stone-200 focus:outline-none focus:border-[var(--color-action)] transition-colors bg-white"
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                placeholder="City"
                                                required
                                                className="w-full px-4 py-3 rounded-sm border border-stone-200 focus:outline-none focus:border-[var(--color-action)] transition-colors bg-white"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Postal Code"
                                                required
                                                className="w-full px-4 py-3 rounded-sm border border-stone-200 focus:outline-none focus:border-[var(--color-action)] transition-colors bg-white"
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-6">
                                        <Button type="submit" size="lg" className="w-full h-14 text-lg">
                                            Proceed to Payment
                                        </Button>
                                    </div>
                                </form>
                            </div>

                            <div className="bg-white p-8 rounded-sm shadow-sm h-fit sticky top-32">
                                <h2 className="font-serif text-xl font-bold text-[var(--color-text-main)] mb-6">Order Summary</h2>

                                {items.length === 0 ? (
                                    <div className="text-center py-8 text-stone-500">
                                        <p>Your bag is empty.</p>
                                        <Button variant="link" className="mt-2 text-[var(--color-action)]" onClick={() => window.history.back()}>Continue Shopping</Button>
                                    </div>
                                ) : (
                                    <div className="space-y-4 mb-6">
                                        {items.map((item) => (
                                            <div key={item.id} className="flex gap-4">
                                                <div className="w-20 h-20 bg-stone-100 rounded-md overflow-hidden relative shrink-0">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.title}
                                                        fill
                                                        className="object-cover"
                                                        sizes="80px"
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-[var(--color-text-main)] line-clamp-1">{item.title}</h3>
                                                    <p className="text-sm text-stone-500">Qty: {item.quantity}</p>
                                                    <p className="font-bold text-[var(--color-action)]">₹{(item.price * item.quantity).toLocaleString()}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {items.length > 0 && (
                                    <>
                                        <div className="bg-stone-50 p-4 rounded-lg mb-6">
                                            <div className="flex items-start gap-3">
                                                <Package className="w-5 h-5 text-[var(--color-text-main)] mt-0.5" />
                                                <div>
                                                    <h3 className="font-medium text-sm text-[var(--color-text-main)]">Sustainable Packaging</h3>
                                                    <p className="text-xs text-stone-500 mb-2">Wrap in upcycled newspaper aesthetics?</p>
                                                    <div className="flex items-center gap-2">
                                                        <Checkbox
                                                            id="packaging"
                                                            checked={giftWrap}
                                                            onCheckedChange={(checked) => setGiftWrap(checked === true)}
                                                        />
                                                        <label htmlFor="packaging" className="text-sm cursor-pointer">Yes, please! (+₹50)</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2 text-sm border-t border-stone-100 pt-4">
                                            <div className="flex justify-between">
                                                <span className="text-stone-600">Subtotal</span>
                                                <span>₹{cartTotal.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-[var(--color-action)]">Eco-Packaging</span>
                                                <span>₹{giftWrap ? 50 : 0}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-stone-600">Shipping</span>
                                                <span>Free</span>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center mt-6 pt-4 border-t border-stone-100 mb-6">
                                            <span className="font-serif text-xl font-bold text-[var(--color-text-main)]">Total</span>
                                            <span className="font-xl font-bold text-[var(--color-text-main)]">₹{(cartTotal + (giftWrap ? 50 : 0)).toLocaleString()}</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center text-center min-h-[50vh]"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-8"
                            >
                                <Check className="w-12 h-12" />
                            </motion.div>

                            <h1 className="font-serif text-4xl font-bold mb-4">Thank You!</h1>
                            <p className="text-stone-500 max-w-md mb-8">
                                Your order has been placed. You are supporting <span className="text-[var(--color-action)] font-medium">Lakshmi</span> and her village.
                            </p>

                            <div className="bg-white p-6 rounded-sm border border-stone-100 flex items-center gap-4 mb-8">
                                <Truck className="w-6 h-6 text-[var(--color-action)]" />
                                <div className="text-left">
                                    <p className="font-medium">Estimated Delivery</p>
                                    <p className="text-sm text-stone-500">Arriving by Jan 15, 2026</p>
                                </div>
                            </div>

                            <Link href="/">
                                <Button variant="outline">Continue Exploring</Button>
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
