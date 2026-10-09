'use client';

import { useState, useRef, useEffect, MouseEvent, TouchEvent, KeyboardEvent } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowLeftRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BeforeAfterSection() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.fromTo(
        containerRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.5,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      );

      gsap.fromTo(
        '.slider-header',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  });

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      setSliderPosition((prev) => Math.min(100, prev + 5));
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-stone-50 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16 slider-header opacity-0">
          <span className="uppercase tracking-widest text-sm text-stone-500 mb-4 block">
            The Transformation
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-stone-900 mb-6">
            See the Difference
          </h2>
          <p className="max-w-2xl mx-auto text-stone-600 font-sans">
            Our approach combines artistic vision with technical precision. Drag the slider to reveal the complete transformation process.
          </p>
        </div>

        <div 
          ref={containerRef}
          className="relative w-full aspect-[4/5] md:aspect-video overflow-hidden rounded-xl bg-stone-200 cursor-ew-resize select-none touch-pan-y"
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
        >
          {/* After Image (Background) */}
          <div className="absolute inset-0">
            <Image
              src="/images/before-after-2.jpg"
              alt="After transformation"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 80vw"
              priority
            />
            <div className="absolute top-6 right-6 bg-white/80 backdrop-blur px-4 py-2 text-sm uppercase tracking-widest rounded-sm font-medium z-10 pointer-events-none">
              After
            </div>
          </div>

          {/* Before Image (Foreground, clipped) */}
          <div 
            className="absolute inset-0 z-10"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <Image
              src="/images/before-after-1.jpg"
              alt="Before transformation"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 80vw"
              priority
            />
            <div className="absolute top-6 left-6 bg-white/80 backdrop-blur px-4 py-2 text-sm uppercase tracking-widest rounded-sm font-medium pointer-events-none">
              Before
            </div>
          </div>

          {/* Divider Line */}
          <div 
            ref={dividerRef}
            className="absolute top-0 bottom-0 w-0.5 bg-white z-20 shadow-[0_0_10px_rgba(0,0,0,0.3)]"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Handle */}
            <div 
              role="slider"
              aria-valuenow={sliderPosition}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Before and after comparison slider"
              tabIndex={0}
              onKeyDown={handleKeyDown}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-stone-900"
            >
              <ArrowLeftRight className="w-5 h-5 text-stone-700" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
