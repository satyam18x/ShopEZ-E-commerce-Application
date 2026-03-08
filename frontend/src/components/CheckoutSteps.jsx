import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    const steps = [
        { label: 'Login', active: step1, link: '/login' },
        { label: 'Delivery Address', active: step2, link: '/shipping' },
        { label: 'Payment Options', active: step3, link: '/payment' },
        { label: 'Order Summary', active: step4, link: '/placeorder' },
    ];

    return (
        <div className="flex items-center w-full mb-6 mt-2 relative">
            {/* Background Line */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-300 -z-10"></div>

            <div className="flex justify-between w-full relative z-10">
                {steps.map((step, index) => (
                    <div key={index} className="flex flex-col items-center gap-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${step.active ? 'bg-[#2874f0] text-white ring-4 ring-[#2874f0]/20' : 'bg-slate-300 text-slate-500'}`}>
                            {index + 1}
                        </div>
                        <Link
                            to={step.active ? step.link : '#'}
                            className={`text-[12px] font-bold uppercase tracking-wider ${step.active ? 'text-[#2874f0]' : 'text-slate-500 hidden md:block'}`}
                        >
                            {step.label}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CheckoutSteps;
