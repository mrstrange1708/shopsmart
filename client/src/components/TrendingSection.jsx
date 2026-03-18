import React from 'react';

const trendingProducts = [
    {
        name: 'Gaming Laptop RTX 4060',
        price: 1299.99,
        oldPrice: 1599.99,
        image: '/images/product-gaming-laptop.png',
        tag: 'Best Seller',
    },
    {
        name: 'Mechanical Keyboard RGB',
        price: 89.99,
        oldPrice: 129.99,
        image: '/images/product-mech-keyboard.png',
        tag: 'Trending',
    },
    {
        name: 'Wireless Ergonomic Mouse',
        price: 29.99,
        oldPrice: 49.99,
        image: '/images/product-wireless-mouse.png',
        tag: 'Hot Deal',
    },
    {
        name: 'Pro Coffee Maker',
        price: 49.99,
        oldPrice: 79.99,
        image: '/images/product-coffee-maker.png',
        tag: 'Limited',
    },
    {
        name: 'Running Shoes Pro',
        price: 79.99,
        oldPrice: 119.99,
        image: '/images/product-running-shoes.png',
        tag: 'New',
    },
    {
        name: 'LED Desk Lamp',
        price: 24.99,
        oldPrice: 39.99,
        image: '/images/product-desk-lamp.png',
        tag: 'Popular',
    },
];

const TrendingSection = () => {
    return (
        <section id="trending" className="relative py-28 px-6 sm:px-8 lg:px-12 overflow-hidden">
            {/* Subtle background line */}
            <div className="absolute top-0 left-1/2 w-px h-20 bg-gradient-to-b from-transparent to-white/10"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-px bg-luxury-gold"></div>
                            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-luxury-gold">
                                Hot Right Now
                            </span>
                        </div>
                        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                            Trending Now
                        </h2>
                        <p className="text-luxury-silver max-w-md text-sm font-light leading-relaxed">
                            The most sought-after pieces this season
                        </p>
                    </div>
                    <a href="#products" className="inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-luxury-silver hover:text-luxury-gold transition-colors group">
                        View All
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {trendingProducts.map((product, index) => (
                        <div
                            key={index}
                            className="group relative bg-luxury-charcoal overflow-hidden border border-white/5 hover:border-luxury-gold/20 transition-all duration-500 hover:-translate-y-2"
                        >
                            {/* Sale */}
                            <div className="absolute top-4 right-4 z-10 bg-white text-black px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                                {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% Off
                            </div>

                            {/* Tag */}
                            <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-luxury-charcoal/80 backdrop-blur-sm border border-white/10 text-[9px] font-medium uppercase tracking-[0.2em] text-luxury-gold">
                                {product.tag}
                            </span>

                            {/* Image */}
                            <div className="relative overflow-hidden aspect-[4/3] bg-luxury-dark">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                                />
                            </div>

                            {/* Info */}
                            <div className="p-6 space-y-4">
                                <h3 className="text-base font-semibold text-white group-hover:text-luxury-gold transition-colors duration-300">
                                    {product.name}
                                </h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-luxury-gold text-xs">★★★★★</span>
                                    <span className="text-[10px] text-luxury-silver">(4.9)</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xl font-display font-bold text-white">${product.price}</span>
                                    <span className="text-sm text-luxury-silver line-through">${product.oldPrice}</span>
                                </div>
                                <button className="w-full bg-white text-black py-3 text-[10px] font-medium uppercase tracking-[0.2em] hover:bg-luxury-gold transition-colors duration-300">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrendingSection;
