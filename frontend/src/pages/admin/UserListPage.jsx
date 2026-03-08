import { useGetUsersQuery, useDeleteUserMutation } from '../../store/slices/usersApiSlice';
import { toast } from 'react-toastify';
import {
    Loader2,
    AlertCircle,
    Trash2,
    UserRoundCheck,
    ShieldCheck,
    User,
    CheckCircle2,
    XCircle
} from 'lucide-react';

const UserListPage = () => {
    const { data: users, refetch, isLoading, error } = useGetUsersQuery();
    const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

    const deleteHandler = async (id) => {
        if (window.confirm('Delete this user account? This action is irreversible.')) {
            try {
                await deleteUser(id);
                refetch();
                toast.success('User removed from platform');
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 bg-slate-950">
                <Loader2 className="animate-spin text-primary-500" size={48} />
                <p className="text-slate-400 font-medium">Syncing user database...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[calc(100vh-120px)] bg-slate-950 px-6 py-12 text-center flex items-center justify-center">
                <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-12 max-w-xl mx-auto">
                    <AlertCircle className="text-red-400 mx-auto mb-4" size={48} />
                    <h2 className="text-2xl font-black text-white mb-2">Failed to load users</h2>
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
                            <UserRoundCheck className="text-[#2874f0]" size={28} />
                            User Authority
                        </h1>
                        <p className="text-slate-400 text-sm">Manage platform access and permissions</p>
                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-md shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="bg-slate-950 border-b border-slate-800 text-slate-400">
                                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">User</th>
                                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Email</th>
                                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs text-center">Admin</th>
                                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/50">
                                {users.map((user) => (
                                    <tr key={user._id} className="hover:bg-slate-800/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-8 h-8 rounded flex items-center justify-center font-bold text-xs ${user.isAdmin ? 'bg-[#2874f0] text-white' : 'bg-slate-800 text-slate-400'}`}>
                                                    {user.isAdmin ? <ShieldCheck size={16} /> : <User size={16} />}
                                                </div>
                                                <span className="font-bold text-slate-200">{user.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-slate-300">{user.email}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {user.isAdmin ? (
                                                <CheckCircle2 className="text-green-500 mx-auto" size={18} />
                                            ) : (
                                                <XCircle className="text-slate-600 mx-auto" size={18} />
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {!user.isAdmin && (
                                                <button
                                                    disabled={loadingDelete}
                                                    onClick={() => deleteHandler(user._id)}
                                                    className="p-2 bg-slate-800 text-slate-300 rounded hover:bg-red-500 hover:text-white transition-colors disabled:opacity-50 border border-transparent hover:border-red-500/50"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
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

export default UserListPage;
