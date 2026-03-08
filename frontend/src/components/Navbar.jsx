import { useState } from 'react';
import { ShoppingCart, User, Search, LogOut, Package, UserCircle, History, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../store/slices/usersApiSlice';
import { logout } from '../store/slices/authSlice';

const Navbar = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
        } catch (err) {
            console.error(err);
        } finally {
            dispatch(logout());
            navigate('/login');
            setIsMenuOpen(false);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (searchKeyword.trim()) {
            navigate(`/shop?keyword=${searchKeyword}`);
        } else {
            navigate('/shop');
        }
    };

    return (
        <nav className="sticky top-0 z-50 bg-primary-600 shadow-md">
            {/* Top Bar (Flipkart Blue) */}
            <div className="px-4 py-2.5 md:py-3 max-w-[1248px] mx-auto flex items-center justify-between gap-4">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-1 shrink-0 ml-4 md:ml-0">
                    <span className="text-[22px] font-bold italic text-white tracking-tight leading-none bg-primary-600 px-1">ShopEZ</span>
                    <span className="text-yellow-400 text-sm font-bold mt-1">Plus</span>
                    <Package className="text-yellow-400 mt-1" size={12} />
                </Link>

                {/* Search Bar - Centered & Expanded */}
                <div className="hidden md:flex flex-grow max-w-2xl mx-6 relative shadow-sm">
                    <form onSubmit={submitHandler} className="w-full flex items-center">
                        <Search className="absolute left-3 text-slate-400" size={18} />
                        <input
                            type="text"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            placeholder="Search for products, brands and more"
                            className="w-full bg-white rounded-sm py-2 pl-10 pr-4 outline-none text-slate-800 text-[14px] placeholder-slate-500 font-medium"
                        />
                    </form>
                </div>

                {/* Actions (Login, Cart) */}
                <div className="flex items-center gap-2 md:gap-6 shrink-0 mr-2 md:mr-0">
                    {userInfo ? (
                        <div
                            className="relative group cursor-pointer flex items-center gap-1 text-white font-medium px-2 py-1"
                            onMouseEnter={() => setIsMenuOpen(true)}
                            onMouseLeave={() => setIsMenuOpen(false)}
                        >
                            <span className="text-[15px] truncate max-w-[100px]">{userInfo.name.split(' ')[0]}</span>
                            <ChevronDown size={16} className={`transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />

                            {/* Dropdown Menu */}
                            {isMenuOpen && (
                                <div className="absolute top-10 right-0 w-60 bg-white rounded-sm shadow-xl border border-slate-200 py-2 z-50 text-slate-800 animate-in fade-in duration-200">
                                    <div className="absolute -top-2 right-6 w-4 h-4 bg-white border-t border-l border-slate-200 transform rotate-45"></div>
                                    <div className="p-3 border-b border-slate-100 flex justify-between items-center">
                                        <span className="text-[13px] font-medium text-slate-500">New customer?</span>
                                        <Link to="/register" className="text-primary-600 text-[13px] font-bold hover:underline">Sign Up</Link>
                                    </div>
                                    <Link to="/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-100">
                                        <UserCircle size={18} className="text-primary-600" />
                                        <span className="text-[14px]">My Profile</span>
                                    </Link>
                                    <Link to="/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-100">
                                        <Package size={18} className="text-primary-600" />
                                        <span className="text-[14px]">Orders</span>
                                    </Link>

                                    {userInfo.isAdmin && (
                                        <>
                                            <div className="px-4 py-2 mt-1 bg-slate-50 text-[11px] font-bold text-slate-400 uppercase">Admin Console</div>
                                            <Link to="/admin/productlist" className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50 transition-colors">
                                                <Package size={16} className="text-slate-500" />
                                                <span className="text-[14px]">Products</span>
                                            </Link>
                                            <Link to="/admin/orderlist" className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50 transition-colors">
                                                <History size={16} className="text-slate-500" />
                                                <span className="text-[14px]">All Orders</span>
                                            </Link>
                                            <Link to="/admin/userlist" className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50 transition-colors border-b border-slate-100">
                                                <UserCircle size={16} className="text-slate-500" />
                                                <span className="text-[14px]">Users</span>
                                            </Link>
                                        </>
                                    )}
                                    <button
                                        onClick={logoutHandler}
                                        className="flex items-center gap-3 w-full px-4 py-3 hover:bg-slate-50 text-slate-800 transition-colors text-left"
                                    >
                                        <LogOut size={18} className="text-slate-400" />
                                        <span className="text-[14px]">Logout</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-white text-primary-600 px-8 py-1.5 rounded-sm font-bold text-[15px] hover:bg-slate-50 transition-colors shadow-sm"
                        >
                            Login
                        </Link>
                    )}

                    <Link to="/cart" className="flex items-center gap-2 text-white font-medium hover:text-slate-100 px-2 group">
                        <div className="relative">
                            <ShoppingCart size={22} className="group-hover:-translate-y-0.5 transition-transform" />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[#ff6161] text-white text-[11px] font-bold px-1.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full border border-white">
                                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                                </span>
                            )}
                        </div>
                        <span className="hidden md:block text-[15px]">Cart</span>
                    </Link>
                </div>
            </div>

            {/* Mobile Search - Visible only on small screens */}
            <div className="md:hidden px-3 pb-3 bg-primary-600">
                <form onSubmit={submitHandler} className="w-full relative shadow-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        placeholder="Search for products, brands and more"
                        className="w-full bg-white rounded-sm py-2 pl-10 pr-4 outline-none text-slate-800 text-[14px]"
                    />
                </form>
            </div>

            {/* Sub-navigation (Categories Strip) */}
            <div className="bg-white border-b border-slate-200 shadow-sm hidden md:block">
                <div className="max-w-[1248px] mx-auto px-4 py-3 flex items-center gap-8 text-[14px] font-medium text-slate-700">
                    <Link to="/shop?category=Electronics" className="hover:text-primary-600 flex items-center gap-1 group">
                        <span className="group-hover:text-primary-600 transition-colors">Electronics</span>
                        <ChevronDown size={14} className="text-slate-400 group-hover:text-primary-600 group-hover:rotate-180 transition-all" />
                    </Link>
                    <Link to="/shop?category=Fashion" className="hover:text-primary-600 flex items-center gap-1 group">
                        <span className="group-hover:text-primary-600 transition-colors">Fashion</span>
                        <ChevronDown size={14} className="text-slate-400 group-hover:text-primary-600 group-hover:rotate-180 transition-all" />
                    </Link>
                    <Link to="/shop?category=Furniture" className="hover:text-primary-600 flex items-center gap-1 group">
                        <span className="group-hover:text-primary-600 transition-colors">Home & Furniture</span>
                        <ChevronDown size={14} className="text-slate-400 group-hover:text-primary-600 group-hover:rotate-180 transition-all" />
                    </Link>
                    <Link to="/shop?category=Beauty" className="hover:text-primary-600 flex items-center gap-1 group">
                        <span className="group-hover:text-primary-600 transition-colors">Beauty</span>
                        <ChevronDown size={14} className="text-slate-400 group-hover:text-primary-600 group-hover:rotate-180 transition-all" />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
