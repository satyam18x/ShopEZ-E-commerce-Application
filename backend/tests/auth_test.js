const axios = require('axios');

const API_URL = 'http://localhost:5000/api/users';

const testAuth = async () => {
    try {
        console.log('--- Testing Authentication ---');

        // 1. Register User
        console.log('1. Registering user...');
        const registerData = {
            name: 'Test Clerk',
            email: `test_${Date.now()}@example.com`,
            password: 'password123',
        };
        const { data: userData } = await axios.post(`${API_URL}`, registerData);
        console.log('Registration successful:', userData.email);

        const token = userData.token;

        // 2. Login User
        console.log('2. Logging in...');
        const loginData = {
            email: registerData.email,
            password: registerData.password,
        };
        const { data: loginResult } = await axios.post(`${API_URL}/login`, loginData);
        console.log('Login successful, token received.');

        // 3. Get Profile (Protected)
        console.log('3. Fetching profile (Protected)...');
        const { data: profileData } = await axios.get(`${API_URL}/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('Profile fetched:', profileData.name);

        // 4. Test Error Case (Duplicate Register)
        console.log('4. Testing duplicate registration...');
        try {
            await axios.post(`${API_URL}`, registerData);
        } catch (error) {
            console.log('Duplicate registration correctly failed:', error.response.data.message);
        }

        console.log('--- Auth Tests Completed Successfully ---');
    } catch (error) {
        console.error('Test failed:', error.response ? error.response.data : error.message);
    }
};

testAuth();
