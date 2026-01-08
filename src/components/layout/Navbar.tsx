"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { SearchModal } from "@/components/features/SearchModal";

export function Navbar() {
    const router = useRouter();

    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100"
        >
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-[var(--color-text-main)]">
                    ShilpSetu
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
                    <Link href="/" className="hover:text-[var(--color-action)] transition-colors">
                        Stories
                    </Link>
                    <Link href="#" className="hover:text-[var(--color-action)] transition-colors">
                        Collections
                    </Link>
                    <Link href="#" className="hover:text-[var(--color-action)] transition-colors">
                        Artisans
                    </Link>
                    <Link href="#" className="hover:text-[var(--color-action)] transition-colors">
                        About
                    </Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <SearchModal trigger={
                        <Button
                            variant="ghost"
                            size="icon"
                            className="hidden md:flex"
                        >
                            <Search className="w-5 h-5 text-stone-600" />
                        </Button>
                    } />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.push('/checkout')}
                    >
                        <ShoppingBag className="w-5 h-5 text-stone-600" />
                        <span className="sr-only">Cart</span>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? (
                            <X className="w-5 h-5 text-stone-600" />
                        ) : (
                            <Menu className="w-5 h-5 text-stone-600" />
                        )}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden bg-white border-b border-stone-100 overflow-hidden"
                >
                    <nav className="flex flex-col p-6 gap-4 text-lg font-medium text-stone-600">
                        <Link href="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-[var(--color-action)]">Stories</Link>
                        <Link href="#" onClick={() => setMobileMenuOpen(false)} className="hover:text-[var(--color-action)]">Collections</Link>
                        <Link href="#" onClick={() => setMobileMenuOpen(false)} className="hover:text-[var(--color-action)]">Artisans</Link>
                        <Link href="#" onClick={() => setMobileMenuOpen(false)} className="hover:text-[var(--color-action)]">About</Link>
                        <div className="pt-4 border-t border-stone-100">
                            <SearchModal trigger={
                                <Button
                                    variant="outline"
                                    className="w-full justify-start gap-2 text-stone-500"
                                >
                                    <Search className="w-4 h-4" />
                                    Search...
                                </Button>
                            } />
                        </div>
                    </nav>
                </motion.div>
            )}
        </motion.header>
    );
}
