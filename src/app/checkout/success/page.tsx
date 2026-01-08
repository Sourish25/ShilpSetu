"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, ShoppingBag } from "lucide-react";
import { useEffect } from "react";
import { useCart } from "@/context/CartContext";

export default function CheckoutSuccessPage() {
    const { clearCart } = useCart();

    useEffect(() => {
        clearCart();
    }, [clearCart]);

    return (
        <div className="min-h-screen pt-24 pb-20 px-6 flex flex-col items-center justify-center text-center">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "backOut" }}
                className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8"
            >
                <Check className="w-12 h-12 text-green-600" />
            </motion.div>

            <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4"
            >
                Order Placed Successfully!
            </motion.h1>

            <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-lg text-stone-600 max-w-md mb-8"
            >
                Thank you for supporting India&apos;s artisans. Your order is being carefully prepared by the makers themselves.
            </motion.p>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                <Link href="/">
                    <Button size="lg" className="bg-[var(--color-text-main)] hover:bg-[var(--color-action)] text-white px-8">
                        Continue Shopping
                    </Button>
                </Link>
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="mt-12 p-6 bg-stone-50 rounded-xl border border-stone-100 max-w-sm w-full"
            >
                <div className="flex items-center gap-3 mb-2 text-stone-900 font-medium">
                    <ShoppingBag className="w-5 h-5 text-[var(--color-action)]" />
                    <span>What happens next?</span>
                </div>
                <p className="text-sm text-stone-600 text-left">
                    Direct bank transfer details have been emailed to you. Once payment is verified, the artisan will ship your unique piece.
                </p>
            </motion.div>
        </div>
    );
}
