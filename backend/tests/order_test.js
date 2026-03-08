const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

const testOrders = async () => {
    try {
        console.log('--- Testing Order API ---');

        // 1. Login User
        console.log('1. Logging in...');
        const { data: userData } = await axios.post(`${API_URL}/users/login`, {
            email: 'admin@example.com',
            password: 'password123',
        });
        const token = userData.token;
        console.log('Login successful.');

        // 2. Fetch a Product ID for the order
        const { data: productData } = await axios.get(`${API_URL}/products`);
        const productId = productData.products[0]._id;

        // 3. Create Order
        console.log('2. Creating order...');
        const orderItems = [
            {
                name: productData.products[0].name,
                qty: 1,
                image: productData.products[0].images[0],
                price: productData.products[0].storePrices[0].price,
                product: productId,
            },
        ];

        const { data: order } = await axios.post(
            `${API_URL}/orders`,
            {
                orderItems,
                shippingAddress: {
                    address: '123 Test St',
                    city: 'Test City',
                    postalCode: '12345',
                    country: 'Test Country',
                },
                paymentMethod: 'PayPal',
                itemsPrice: 100,
                taxPrice: 10,
                shippingPrice: 5,
                totalPrice: 115,
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        console.log('Order created with ID:', order._id);

        // 4. Get Order by ID
        console.log('3. Getting order by ID...');
        const { data: fetchedOrder } = await axios.get(`${API_URL}/orders/${order._id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Order retrieved successfully.');

        // 5. Update Order to Paid
        console.log('4. Updating order to paid...');
        const { data: paidOrder } = await axios.put(
            `${API_URL}/orders/${order._id}/pay`,
            {
                id: 'PAY-123',
                status: 'COMPLETED',
                update_time: new Date().toISOString(),
                payer: { email_address: 'payer@example.com' },
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        console.log('Order marked as paid. isPaid:', paidOrder.isPaid);

        // 6. Get My Orders
        console.log('5. Fetching user orders...');
        const { data: myOrders } = await axios.get(`${API_URL}/orders/myorders`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log(`User has ${myOrders.length} orders.`);

        console.log('--- Order Tests Completed Successfully ---');
    } catch (error) {
        console.error('Test failed:', error.response ? error.response.data : error.message);
    }
};

testOrders();
