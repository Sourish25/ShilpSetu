"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, Check, MapPin, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

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
            "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
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
                "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-sm sm:rounded-lg",
                className
            )}
            {...props}
        >
            {children}
            <DialogPrimitive.Close className="absolute right-4 top-4 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
        </DialogPrimitive.Content>
    </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

interface VerificationModalProps {
    trigger?: React.ReactNode;
    artisanName: string;
    location: string;
}

export function VerificationModal({ trigger, artisanName, location }: VerificationModalProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="bg-white p-0 overflow-hidden max-w-2xl">
                <div className="grid md:grid-cols-2">
                    <div className="bg-stone-100 p-8 flex flex-col justify-center items-center text-center space-y-4">
                        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-sm">
                            <Image
                                src="/images/lakshmi.png" // Placeholder for Verification Officer
                                alt="Shilp Mitra"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <h3 className="font-serif text-lg font-bold">Rohini Das</h3>
                            <p className="text-sm text-[var(--color-text-main)]">Verified Shilp Mitra</p>
                            <p className="text-xs text-stone-500">Student ID: SM-2026-041</p>
                        </div>
                    </div>
                    <div className="p-8 space-y-6">
                        <div className="space-y-1">
                            <h2 className="font-serif text-2xl font-bold">Verification Report</h2>
                            <p className="text-stone-500 text-sm">Verified on Jan 12, 2026</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-green-50 rounded-full text-green-700 mt-0.5">
                                    <MapPin className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-sm">Location Check</h4>
                                    <p className="text-xs text-stone-500">Confirmed workshop in {location}.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-green-50 rounded-full text-green-700 mt-0.5">
                                    <Search className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-sm">Material Audit</h4>
                                    <p className="text-xs text-stone-500">100% Organic material sourced locally.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-green-50 rounded-full text-green-700 mt-0.5">
                                    <Check className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-sm">Process Verification</h4>
                                    <p className="text-xs text-stone-500">Hand-made using traditional techniques.</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-3 bg-[var(--color-primary-bg)] border border-[var(--color-action)]/20 rounded-lg text-xs text-[var(--color-text-main)] italic">
                            &quot;I personally visited {artisanName}&apos;s workshop and verified that no child labor was involved and fair wages are paid.&quot;
                            <div className="mt-2 font-semibold text-[var(--color-action)]">- Rohini, Shilp Mitra</div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
