import React from 'react';

const Footer = () => {
    return (
        <footer className="relative bg-luxury-charcoal border-t border-white/5 pt-24 pb-8 px-6 sm:px-8 lg:px-12">
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Newsletter */}
                <div className="relative -mt-36 mb-20 bg-luxury-carbon border border-white/10 p-10 md:p-14">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                                Stay Updated
                            </h3>
                            <p className="text-sm text-luxury-silver font-light">
                                Subscribe for exclusive offers and new arrivals
                            </p>
                        </div>
                        <div className="flex w-full md:w-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-grow md:w-72 px-5 py-3.5 bg-transparent border border-white/20 text-white placeholder-luxury-silver text-xs tracking-wider focus:outline-none focus:border-luxury-gold transition-colors"
                            />
                            <button className="px-8 py-3.5 bg-white text-black text-[10px] font-semibold uppercase tracking-[0.2em] hover:bg-luxury-gold transition-colors whitespace-nowrap">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <span className="text-lg font-display font-bold tracking-wide text-white block mb-4">
                            SHOP<span className="text-luxury-gold">SMART</span>
                        </span>
                        <p className="text-xs text-luxury-silver leading-relaxed mb-6 font-light">
                            Your destination for premium products at unbeatable prices.
                        </p>
                        <div className="flex gap-3">
                            {['Tw', 'Ig', 'Fb', 'Yt'].map((social) => (
                                <a
                                    key={social}
                                    href="#"
                                    className="w-8 h-8 border border-white/10 hover:border-luxury-gold flex items-center justify-center text-luxury-silver hover:text-luxury-gold transition-all text-[9px] font-bold tracking-wider"
                                >
                                    {social}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Shop */}
                    <div>
                        <h4 className="text-[10px] font-semibold text-white uppercase tracking-[0.2em] mb-6">Shop</h4>
                        <ul className="space-y-3">
                            {['New Arrivals', 'Best Sellers', 'Trending', 'Sale', 'Collections'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-xs text-luxury-silver hover:text-luxury-gold transition-colors font-light">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-[10px] font-semibold text-white uppercase tracking-[0.2em] mb-6">Company</h4>
                        <ul className="space-y-3">
                            {['About Us', 'Careers', 'Blog', 'Press', 'Contact'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-xs text-luxury-silver hover:text-luxury-gold transition-colors font-light">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-[10px] font-semibold text-white uppercase tracking-[0.2em] mb-6">Support</h4>
                        <ul className="space-y-3">
                            {['Help Center', 'Shipping', 'Returns', 'Size Guide', 'FAQs'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-xs text-luxury-silver hover:text-luxury-gold transition-colors font-light">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-[10px] text-luxury-silver tracking-wider">
                        © 2026 SHOPSMART. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        {['Privacy', 'Terms', 'Cookies'].map((link) => (
                            <a key={link} href="#" className="text-[10px] text-luxury-silver hover:text-white transition-colors tracking-wider">
                                {link}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
