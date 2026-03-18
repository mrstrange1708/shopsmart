import React, { useState, useEffect } from 'react';
import { fetchItems } from '../services/api';

// Map product names to their actual generated images
const getProductImage = (name, category, index) => {
    const lowerName = (name || '').toLowerCase();

    // Exact product name matches
    if (lowerName.includes('gaming laptop') || lowerName.includes('laptop'))
        return '/images/product-gaming-laptop.png';
    if (lowerName.includes('mechanical keyboard') || lowerName.includes('keyboard'))
        return '/images/product-mech-keyboard.png';
    if (lowerName.includes('wireless mouse') || lowerName.includes('mouse'))
        return '/images/product-wireless-mouse.png';
    if (lowerName.includes('coffee maker') || lowerName.includes('coffee'))
        return '/images/product-coffee-maker.png';
    if (lowerName.includes('blender')) return '/images/product-blender.png';
    if (
        lowerName.includes('running shoes') ||
        lowerName.includes('shoes') ||
        lowerName.includes('sneaker')
    )
        return '/images/product-running-shoes.png';
    if (lowerName.includes('yoga mat') || lowerName.includes('yoga'))
        return '/images/product-yoga-mat.png';
    if (lowerName.includes('desk lamp') || lowerName.includes('lamp'))
        return '/images/product-desk-lamp.png';
    if (lowerName.includes('office chair') || lowerName.includes('chair'))
        return '/images/product-office-chair.png';
    if (lowerName.includes('book') || lowerName.includes('python'))
        return '/images/product-backpack.png';
    if (lowerName.includes('headphone')) return '/images/product-headphones.png';
    if (lowerName.includes('watch')) return '/images/product-watch.png';
    if (lowerName.includes('camera')) return '/images/product-camera.png';
    if (lowerName.includes('speaker')) return '/images/product-speaker.png';
    if (lowerName.includes('bag') || lowerName.includes('backpack'))
        return '/images/product-backpack.png';
    if (lowerName.includes('sunglasses')) return '/images/product-sunglasses.png';

    // Category fallbacks
    const lowerCat = (category || '').toLowerCase();
    if (lowerCat.includes('electronics')) return '/images/product-mech-keyboard.png';
    if (lowerCat.includes('home')) return '/images/product-coffee-maker.png';
    if (lowerCat.includes('sports')) return '/images/product-running-shoes.png';
    if (lowerCat.includes('office')) return '/images/product-desk-lamp.png';

    // Ultimate fallback
    const fallbacks = [
        '/images/product-gaming-laptop.png',
        '/images/product-mech-keyboard.png',
        '/images/product-wireless-mouse.png',
        '/images/product-coffee-maker.png',
        '/images/product-blender.png',
        '/images/product-running-shoes.png',
        '/images/product-yoga-mat.png',
        '/images/product-desk-lamp.png',
    ];
    return fallbacks[index % fallbacks.length];
};

const ProductCard = ({ item, index }) => {
    return (
        <div className="group relative bg-luxury-charcoal overflow-hidden border border-white/5 hover:border-luxury-gold/30 transition-all duration-500 hover:-translate-y-2">
            {/* Image */}
            <div className="relative overflow-hidden aspect-square bg-luxury-dark">
                <img
                    src={getProductImage(item.name, item.category, index)}
                    alt={item.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <button className="bg-white text-black px-6 py-2.5 text-[10px] font-medium uppercase tracking-[0.2em] hover:bg-luxury-gold transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300">
                        Quick View
                    </button>
                </div>
                <span className="absolute top-4 left-4 px-3 py-1 bg-luxury-charcoal/80 backdrop-blur-sm border border-white/10 text-[9px] font-medium uppercase tracking-[0.2em] text-luxury-silver">
                    {item.category}
                </span>
            </div>

            {/* Info */}
            <div className="p-5">
                <h3 className="text-sm font-semibold text-white leading-snug mb-3 group-hover:text-luxury-gold transition-colors duration-300 line-clamp-1">
                    {item.name}
                </h3>
                <p className="text-xs text-luxury-silver line-clamp-2 mb-4 font-light leading-relaxed">
                    {item.description}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <span className="text-lg font-display font-bold text-white">
                        ${item.price?.toFixed(2)}
                    </span>
                    <button className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-luxury-silver hover:text-luxury-gold transition-colors">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

const SkeletonCard = () => (
    <div className="bg-luxury-charcoal border border-white/5 overflow-hidden">
        <div className="aspect-square bg-gradient-to-r from-luxury-charcoal via-luxury-carbon to-luxury-charcoal bg-[length:200%_100%] animate-shimmer"></div>
        <div className="p-5 space-y-3">
            <div className="h-4 w-3/4 bg-gradient-to-r from-luxury-charcoal via-luxury-carbon to-luxury-charcoal bg-[length:200%_100%] animate-shimmer rounded"></div>
            <div className="h-3 w-full bg-gradient-to-r from-luxury-charcoal via-luxury-carbon to-luxury-charcoal bg-[length:200%_100%] animate-shimmer rounded"></div>
            <div className="h-5 w-1/3 bg-gradient-to-r from-luxury-charcoal via-luxury-carbon to-luxury-charcoal bg-[length:200%_100%] animate-shimmer rounded mt-4"></div>
        </div>
    </div>
);

const FeaturedProducts = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchItems();
                setItems(data);
            } catch (err) {
                setError('Failed to load products');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    // Show only unique products (deduplicate by name)
    const uniqueItems = items.reduce((acc, item) => {
        if (!acc.find((i) => i.name === item.name)) acc.push(item);
        return acc;
    }, []);

    return (
        <section id="products" className="relative py-28 px-6 sm:px-8 lg:px-12">
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-20 space-y-6">
                    <div className="flex items-center justify-center gap-4">
                        <div className="w-12 h-px bg-luxury-gold"></div>
                        <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-luxury-gold">
                            Our Collection
                        </span>
                        <div className="w-12 h-px bg-luxury-gold"></div>
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                        Featured Products
                    </h2>
                    <p className="text-luxury-silver max-w-lg mx-auto text-sm font-light leading-relaxed">
                        Handpicked essentials from our curated store
                    </p>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-white/5">
                        {[...Array(8)].map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-center py-16">
                        <p className="text-luxury-silver text-sm">{error}</p>
                    </div>
                ) : uniqueItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {uniqueItems.map((item, index) => (
                            <ProductCard key={item.id || item._id} item={item} index={index} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 text-luxury-silver">
                        <p className="text-sm">No products available yet.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeaturedProducts;
