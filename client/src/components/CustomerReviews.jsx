import React from 'react';

const reviews = [
    {
        name: 'Sarah Mitchell',
        initials: 'SM',
        role: 'Tech Enthusiast',
        rating: 5,
        text: "The Gaming Laptop is absolutely incredible. RTX 4060 performance at this price point is unheard of. Sleek design and fast shipping — couldn't be happier.",
    },
    {
        name: 'James Rodriguez',
        initials: 'JR',
        role: 'Software Engineer',
        rating: 2,
        text: 'Bought the mechanical keyboard and wireless mouse combo. The build quality is premium and the RGB lighting is subtle yet beautiful. ShopSmart is my go-to now.',
    },
    {
        name: 'Emily Chen',
        initials: 'EC',
        role: 'Fitness Coach',
        rating: 5,
        text: 'The running shoes are incredibly lightweight and the yoga mat quality is premium. Everything arrived beautifully packaged. Will definitely shop again.',
    },
    {
        name: 'Alex Thompson',
        initials: 'AT',
        role: 'Home Chef',
        rating: 5,
        text: 'My coffee maker and blender from ShopSmart are both exceptional. Restaurant-quality appliances at online prices. The customer service was outstanding too.',
    },
    {
        name: 'Priya Sharma',
        initials: 'PS',
        role: 'Interior Designer',
        rating: 5,
        text: 'The LED desk lamp and office chair transformed my workspace. Minimalist design with perfect functionality. ShopSmart understands quality aesthetics.',
    },
    {
        name: 'David Kim',
        initials: 'DK',
        role: 'Digital Nomad',
        rating: 5,
        text: "Everything I've ordered has exceeded expectations. The attention to detail in packaging and product quality speaks volumes. Premium experience end to end.",
    },
];

const CustomerReviews = () => {
    return (
        <section id="reviews" className="relative py-28 px-6 sm:px-8 lg:px-12">
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-20 space-y-6">
                    <div className="flex items-center justify-center gap-4">
                        <div className="w-12 h-px bg-luxury-gold"></div>
                        <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-luxury-gold">
                            Testimonials
                        </span>
                        <div className="w-12 h-px bg-luxury-gold"></div>
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                        What Clients Say
                    </h2>
                    <p className="text-luxury-silver max-w-lg mx-auto text-sm font-light leading-relaxed">
                        Trusted by thousands of discerning customers worldwide
                    </p>
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map((review, index) => (
                        <div
                            key={index}
                            className="relative bg-luxury-charcoal p-8 border border-white/5 hover:border-luxury-gold/20 transition-all duration-300 hover:-translate-y-1 group"
                        >
                            {/* Quote */}
                            <span className="absolute top-6 right-8 text-5xl font-display text-white/[0.03] leading-none select-none">
                                &quot;
                            </span>

                            {/* Stars */}
                            <div className="flex items-center gap-1 mb-5">
                                {[...Array(review.rating)].map((_, i) => (
                                    <span key={i} className="text-luxury-gold text-xs">
                                        ★
                                    </span>
                                ))}
                            </div>

                            {/* Text */}
                            <p className="text-sm text-luxury-pearl/80 leading-relaxed mb-8 font-light">
                                &quot;{review.text}&quot;
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                                <div className="w-10 h-10 border border-luxury-gold/50 flex items-center justify-center text-luxury-gold text-[10px] font-bold tracking-wider">
                                    {review.initials}
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-white">
                                        {review.name}
                                    </p>
                                    <p className="text-[10px] text-luxury-silver uppercase tracking-wider">
                                        {review.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Trust Indicators */}
                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5">
                    {[
                        { icon: '✦', title: 'Free Shipping', desc: 'On orders $50+' },
                        { icon: '✦', title: 'Easy Returns', desc: '30-day guarantee' },
                        { icon: '✦', title: 'Secure Payment', desc: '100% encrypted' },
                        { icon: '✦', title: '24/7 Support', desc: 'Always available' },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="text-center p-8 bg-luxury-charcoal hover:bg-luxury-carbon transition-colors"
                        >
                            <span className="text-luxury-gold text-lg mb-3 block">{item.icon}</span>
                            <h4 className="text-[11px] font-semibold text-white uppercase tracking-[0.15em] mb-1">
                                {item.title}
                            </h4>
                            <p className="text-[10px] text-luxury-silver">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CustomerReviews;
