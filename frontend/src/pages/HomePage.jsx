import { useState, useEffect } from 'react';
import { useGetProductsQuery } from '../store/slices/productsApiSlice';
import ProductCard from '../components/ProductCard';
import Hero from '../components/Hero';
import { Loader2, AlertCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const { data: productsData, isLoading, error } = useGetProductsQuery({});
    const [timeLeft, setTimeLeft] = useState(2 * 3600 + 45 * 60 + 10); // 02:45:10 in seconds

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="bg-[#f1f3f6] min-h-screen pb-12 pt-4">
            <Hero />

            <div className="max-w-[1248px] mx-auto px-4 mt-6">

                {/* Dealing Section 1 */}
                <div className="bg-white p-4 shadow-sm mb-4">
                    <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-4">
                            <h2 className="text-xl font-bold text-slate-800">Best of Electronics</h2>
                            <div className="bg-primary-600 text-white text-[12px] font-bold px-2 py-0.5 rounded-sm">
                                Deals End in {formatTime(timeLeft)}
                            </div>
                        </div>
                        <Link to="/shop?category=Electronics" className="bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors shadow-sm">
                            <ChevronRight size={20} />
                        </Link>
                    </div>

                    {isLoading ? (
                        <div className="flex items-center justify-center h-48">
                            <Loader2 className="animate-spin text-primary-600" size={32} />
                        </div>
                    ) : error ? (
                        <div className="p-4 bg-red-50 text-red-600 rounded-sm font-medium border border-red-100 flex items-center gap-2">
                            <AlertCircle size={20} />
                            {error?.data?.message || error.error}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0 border-t border-l border-slate-200">
                            {productsData?.products?.slice(0, 5).map((product) => (
                                <div key={product._id} className="border-r border-b border-slate-200">
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Promotional Banner Middle */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gradient-to-br from-purple-600 to-indigo-800 rounded-sm p-6 text-white shadow-sm flex flex-col justify-center h-40 relative overflow-hidden group cursor-pointer">
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold mb-1">Top Smartphones</h3>
                            <p className="text-sm text-purple-200">Up to 40% Off</p>
                        </div>
                        <div className="absolute -bottom-4 -right-4 text-8xl opacity-20 group-hover:scale-110 transition-transform">📱</div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-sm p-6 text-white shadow-sm flex flex-col justify-center h-40 relative overflow-hidden group cursor-pointer">
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold mb-1">Winter Wear</h3>
                            <p className="text-sm text-orange-200">Min 50% Off</p>
                        </div>
                        <div className="absolute -bottom-4 -right-4 text-8xl opacity-20 group-hover:scale-110 transition-transform">🧥</div>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-500 to-teal-700 rounded-sm p-6 text-white shadow-sm flex flex-col justify-center h-40 relative overflow-hidden group cursor-pointer">
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold mb-1">Home Appliances</h3>
                            <p className="text-sm text-emerald-200">Big Exchange Days</p>
                        </div>
                        <div className="absolute -bottom-4 -right-4 text-8xl opacity-20 group-hover:scale-110 transition-transform">📺</div>
                    </div>
                </div>

                {/* Dealing Section 2 */}
                <div className="bg-white p-4 shadow-sm">
                    <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-3">
                        <h2 className="text-xl font-bold text-slate-800">Trending Offers</h2>
                        <Link to="/shop" className="bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors shadow-sm">
                            <ChevronRight size={20} />
                        </Link>
                    </div>

                    {isLoading ? (
                        <div className="flex items-center justify-center h-48">
                            <Loader2 className="animate-spin text-primary-600" size={32} />
                        </div>
                    ) : error ? (
                        <div className="p-4 bg-red-50 text-red-600 rounded-sm font-medium border border-red-100 flex items-center gap-2">
                            <AlertCircle size={20} />
                            {error?.data?.message || error.error}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0 border-t border-l border-slate-200">
                            {productsData?.products?.slice(5, 15).map((product) => (
                                <div key={product._id} className="border-r border-b border-slate-200">
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default HomePage;
