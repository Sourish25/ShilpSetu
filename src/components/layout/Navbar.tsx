"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, Menu, Search, X, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { SearchModal } from "@/components/features/SearchModal";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
    const router = useRouter();
    const { user } = useAuth();
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
                    {user?.role === "ARTISAN" && (
                        <Link href="/dashboard" className="text-[var(--color-action)] font-semibold hover:text-orange-800 transition-colors">
                            Dashboard
                        </Link>
                    )}
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

                    {user ? (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="hidden md:flex items-center gap-2"
                            onClick={() => user.role === "ARTISAN" ? router.push('/dashboard') : null}
                        >
                            <UserIcon className="w-5 h-5 text-stone-600" />
                            <span className="text-sm font-medium hidden lg:inline-block">{user.name.split(' ')[0]}</span>
                        </Button>
                    ) : (
                        <Button
                            variant="default" // Using default (filled) variant
                            size="sm"
                            className="hidden md:flex font-medium bg-[var(--color-action)] text-white hover:bg-orange-700 shadow-md transform hover:scale-105 transition-all"
                            onClick={() => router.push('/login')}
                        >
                            Sign In
                        </Button>
                    )}

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
                        {user?.role === "ARTISAN" && (
                            <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-[var(--color-action)] font-semibold">Dashboard</Link>
                        )}
                        {!user && (
                            <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="hover:text-[var(--color-action)]">Sign In</Link>
                        )}
                        <Link href="#" onClick={() => setMobileMenuOpen(false)} className="hover:text-[var(--color-action)]">Collections</Link>

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
