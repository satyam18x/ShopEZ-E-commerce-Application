import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    useUpdateProductMutation,
    useGetProductDetailsQuery,
} from '../../store/slices/productsApiSlice';
import {
    Loader2,
    ArrowLeft,
    Save,
    Package,
    Tag,
    DollarSign,
    Box,
    FileText,
    Image as ImageIcon
} from 'lucide-react';

const ProductEditPage = () => {
    const { id: productId } = useParams();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState(0);
    const [description, setDescription] = useState('');

    const {
        data: product,
        isLoading,
        refetch,
        error,
    } = useGetProductDetailsQuery(productId);

    const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image || product.images?.[0] || '');
            setCategory(product.category);
            setStock(product.stock);
            setDescription(product.description);
        }
    }, [product]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await updateProduct({
                productId,
                name,
                price,
                image,
                category,
                stock,
                description,
            }).unwrap();
            toast.success('Product updated successfully');
            refetch();
            navigate('/admin/productlist');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 bg-slate-950">
                <Loader2 className="animate-spin text-primary-500" size={48} />
                <p className="text-slate-400 font-medium">Loading product data...</p>
            </div>
        );
    }

    return (
        <div className="bg-slate-950 min-h-[calc(100vh-120px)] py-8 px-4 font-sans text-slate-200">
            <div className="max-w-4xl mx-auto">
                <Link to="/admin/productlist" className="inline-flex items-center gap-2 text-slate-400 font-bold hover:text-white transition-colors mb-6">
                    <ArrowLeft size={16} />
                    Back to Inventory
                </Link>

                <div className="bg-slate-900 border border-slate-800 rounded-md shadow-sm overflow-hidden">
                    <div className="p-8 md:p-10">
                        <div className="space-y-1 mb-10">
                            <h1 className="text-2xl font-bold text-white tracking-tight">Edit Product</h1>
                            <p className="text-slate-400 text-sm">Update the details of your product offering</p>
                        </div>

                        <form onSubmit={submitHandler} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Left Side: General Info */}
                                <div className="space-y-5">
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Product Name</label>
                                        <div className="relative group">
                                            <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#2874f0] transition-colors" size={18} />
                                            <input
                                                type="text"
                                                placeholder="Product Name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full bg-slate-950 border border-slate-800 rounded py-3 px-11 focus:border-[#2874f0] focus:ring-1 focus:ring-[#2874f0]/50 transition-all outline-none font-medium text-white placeholder-slate-600 block"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Category</label>
                                        <div className="relative group">
                                            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#2874f0] transition-colors" size={18} />
                                            <input
                                                type="text"
                                                placeholder="Category"
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                                className="w-full bg-slate-950 border border-slate-800 rounded py-3 px-11 focus:border-[#2874f0] focus:ring-1 focus:ring-[#2874f0]/50 transition-all outline-none font-medium text-white placeholder-slate-600 block"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Price (₹)</label>
                                            <div className="relative group">
                                                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#2874f0] transition-colors" size={16} />
                                                <input
                                                    type="number"
                                                    placeholder="999.99"
                                                    value={price}
                                                    onChange={(e) => setPrice(e.target.value)}
                                                    className="w-full bg-slate-950 border border-slate-800 rounded py-3 px-10 focus:border-[#2874f0] focus:ring-1 focus:ring-[#2874f0]/50 transition-all outline-none font-medium text-white placeholder-slate-600 block"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Stock</label>
                                            <div className="relative group">
                                                <Box className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#2874f0] transition-colors" size={16} />
                                                <input
                                                    type="number"
                                                    placeholder="50"
                                                    value={stock}
                                                    onChange={(e) => setStock(e.target.value)}
                                                    className="w-full bg-slate-950 border border-slate-800 rounded py-3 px-10 focus:border-[#2874f0] focus:ring-1 focus:ring-[#2874f0]/50 transition-all outline-none font-medium text-white placeholder-slate-600 block"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side: Media & Description */}
                                <div className="space-y-5">
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Image URL</label>
                                        <div className="relative group">
                                            <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#2874f0] transition-colors" size={18} />
                                            <input
                                                type="text"
                                                placeholder="/images/product.jpg"
                                                value={image}
                                                onChange={(e) => setImage(e.target.value)}
                                                className="w-full bg-slate-950 border border-slate-800 rounded py-3 px-11 focus:border-[#2874f0] focus:ring-1 focus:ring-[#2874f0]/50 transition-all outline-none font-medium text-white placeholder-slate-600 block"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Description</label>
                                        <div className="relative group flex-grow">
                                            <FileText className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-[#2874f0] transition-colors" size={18} />
                                            <textarea
                                                placeholder="Describe the features..."
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                className="w-full bg-slate-950 border border-slate-800 rounded py-3 px-11 min-h-[120px] focus:border-[#2874f0] focus:ring-1 focus:ring-[#2874f0]/50 transition-all outline-none font-medium text-white placeholder-slate-600 resize-none block"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-800 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={loadingUpdate}
                                    className="bg-[#2874f0] text-white px-8 py-3 rounded font-bold text-sm hover:bg-[#1a5bce] active:scale-[0.98] transition-all flex items-center gap-2 shadow-sm disabled:opacity-50"
                                >
                                    {loadingUpdate ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                                    SAVE SETTINGS
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductEditPage;
