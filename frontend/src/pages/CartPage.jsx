import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Trash2, ShoppingCart, ArrowRight, Plus, Minus, ShieldCheck, Mail } from 'lucide-react';
import { addToCart, removeFromCart } from '../store/slices/cartSlice';

const CartPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const cartItems = cart?.cartItems || [];

    const addToCartHandler = (product, qty) => {
        dispatch(addToCart({ ...product, qty }));
    };

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping');
    };

    return (
        <div className="bg-[#f1f3f6] min-h-screen py-8 text-[14px]">
            <div className="max-w-[1200px] mx-auto px-4">
                {cartItems.length === 0 ? (
                    <div className="bg-white shadow-sm border border-slate-200 p-8 text-center min-h-[400px] flex flex-col items-center justify-center">
                        <img src="/images/empty-cart.png" alt="Empty Cart" className="h-40 mb-6 opacity-80" onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/150?text=Empty+Cart" }} />
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Your cart is empty!</h3>
                        <p className="text-slate-500 mb-6">Add items to it now.</p>
                        <Link to="/shop" className="bg-primary-600 text-white px-12 py-3 rounded-sm font-bold shadow-sm hover:bg-primary-700">
                            Shop Now
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-4">

                        {/* Cart Items Column */}
                        <div className="flex-grow space-y-4">

                            {/* Header */}
                            <div className="bg-white shadow-sm border border-slate-200 flex justify-between items-center p-4">
                                <h1 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                    <ShoppingCart size={20} className="text-primary-600" />
                                    Shopping Cart ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                                </h1>
                                <div className="text-sm font-medium text-slate-500">
                                    Deliver to: <span className="font-bold text-slate-800">100001</span>
                                    <button className="text-primary-600 ml-2 hover:underline">Change</button>
                                </div>
                            </div>

                            {/* Items */}
                            <div className="bg-white shadow-sm border border-slate-200">
                                {cartItems.map((item, index) => (
                                    <div key={item._id} className={`p-6 flex flex-col sm:flex-row gap-6 ${index !== cartItems.length - 1 ? 'border-b border-slate-200' : ''}`}>

                                        {/* Image & Controls */}
                                        <div className="flex flex-col items-center gap-4 shrink-0 w-28">
                                            <Link to={`/product/${item._id}`} className="h-28 w-28 border border-slate-100 p-2 flex items-center justify-center">
                                                <img src={item.image || item.images?.[0]} alt={item.name} className="max-w-full max-h-full object-contain" />
                                            </Link>
                                            <div className="flex items-center border border-slate-300 rounded-sm">
                                                <button
                                                    onClick={() => addToCartHandler(item, Math.max(1, item.qty - 1))}
                                                    className="w-8 h-8 flex items-center justify-center bg-slate-50 hover:bg-slate-100 text-slate-600 disabled:opacity-50"
                                                    disabled={item.qty <= 1}
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="w-10 text-center font-bold text-slate-800 bg-white border-x border-slate-300 h-8 flex items-center justify-center text-sm">{item.qty}</span>
                                                <button
                                                    onClick={() => addToCartHandler(item, Math.min(item.stock, item.qty + 1))}
                                                    className="w-8 h-8 flex items-center justify-center bg-slate-50 hover:bg-slate-100 text-slate-600 disabled:opacity-50"
                                                    disabled={item.qty >= item.stock}
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Details */}
                                        <div className="flex-grow space-y-2">
                                            <Link to={`/product/${item._id}`} className="text-[16px] text-slate-800 hover:text-primary-600 block pr-8 line-clamp-2">
                                                {item.name}
                                            </Link>
                                            <p className="text-slate-500 text-sm">Brand: {item.brand || 'ShopEZ'}</p>

                                            <div className="flex items-center gap-3 pt-1">
                                                <span className="text-[18px] font-bold text-slate-900">₹{Number(item.price || 0).toLocaleString('en-IN')}</span>
                                                <span className="text-sm text-slate-500 line-through">₹{Math.floor(Number(item.price || 0) * 1.2).toLocaleString('en-IN')}</span>
                                                <span className="text-sm font-bold text-green-600">20% Off</span>
                                                <span className="ml-2 text-[10px] font-black italic text-primary-600 border border-primary-200 px-1 rounded-sm bg-primary-50">ShopEZ Assured</span>
                                            </div>

                                            <div className="flex items-center gap-6 pt-4">
                                                <button className="font-bold text-slate-800 hover:text-primary-600 uppercase text-xs">Save for later</button>
                                                <button onClick={() => removeFromCartHandler(item._id)} className="font-bold text-slate-800 hover:text-red-500 uppercase text-xs">Remove</button>
                                            </div>
                                        </div>

                                        {/* Delivery Info */}
                                        <div className="w-48 text-sm text-slate-700 hidden md:block">
                                            <p>Delivery by {new Date(Date.now() + 86400000 * 3).toLocaleDateString()} | <span className="text-green-600 line-through">₹40</span> <span className="text-green-600 font-bold">Free</span></p>
                                        </div>
                                    </div>
                                ))}

                                <div className="p-4 border-t border-slate-200 flex justify-end">
                                    <button
                                        onClick={checkoutHandler}
                                        className="bg-[#fb641b] text-white px-10 py-3 rounded-sm font-bold shadow-sm hover:bg-[#eb5b14] text-lg w-full sm:w-auto"
                                    >
                                        PLACE ORDER
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary Column */}
                        <div className="w-full lg:w-[350px] shrink-0 space-y-4">
                            <div className="bg-white shadow-sm border border-slate-200">
                                <h3 className="font-bold text-slate-500 uppercase tracking-widest text-sm p-4 border-b border-slate-200">Price Details</h3>

                                <div className="p-4 space-y-4 border-b border-slate-200 border-dashed text-slate-800">
                                    <div className="flex justify-between">
                                        <span>Price ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                                        <span>₹{Number(cart.itemsPrice || 0).toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Discount</span>
                                        <span className="text-green-600 font-bold">- ₹{Math.floor(Number(cart.itemsPrice || 0) * 0.2).toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Delivery Charges</span>
                                        <span className="text-green-600 font-bold">Free</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Secured Packaging Fee</span>
                                        <span>₹59</span>
                                    </div>
                                </div>

                                <div className="p-4 border-b border-slate-200">
                                    <div className="flex justify-between items-center text-lg font-bold text-slate-800">
                                        <span>Total Amount</span>
                                        <span>₹{Number(cart.totalPrice || 0).toLocaleString('en-IN')}</span>
                                    </div>
                                </div>

                                <div className="p-4 text-green-600 font-bold text-sm bg-green-50/50">
                                    You will save ₹{Math.floor(Number(cart.itemsPrice || 0) * 0.2).toLocaleString('en-IN')} on this order
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-slate-500 text-xs px-2">
                                <ShieldCheck size={24} className="shrink-0" />
                                <span>Safe and Secure Payments. Easy returns. 100% Authentic products.</span>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;
