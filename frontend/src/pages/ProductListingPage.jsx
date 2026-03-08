import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetProductsQuery } from '../store/slices/productsApiSlice';
import ProductCard from '../components/ProductCard';
import { Loader2, ChevronDown, Filter, X } from 'lucide-react';

const ProductListingPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryParam = searchParams.get('category') || '';
    const keywordParam = searchParams.get('keyword') || '';

    const [category, setCategory] = useState(categoryParam);
    const [sortBy, setSortBy] = useState('newest');
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    const { data, isLoading, error } = useGetProductsQuery({
        keyword: keywordParam,
        category: category
    });

    const categories = ['Electronics', 'Fashion', 'Home', 'Beauty'];

    const handleCategoryChange = (cat) => {
        const newCat = category === cat ? '' : cat;
        setCategory(newCat);
        if (newCat) {
            searchParams.set('category', newCat);
        } else {
            searchParams.delete('category');
        }
        setSearchParams(searchParams);
        setIsMobileFiltersOpen(false);
    };

    const toggleMobileFilters = () => setIsMobileFiltersOpen(!isMobileFiltersOpen);

    return (
        <div className="bg-[#f1f3f6] min-h-screen py-4">
            <div className="max-w-[1248px] mx-auto px-4 flex flex-col md:flex-row gap-4">

                {/* Mobile Filter Toggle */}
                <div className="md:hidden flex items-center justify-between bg-white p-3 shadow-sm border border-slate-200">
                    <button onClick={toggleMobileFilters} className="flex items-center gap-2 font-bold text-slate-700">
                        <Filter size={18} />
                        Filters
                    </button>
                    <div className="relative">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="appearance-none bg-transparent py-1 pr-6 font-medium text-slate-700 outline-none text-sm"
                        >
                            <option value="newest">Newest</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="rating">Top Rated</option>
                        </select>
                        <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                    </div>
                </div>

                {/* Sidebar Filters */}
                <aside className={`w-full md:w-[280px] shrink-0 bg-white shadow-sm border border-slate-200 h-fit ${isMobileFiltersOpen ? 'block fixed inset-0 z-50 overflow-y-auto' : 'hidden md:block'}`}>
                    {/* Mobile Header */}
                    <div className="md:hidden flex justify-between items-center p-4 border-b border-slate-200">
                        <span className="font-bold text-lg">Filters</span>
                        <button onClick={toggleMobileFilters}><X size={24} /></button>
                    </div>

                    <div className="p-4 border-b border-slate-200">
                        <h2 className="font-bold text-lg mb-4 text-slate-800">Filters</h2>
                        <div className="mb-6">
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Categories</h3>
                            <div className="space-y-2">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={!category}
                                        onChange={() => handleCategoryChange('')}
                                        className="w-4 h-4 text-primary-600 rounded border-slate-300 focus:ring-primary-500"
                                    />
                                    <span className={`text-[14px] ${!category ? 'font-bold text-primary-600' : 'text-slate-700 group-hover:text-primary-600'}`}>
                                        All Categories
                                    </span>
                                </label>
                                {categories.map((cat) => (
                                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={category === cat}
                                            onChange={() => handleCategoryChange(cat)}
                                            className="w-4 h-4 text-primary-600 rounded border-slate-300 focus:ring-primary-500"
                                        />
                                        <span className={`text-[14px] ${category === cat ? 'font-bold text-primary-600' : 'text-slate-700 group-hover:text-primary-600'}`}>
                                            {cat}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Dummy Price Filter */}
                        <div className="mb-4">
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Price</h3>
                            <input type="range" className="w-full accent-primary-600" min="0" max="50000" />
                            <div className="flex justify-between text-xs text-slate-500 mt-2">
                                <span>₹Min</span>
                                <span>₹50000+</span>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-grow bg-white shadow-sm border border-slate-200">
                    <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-[16px] font-bold text-slate-800">
                                {category || (keywordParam ? `Search results for "${keywordParam}"` : 'All Products')}
                            </h1>
                            <span className="text-xs text-slate-500">(Showing {data?.products?.length || 0} products)</span>
                        </div>

                        {/* Desktop Sort */}
                        <div className="hidden md:flex items-center gap-2 text-sm">
                            <span className="text-slate-500 font-bold">Sort By</span>
                            <div className="flex gap-4 border-b-2 border-transparent">
                                <button className={`font-medium ${sortBy === 'newest' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-slate-700 hover:text-primary-600'}`} onClick={() => setSortBy('newest')}>Newest</button>
                                <button className={`font-medium ${sortBy === 'price-low' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-slate-700 hover:text-primary-600'}`} onClick={() => setSortBy('price-low')}>Price -- Low to High</button>
                                <button className={`font-medium ${sortBy === 'price-high' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-slate-700 hover:text-primary-600'}`} onClick={() => setSortBy('price-high')}>Price -- High to Low</button>
                            </div>
                        </div>
                    </div>

                    <div className="p-0">
                        {isLoading ? (
                            <div className="flex items-center justify-center min-h-[40vh]">
                                <Loader2 className="animate-spin text-primary-600" size={32} />
                            </div>
                        ) : error ? (
                            <div className="p-8 text-center text-red-600 font-medium">
                                {error?.data?.message || error.error}
                            </div>
                        ) : data?.products?.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="text-4xl mb-4 text-slate-300">🔍</div>
                                <h3 className="text-lg font-bold text-slate-800 mb-2">Sorry, no products found!</h3>
                                <p className="text-slate-500 text-sm">Please check the spelling or try searching for something else</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0 border-l border-t border-slate-200">
                                {data?.products?.map((product) => (
                                    <div key={product._id} className="border-r border-b border-slate-200">
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ProductListingPage;
