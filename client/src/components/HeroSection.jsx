import React from 'react';

const HeroSection = () => {
    return (
        <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-luxury-black">
                <div className="absolute inset-0 bg-gradient-to-br from-luxury-charcoal/50 via-transparent to-luxury-charcoal/30"></div>
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.02] to-transparent"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 w-full">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left */}
                    <div className="space-y-10 animate-fade-in-up">
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-px bg-luxury-gold"></div>
                                <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-luxury-gold">
                                    New Collection 2026
                                </span>
                            </div>
                            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tight text-white">
                                Discover
                                <br />
                                <span className="italic text-luxury-pearl">Premium</span>
                                <br />
                                Essentials
                            </h1>
                        </div>
                        <p className="text-base text-luxury-silver max-w-md leading-relaxed font-light">
                            Curated collection of premium products. From cutting-edge tech to everyday essentials — crafted for those who appreciate quality.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-2">
                            <a href="#products" className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] hover:bg-luxury-gold hover:text-black transition-all duration-300">
                                Explore Collection
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                            <a href="#trending" className="inline-flex items-center gap-3 border border-white/20 text-white px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] hover:border-luxury-gold hover:text-luxury-gold transition-all duration-300">
                                View Trending
                            </a>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-12 pt-8 border-t border-white/10">
                            {[
                                { value: '10K+', label: 'Products' },
                                { value: '50K+', label: 'Customers' },
                                { value: '4.9', label: 'Rating' },
                            ].map((stat) => (
                                <div key={stat.label}>
                                    <p className="text-3xl sm:text-4xl font-display font-bold text-white">{stat.value}</p>
                                    <p className="text-[10px] text-luxury-silver font-medium uppercase tracking-[0.25em] mt-1">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right — Hero Image */}
                    <div className="relative animate-slide-right hidden lg:block">
                        <div className="relative animate-float">
                            <img
                                src="/images/hero-banner.png"
                                alt="ShopSmart Premium Collection"
                                className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                        </div>

                        {/* Floating Badge */}
                        <div className="absolute -bottom-6 -left-6 bg-luxury-charcoal border border-white/10 px-6 py-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 border border-luxury-gold flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-luxury-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-white uppercase tracking-wider">Free Shipping</p>
                                    <p className="text-[10px] text-luxury-silver">Orders $50+</p>
                                </div>
                            </div>
                        </div>

                        {/* Floating Rating */}
                        <div className="absolute -top-4 -right-4 bg-luxury-charcoal border border-white/10 px-5 py-3 animate-fade-in" style={{ animationDelay: '0.8s' }}>
                            <div className="flex items-center gap-2">
                                <span className="text-luxury-gold text-sm">★★★★★</span>
                                <span className="text-xs font-semibold text-white">4.9</span>
                            </div>
                            <p className="text-[10px] text-luxury-silver mt-0.5">50K+ Reviews</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce">
                <div className="w-px h-8 bg-gradient-to-b from-transparent to-luxury-silver"></div>
                <span className="text-[9px] text-luxury-silver uppercase tracking-[0.3em]">Scroll</span>
            </div>
        </section>
    );
};

export default HeroSection;
