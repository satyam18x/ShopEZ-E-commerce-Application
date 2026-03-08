import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../store/slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingPage = () => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        navigate('/payment');
    };

    return (
        <div className="bg-[#f1f3f6] min-h-[calc(100vh-120px)] py-8 px-4 text-[14px]">
            <div className="max-w-[800px] mx-auto">
                <CheckoutSteps step1 step2 />

                <div className="bg-white shadow-sm border border-slate-200 mt-4 overflow-hidden">
                    <div className="bg-[#2874f0] px-6 py-4 text-white font-bold text-lg flex items-center gap-4">
                        <span className="bg-white text-[#2874f0] w-6 h-6 rounded-sm flex items-center justify-center text-sm">2</span>
                        DELIVERY ADDRESS
                    </div>

                    <div className="p-6 md:p-8">
                        <form onSubmit={submitHandler} className="space-y-6 max-w-xl">

                            <div className="relative">
                                <input
                                    type="text"
                                    id="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="block px-2.5 pb-2.5 pt-6 w-full text-sm text-slate-900 bg-transparent border border-slate-300 rounded-sm appearance-none focus:outline-none focus:ring-0 focus:border-[#2874f0] peer transition-colors"
                                    placeholder=" "
                                    required
                                />
                                <label
                                    htmlFor="address"
                                    className="absolute text-sm text-slate-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-[#2874f0] px-2.5 bg-white peer-focus:bg-white left-1"
                                >
                                    Street Address
                                </label>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="city"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        className="block px-2.5 pb-2.5 pt-6 w-full text-sm text-slate-900 bg-transparent border border-slate-300 rounded-sm appearance-none focus:outline-none focus:ring-0 focus:border-[#2874f0] peer transition-colors"
                                        placeholder=" "
                                        required
                                    />
                                    <label
                                        htmlFor="city"
                                        className="absolute text-sm text-slate-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-[#2874f0] px-2.5 bg-white peer-focus:bg-white left-1"
                                    >
                                        City
                                    </label>
                                </div>

                                <div className="relative">
                                    <input
                                        type="text"
                                        id="postalCode"
                                        value={postalCode}
                                        onChange={(e) => setPostalCode(e.target.value)}
                                        className="block px-2.5 pb-2.5 pt-6 w-full text-sm text-slate-900 bg-transparent border border-slate-300 rounded-sm appearance-none focus:outline-none focus:ring-0 focus:border-[#2874f0] peer transition-colors"
                                        placeholder=" "
                                        required
                                    />
                                    <label
                                        htmlFor="postalCode"
                                        className="absolute text-sm text-slate-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-[#2874f0] px-2.5 bg-white peer-focus:bg-white left-1"
                                    >
                                        Postal Code
                                    </label>
                                </div>
                            </div>

                            <div className="relative">
                                <input
                                    type="text"
                                    id="country"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    className="block px-2.5 pb-2.5 pt-6 w-full text-sm text-slate-900 bg-transparent border border-slate-300 rounded-sm appearance-none focus:outline-none focus:ring-0 focus:border-[#2874f0] peer transition-colors"
                                    placeholder=" "
                                    required
                                />
                                <label
                                    htmlFor="country"
                                    className="absolute text-sm text-slate-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-[#2874f0] px-2.5 bg-white peer-focus:bg-white left-1"
                                >
                                    Country
                                </label>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="bg-[#fb641b] text-white px-10 py-3.5 rounded-sm font-bold shadow-sm hover:bg-[#eb5b14] w-full md:w-auto"
                                >
                                    DELIVER HERE
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShippingPage;
