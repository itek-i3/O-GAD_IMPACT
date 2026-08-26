'use client';

import { useState, useEffect, useRef } from "react";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from '@/lib/supabaseClient';
import { checkIsAdmin } from '@/lib/checkAdmin';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeHash, setActiveHash] = useState("");
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname() || "";
    const router = useRouter();
    const isNavigating = useRef(false);
    const servicesCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setIsAdmin(false);
        router.push('/');
        router.refresh();
    };

    const openServices = () => {
        if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current);
        setIsServicesOpen(true);
    };
    const closeServices = () => {
        servicesCloseTimer.current = setTimeout(() => setIsServicesOpen(false), 200);
    };

    useEffect(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
    }, []);

    useEffect(() => {
        const initialHash = window.location.hash || "#hero";
        setActiveHash(initialHash);

        const handleHashChange = () => {
            const newHash = window.location.hash;
            setActiveHash(newHash);
            isNavigating.current = true;
            setTimeout(() => { isNavigating.current = false; }, 1000);
        };

        window.addEventListener('hashchange', handleHashChange);

        const observerOptions = { root: null, rootMargin: '0px 0px -66% 0px', threshold: 0 };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            if (isNavigating.current) return;
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    if (id === 'hero' || id === 'our-company' || id === 'get-in-touch') {
                        setActiveHash(`#${id}`);
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        const hero = document.getElementById('hero');
        const about = document.getElementById('our-company');
        const contact = document.getElementById('get-in-touch');
        if (hero) observer.observe(hero);
        if (about) observer.observe(about);
        if (contact) observer.observe(contact);

        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            if (user) {
                const adminStatus = await checkIsAdmin(user.id);
                setIsAdmin(adminStatus);
            } else {
                setIsAdmin(false);
            }
        };
        checkUser();

        const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
            const currentUser = session?.user ?? null;
            setUser(currentUser);
            if (currentUser) {
                const adminStatus = await checkIsAdmin(currentUser.id);
                setIsAdmin(adminStatus);
            } else {
                setIsAdmin(false);
            }
        });

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
            observer.disconnect();
            authListener.subscription.unsubscribe();
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: "/#hero", label: "Home" },
        { href: "/#our-company", label: "About" },
        { href: "/agencies", label: "Agencies", isDropdown: true },
        { href: "/members", label: "Directors" },
        { href: "/#get-in-touch", label: "Contact" }
    ];

    const services = [
        { title: 'I3 Plus', href: '/agencies/i3-plus-marketing' },
        { title: 'I3X Africa', href: '/agencies/i3x-events' },
        { title: 'I3 Launchpad', href: '/agencies/i3-launchpad' },
        { title: 'iTek', href: '/agencies/itek' },
        { title: 'I3 Studios', href: '/agencies/i3-studios' },
        { title: 'Impact360', href: '/agencies/impact360' }
    ];

    const handleNavClick = (href: string) => {
        if (href.startsWith("/#")) {
            const sectionId = href.slice(2);
            const hashValue = `#${sectionId}`;
            if (pathname !== "/") { window.location.href = href; return; }
            isNavigating.current = true;
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                window.location.hash = hashValue;
                setActiveHash(hashValue);
            }
            setTimeout(() => { isNavigating.current = false; }, 1000);
        }
    };

    const isActive = (href: string) => {
        if (href.startsWith("/#")) {
            const targetHash = href.slice(1);
            if (targetHash === "#hero") return pathname === "/" && (activeHash === "" || activeHash === "#hero");
            return pathname === "/" && activeHash === targetHash;
        }
        if (href === "/agencies") return pathname.startsWith("/agencies");
        return pathname === href;
    };

    const showNavbarBg = () => {
        if (pathname === "/" && (activeHash === "" || activeHash === "#hero")) return false;
        if ((pathname === "/dashboard" || pathname === "/admin/dashboard") && !scrolled) return false;
        return true;
    };

    const onHero = !showNavbarBg();

    return (
        <nav className="fixed top-0 left-0 right-0 w-full z-50 px-4 md:px-6 pt-4">
            <div
                className={`max-w-7xl mx-auto transition-all duration-500 rounded-2xl ${
                    onHero
                        ? 'bg-white/[0.06] backdrop-blur-md border border-white/[0.12]'
                        : 'bg-gray-950/95 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_40px_rgba(0,0,0,0.5)]'
                }`}
            >
                <div className="flex justify-between items-center h-14 px-5">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
                        <Image
                            src="/images/toig-logo.png"
                            alt="O'Gad Impact Group"
                            width={32}
                            height={32}
                            className="w-8 h-8 rounded-lg flex-shrink-0"
                            unoptimized
                        />
                        <span className="text-[14px] font-bold text-white tracking-tight" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                            THE O'GAD <span className="font-light opacity-80">IMPACT GROUP</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                        {navLinks.map((link) =>
                            link.isDropdown ? (
                                <div key={link.href} className="relative" onMouseEnter={openServices} onMouseLeave={closeServices}>
                                    <Link
                                        href={link.href}
                                        className={`px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all flex items-center gap-1.5 ${
                                            pathname.startsWith('/agencies')
                                                ? 'text-white bg-white/10'
                                                : 'text-white/60 hover:text-white hover:bg-white/[0.07]'
                                        }`}
                                    >
                                        {link.label}
                                        <svg
                                            className={`w-3 h-3 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`}
                                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </Link>

                                    {isServicesOpen && (
                                        <div
                                            className="absolute top-full left-0 mt-2 bg-gray-950 border border-white/[0.08] rounded-xl shadow-[0_16px_48px_rgba(0,0,0,0.6)] min-w-max py-1.5 z-50"
                                        >
                                            {services.map((service, idx) => (
                                                <Link
                                                    key={idx}
                                                    href={service.href}
                                                    className="flex items-center px-4 py-2.5 text-white/60 hover:text-white hover:bg-white/[0.05] transition-colors text-[13px]"
                                                    onClick={() => setIsServicesOpen(false)}
                                                >
                                                    {service.title}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : link.href.startsWith("/#") ? (
                                <button
                                    key={link.href}
                                    onClick={() => handleNavClick(link.href)}
                                    className={`px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all ${
                                        isActive(link.href)
                                            ? 'text-white bg-white/10'
                                            : 'text-white/60 hover:text-white hover:bg-white/[0.07]'
                                    }`}
                                >
                                    {link.label}
                                </button>
                            ) : (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all ${
                                        isActive(link.href)
                                            ? 'text-white bg-white/10'
                                            : 'text-white/60 hover:text-white hover:bg-white/[0.07]'
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            )
                        )}
                    </div>

                    {/* CTA + Mobile Toggle */}
                    <div className="flex items-center gap-2">
                        {isAdmin && (
                            <div className="hidden md:flex items-center gap-2">
                                <Link
                                    href="/admin/dashboard"
                                    className="text-white px-4 py-2 rounded-lg text-[13px] font-semibold transition-all hover:opacity-90"
                                    style={{ backgroundColor: '#306CEC' }}
                                >
                                    Admin Portal
                                </Link>
                                <button
                                    onClick={handleSignOut}
                                    className="flex items-center gap-1.5 text-white/70 hover:text-white text-[13px] font-semibold px-3.5 py-2 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                                    </svg>
                                    Sign Out
                                </button>
                            </div>
                        )}

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
                            aria-label="Toggle menu"
                        >
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden border-t border-white/[0.08] py-3 px-2 space-y-0.5" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                        {navLinks.map((link) =>
                            link.isDropdown ? (
                                <div key={link.href}>
                                    <button
                                        onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                                        className="flex w-full items-center justify-between px-3 py-2.5 text-[13px] font-medium rounded-lg text-white/60 hover:text-white hover:bg-white/[0.07] transition-colors"
                                    >
                                        {link.label}
                                        <svg
                                            className={`w-3.5 h-3.5 transition-transform duration-200 ${isMobileServicesOpen ? 'rotate-180' : ''}`}
                                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    {isMobileServicesOpen && (
                                        <div className="ml-3 mt-0.5 mb-1 space-y-0.5 border-l border-white/[0.08] pl-3">
                                            {services.map((service, idx) => (
                                                <Link
                                                    key={idx}
                                                    href={service.href}
                                                    className="flex items-center gap-2 py-2 px-2 text-white/50 hover:text-white text-[13px] transition-colors rounded-lg hover:bg-white/[0.05]"
                                                    onClick={() => { setIsOpen(false); setIsMobileServicesOpen(false); }}
                                                >
                                                    {service.title}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : link.href.startsWith("/#") ? (
                                <button
                                    key={link.href}
                                    onClick={() => { handleNavClick(link.href); setIsOpen(false); }}
                                    className={`flex w-full items-center px-3 py-2.5 text-[13px] font-medium rounded-lg transition-colors ${
                                        isActive(link.href)
                                            ? 'text-white bg-white/10'
                                            : 'text-white/60 hover:text-white hover:bg-white/[0.07]'
                                    }`}
                                >
                                    {link.label}
                                </button>
                            ) : (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex px-3 py-2.5 text-[13px] font-medium rounded-lg transition-colors ${
                                        isActive(link.href)
                                            ? 'text-white bg-white/10'
                                            : 'text-white/60 hover:text-white hover:bg-white/[0.07]'
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            )
                        )}
                        {isAdmin && (
                            <div className="pt-3 mt-1 border-t border-white/[0.08] space-y-2 px-1 pb-1">
                                <Link
                                    href="/admin/dashboard"
                                    onClick={() => setIsOpen(false)}
                                    className="flex justify-center w-full text-white px-5 py-2.5 rounded-xl text-[13px] font-semibold"
                                    style={{ backgroundColor: '#306CEC' }}
                                >
                                    Admin Portal
                                </Link>
                                <button
                                    onClick={() => { handleSignOut(); setIsOpen(false); }}
                                    className="flex items-center justify-center gap-2 w-full text-white/60 hover:text-white px-5 py-2.5 rounded-xl text-[13px] font-semibold border border-white/[0.12] transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                                    </svg>
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}
