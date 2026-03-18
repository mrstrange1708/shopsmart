import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            id="navbar"
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled
                    ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 py-3'
                    : 'bg-transparent py-6'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
                {/* Logo */}
                <a href="#" className="flex items-center gap-3 group">
                    <span className="text-2xl font-display font-bold tracking-wide text-white">
                        SHOP<span className="text-luxury-gold">SMART</span>
                    </span>
                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-10">
                    {['Home', 'Products', 'Trending', 'Reviews'].map((link) => (
                        <a
                            key={link}
                            href={`#${link.toLowerCase()}`}
                            className="text-xs font-medium uppercase tracking-[0.2em] text-luxury-silver hover:text-white transition-colors duration-300"
                        >
                            {link}
                        </a>
                    ))}
                </div>

                {/* CTA */}
                <div className="flex items-center gap-4">
                    <button className="hidden md:inline-flex items-center gap-2 border border-white/20 text-white px-6 py-2.5 text-xs font-medium uppercase tracking-[0.15em] hover:bg-white hover:text-black transition-all duration-300">
                        Shop Now
                    </button>

                    <button
                        id="mobile-menu-toggle"
                        className="md:hidden text-white p-2"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="bg-luxury-charcoal border-t border-white/5 px-6 py-6 flex flex-col gap-4 mt-3">
                    {['Home', 'Products', 'Trending', 'Reviews'].map((link) => (
                        <a
                            key={link}
                            href={`#${link.toLowerCase()}`}
                            className="text-xs font-medium uppercase tracking-[0.2em] text-luxury-silver hover:text-white transition-colors py-2"
                            onClick={() => setMenuOpen(false)}
                        >
                            {link}
                        </a>
                    ))}
                    <button className="mt-2 border border-white/20 text-white px-6 py-2.5 text-xs font-medium uppercase tracking-[0.15em] hover:bg-white hover:text-black transition-all">
                        Shop Now
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
