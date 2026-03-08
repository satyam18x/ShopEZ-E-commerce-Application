const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

const testProducts = async () => {
    try {
        console.log('--- Testing Product API ---');

        // 1. Fetch All Products
        console.log('1. Fetching all products...');
        const { data: listResult } = await axios.get(`${API_URL}/products`);
        console.log(`Found ${listResult.products.length} products.`);
        const productId = listResult.products[0]._id;

        // 2. Search Products
        console.log('2. Searching for "iPhone"...');
        const { data: searchResult } = await axios.get(`${API_URL}/products?keyword=iPhone`);
        console.log(`Search found ${searchResult.products.length} matches.`);

        // 3. Get Product Details
        console.log(`3. Fetching details for product ${productId}...`);
        const { data: product } = await axios.get(`${API_URL}/products/${productId}`);
        console.log('Product details fetched:', product.name);

        // 4. Get Top Products
        console.log('4. Fetching top products...');
        const { data: topProducts } = await axios.get(`${API_URL}/products/top`);
        console.log(`Fetched ${topProducts.length} top products.`);

        // 5. Post Review (Requires Auth)
        console.log('5. Posting review (requires auth)...');

        // Login first
        const { data: userData } = await axios.post(`${API_URL}/users/login`, {
            email: 'admin@example.com',
            password: 'password123'
        });

        const { data: reviewResult } = await axios.post(`${API_URL}/products/${productId}/reviews`, {
            rating: 5,
            comment: 'Excellent product!'
        }, {
            headers: { Authorization: `Bearer ${userData.token}` }
        });
        console.log('Review response:', reviewResult.message);

        console.log('--- Product Tests Completed Successfully ---');
    } catch (error) {
        console.error('Test failed:', error.response ? error.response.data : error.message);
    }
};

testProducts();
