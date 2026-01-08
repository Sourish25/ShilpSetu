"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ShilpMitra() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
        { text: "Namaste! I am Shilp Mitra. How can I help you find the perfect handcrafted treasure today?", isUser: false }
    ]);
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        // User Message
        const userMsg = inputValue;
        setMessages(prev => [...prev, { text: userMsg, isUser: true }]);
        setInputValue("");

        // Simulated AI Response
        setTimeout(() => {
            let aiMsg = "I can help with that! Identifying the best artisan for you...";

            if (userMsg.toLowerCase().includes("gift")) {
                aiMsg = "A gift? How thoughtful! For a special occasion, I recommend the Banarasi Silk Saree or the Intricate Brass Lamp. Both carry stories of prosperity.";
            } else if (userMsg.toLowerCase().includes("saree") || userMsg.toLowerCase().includes("silk")) {
                aiMsg = "Our Banarasi Silk Sarees are woven by Kabir in Varanasi. They take 300 hours to craft! Would you like to see his collection?";
            } else if (userMsg.toLowerCase().includes("decor") || userMsg.toLowerCase().includes("home")) {
                aiMsg = "For home decor, the Blue Pottery from Jaipur is stunning. Verified artisan Ramesh uses a unique growing technique.";
            }

            setMessages(prev => [...prev, { text: aiMsg, isUser: false }]);
        }, 1000);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 mb-4 overflow-hidden border border-stone-200"
                    >
                        {/* Header */}
                        <div className="bg-[var(--color-text-main)] p-4 flex items-center justify-between text-white">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-yellow-300" />
                                <span className="font-serif font-bold">Shilp Mitra</span>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/10 h-8 w-8">
                                <X className="w-4 h-4" />
                            </Button>
                        </div>

                        {/* Chat Area */}
                        <div className="h-80 bg-stone-50 p-4 overflow-y-auto flex flex-col gap-3">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`p-3 rounded-lg max-w-[80%] text-sm ${msg.isUser
                                            ? "bg-[var(--color-action)] text-white self-end rounded-br-none"
                                            : "bg-white border border-stone-200 text-stone-800 self-start rounded-bl-none shadow-sm"
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-3 bg-white border-t border-stone-100 flex gap-2">
                            <input
                                type="text"
                                placeholder="Ask about artisans, crafts..."
                                className="flex-1 px-3 py-2 bg-stone-50 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-action)]"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            />
                            <Button size="icon" className="bg-[var(--color-text-main)]" onClick={handleSend}>
                                <Send className="w-4 h-4" />
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="bg-[var(--color-text-main)] text-white p-4 rounded-full shadow-lg flex items-center gap-2 hover:bg-stone-800 transition-colors"
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
                {!isOpen && <span className="font-medium pr-2">Ask Shilp Mitra</span>}
            </motion.button>
        </div>
    );
}
