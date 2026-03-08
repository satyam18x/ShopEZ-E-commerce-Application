import { ArrowRight, Zap } from 'lucide-react';

const Hero = () => {
    return (
        <section className="mb-4">
            <div className="bg-gradient-to-r from-blue-700 via-primary-600 to-indigo-800 text-white overflow-hidden relative">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
                    <div className="absolute top-[-50%] right-[-10%] w-[80%] h-[200%] bg-white transform rotate-12 blur-3xl"></div>
                </div>

                <div className="max-w-[1248px] mx-auto px-4 py-8 md:py-16 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="md:w-1/2 space-y-6">
                        <div className="inline-flex items-center gap-2 bg-yellow-400 text-slate-900 px-3 py-1 rounded-sm shadow-sm">
                            <Zap size={16} className="fill-current" />
                            <span className="text-sm font-bold uppercase tracking-wider">Super Sale Live</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black leading-tight italic tracking-tight">
                            The Big <br className="hidden md:block" />
                            <span className="text-yellow-400">Shopping</span> Festival
                        </h1>

                        <p className="text-lg md:text-xl text-blue-100 font-medium max-w-lg">
                            Get up to 80% off on top brands. Electronics, Fashion, Home & more.
                        </p>

                        <div className="pt-4">
                            <button className="flex items-center gap-2 px-8 py-3.5 bg-yellow-400 text-slate-900 rounded-sm font-bold shadow-md hover:bg-yellow-500 transition-colors">
                                <span>Shop Now</span>
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="md:w-1/2 flex justify-center md:justify-end relative">
                        {/* Sample Product Collage for Banner */}
                        <div className="relative w-full max-w-md h-64 md:h-80 flex items-center justify-center">
                            <div className="absolute top-4 right-0 w-32 h-32 bg-white rounded-sm p-2 shadow-2xl transform rotate-6 z-10 hover:rotate-12 transition-transform cursor-pointer">
                                <img src="/images/macbook.jpg" alt="Laptop" className="w-full h-full object-contain" />
                                <div className="absolute -top-3 -right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">-30%</div>
                            </div>
                            <div className="absolute bottom-0 left-4 w-40 h-40 bg-white rounded-sm p-3 shadow-2xl transform -rotate-6 z-20 hover:-rotate-12 transition-transform cursor-pointer">
                                <img src="/images/skincare.jpg" alt="Serum" className="w-full h-full object-contain" />
                                <div className="absolute -bottom-3 -left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">-45%</div>
                            </div>
                            <div className="absolute -top-4 left-12 w-24 h-24 bg-white rounded-sm p-2 shadow-lg transform -rotate-12 z-0 opacity-80 border border-slate-200">
                                <div className="w-full h-full bg-slate-100 flex items-center justify-center text-3xl">🎧</div>
                            </div>

                            {/* Central Callout */}
                            <div className="absolute inset-0 m-auto w-24 h-24 bg-yellow-400 rounded-full flex flex-col items-center justify-center shadow-xl border-4 border-white z-30 animate-pulse">
                                <span className="text-[10px] font-bold text-slate-800 uppercase">Min</span>
                                <span className="text-2xl font-black text-slate-900">50%</span>
                                <span className="text-[10px] font-bold text-slate-800 uppercase">Off</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Links Strip */}
            <div className="bg-white border-b border-slate-200 shadow-sm">
                <div className="max-w-[1248px] mx-auto px-4 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['Top Offers', 'Mobiles & Tablets', 'Electronics', 'TVs & Appliances'].map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center justify-center p-2 cursor-pointer group">
                            <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-2 group-hover:bg-primary-100 transition-colors">
                                <span className="text-xl">{['🔥', '📱', '💻', '📺'][idx]}</span>
                            </div>
                            <span className="text-[13px] font-bold text-slate-800 text-center">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;
