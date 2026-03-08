import { Package, ShieldCheck, HelpCircle, Gift, Facebook, Twitter, Instagram, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-white pt-12 text-[13px]">
            <div className="max-w-[1248px] mx-auto px-4 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-700">

                {/* Column 1 */}
                <div>
                    <h4 className="text-slate-400 font-bold uppercase mb-4 tracking-wider">About</h4>
                    <ul className="space-y-2">
                        <li><Link to="#" className="hover:underline">Contact Us</Link></li>
                        <li><Link to="#" className="hover:underline">About Us</Link></li>
                        <li><Link to="#" className="hover:underline">Careers</Link></li>
                        <li><Link to="#" className="hover:underline">ShopEZ Stories</Link></li>
                        <li><Link to="#" className="hover:underline">Press</Link></li>
                    </ul>
                </div>

                {/* Column 2 */}
                <div>
                    <h4 className="text-slate-400 font-bold uppercase mb-4 tracking-wider">Help</h4>
                    <ul className="space-y-2">
                        <li><Link to="#" className="hover:underline">Payments</Link></li>
                        <li><Link to="#" className="hover:underline">Shipping</Link></li>
                        <li><Link to="#" className="hover:underline">Cancellation & Returns</Link></li>
                        <li><Link to="#" className="hover:underline">FAQ</Link></li>
                        <li><Link to="#" className="hover:underline">Report Infringement</Link></li>
                    </ul>
                </div>

                {/* Column 3 */}
                <div>
                    <h4 className="text-slate-400 font-bold uppercase mb-4 tracking-wider">Consumer Policy</h4>
                    <ul className="space-y-2">
                        <li><Link to="#" className="hover:underline">Cancellation & Returns</Link></li>
                        <li><Link to="#" className="hover:underline">Terms Of Use</Link></li>
                        <li><Link to="#" className="hover:underline">Security</Link></li>
                        <li><Link to="#" className="hover:underline">Privacy</Link></li>
                        <li><Link to="#" className="hover:underline">Sitemap</Link></li>
                    </ul>
                </div>

                {/* Column 4 */}
                <div className="lg:border-l lg:border-slate-700 lg:pl-8">
                    <h4 className="text-slate-400 font-bold uppercase mb-4 tracking-wider">Mail Us:</h4>
                    <p className="space-y-1 text-slate-300">
                        ShopEZ Internet Private Limited, <br />
                        Buildings Alyssa, Begonia & <br />
                        Clove Embassy Tech Village, <br />
                        Outer Ring Road, Devarabeesanahalli Village, <br />
                        Bengaluru, 560103, <br />
                        Karnataka, India
                    </p>
                </div>

                {/* Column 5 */}
                <div>
                    <h4 className="text-slate-400 font-bold uppercase mb-4 tracking-wider">Registered Office Address:</h4>
                    <p className="space-y-1 text-slate-300">
                        ShopEZ Internet Private Limited, <br />
                        Buildings Alyssa, Begonia & <br />
                        Clove Embassy Tech Village, <br />
                        Outer Ring Road, Devarabeesanahalli Village, <br />
                        Bengaluru, 560103, <br />
                        Karnataka, India <br />
                        CIN : U51109KA2012PTC066107 <br />
                        Telephone: <span className="text-primary-400">044-45614700</span>
                    </p>
                    <div className="flex gap-4 mt-4">
                        <Link to="#" className="text-slate-300 hover:text-white"><Facebook size={18} /></Link>
                        <Link to="#" className="text-slate-300 hover:text-white"><Twitter size={18} /></Link>
                        <Link to="#" className="text-slate-300 hover:text-white"><Instagram size={18} /></Link>
                    </div>
                </div>

            </div>

            {/* Bottom Strip */}
            <div className="max-w-[1248px] mx-auto px-4 py-6 flex flex-wrap items-center justify-between gap-6 text-slate-300 text-[13px]">
                <div className="flex items-center gap-2 hover:text-white cursor-pointer">
                    <Package className="text-yellow-400" size={16} />
                    <span>Become a Seller</span>
                </div>
                <div className="flex items-center gap-2 hover:text-white cursor-pointer">
                    <Star className="text-yellow-400" size={16} />
                    <span>Advertise</span>
                </div>
                <div className="flex items-center gap-2 hover:text-white cursor-pointer">
                    <Gift className="text-yellow-400" size={16} />
                    <span>Gift Cards</span>
                </div>
                <div className="flex items-center gap-2 hover:text-white cursor-pointer">
                    <HelpCircle className="text-yellow-400" size={16} />
                    <span>Help Center</span>
                </div>
                <div>
                    &copy; 2007-{new Date().getFullYear()} ShopEZ.com
                </div>
                <div className="flex gap-2">
                    <img src="/images/payment-icons.png" alt="Payment Methods" className="h-5 opacity-80" onError={(e) => e.target.style.display = 'none'} />
                    <span className="font-bold flex items-center gap-1"><ShieldCheck size={16} className="text-green-400" /> 100% Secure Payments</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
