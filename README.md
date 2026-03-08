# ShopEZ - Premium MERN Stack E-Commerce

ShopEZ is a high-end, full-stack e-commerce platform built with the MERN (MongoDB, Express, React, Node.js) stack. It features a stunning, premium design with dark mode support, smooth animations, and a robust administrative suite.

## ✨ Features

- **Premium UI/UX**: Crafted with Tailwind CSS and Framer Motion for a fluid, modern experience.
- **Dark Mode**: Native, seamless theme transitions.
- **Dynamic Catalog**: Search, filter by category, and sort products with real-time updates.
- **Full Checkout Flow**: Integrated shipping details, payment selection, and order placement.
- **Admin Dashboard**: Comprehensive management of products, orders, and users.
- **Secure Auth**: JWT-based authentication with protected routes and admin roles.
- **Responsive Design**: Optimized for everything from mobile to ultra-wide displays.

## 🚀 Tech Stack

- **Frontend**: React 19, Vite, Redux Toolkit (RTK Query), Tailwind CSS, Framer Motion, Lucide Icons.
- **Backend**: Node.js, Express, MongoDB (Mongoose), JSON Web Tokens (JWT).
- **State Management**: Redux Toolkit for global store and RTK Query for API caching.

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/shopez.git
   cd shopez
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Variables**
   Create a `.env` file in the `backend` directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

5. **Run the Application**
   - **Backend**: `npm run server` (from backend dir)
   - **Frontend**: `npm run dev` (from frontend dir)

## 📸 Screenshots

*(Add screenshots here)*

## 📄 License
Distributed under the MIT License.
