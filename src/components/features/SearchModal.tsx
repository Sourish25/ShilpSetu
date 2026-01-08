"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Search, X, ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
        ref={ref}
        className={cn(
            "fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            className
        )}
        {...props}
    />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
    <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
            ref={ref}
            className={cn(
                "fixed left-[50%] top-24 z-[101] grid w-full max-w-2xl translate-x-[-50%] gap-4 border bg-white p-0 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-top-[2%] data-[state=open]:slide-in-from-top-[2%] rounded-xl overflow-hidden",
                className
            )}
            {...props}
        >
            {children}
        </DialogPrimitive.Content>
    </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

interface SearchModalProps {
    trigger?: React.ReactNode;
}

export function SearchModal({ trigger }: SearchModalProps) {
    const [query, setQuery] = React.useState("");
    const [open, setOpen] = React.useState(false);

    const filtered = React.useMemo(() => {
        if (!query) return [];
        return products.filter(p =>
            p.title.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5);
    }, [query]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent>
                <div className="flex items-center border-b border-stone-100 px-4 py-4">
                    <Search className="mr-3 h-6 w-6 text-stone-400" />
                    <input
                        className="flex-1 bg-transparent text-lg outline-none placeholder:text-stone-400 font-medium"
                        placeholder="Search for artisans, products, or stories..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoFocus
                    />
                    <button onClick={() => setOpen(false)} className="p-1 hover:bg-stone-100 rounded-full">
                        <X className="h-5 w-5 text-stone-500" />
                    </button>
                </div>

                <div className="max-h-[60vh] overflow-y-auto">
                    {query === "" ? (
                        <div className="p-8 text-center text-stone-400">
                            <p className="text-sm">Try searching for &quot;Silk&quot;, &quot;Pottery&quot;, or &quot;Decor&quot;</p>
                        </div>
                    ) : filtered.length > 0 ? (
                        <div className="py-2">
                            <p className="px-4 py-2 text-xs font-semibold text-stone-500 uppercase tracking-wider">Products</p>
                            {filtered.map(product => (
                                <Link
                                    key={product.id}
                                    href={`/product/${product.id}`}
                                    onClick={() => setOpen(false)}
                                    className="px-4 py-3 flex items-center gap-4 hover:bg-stone-50 transition-colors group"
                                >
                                    <div className="relative w-12 h-12 rounded-md overflow-hidden bg-stone-100">
                                        <Image src={product.image} alt={product.title} fill className="object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium text-[var(--color-text-main)] group-hover:text-[var(--color-action)] transition-colors">{product.title}</h4>
                                        <p className="text-xs text-stone-500">{product.category}</p>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-[var(--color-action)] -translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center text-stone-500">
                            No results found for &quot;{query}&quot;.
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
