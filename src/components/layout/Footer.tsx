import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-stone-900 text-stone-300 py-16 mt-24 border-t border-stone-800">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
                {/* Brand Column */}
                <div className="md:col-span-4 space-y-6">
                    <h3 className="font-serif text-2xl font-bold text-white">ShilpSetu</h3>
                    <p className="text-sm leading-relaxed max-w-sm">
                        Bridging the gap between India's heritage and your home. We are a digital sanctuary for master artisans, ensuring fair trade, radical transparency, and storytelling that honors the maker.
                    </p>
                    <div className="flex gap-4 pt-2">
                        {/* Social Placeholders */}
                        <div className="w-10 h-10 rounded-full bg-stone-800 hover:bg-[var(--color-action)] transition-colors flex items-center justify-center cursor-pointer text-white">IG</div>
                        <div className="w-10 h-10 rounded-full bg-stone-800 hover:bg-[var(--color-action)] transition-colors flex items-center justify-center cursor-pointer text-white">TW</div>
                        <div className="w-10 h-10 rounded-full bg-stone-800 hover:bg-[var(--color-action)] transition-colors flex items-center justify-center cursor-pointer text-white">YT</div>
                    </div>
                </div>

                {/* Links Columns */}
                <div className="md:col-span-2">
                    <h4 className="font-medium text-white mb-6">Shop</h4>
                    <ul className="space-y-3 text-sm">
                        <li><Link href="#" className="hover:text-[var(--color-action)] transition-colors">New Arrivals</Link></li>
                        <li><Link href="#" className="hover:text-[var(--color-action)] transition-colors">Textiles</Link></li>
                        <li><Link href="#" className="hover:text-[var(--color-action)] transition-colors">Decor</Link></li>
                        <li><Link href="#" className="hover:text-[var(--color-action)] transition-colors">Pottery</Link></li>
                    </ul>
                </div>

                <div className="md:col-span-2">
                    <h4 className="font-medium text-white mb-6">About</h4>
                    <ul className="space-y-3 text-sm">
                        <li><Link href="#" className="hover:text-[var(--color-action)] transition-colors">Our Story</Link></li>
                        <li><Link href="#" className="hover:text-[var(--color-action)] transition-colors">Artisans</Link></li>
                        <li><Link href="#" className="hover:text-[var(--color-action)] transition-colors">Impact Report</Link></li>
                        <li><Link href="#" className="hover:text-[var(--color-action)] transition-colors">Careers</Link></li>
                    </ul>
                </div>

                {/* Newsletter Column */}
                <div className="md:col-span-4 rounded-2xl bg-stone-800 p-8">
                    <h4 className="font-medium text-white mb-2">Join the Journey</h4>
                    <p className="text-xs text-stone-400 mb-6">
                        Receive tales from the loom, artisan spotlights, and early access to new collections.
                    </p>
                    <div className="space-y-3">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="w-full px-4 py-3 bg-stone-900 border border-stone-700 rounded-md text-sm focus:outline-none focus:border-[var(--color-action)] transition-colors"
                        />
                        <button className="w-full py-3 bg-[var(--color-action)] text-white font-medium rounded-md hover:bg-orange-700 transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-6 mt-16 pt-8 border-t border-stone-800 text-center text-xs text-stone-500">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>© 2026 ShilpSetu. Built with ❤️ for e-Cell Hackathon.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );

}
