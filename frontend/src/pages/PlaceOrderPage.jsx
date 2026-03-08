import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import CheckoutSteps from '../components/CheckoutSteps';
import { useCreateOrderMutation } from '../store/slices/ordersApiSlice';
import { clearCartItems } from '../store/slices/cartSlice';
import { ShieldCheck } from 'lucide-react';

const PlaceOrderPage = () => {
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);

    const [createOrder, { isLoading }] = useCreateOrderMutation();

    useEffect(() => {
        if (!cart.shippingAddress.address) {
            navigate('/shipping');
        } else if (!cart.paymentMethod) {
            navigate('/payment');
        }
    }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

    const dispatch = useDispatch();

    const placeOrderHandler = async () => {
        try {
            // Backend expects 'product' ID and single 'image' string for validation
            const formattedItems = cart.cartItems.map((item) => ({
                ...item,
                product: item._id,
                image: item.images?.[0] || item.image || '/images/sample.jpg',
            }));

            const res = await createOrder({
                orderItems: formattedItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            }).unwrap();
            dispatch(clearCartItems());
            navigate(`/order/${res._id}`);
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <div className="bg-[#f1f3f6] min-h-screen py-8 text-[14px]">
            <div className="max-w-[1200px] mx-auto px-4">
                <CheckoutSteps step1 step2 step3 step4 />

                <div className="flex flex-col lg:flex-row gap-4 mt-4">

                    {/* Left Column */}
                    <div className="flex-grow space-y-4">

                        {/* Delivery Address Summary */}
                        <div className="bg-white shadow-sm border border-slate-200">
                            <div className="p-4 border-b border-slate-200 bg-[#2874f0] text-white">
                                <h2 className="font-bold text-lg">Delivery Address</h2>
                            </div>
                            <div className="p-4 sm:p-6 text-slate-800">
                                <p className="font-bold mb-1">Shipping Details:</p>
                                <p>{cart.shippingAddress.address}, {cart.shippingAddress.city}</p>
                                <p>{cart.shippingAddress.postalCode}, {cart.shippingAddress.country}</p>
                            </div>
                        </div>

                        {/* Payment Method Summary */}
                        <div className="bg-white shadow-sm border border-slate-200">
                            <div className="p-4 border-b border-slate-200 bg-[#2874f0] text-white">
                                <h2 className="font-bold text-lg">Payment Method</h2>
                            </div>
                            <div className="p-4 sm:p-6 text-slate-800">
                                <p>{cart.paymentMethod}</p>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="bg-white shadow-sm border border-slate-200">
                            <div className="p-4 border-b border-slate-200 bg-[#2874f0] text-white flex justify-between items-center">
                                <h2 className="font-bold text-lg">Order Items</h2>
                                <span className="bg-white text-[#2874f0] text-xs font-bold px-2 py-1 rounded-sm">{cart.cartItems.length} Items</span>
                            </div>
                            <div>
                                {cart.cartItems.map((item, index) => (
                                    <div key={index} className={`p-4 sm:p-6 flex items-start gap-4 sm:gap-6 ${index !== cart.cartItems.length - 1 ? 'border-b border-slate-200' : ''}`}>
                                        <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 border border-slate-200 p-2 flex items-center justify-center">
                                            <img src={item.images[0]} alt={item.name} className="max-w-full max-h-full object-contain" />
                                        </div>
                                        <div className="flex-grow">
                                            <Link to={`/product/${item._id}`} className="text-slate-800 font-medium hover:text-[#2874f0] block line-clamp-2 pr-4">{item.name}</Link>
                                            <div className="mt-2 text-slate-500 text-sm">Qty: <span className="font-bold">{item.qty}</span></div>
                                            <div className="mt-2 text-lg font-bold text-slate-800">₹{(Number(item.qty || 0) * Number(item.price || 0)).toLocaleString('en-IN')}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="w-full lg:w-[350px] shrink-0 space-y-4">
                        <div className="bg-white shadow-sm border border-slate-200">
                            <h3 className="font-bold text-slate-500 uppercase tracking-widest text-sm p-4 border-b border-slate-200">Price Details</h3>

                            <div className="p-4 space-y-4 border-b border-slate-200 border-dashed text-slate-800">
                                <div className="flex justify-between">
                                    <span>Price ({cart.cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                                    <span>₹{Number(cart.itemsPrice || 0).toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Delivery Charges</span>
                                    <span className="text-green-600 font-bold">{Number(cart.shippingPrice || 0) === 0 ? 'Free' : `₹${Number(cart.shippingPrice || 0).toLocaleString('en-IN')}`}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Estimated Tax</span>
                                    <span>₹{Number(cart.taxPrice || 0).toLocaleString('en-IN')}</span>
                                </div>
                            </div>

                            <div className="p-4 border-b border-slate-200">
                                <div className="flex justify-between items-center text-lg font-bold text-slate-800">
                                    <span>Total Amount</span>
                                    <span>₹{Number(cart.totalPrice || 0).toLocaleString('en-IN')}</span>
                                </div>
                            </div>

                            <div className="p-4">
                                <button
                                    disabled={isLoading || cart.cartItems.length === 0}
                                    onClick={placeOrderHandler}
                                    className="w-full bg-[#fb641b] text-white py-3 mt-2 rounded-sm font-bold shadow-sm hover:bg-[#eb5b14] disabled:opacity-50 transition-colors"
                                >
                                    {isLoading ? 'Processing...' : 'PLACE ORDER'}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-slate-500 text-xs px-2 mt-4">
                            <ShieldCheck size={24} className="shrink-0" />
                            <span>Safe and Secure Payments. Easy returns. 100% Authentic products.</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PlaceOrderPage;
