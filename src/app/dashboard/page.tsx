"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    Package,
    ShoppingBag,
    TrendingUp,
    Settings,
    LogOut,
    Plus
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function DashboardPage() {
    const { user, logout, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && (!user || user.role !== "ARTISAN")) {
            router.push("/login");
        }
    }, [user, isLoading, router]);

    if (isLoading || !user) {
        return <div className="min-h-screen flex items-center justify-center bg-stone-50">Loading Dashboard...</div>;
    }

    const stats = [
        { label: "Total Earnings", value: "₹45,200", change: "+12%", icon: TrendingUp },
        { label: "Active Orders", value: "8", change: "3 Pending", icon: ShoppingBag },
        { label: "Products Listed", value: "12", change: "2 Low Stock", icon: Package },
    ];

    return (
        <div className="min-h-screen bg-stone-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-stone-200 fixed h-full hidden lg:flex flex-col">
                <div className="p-6 border-b border-stone-100">
                    <Link href="/" className="font-serif text-2xl font-bold text-stone-900">
                        ShilpSetu
                    </Link>
                    <span className="text-xs text-[var(--color-action)] font-medium uppercase tracking-wider block mt-1">Artisan Console</span>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <NavItem icon={LayoutDashboard} label="Overview" active />
                    <NavItem icon={Package} label="My Inventory" />
                    <NavItem icon={ShoppingBag} label="Orders" />
                    <NavItem icon={TrendingUp} label="Analytics" />
                    <NavItem icon={Settings} label="Settings" />
                </nav>

                <div className="p-4 border-t border-stone-100">
                    <div className="flex items-center gap-3 mb-4 px-2">
                        <div className="w-10 h-10 rounded-full bg-stone-200 overflow-hidden relative">
                            <Image
                                src="/images/artisan_lakshmi_1767860055874.png"
                                alt="Profile"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-stone-900">{user.name}</p>
                            <p className="text-xs text-stone-500">Kanchipuram, TN</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 w-full px-2 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                        <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:ml-64 p-8">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="font-serif text-3xl font-bold text-stone-900">Dashboard</h1>
                        <p className="text-stone-500 mt-1">Welcome back, {user.name.split(' ')[0]}. Here is what&apos;s happening today.</p>
                    </div>
                    <button className="bg-[var(--color-action)] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-orange-700 transition-colors shadow-sm">
                        <Plus className="w-4 h-4" /> Add New Product
                    </button>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-xl border border-stone-100 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-stone-50 rounded-lg">
                                    <stat.icon className="w-5 h-5 text-stone-600" />
                                </div>
                                <span className="text-xs font-medium bg-green-50 text-green-700 px-2 py-1 rounded-full">
                                    {stat.change}
                                </span>
                            </div>
                            <h3 className="text-stone-500 text-sm font-medium">{stat.label}</h3>
                            <p className="text-2xl font-bold text-stone-900 mt-1">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Recent Items Table (Mock) */}
                <div className="bg-white rounded-xl border border-stone-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-stone-100">
                        <h3 className="font-medium text-stone-900">Recent Products</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-stone-50 text-stone-500 font-medium">
                                <tr>
                                    <th className="px-6 py-3">Product Name</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3">Price</th>
                                    <th className="px-6 py-3">Sales</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-100">
                                <ProductRow name="Kanchipuram Silk Saree" status="In Stock" price="₹4,200" sales="8" />
                                <ProductRow name="Handwoven Temple Border" status="Low Stock" price="₹1,800" sales="15" />
                                <ProductRow name="Bridal Silk Collection" status="Draft" price="₹12,500" sales="0" />
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}

function NavItem({ icon: Icon, label, active = false }: { icon: React.ElementType, label: string, active?: boolean }) {
    return (
        <a href="#" className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${active
            ? "bg-stone-100 text-stone-900"
            : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
            }`}>
            <Icon className={`w-4 h-4 ${active ? "text-[var(--color-action)]" : "text-stone-400"}`} />
            {label}
        </a>
    );
}

function ProductRow({ name, status, price, sales }: { name: string, status: string, price: string, sales: string }) {
    const statusColor = status === "In Stock" ? "text-green-600 bg-green-50" : status === "Low Stock" ? "text-amber-600 bg-amber-50" : "text-stone-500 bg-stone-100";

    return (
        <tr className="hover:bg-stone-50/50 transition-colors">
            <td className="px-6 py-4 font-medium text-stone-900">{name}</td>
            <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                    {status}
                </span>
            </td>
            <td className="px-6 py-4 text-stone-600">{price}</td>
            <td className="px-6 py-4 text-stone-600">{sales}</td>
        </tr>
    );
}
