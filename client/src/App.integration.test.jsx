import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { describe, it, expect } from 'vitest';

describe('Frontend + Backend Integration', () => {
    it('connects to the real backend and renders products or empty state', async () => {
        // We DO NOT mock fetch here. We let the component use native Node 18 fetch
        // to hit the locally running backend server (http://localhost:5001)
        
        render(<App />);
        
        // Wait for the skeleton loaders to disappear and content to load from backend
        await waitFor(() => {
            // Depending on the DB state (seeded or empty), we either get products or empty message
            const emptyState = screen.queryByText(/No products available yet/i);
            const productsLoaded = screen.queryAllByText(/Quick View/i).length > 0;
            
            // If the API call fails entirely, neither will be true and the test will timeout/fail
            expect(emptyState || productsLoaded).toBeTruthy();
        }, { timeout: 5000 });
        
        // Verify key sections are intact
        const trendingTitle = screen.getByText(/Trending Now/i);
        expect(trendingTitle).toBeInTheDocument();
    });
});
