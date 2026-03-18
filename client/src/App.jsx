import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturedProducts from './components/FeaturedProducts';
import TrendingSection from './components/TrendingSection';
import CustomerReviews from './components/CustomerReviews';
import Footer from './components/Footer';

function App() {
    return (
        <div className="min-h-screen bg-surface text-slate-50 font-sans">
            <Navbar />
            <HeroSection />
            <FeaturedProducts />
            <TrendingSection />
            <CustomerReviews />
            <Footer />
        </div>
    );
}

export default App;
