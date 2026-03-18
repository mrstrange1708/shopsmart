import React, { useState, useEffect } from 'react';
import { fetchItems } from '../services/api';
import ShopItemCard from './ShopItemCard';

const ShopItemsList = () => {
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadItems = async (searchTerm = '') => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchItems(searchTerm);
            setItems(data);
        } catch (err) {
            setError('Failed to load items. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadItems();
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        loadItems(search);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-800">Shop Items</h2>

                <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full md:w-auto">
                    <input
                        type="text"
                        placeholder="Search items..."
                        value={search}
                        onChange={handleSearchChange}
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                    />
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                        Search
                    </button>
                </form>
            </div>

            {loading && (
                <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
            )}

            {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-200">
                    {error}
                </div>
            )}

            {!loading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {items.length > 0 ? (
                        items.map((item) => <ShopItemCard key={item.id} item={item} />)
                    ) : (
                        <div className="col-span-full text-center py-12 text-gray-500 bg-white rounded-lg border border-gray-200 border-dashed">
                            No items found matching your search.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ShopItemsList;
