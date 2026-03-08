import { useGetOrdersQuery } from '../../store/slices/ordersApiSlice';
import { Link } from 'react-router-dom';
import {
    Loader2,
    AlertCircle,
    CheckCircle2,
    XCircle,
    Clock,
    ExternalLink,
    ClipboardList,
    Package
} from 'lucide-react';

const OrderListPage = () => {
    const { data: orders, isLoading, error } = useGetOrdersQuery();

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 bg-slate-950">
                <Loader2 className="animate-spin text-primary-500" size={48} />
                <p className="text-slate-400 font-medium">Loading all orders...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[calc(100vh-120px)] bg-slate-950 px-6 py-12 text-center flex items-center justify-center">
                <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-12 max-w-xl mx-auto">
                    <AlertCircle className="text-red-400 mx-auto mb-4" size={48} />
                    <h2 className="text-2xl font-black text-white mb-2">Failed to load orders</h2>
                    <p className="text-red-300 font-medium">{error?.data?.message || error.error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-950 min-h-[calc(100vh-120px)] py-8 px-4 font-sans text-slate-200">
            <div className="max-w-[1200px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                            <ClipboardList className="text-[#2874f0]" size={28} />
                            Master Orders
                        </h1>
                        <p className="text-slate-400 text-sm">Management view of all transactions</p>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 px-6 py-3 rounded-md flex items-center gap-6 shadow-sm">
                        <div className="text-center">
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Orders</p>
                            <p className="font-bold text-white text-lg">{orders.length}</p>
                        </div>
                        <div className="h-8 w-px bg-slate-800"></div>
                        <div className="text-center">
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Revenue</p>
                            <p className="font-bold text-[#2874f0] text-lg">₹{orders.reduce((acc, o) => acc + o.totalPrice, 0).toFixed(0)}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-md shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="bg-slate-950 border-b border-slate-800 text-slate-400">
                                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Order ID</th>
                                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Customer</th>
                                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Date</th>
                                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Total</th>
                                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Paid</th>
                                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Delivered</th>
                                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/50">
                                {orders.map((order) => (
                                    <tr key={order._id} className="hover:bg-slate-800/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <span className="font-bold text-slate-200">#{order._id.slice(-6).toUpperCase()}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-bold text-slate-200">{order.user && order.user.name}</p>
                                                <p className="text-xs text-slate-500">{order.user && order.user.email}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-slate-300">{order.createdAt.substring(0, 10)}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-bold text-white">₹{order.totalPrice.toFixed(2)}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {order.isPaid ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-bold">
                                                    <CheckCircle2 size={12} /> YES
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-bold">
                                                    <XCircle size={12} /> NO
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {order.isDelivered ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold">
                                                    <Package size={12} /> YES
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 text-slate-400 border border-slate-700 text-xs font-bold">
                                                    <Clock size={12} /> NO
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                to={`/order/${order._id}`}
                                                className="inline-flex items-center justify-center p-2 bg-slate-800 text-slate-300 rounded hover:bg-[#2874f0] hover:text-white transition-colors"
                                            >
                                                <ExternalLink size={16} />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderListPage;
