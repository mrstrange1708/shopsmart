/* eslint-disable react/prop-types */
import React from 'react';

const ShopItemCard = ({ item }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 overflow-hidden flex flex-col h-full">
            <div className="p-5 flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 leading-tight">{item.name}</h3>
                    <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                        {item.category}
                    </span>
                </div>
                <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                    {item.description}
                </p>
            </div>
            <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex justify-between items-center">
                <span className="text-lg font-bold text-green-600">
                    ${item.price.toFixed(2)}
                </span>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                    View Details
                </button>
            </div>
        </div>
    );
};

export default ShopItemCard;
