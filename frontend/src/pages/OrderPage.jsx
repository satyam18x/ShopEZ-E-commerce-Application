import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
    useGetOrderDetailsQuery,
    usePayOrderMutation,
    useDeliverOrderMutation
} from '../store/slices/ordersApiSlice';

const OrderPage = () => {
    const { id: orderId } = useParams();

    const {
        data: order,
        refetch,
        isLoading,
        error,
    } = useGetOrderDetailsQuery(orderId);

    const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
    const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const deliverHandler = async () => {
        try {
            await deliverOrder(orderId);
            refetch();
            toast.success('Order delivered');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    // Simulation of payment for now
    const payHandler = async () => {
        try {
            const transactionId = 'TXN-' + Math.random().toString(36).substring(2, 10).toUpperCase();
            await payOrder({
                orderId,
                details: {
                    id: transactionId,
                    status: 'COMPLETED',
                    update_time: new Date().toISOString(),
                    email_address: userInfo.email
                }
            }).unwrap();
            refetch();
            toast.success(`Payment Successful! Receipt ID: ${transactionId}`);
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    if (isLoading) {
        return <div className="p-12 text-center text-slate-500">Loading order details...</div>;
    }

    if (error) {
        return <div className="p-12 text-center text-red-500 bg-red-50">{error?.data?.message || error.error}</div>;
    }

    return (
        <div className="bg-[#f1f3f6] min-h-screen py-8 text-[14px]">
            <div className="max-w-[1200px] mx-auto px-4">

                {/* Breadcrumbs */}
                <div className="text-xs text-slate-500 mb-4 flex items-center gap-2">
                    <Link to="/" className="hover:text-[#2874f0]">Home</Link>
                    <span>&gt;</span>
                    <Link to="/profile" className="hover:text-[#2874f0]">My Account</Link>
                    <span>&gt;</span>
                    <Link to="/profile" className="hover:text-[#2874f0]">My Orders</Link>
                    <span>&gt;</span>
                    <span className="text-slate-800 font-medium">{order._id.slice(-8).toUpperCase()}</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-4">

                    {/* Main Delivery Info */}
                    <div className="flex-grow space-y-4">
                        <div className="bg-white shadow-sm border border-slate-200">
                            {/* Order Header */}
                            <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:justify-between gap-4">
                                <div>
                                    <h1 className="text-lg font-bold text-slate-800">Order ID - {order._id.slice(-12).toUpperCase()}</h1>
                                    <p className="text-sm text-slate-500">Placed on {new Date(order.createdAt).toLocaleString()}</p>
                                </div>
                                <div className="flex flex-col sm:items-end gap-1">
                                    <button className="text-[#2874f0] font-bold text-sm bg-blue-50 px-4 py-1.5 rounded-sm border border-[#2874f0]/20 hover:bg-blue-100">Invoice</button>
                                </div>
                            </div>

                            {/* Address Component */}
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="font-bold text-slate-800 mb-3 text-base">Delivery Address</h3>
                                    <div className="text-slate-800">
                                        <p className="font-bold mb-1">{order.user.name}</p>
                                        <p className="text-slate-600 mb-2">{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
                                        <p className="font-bold text-slate-800 mb-1">Email <span className="font-normal text-slate-600 ml-2">{order.user.email}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Items Section */}
                        <div className="bg-white shadow-sm border border-slate-200">
                            {order.orderItems.map((item, index) => (
                                <div key={index} className={`p-6 flex flex-col md:flex-row gap-6 ${index !== order.orderItems.length - 1 ? 'border-b border-slate-200' : ''}`}>
                                    <div className="w-24 h-24 shrink-0 border border-slate-200 p-2 flex items-center justify-center">
                                        <img src={item.image || item.images?.[0]} alt={item.name} className="max-w-full max-h-full object-contain" />
                                    </div>
                                    <div className="flex-grow flex flex-col md:flex-row justify-between gap-6">
                                        <div className="md:w-1/3">
                                            <Link to={`/product/${item.product}`} className="text-slate-800 font-medium hover:text-[#2874f0] block line-clamp-2">{item.name}</Link>
                                            <p className="text-slate-500 text-sm mt-1">Qty: <b>{item.qty}</b></p>
                                        </div>
                                        <div className="md:w-1/6">
                                            <span className="font-bold text-lg text-slate-800">₹{(Number(item.qty || 0) * Number(item.price || 0)).toLocaleString('en-IN')}</span>
                                        </div>

                                        {/* Status tracker per item */}
                                        <div className="md:w-1/2 space-y-4">
                                            <div className="flex items-center gap-2">
                                                {order.isDelivered ? (
                                                    <>
                                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                                        <span className="font-bold text-slate-800">Delivered on {new Date(order.deliveredAt).toLocaleDateString()}</span>
                                                    </>
                                                ) : order.isPaid ? (
                                                    <>
                                                        <div className="w-3 h-3 rounded-full bg-[#2874f0]"></div>
                                                        <span className="font-bold text-slate-800">Processing</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                                                        <span className="font-bold text-slate-800">Payment Pending</span>
                                                    </>
                                                )}
                                            </div>
                                            <p className="text-xs text-slate-500">Your item has been {order.isDelivered ? 'delivered' : order.isPaid ? 'processed' : 'placed'}.</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary & Actions */}
                    <div className="w-full lg:w-[350px] shrink-0 space-y-4">
                        <div className="bg-white shadow-sm border border-slate-200">
                            <h3 className="font-bold text-slate-500 uppercase tracking-widest text-sm p-4 border-b border-slate-200">Price Details</h3>

                            <div className="p-4 space-y-4 border-b border-slate-200 border-dashed text-slate-800">
                                <div className="flex justify-between">
                                    <span>Price ({order.orderItems.length} items)</span>
                                    <span>₹{Number(order.itemsPrice || 0).toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Delivery Charges</span>
                                    <span className="text-green-600 font-bold">{Number(order.shippingPrice || 0) === 0 ? 'Free' : `₹${Number(order.shippingPrice || 0).toLocaleString('en-IN')}`}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Estimated Tax</span>
                                    <span>₹{Number(order.taxPrice || 0).toLocaleString('en-IN')}</span>
                                </div>
                            </div>

                            <div className="p-4 border-b border-slate-200">
                                <div className="flex justify-between items-center text-lg font-bold text-slate-800">
                                    <span>Total Amount</span>
                                    <span>₹{Number(order.totalPrice || 0).toLocaleString('en-IN')}</span>
                                </div>
                            </div>

                            <div className="p-4 bg-slate-50 text-slate-600">
                                <p className="mb-2"><b>Payment Method:</b> <span className="uppercase">{order.paymentMethod}</span></p>
                            </div>

                            {/* Payment Receipt */}
                            {order.isPaid && order.paymentResult && (
                                <div className="p-4 bg-green-50/50 text-green-800 border-t border-green-100">
                                    <p className="font-bold flex items-center justify-between mb-2">
                                        <span>Payment Receipt</span>
                                        <span className="text-[10px] uppercase font-black bg-green-200 text-green-800 px-2 py-0.5 rounded-sm">PAID</span>
                                    </p>
                                    <p className="text-xs mb-1"><b>Transaction ID:</b> {order.paymentResult.id}</p>
                                    <p className="text-xs"><b>Paid At:</b> {new Date(order.paidAt).toLocaleString()}</p>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="p-4 border-t border-slate-200 bg-white space-y-3">
                                {!order.isPaid && (
                                    <button
                                        disabled={loadingPay}
                                        onClick={payHandler}
                                        className="w-full bg-[#fb641b] text-white py-3 rounded-sm font-bold shadow-sm hover:bg-[#eb5b14] transition-colors"
                                    >
                                        {loadingPay ? 'Processing...' : 'PLACE ORDER'}
                                    </button>
                                )}

                                {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                    <button
                                        disabled={loadingDeliver}
                                        onClick={deliverHandler}
                                        className="w-full bg-white text-[#2874f0] border border-[#2874f0] py-3 rounded-sm font-bold shadow-sm hover:bg-blue-50 transition-colors"
                                    >
                                        {loadingDeliver ? 'Processing...' : 'MARK AS DELIVERED'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default OrderPage;
