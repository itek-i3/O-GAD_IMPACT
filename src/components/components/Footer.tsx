import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-950 text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-white/[0.07]">

                    {/* Brand */}
                    <div className="space-y-5 md:col-span-1">
                        <div className="flex items-center gap-2.5">
                            <Image
                                src="/images/toig-logo.png"
                                alt="O'Gad Impact Group"
                                width={32}
                                height={32}
                                className="w-8 h-8 rounded-lg flex-shrink-0"
                                unoptimized
                            />
                            <span className="text-[13px] font-bold text-white" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                                THE O'GAD <span className="font-light opacity-70">IMPACT GROUP</span>
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                            A business infrastructure company building the systems, capabilities, and platforms that enable African businesses to start, operate, scale, and compete globally.
                        </p>
                        <div className="flex gap-2">
                            {[
                                { Icon: FaFacebookF, href: '#' },
                                { Icon: FaTwitter, href: '#' },
                                { Icon: FaLinkedinIn, href: '#' },
                                { Icon: FaInstagram, href: '#' },
                            ].map(({ Icon, href }, idx) => (
                                <Link
                                    key={idx}
                                    href={href}
                                    className="w-8 h-8 border border-white/[0.1] rounded-lg flex items-center justify-center text-gray-500 hover:text-white hover:border-white/30 transition-all"
                                >
                                    <Icon size={12} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Agencies */}
                    <div>
                        <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/50 mb-5" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                            Our Agencies
                        </h3>
                        <ul className="space-y-3">
                            {[
                                { label: 'I3 Plus', href: '/agencies/i3-plus-marketing' },
                                { label: 'I3X Africa', href: '/agencies/i3x-events' },
                                { label: 'I3 Launchpad', href: '/agencies/i3-launchpad' },
                                { label: 'iTek', href: '/agencies/itek' },
                                { label: 'I3 Studios', href: '/agencies/i3-studios' },
                                { label: 'Impact360', href: '/agencies/impact360' },
                            ].map((item, idx) => (
                                <li key={idx}>
                                    <Link href={item.href} className="text-sm text-gray-400 hover:text-white transition-colors" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/50 mb-5" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                            Company
                        </h3>
                        <ul className="space-y-3">
                            {[
                                { label: 'About Us', href: '/#our-company' },
                                { label: 'Our Programs', href: '/programs' },
                                { label: 'Case Studies', href: '#' },
                                { label: 'Blog', href: '#' },
                                { label: 'Careers', href: '#' },
                                { label: 'Contact', href: '/#get-in-touch' },
                            ].map((item, idx) => (
                                <li key={idx}>
                                    <Link href={item.href} className="text-sm text-gray-400 hover:text-white transition-colors" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/50 mb-5" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                            Legal
                        </h3>
                        <ul className="space-y-3">
                            {[
                                { label: 'Privacy Policy', href: '#' },
                                { label: 'Terms of Service', href: '#' },
                                { label: 'Cookie Policy', href: '#' },
                                { label: 'Disclaimer', href: '#' },
                                { label: 'Refund Policy', href: '#' },
                            ].map((item, idx) => (
                                <li key={idx}>
                                    <Link href={item.href} className="text-sm text-gray-400 hover:text-white transition-colors" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-[11px] text-gray-600 uppercase tracking-widest" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                        © {new Date().getFullYear()} The O'GAD Impact Group. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        {['Privacy', 'Terms', 'Sitemap'].map((item, idx) => (
                            <Link key={idx} href="#" className="text-[11px] text-gray-600 hover:text-white uppercase tracking-widest transition-colors" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
