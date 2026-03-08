import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../store/slices/usersApiSlice';
import { setCredentials } from '../store/slices/authSlice';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            toast.success('Login successful!');
            navigate(redirect);
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <div className="bg-[#f1f3f6] min-h-[calc(100vh-120px)] flex items-center justify-center py-8 px-4">
            <div className="bg-white shadow-md border border-slate-200 rounded-sm w-full max-w-[850px] flex flex-col md:flex-row min-h-[500px] overflow-hidden">

                {/* Left Panel - Branding */}
                <div className="bg-primary-600 text-white p-10 w-full md:w-[40%] flex flex-col justify-between shrink-0 relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-[28px] font-bold mb-4">Login</h2>
                        <p className="text-primary-100 text-[18px] leading-snug text-balance">
                            Get access to your Orders, Wishlist and Recommendations
                        </p>
                    </div>
                    {/* Placeholder for left panel graphic */}
                    <div className="relative z-10 mt-12 bg-primary-700/50 p-6 rounded-lg backdrop-blur-sm border border-primary-500/30">
                        <div className="text-6xl text-center mb-2">🛍️</div>
                        <div className="text-center font-bold tracking-widest uppercase text-sm opacity-80">ShopEZ Exclusive</div>
                    </div>
                    {/* Decorative blobs */}
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute -top-20 -left-20 w-48 h-48 bg-black/10 rounded-full blur-2xl"></div>
                </div>

                {/* Right Panel - Form */}
                <div className="p-10 w-full md:w-[60%] flex flex-col relative">
                    <form onSubmit={submitHandler} className="space-y-6 flex-grow pt-4">

                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block px-2.5 pb-2.5 pt-6 w-full text-sm text-slate-900 bg-transparent border-b border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary-600 peer transition-colors"
                                placeholder=" "
                                required
                            />
                            <label
                                htmlFor="email"
                                className="absolute text-sm text-slate-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-primary-600 px-2.5 bg-white peer-focus:bg-white"
                            >
                                Enter Email Address
                            </label>
                        </div>

                        <div className="relative">
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block px-2.5 pb-2.5 pt-6 w-full text-sm text-slate-900 bg-transparent border-b border-slate-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary-600 peer transition-colors"
                                placeholder=" "
                                required
                            />
                            <label
                                htmlFor="password"
                                className="absolute text-sm text-slate-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-primary-600 px-2.5 bg-white peer-focus:bg-white"
                            >
                                Enter Password
                            </label>
                            <Link to="/forgot-password" className="absolute right-0 top-1/2 -translate-y-1/2 text-xs font-bold text-primary-600 hover:underline">
                                Forgot?
                            </Link>
                        </div>

                        <p className="text-xs text-slate-500 pt-2">
                            By continuing, you agree to ShopEZ's <span className="text-primary-600 cursor-pointer">Terms of Use</span> and <span className="text-primary-600 cursor-pointer">Privacy Policy</span>.
                        </p>

                        <button
                            disabled={isLoading}
                            type="submit"
                            className="w-full bg-[#fb641b] text-white py-3.5 rounded-sm font-bold shadow-sm hover:bg-[#eb5b14] transition-colors flex items-center justify-center gap-2 mt-2 disabled:opacity-70"
                        >
                            {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Login'}
                        </button>
                    </form>

                    <div className="mt-8 text-center border-t border-slate-100 pt-6">
                        <Link
                            to={redirect ? `/register?redirect=${redirect}` : '/register'}
                            className="text-primary-600 font-bold hover:underline text-[14px]"
                        >
                            New to ShopEZ? Create an account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
