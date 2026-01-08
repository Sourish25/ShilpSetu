"use client";

import { useState } from "react";
import { useAuth, UserRole } from "@/context/AuthContext";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, User, Hammer } from "lucide-react";

export default function LoginPage() {
    const [role, setRole] = useState<UserRole>("CUSTOMER");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 1000));
        login(role, email);
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Image */}
            <div className="hidden lg:block w-1/2 relative bg-stone-900">
                <Image
                    src={role === "CUSTOMER" ? "/images/silk_saree_varanasi_1767859999068.png" : "/images/artisan_lakshmi_1767860055874.png"}
                    alt="Login Background"
                    fill
                    className="object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 to-transparent" />
                <div className="absolute bottom-12 left-12 text-white">
                    <h2 className="font-serif text-4xl mb-4">
                        {role === "CUSTOMER" ? "Discover India's Soul." : "Share Your Craft."}
                    </h2>
                    <p className="text-stone-300 max-w-md text-lg">
                        {role === "CUSTOMER"
                            ? "Join a community that values heritage, transparency, and the hands that create beauty."
                            : "Connect directly with patrons who cherish your work and heritage."}
                    </p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-stone-50 p-8">
                <div className="w-full max-w-md space-y-8">
                    <Link href="/" className="inline-flex items-center text-sm text-stone-500 hover:text-[var(--color-action)] transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                    </Link>

                    <div className="text-center">
                        <h1 className="font-serif text-3xl font-bold text-stone-900">Welcome Back</h1>
                        <p className="mt-2 text-stone-600">Please sign in to your account</p>
                    </div>

                    {/* Role Toggles */}
                    <div className="grid grid-cols-2 gap-4 p-1 bg-stone-200 rounded-lg">
                        <button
                            onClick={() => setRole("CUSTOMER")}
                            className={`flex items-center justify-center gap-2 py-3 rounded-md text-sm font-medium transition-all ${role === "CUSTOMER"
                                ? "bg-white text-stone-900 shadow-sm"
                                : "text-stone-500 hover:text-stone-700"
                                }`}
                        >
                            <User className="w-4 h-4" /> Customer
                        </button>
                        <button
                            onClick={() => setRole("ARTISAN")}
                            className={`flex items-center justify-center gap-2 py-3 rounded-md text-sm font-medium transition-all ${role === "ARTISAN"
                                ? "bg-white text-stone-900 shadow-sm"
                                : "text-stone-500 hover:text-stone-700"
                                }`}
                        >
                            <Hammer className="w-4 h-4" /> Artisan
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-stone-700">
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--color-action)] focus:border-[var(--color-action)]"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-stone-700">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--color-action)] focus:border-[var(--color-action)]"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[var(--color-action)] hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-action)] disabled:opacity-50 transition-colors"
                        >
                            {isLoading ? "Signing in..." : "Sign in"}
                        </button>
                    </form>

                    <div className="text-center text-sm">
                        <span className="text-stone-500">Don&apos;t have an account? </span>
                        <Link href="#" className="font-medium text-[var(--color-action)] hover:text-orange-700">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
