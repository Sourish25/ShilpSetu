"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export type UserRole = "CUSTOMER" | "ARTISAN" | null;

interface User {
    name: string;
    role: UserRole;
    email: string;
}

interface AuthContextType {
    user: User | null;
    login: (role: UserRole, email: string) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check local storage on mount
        const storedUser = localStorage.getItem("shilpsetua_user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = (role: UserRole, email: string) => {
        const newUser: User = {
            name: role === "ARTISAN" ? "Lakshmi Devi" : "Aditi Sharma",
            role: role,
            email: email,
        };
        setUser(newUser);
        localStorage.setItem("shilpsetua_user", JSON.stringify(newUser));

        // Redirect based on role
        if (role === "ARTISAN") {
            router.push("/dashboard");
        } else {
            router.push("/");
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("shilpsetua_user");
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
