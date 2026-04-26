'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface HeroSlide {
    id: number;
    title: string;
    subtitle: string;
    image: string;
    category: string;
    href: string;
    objectPosition?: string;
    objectFit?: 'cover' | 'contain';
}

export default function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlay, setIsAutoPlay] = useState(true);

    const slides: HeroSlide[] = [
        {
            id: 1,
            title: 'We champion the bold to achieve the extraordinary.',
            subtitle: 'Transforming ambition into tangible results through strategic consulting.',
            image: '/images/hero_images/DSC_2565.jpg',
            category: 'Business Strategy',
            href: '/services/business-strategy'
        },
        {
            id: 2,
            title: 'Building sustainable business growth across your organization.',
            subtitle: 'Creating future-ready organizations across Africa and beyond.',
            image: '/images/hero_images/DSC_2566.jpg',
            category: 'Scale & Growth',
            href: '/services/scaling'
        },
        {
            id: 3,
            title: 'From idea to execution with precision and excellence.',
            subtitle: 'Moving your vision from concept to market leadership.',
            image: '/images/hero_images/Consult1.jpg',
            category: 'Technology',
            href: '/services/technology'
        },
        {
            id: 4,
            title: 'Strategic growth for your business objectives and goals.',
            subtitle: 'Unlocking potential through innovative marketing strategies.',
            image: '/images/hero_images/Consult2.jpg',
            category: 'Marketing & Growth',
            href: '/services/marketing'
        },
        {
            id: 5,
            title: 'Legal expertise to guide your business forward.',
            subtitle: 'Navigating complex legal landscapes with strategic counsel.',
            image: '/images/hero_images/Consult3.jpg',
            category: 'Law',
            href: '/services/legal',
            objectFit: 'cover',
            objectPosition: '50% 40%'
        }
    ];

    useEffect(() => {
        if (!isAutoPlay) return;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlay, slides.length]);

    const goToSlide = (index: number) => { setCurrentSlide(index); setIsAutoPlay(false); };
    const nextSlide = () => { setCurrentSlide((prev) => (prev + 1) % slides.length); setIsAutoPlay(false); };
    const prevSlide = () => { setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length); setIsAutoPlay(false); };

    return (
        <section id='hero' className='relative w-full overflow-hidden' style={{ height: '115vh' }}>

            {/* Background images — crossfade independently */}
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                >
                    <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className={`${slide.objectFit === 'contain' ? 'object-contain' : 'object-cover'} ${index === currentSlide ? 'animate-zoomIn' : ''}`}
                        style={{ objectPosition: slide.objectPosition ?? 'center' }}
                        priority={index === currentSlide}
                        unoptimized
                    />
                </div>
            ))}

            {/* Layered gradients for editorial look */}
            <div className='absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20 z-[1]' />
            <div className='absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent z-[1]' />

            {/* Decorative large slide number — re-mounts so it fades in on each change */}
            <div
                key={`num-${currentSlide}`}
                className='absolute right-0 bottom-0 z-[2] pointer-events-none select-none leading-none overflow-hidden'
                style={{
                    fontSize: 'clamp(140px, 22vw, 300px)',
                    fontFamily: 'League Spartan, sans-serif',
                    fontWeight: 900,
                    color: 'rgba(255,255,255,0.04)',
                    opacity: 0,
                    animation: 'fadeIn 0.8s ease-out forwards',
                    lineHeight: 0.85
                }}
            >
                {String(currentSlide + 1).padStart(2, '0')}
            </div>

            {/* Main content — key forces re-mount + animation replay on slide change */}
            <div key={`content-${currentSlide}`} className='relative z-10 h-full flex flex-col justify-end pb-40'>
                <div className='max-w-7xl mx-auto px-6 md:px-12 w-full'>
                    <div className='max-w-2xl'>

                        {/* Category tag */}
                        <div
                            className='flex items-center gap-3 mb-5'
                            style={{ opacity: 0, animation: 'slideInUp 0.55s ease-out 0s forwards', fontFamily: 'DM Sans, sans-serif' }}
                        >
                            <span className='block w-6 h-px' style={{ backgroundColor: '#306CEC' }} />
                            <span className='text-[11px] font-bold tracking-[0.22em] uppercase' style={{ color: '#306CEC' }}>
                                {slides[currentSlide].category}
                            </span>
                        </div>

                        {/* Headline */}
                        <h1
                            className='font-bold text-white leading-[1.07] mb-5'
                            style={{
                                fontFamily: 'League Spartan, sans-serif',
                                fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
                                opacity: 0,
                                animation: 'slideInUp 0.6s ease-out 0.08s forwards'
                            }}
                        >
                            {slides[currentSlide].title}
                        </h1>

                        {/* Subtitle */}
                        <p
                            className='text-base md:text-lg leading-relaxed max-w-lg mb-8'
                            style={{
                                color: 'rgba(255,255,255,0.5)',
                                fontFamily: 'DM Sans, sans-serif',
                                opacity: 0,
                                animation: 'slideInUp 0.6s ease-out 0.16s forwards'
                            }}
                        >
                            {slides[currentSlide].subtitle}
                        </p>

                        {/* CTAs */}
                        <div
                            className='flex items-center gap-5'
                            style={{ opacity: 0, animation: 'slideInUp 0.6s ease-out 0.24s forwards' }}
                        >
                            <Link
                                href='/auth/login'
                                className='text-white px-7 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90 hover:shadow-lg hover:shadow-blue-500/20'
                                style={{ backgroundColor: '#306CEC', fontFamily: 'DM Sans, sans-serif' }}
                            >
                                Get Started
                            </Link>
                            <Link
                                href={slides[currentSlide].href}
                                className='flex items-center gap-2 text-sm font-medium transition-all group'
                                style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'DM Sans, sans-serif' }}
                                onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                            >
                                Learn More
                                <svg className='w-4 h-4 group-hover:translate-x-1 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom controls */}
            <div className='absolute bottom-0 left-0 right-0 z-20'>
                <div className='max-w-7xl mx-auto px-6 md:px-12 pb-5 flex items-center justify-between'>
                    {/* Dot indicators */}
                    <div className='flex items-center gap-1.5'>
                        {slides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => goToSlide(idx)}
                                aria-label={`Slide ${idx + 1}`}
                                className={`transition-all duration-300 rounded-full ${
                                    idx === currentSlide ? 'w-7 h-1.5 bg-white' : 'w-1.5 h-1.5 hover:bg-white/60'
                                }`}
                                style={{ backgroundColor: idx === currentSlide ? 'white' : 'rgba(255,255,255,0.25)' }}
                            />
                        ))}
                    </div>

                    {/* Counter + arrows */}
                    <div className='flex items-center gap-3'>
                        <span className='text-[11px] font-mono tracking-widest' style={{ color: 'rgba(255,255,255,0.3)' }}>
                            {String(currentSlide + 1).padStart(2, '0')} &nbsp;/&nbsp; {String(slides.length).padStart(2, '0')}
                        </span>
                        <div className='flex gap-1'>
                            <button
                                onClick={prevSlide}
                                aria-label='Previous slide'
                                className='w-8 h-8 rounded-lg flex items-center justify-center transition-all'
                                style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.45)' }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'white'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.3)'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'; }}
                            >
                                <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                                </svg>
                            </button>
                            <button
                                onClick={nextSlide}
                                aria-label='Next slide'
                                className='w-8 h-8 rounded-lg flex items-center justify-center transition-all'
                                style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.45)' }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'white'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.3)'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'; }}
                            >
                                <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Full-width progress bars */}
                <div className='flex'>
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => goToSlide(idx)}
                            className='flex-1 h-[2px] relative overflow-hidden cursor-pointer'
                            style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                            aria-label={`Go to slide ${idx + 1}`}
                        >
                            {idx === currentSlide && <div className='absolute inset-0 bg-white progress-bar' />}
                            {idx < currentSlide && <div className='absolute inset-0 bg-white/40' />}
                        </button>
                    ))}
                </div>
            </div>

            {/* Wave transition into next section */}
            <div className='absolute bottom-0 left-0 w-full overflow-hidden leading-none z-[3] pointer-events-none'>
                <svg viewBox='0 0 1440 60' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-full h-auto'>
                    <path d='M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z' fill='white' />
                </svg>
            </div>
        </section>
    );
}
