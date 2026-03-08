import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
    useProfileMutation,
} from '../store/slices/usersApiSlice';
import { useGetMyOrdersQuery } from '../store/slices/ordersApiSlice';
import { setCredentials } from '../store/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import {
    User,
    Settings,
    History,
    ChevronRight,
    Search,
    Package
} from 'lucide-react';

const ProfilePage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { userInfo } = useSelector((state) => state.auth);

    const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();
    const { data: orders, isLoading: loadingOrders, error: errorOrders } = useGetMyOrdersQuery();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else {
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    }, [userInfo, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
        } else {
            try {
                const res = await updateProfile({
                    _id: userInfo?._id,
                    name,
                    email,
                    password,
                }).unwrap();
                dispatch(setCredentials({ ...res }));
                toast.success('Profile updated successfully');
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    if (!userInfo) return null;

    return (
        <div className="bg-[#f1f3f6] min-h-screen py-8 text-[14px]">
            <div className="max-w-[1200px] mx-auto px-4 flex flex-col md:flex-row gap-4">

                {/* Left Sidebar */}
                <div className="w-full md:w-[280px] shrink-0 space-y-4">
                    {/* User Info */}
                    <div className="bg-white shadow-sm border border-slate-200 p-4 flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-primary-600">
                            <User size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">Hello,</p>
                            <p className="font-bold text-slate-800 text-base">{userInfo.name}</p>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="bg-white shadow-sm border border-slate-200">
                        <div className="p-4 flex items-center gap-4 text-slate-500 border-b border-slate-100">
                            <History size={20} className="text-[#2874f0]" />
                            <span className="font-bold text-slate-800 uppercase text-sm tracking-wide">My Orders</span>
                            <ChevronRight size={16} className="ml-auto" />
                        </div>

                        <div className="p-4 border-b border-slate-100">
                            <div className="flex items-center gap-4 text-slate-500 mb-3">
                                <Settings size={20} className="text-[#2874f0]" />
                                <span className="font-bold text-slate-800 uppercase text-sm tracking-wide">Account Settings</span>
                            </div>
                            <div className="pl-9 space-y-3 font-medium text-slate-600">
                                <div className="text-[#2874f0] font-bold bg-[#f5faff] -ml-4 pl-4 py-2 border-l-4 border-[#2874f0]">Profile Information</div>
                                <div className="hover:text-[#2874f0] cursor-pointer">Manage Addresses</div>
                                <div className="hover:text-[#2874f0] cursor-pointer">PAN Card Information</div>
                            </div>
                        </div>

                        <div className="p-4">
                            <div className="flex items-center gap-4 text-slate-500 mb-3">
                                <User size={20} className="text-[#2874f0]" />
                                <span className="font-bold text-slate-800 uppercase text-sm tracking-wide">My Stuff</span>
                            </div>
                            <div className="pl-9 space-y-3 font-medium text-slate-600">
                                <div className="hover:text-[#2874f0] cursor-pointer">My Rewards</div>
                                <div className="hover:text-[#2874f0] cursor-pointer">My Reviews & Ratings</div>
                                <div className="hover:text-[#2874f0] cursor-pointer">All Notifications</div>
                                <div className="hover:text-[#2874f0] cursor-pointer">My Wishlist</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Content Area */}
                <div className="flex-grow space-y-4">

                    {/* Profile Information Section */}
                    <div className="bg-white shadow-sm border border-slate-200 p-6 md:p-8">
                        <h2 className="text-lg font-bold text-slate-800 pb-4 mb-4 border-b border-slate-100">Personal Information <span className="text-[#2874f0] text-sm ml-4 cursor-pointer font-bold">Edit</span></h2>

                        <form onSubmit={submitHandler} className="max-w-xl space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="block px-2.5 pb-2.5 pt-6 w-full text-sm text-slate-900 bg-transparent border border-slate-300 rounded-sm appearance-none focus:outline-none focus:ring-0 focus:border-[#2874f0] peer transition-colors disabled:bg-slate-50 disabled:text-slate-500"
                                    />
                                    <label htmlFor="name" className="absolute text-sm text-slate-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-[#2874f0] px-2.5 bg-white peer-focus:bg-white left-1">First Name</label>
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="lastName"
                                        defaultValue=""
                                        placeholder=" "
                                        className="block px-2.5 pb-2.5 pt-6 w-full text-sm text-slate-900 bg-transparent border border-slate-300 rounded-sm appearance-none focus:outline-none focus:ring-0 focus:border-[#2874f0] peer transition-colors disabled:bg-slate-50 disabled:text-slate-500"
                                    />
                                    <label htmlFor="lastName" className="absolute text-sm text-slate-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-[#2874f0] px-2.5 bg-white peer-focus:bg-white left-1">Last Name</label>
                                </div>
                            </div>

                            <div className="mt-8 border-t border-slate-100 pt-6"></div>
                            <h2 className="text-lg font-bold text-slate-800 pb-2">Email Address <span className="text-[#2874f0] text-sm ml-4 cursor-pointer font-bold">Edit</span></h2>
                            <div className="relative max-w-xs">
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block px-2.5 pb-2.5 pt-6 w-full text-sm text-slate-900 bg-transparent border border-slate-300 rounded-sm appearance-none focus:outline-none focus:ring-0 focus:border-[#2874f0] peer transition-colors disabled:bg-slate-50 disabled:text-slate-500"
                                />
                                <label htmlFor="email" className="absolute text-sm text-slate-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-[#2874f0] px-2.5 bg-white peer-focus:bg-white left-1">Email Address</label>
                            </div>

                            <div className="mt-8 border-t border-slate-100 pt-6"></div>
                            <h2 className="text-lg font-bold text-slate-800 pb-2">Update Password</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative">
                                    <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder=" "
                                        className="block px-2.5 pb-2.5 pt-6 w-full text-sm text-slate-900 bg-transparent border border-slate-300 rounded-sm appearance-none focus:outline-none focus:ring-0 focus:border-[#2874f0] peer transition-colors disabled:bg-slate-50 disabled:text-slate-500"
                                    />
                                    <label htmlFor="password" className="absolute text-sm text-slate-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-[#2874f0] px-2.5 bg-white peer-focus:bg-white left-1">New Password</label>
                                </div>
                                <div className="relative">
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        placeholder=" "
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="block px-2.5 pb-2.5 pt-6 w-full text-sm text-slate-900 bg-transparent border border-slate-300 rounded-sm appearance-none focus:outline-none focus:ring-0 focus:border-[#2874f0] peer transition-colors disabled:bg-slate-50 disabled:text-slate-500"
                                    />
                                    <label htmlFor="confirmPassword" className="absolute text-sm text-slate-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-[#2874f0] px-2.5 bg-white peer-focus:bg-white left-1">Confirm Password</label>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={loadingUpdateProfile}
                                    className="bg-[#2874f0] text-white px-10 py-3 rounded-sm font-bold shadow-sm hover:bg-[#1a5bce] disabled:opacity-50 transition-colors"
                                >
                                    {loadingUpdateProfile ? 'UPDATING...' : 'SAVE CHANGES'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Order History Section */}
                    <div className="bg-white shadow-sm border border-slate-200">
                        <div className="p-4 sm:p-6 border-b border-slate-100 flex justify-between items-center">
                            <h2 className="text-lg font-bold text-slate-800">Recent Orders</h2>
                            <div className="relative hidden sm:block w-64">
                                <input type="text" placeholder="Search your orders here" className="w-full border border-slate-300 rounded-sm pl-4 pr-10 py-2 text-sm focus:outline-none focus:border-[#2874f0]" />
                                <div className="absolute right-0 top-0 bottom-0 w-10 bg-[#2874f0] text-white flex items-center justify-center rounded-r-sm cursor-pointer">
                                    <Search size={16} />
                                </div>
                            </div>
                        </div>

                        {loadingOrders ? (
                            <div className="p-8 text-center text-slate-500">Loading your history...</div>
                        ) : errorOrders ? (
                            <div className="p-8 text-center text-red-500">{errorOrders?.data?.message || errorOrders.error}</div>
                        ) : orders?.length === 0 ? (
                            <div className="p-8 text-center text-slate-500 flex flex-col items-center">
                                <img src="/images/empty-orders.png" alt="No Orders" className="w-48 h-48 opacity-50 mb-4" onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/150?text=No+Orders" }} />
                                <p className="font-bold text-lg mb-2 text-slate-800">No orders found</p>
                                <p className="mb-6">Looks like you haven't made your order yet.</p>
                                <Link to="/shop" className="bg-[#fb641b] text-white px-8 py-2 rounded-sm font-bold uppercase shadow-sm">Start Shopping</Link>
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-100">
                                {orders.map((order) => (
                                    <Link key={order._id} to={`/order/${order._id}`} className="block p-4 sm:p-6 hover:bg-slate-50 transition-colors group">
                                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
                                            <div className="w-16 h-16 bg-slate-100 p-2 shrink-0 border border-slate-200 flex items-center justify-center">
                                                <Package size={32} className="text-slate-400" />
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex flex-col sm:flex-row sm:justify-between mb-1">
                                                    <h3 className="font-medium text-slate-800 group-hover:text-[#2874f0]">Order ID: {order._id.slice(-8).toUpperCase()}</h3>
                                                    <span className="font-bold text-slate-800">₹{order.totalPrice.toLocaleString('en-IN')}</span>
                                                </div>
                                                <p className="text-xs text-slate-500 mb-2">Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>

                                                <div className="flex items-center gap-2">
                                                    {order.isDelivered ? (
                                                        <>
                                                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                                            <span className="text-sm font-bold text-slate-800">Delivered on {new Date(order.deliveredAt).toLocaleDateString()}</span>
                                                        </>
                                                    ) : order.isPaid ? (
                                                        <>
                                                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                                            <span className="text-sm font-bold text-slate-800">Processing</span>
                                                            <span className="text-sm text-slate-500 ml-2">Expected delivery in 3-5 days</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                                                            <span className="text-sm font-bold text-slate-800">Payment Pending</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
