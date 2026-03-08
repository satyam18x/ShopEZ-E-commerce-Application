import { useGetProductsQuery, useDeleteProductMutation, useCreateProductMutation } from '../../store/slices/productsApiSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    Loader2,
    AlertCircle,
    Plus,
    Trash2,
    Edit,
    PackageSearch,
} from 'lucide-react';

const ProductListPage = () => {
    const { data, isLoading, error, refetch } = useGetProductsQuery();

    const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();
    const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to remove this product?')) {
            try {
                await deleteProduct(id);
                refetch();
                toast.success('Product removed successfully');
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    const createProductHandler = async () => {
        if (window.confirm('Create a new sample product?')) {
            try {
                await createProduct();
                refetch();
                toast.success('Sample product created. Time to edit!');
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 bg-slate-950">
                <Loader2 className="animate-spin text-primary-500" size={48} />
                <p className="text-slate-400 font-medium">Loading catalog...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[calc(100vh-120px)] bg-slate-950 px-6 py-12 text-center flex items-center justify-center">
                <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-12 max-w-xl mx-auto">
                    <AlertCircle className="text-red-400 mx-auto mb-4" size={48} />
                    <h2 className="text-2xl font-black text-white mb-2">Failed to load catalog</h2>
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
                            <PackageSearch className="text-[#2874f0]" size={28} />
                            Inventory Control
                        </h1>
                        <p className="text-slate-400 text-sm">Manage your product offerings</p>
                    </div>

                    <button
                        onClick={createProductHandler}
                        className="flex items-center gap-2 bg-[#2874f0] text-white px-6 py-2.5 rounded-sm font-bold text-sm hover:bg-[#1a5bce] transition-colors shadow-sm disabled:opacity-50"
                        disabled={loadingCreate}
                    >
                        {loadingCreate ? <Loader2 className="animate-spin" size={18} /> : (
                            <>
                                <Plus size={18} />
                                NEW PRODUCT
                            </>
                        )}
                    </button>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-md shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="bg-slate-950 border-b border-slate-800 text-slate-400">
                                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Product</th>
                                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Category</th>
                                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Price</th>
                                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Stock</th>
                                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/50">
                                {data.products.map((product) => (
                                    <tr key={product._id} className="hover:bg-slate-800/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-white rounded p-1 flex items-center justify-center shrink-0">
                                                    {product.images?.[0] ? (
                                                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain" />
                                                    ) : (
                                                        <div className="text-slate-400 text-xs text-center leading-none">No<br />Img</div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-200 line-clamp-1">{product.name}</p>
                                                    <p className="text-xs text-slate-500 font-mono">ID: {product._id.slice(-6).toUpperCase()}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-[11px] font-bold text-slate-300 uppercase bg-slate-800 border border-slate-700 px-2 py-1 rounded">{product.category}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-bold text-white">₹{(product.storePrices?.[0]?.price || 0).toLocaleString('en-IN')}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.stock > 0 ? (
                                                <span className="inline-flex items-center px-2 py-1 rounded bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-bold">
                                                    {product.stock} LEFT
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-bold">
                                                    OUT OF STOCK
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    to={`/admin/product/${product._id}/edit`}
                                                    className="p-2 bg-slate-800 text-slate-300 rounded hover:bg-[#2874f0] hover:text-white transition-colors border border-transparent hover:border-[#2874f0]/50"
                                                >
                                                    <Edit size={16} />
                                                </Link>
                                                <button
                                                    disabled={loadingDelete}
                                                    onClick={() => deleteHandler(product._id)}
                                                    className="p-2 bg-slate-800 text-slate-300 rounded hover:bg-red-500 hover:text-white transition-colors disabled:opacity-50 border border-transparent hover:border-red-500/50"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
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

export default ProductListPage;
