import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../store/slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';
import { CreditCard, Wallet } from 'lucide-react';

const PaymentPage = () => {
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate]);

    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    };

    return (
        <div className="bg-[#f1f3f6] min-h-[calc(100vh-120px)] py-8 px-4 text-[14px]">
            <div className="max-w-[800px] mx-auto">
                <CheckoutSteps step1 step2 step3 />

                <div className="bg-white shadow-sm border border-slate-200 mt-4 overflow-hidden">
                    <div className="bg-[#2874f0] px-6 py-4 text-white font-bold text-lg flex items-center gap-4">
                        <span className="bg-white text-[#2874f0] w-6 h-6 rounded-sm flex items-center justify-center text-sm">3</span>
                        PAYMENT OPTIONS
                    </div>

                    <div className="p-0">
                        <form onSubmit={submitHandler}>

                            {/* Option 1: PayPal */}
                            <label className={`block border-b border-slate-200 cursor-pointer transition-colors ${paymentMethod === 'PayPal' ? 'bg-blue-50/30' : 'hover:bg-slate-50'}`}>
                                <div className="flex items-center gap-4 p-6">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="PayPal"
                                        checked={paymentMethod === 'PayPal'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="w-4 h-4 text-[#2874f0] focus:ring-[#2874f0] cursor-pointer"
                                    />
                                    <div className="flex items-center gap-3">
                                        <Wallet className="text-[#2874f0]" size={20} />
                                        <span className="font-bold text-slate-800">PayPal or Credit Card</span>
                                    </div>
                                </div>
                                {paymentMethod === 'PayPal' && (
                                    <div className="px-6 pb-6 pt-2 pl-12 flex justify-start">
                                        <button
                                            type="submit"
                                            className="bg-[#fb641b] text-white px-10 py-3.5 rounded-sm font-bold shadow-sm hover:bg-[#eb5b14]"
                                        >
                                            CONTINUE
                                        </button>
                                    </div>
                                )}
                            </label>

                            {/* Option 2: Stripe (Disabled) */}
                            <label className="block border-b border-slate-200 cursor-not-allowed opacity-50 bg-slate-50">
                                <div className="flex items-center gap-4 p-6">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="Stripe"
                                        disabled
                                        className="w-4 h-4 text-slate-400 cursor-not-allowed"
                                    />
                                    <div className="flex items-center gap-3">
                                        <CreditCard className="text-slate-400" size={20} />
                                        <span className="font-bold text-slate-800">Credit / Debit / ATM Card (Stripe - Coming Soon)</span>
                                    </div>
                                </div>
                            </label>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
