const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel');
const Product = require('./models/productModel');
const connectDB = require('./config/db');

dotenv.config()
connectDB();

const seedData = async () => {
    try {
        await Product.deleteMany();
        await User.deleteMany();

        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'password123',
            isAdmin: true,
        });

        const products = [
            {
                user: admin._id,
                name: 'MacBook Pro 14"',
                brand: 'Apple',
                images: ['/images/macbook.jpg'],
                description: 'Supercharged by M3 Pro. The most advanced chips ever built for a personal computer.',
                category: 'Electronics',
                features: ['M3 Pro Chip', '14.2" Liquid Retina XDR', '18GB Unified Memory', '512GB SSD'],
                stock: 15,
                storePrices: [
                    { store: 'Apple India', price: 169900, url: '#' },
                    { store: 'Amazon India', price: 164900, url: '#' },
                ],
            },
            {
                user: admin._id,
                name: 'iPhone 15 Pro Max',
                brand: 'Apple',
                images: ['/images/iphone.jpg'],
                description: 'Forged in titanium. Featuring the groundbreaking A17 Pro chip and a customizable Action button.',
                category: 'Electronics',
                features: ['A17 Pro Chip', 'Titanium Design', '48MP Main Camera', 'USB-C with USB 3'],
                stock: 25,
                storePrices: [
                    { store: 'Apple India', price: 159900, url: '#' },
                    { store: 'Reliance Digital', price: 154900, url: '#' },
                ],
            },
            {
                user: admin._id,
                name: 'Sony WH-1000XM5',
                brand: 'Sony',
                images: ['/images/sony.jpg'],
                description: 'With two processors controlling eight microphones, these headphones deliver industry-leading noise cancellation.',
                category: 'Electronics',
                features: ['HD Noise Cancelling Processor QN1', '30-hour Battery Life', 'Speak-to-Chat', 'Crystal Clear Calls'],
                stock: 40,
                storePrices: [
                    { store: 'Sony Center', price: 34990, url: '#' },
                    { store: 'Amazon India', price: 29990, url: '#' },
                ],
            },
            {
                user: admin._id,
                name: 'Nike Air Jordan 1 Low',
                brand: 'Nike',
                images: ['/images/jordan.jpg'],
                description: 'Inspired by the original that debuted in 1985, the Air Jordan 1 Low offers a clean, classic look.',
                category: 'Fashion',
                features: ['Encapsulated Air-Sole unit', 'Genuine leather upper', 'Solid rubber outsole'],
                stock: 20,
                storePrices: [
                    { store: 'Nike Store', price: 8295, url: '#' },
                    { store: 'Myntra', price: 7995, url: '#' },
                ],
            },
            {
                user: admin._id,
                name: 'Dell UltraSharp 27" 4K',
                brand: 'Dell',
                images: ['/images/monitor.jpg'],
                description: 'Experience true color and detail on this 27-inch 4K monitor with brilliant color coverage.',
                category: 'Electronics',
                features: ['4K UHD Resolution', 'IPS Black Technology', 'USB-C Hub', '98% DCI-P3'],
                stock: 12,
                storePrices: [
                    { store: 'Dell India', price: 58000, url: '#' },
                    { store: 'Amazon India', price: 54500, url: '#' },
                ],
            },
            {
                user: admin._id,
                name: 'Bose QuietComfort Ultra',
                brand: 'Bose',
                images: ['/images/bose.jpg'],
                description: 'World-class noise cancellation, quieter than ever before. Breakthrough spatialized audio.',
                category: 'Electronics',
                features: ['CustomTune technology', 'Immersive Audio', 'Up to 24 hours life', 'Soft-touch materials'],
                stock: 35,
                storePrices: [
                    { store: 'Bose India', price: 35900, url: '#' },
                    { store: 'Tata Cliq Luxury', price: 33900, url: '#' },
                ],
            },
        ];

        await Product.insertMany(products);

        console.log('Data Seeded!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedData();
