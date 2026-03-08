import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
    ShoppingCart,
    Star,
    ShieldCheck,
    MapPin,
    Tag,
    Zap,
    Loader2
} from 'lucide-react';
import { useGetProductDetailsQuery } from '../store/slices/productsApiSlice';
import { addToCart } from '../store/slices/cartSlice';
import { toast } from 'react-toastify';

const ProductDetailsPage = () => {
    const { id: productId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [qty, setQty] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);

    const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }));
        toast.success('Added to cart successfully!');
        navigate('/cart');
    };

    const buyNowHandler = () => {
        dispatch(addToCart({ ...product, qty }));
        navigate('/shipping');
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Loader2 className="animate-spin text-primary-600" size={48} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-12 text-center text-red-600">
                {error?.data?.message || error.error}
            </div>
        );
    }

    const price = product.storePrices?.[0]?.price || 0;
    const originalPrice = Math.floor(price * 1.25);
    const discount = Math.round(((originalPrice - price) / originalPrice) * 100);

    return (
        <div className="bg-[#f1f3f6] min-h-screen py-4">
            <div className="max-w-[1248px] mx-auto px-4">

                {/* Breadcrumb */}
                <div className="text-[12px] text-slate-500 mb-4 flex gap-2 items-center">
                    <Link to="/" className="hover:text-primary-600">Home</Link>
                    <span>{'>'}</span>
                    <Link to={`/shop?category=${product.category}`} className="hover:text-primary-600">{product.category}</Link>
                    <span>{'>'}</span>
                    <span className="text-slate-800">{product.brand}</span>
                </div>

                <div className="bg-white shadow-sm border border-slate-200 grid grid-cols-1 lg:grid-cols-12 md:min-h-[600px]">

                    {/* Left Column - Gallery (4 cols) */}
                    <div className="lg:col-span-5 p-6 border-b lg:border-b-0 lg:border-r border-slate-200">
                        <div className="flex gap-4 h-full">
                            {/* Thumbnails */}
                            <div className="flex flex-col gap-2 w-16 shrink-0">
                                {product.images.map((img, i) => (
                                    <div
                                        key={i}
                                        onClick={() => setSelectedImage(i)}
                                        className={`h-16 border rounded-sm p-1 cursor-pointer hover:border-primary-600 transition-colors ${selectedImage === i ? 'border-primary-600' : 'border-slate-200'}`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-contain" />
                                    </div>
                                ))}
                            </div>

                            {/* Main Image */}
                            <div className="flex-grow w-full border border-slate-100 p-4 relative flex flex-col">
                                <img
                                    src={product.images[selectedImage]}
                                    alt={product.name}
                                    className="w-full h-96 object-contain"
                                />

                                <div className="mt-auto pt-6 flex gap-4 w-full">
                                    <button
                                        onClick={addToCartHandler}
                                        className="flex-1 bg-[#ff9f00] text-white py-4 rounded-sm font-bold text-lg flex items-center justify-center gap-2 shadow-sm"
                                    >
                                        <ShoppingCart size={20} fill="currentColor" />
                                        ADD TO CART
                                    </button>
                                    <button
                                        onClick={buyNowHandler}
                                        className="flex-1 bg-[#fb641b] text-white py-4 rounded-sm font-bold text-lg flex items-center justify-center gap-2 shadow-sm"
                                    >
                                        <Zap size={20} fill="currentColor" />
                                        BUY NOW
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Details (7 cols) */}
                    <div className="lg:col-span-7 p-6">
                        <div className="space-y-4">
                            {/* Title & Rating */}
                            <div>
                                <h1 className="text-xl md:text-[22px] text-slate-800 leading-snug">
                                    {product.name}
                                </h1>
                                <div className="flex items-center gap-3 mt-2 text-sm">
                                    <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-0.5 rounded-sm font-bold text-xs">
                                        {product.ratings || 0}
                                        <Star size={12} fill="currentColor" />
                                    </div>
                                    <span className="text-slate-500 font-medium">
                                        {product.numReviews} Ratings & Reviews
                                    </span>
                                    <span className="ml-4 text-xs font-bold italic text-primary-600 border border-primary-200 px-1 rounded-sm bg-primary-50">ShopEZ Assured</span>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="pt-2">
                                <div className="text-green-600 font-bold text-sm mb-1">Extra ₹{originalPrice - price} off</div>
                                <div className="flex items-end gap-3">
                                    <span className="text-[28px] font-medium text-slate-900 leading-none">
                                        ₹{price.toLocaleString('en-IN')}
                                    </span>
                                    <span className="text-[16px] text-slate-500 line-through mb-1">
                                        ₹{originalPrice.toLocaleString('en-IN')}
                                    </span>
                                    <span className="text-[16px] font-bold text-green-600 mb-1">
                                        {discount}% off
                                    </span>
                                </div>
                            </div>

                            {/* Offers */}
                            <div className="space-y-2 pt-2 text-sm">
                                <h4 className="font-bold text-slate-800">Available offers</h4>
                                <div className="flex gap-3 items-start text-slate-700">
                                    <Tag className="text-green-600 mt-0.5 shrink-0" size={16} />
                                    <span><strong className="font-bold">Bank Offer</strong> 5% Unlimited Cashback on ShopEZ Axis Bank Credit Card</span>
                                </div>
                                <div className="flex gap-3 items-start text-slate-700">
                                    <Tag className="text-green-600 mt-0.5 shrink-0" size={16} />
                                    <span><strong className="font-bold">Partner Offer</strong> Sign up for ShopEZ Pay Later and get ShopEZ Gift Card worth up to ₹500*</span>
                                </div>
                            </div>

                            {/* Delivery */}
                            <div className="flex gap-4 pt-6 border-t border-slate-100 mt-6 text-sm">
                                <div className="w-24 text-slate-400 font-bold">Delivery</div>
                                <div className="flex-grow space-y-2">
                                    <div className="flex items-center gap-2 text-slate-800 font-bold pb-2 border-b border-slate-200 max-w-xs">
                                        <MapPin size={16} className="text-primary-600" />
                                        <span>Delivery to undefined - 100001</span>
                                    </div>
                                    <p className="font-bold">Delivery by {new Date(Date.now() + 86400000 * 3).toLocaleDateString()} | <span className="text-green-600">Free</span></p>
                                    <p className="text-slate-500 text-xs">If ordered before 4:00 PM</p>
                                </div>
                            </div>

                            {/* Highlights/Specs */}
                            <div className="flex gap-4 pt-6 text-sm">
                                <div className="w-24 text-slate-400 font-bold">Highlights</div>
                                <ul className="flex-grow space-y-2 text-slate-800 list-disc pl-4">
                                    {product.features?.map((f, i) => (
                                        <li key={i}>{f}</li>
                                    )) || <li>1 Year Manufacturer Warranty</li>}
                                    <li>7 Days Replacement Policy</li>
                                    <li>Cash on Delivery available</li>
                                </ul>
                            </div>

                            {/* Description */}
                            <div className="flex gap-4 pt-6 text-sm">
                                <div className="w-24 text-slate-400 font-bold">Description</div>
                                <div className="flex-grow text-slate-700 leading-relaxed">
                                    {product.description}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Compare Stores Section */}
                <div className="bg-white p-6 shadow-sm border border-slate-200 mt-4">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">Compare with other sellers</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-xs">
                                <tr>
                                    <th className="px-6 py-3 border-b">Seller</th>
                                    <th className="px-6 py-3 border-b">Price</th>
                                    <th className="px-6 py-3 border-b">Delivery Status</th>
                                    <th className="px-6 py-3 border-b">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {product.storePrices?.map((store, i) => (
                                    <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                                        <td className="px-6 py-4 font-bold text-primary-600">{store.storeName}</td>
                                        <td className="px-6 py-4 font-bold text-slate-900">₹{store.price.toLocaleString('en-IN')}</td>
                                        <td className="px-6 py-4 text-green-600"><ShieldCheck size={16} className="inline mr-1" /> Ready to ship</td>
                                        <td className="px-6 py-4">
                                            <button className="bg-[#fb641b] text-white px-4 py-1.5 rounded-sm font-bold text-xs hover:bg-[#eb5b14]">Select</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Ratings & Reviews Section */}
                <div className="bg-white shadow-sm border border-slate-200 mt-4">
                    <div className="flex justify-between items-center p-6 border-b border-slate-200">
                        <h3 className="text-xl font-bold text-slate-800">Ratings & Reviews</h3>
                        <button className="bg-white text-slate-800 border border-slate-300 px-6 py-2 shadow-sm font-bold text-sm">Rate Product</button>
                    </div>

                    <div className="p-6">
                        {product.reviews.length === 0 ? (
                            <div className="text-center py-8 text-slate-500 text-sm">No reviews yet.</div>
                        ) : (
                            <div className="space-y-6">
                                {product.reviews.map((review) => (
                                    <div key={review._id} className="border-b border-slate-100 pb-6 last:border-b-0 space-y-3">
                                        <div className="flex items-center gap-3 text-sm">
                                            <div className="flex items-center gap-1 bg-green-600 text-white px-1.5 py-0.5 rounded-sm font-bold text-[11px]">
                                                {review.rating}
                                                <Star size={10} fill="currentColor" />
                                            </div>
                                            <span className="font-bold text-slate-800">{review.title || 'Exceptional Product!'}</span>
                                        </div>
                                        <p className="text-slate-600 text-sm leading-relaxed">{review.comment}</p>
                                        <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                                            <div className="flex items-center gap-2 mt-4">
                                                <span className="font-bold text-slate-500">{review.name}</span>
                                                <span>•</span>
                                                <span className="flex items-center gap-1"><ShieldCheck size={12} /> Certified Buyer</span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <button className="flex items-center gap-1 hover:text-slate-600">👍 14</button>
                                                <button className="flex items-center gap-1 hover:text-slate-600">👎 2</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductDetailsPage;
