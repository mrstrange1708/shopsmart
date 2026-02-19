import React, { useState, useEffect } from 'react';
import ShopItemsList from './components/ShopItemsList';

function App() {
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        fetch(`${apiUrl}/api/health`)
            .then(res => res.json())
            .then(data => setStatus(data))
            .catch(err => console.error('Error fetching health check:', err));
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
            <header className="bg-blue-600 text-white shadow-md">
                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-3xl font-bold">ShopSmart</h1>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                {/* Backend Status Section */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-200">
                    <h2 className="text-xl font-semibold mb-3 text-gray-800">System Status</h2>
                    {status ? (
                        <div className="space-y-1">
                            <p className="flex items-center">
                                <span className="font-medium mr-2">Status:</span>
                                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 uppercase tracking-wide">
                                    {status.status}
                                </span>
                            </p>
                            <p className="text-sm text-gray-600"><span className="font-medium text-gray-700">Message:</span> {status.message}</p>
                            <p className="text-sm text-gray-500"><span className="font-medium text-gray-700">Last Checked:</span> {new Date(status.timestamp).toLocaleString()}</p>
                        </div>
                    ) : (
                        <p className="text-gray-500 animate-pulse">Checking backend status...</p>
                    )}
                </div>

                {/* Shop Items Section */}
                <ShopItemsList />
            </main>
        </div>
    );
}

export default App;
