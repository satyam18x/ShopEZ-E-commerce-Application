import { ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    const addToCartHandler = (e) => {
        e.preventDefault();
        dispatch(addToCart({ ...product, qty: 1 }));
        toast.success(`${product.name} added to cart!`);
    };

    // Calculate dummy original price for discount effect
    const price = product.storePrices?.[0]?.price || 0;
    const originalPrice = Math.floor(price * 1.25);
    const discount = Math.round(((originalPrice - price) / originalPrice) * 100);

    return (
        <div className="group relative flex flex-col bg-white p-4 shadow-sm hover:shadow-lg transition-shadow border border-slate-200 h-full">
            {/* Product Image Area */}
            <Link to={`/product/${product._id}`} className="relative aspect-square mb-4 block overflow-hidden">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
            </Link>

            {/* Product Info */}
            <div className="flex-grow flex flex-col space-y-1.5">
                <Link to={`/product/${product._id}`}>
                    <h3 className="text-[14px] text-slate-800 line-clamp-2 hover:text-primary-600 transition-colors h-[42px] leading-tight">
                        {product.name}
                    </h3>
                </Link>

                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-green-600 text-white px-1.5 py-0.5 rounded-sm text-[11px] font-bold">
                        {product.ratings || 0}
                        <Star size={10} fill="currentColor" />
                    </div>
                    <span className="text-[12px] text-slate-500 font-medium">
                        ({product.numReviews || 0})
                    </span>
                    <div className="ml-auto flex shrink-0 items-center">
                        <span className="text-[10px] whitespace-nowrap font-bold italic text-primary-600 border border-primary-200 px-1 rounded-sm bg-primary-50">ShopEZ Assured</span>
                    </div>
                </div>

                <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-[18px] font-bold text-slate-900">
                        ₹{price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[12px] text-slate-500 line-through">
                        ₹{originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[12px] font-bold text-green-600">
                        {discount}% off
                    </span>
                </div>

                <div className="text-[11px] text-slate-600 pt-1 flex-grow">
                    Free delivery
                </div>

                <button
                    onClick={addToCartHandler}
                    className="w-full mt-auto bg-white text-slate-800 border border-slate-300 py-1.5 rounded-sm font-bold text-[13px] hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                >
                    <ShoppingCart size={14} />
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
