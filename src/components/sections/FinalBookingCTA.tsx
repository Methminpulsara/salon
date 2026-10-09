'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FinalBookingCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Text reveal
      const lines = textRef.current?.querySelectorAll('.text-line');
      if (lines) {
        gsap.fromTo(
          lines,
          { y: '100%' },
          {
            y: '0%',
            duration: 1.2,
            stagger: 0.15,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
            }
          }
        );
      }

      // Fade up content below
      gsap.fromTo(
        ['.cta-desc', btnsRef.current],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          }
        }
      );

      // Background parallax
      gsap.fromTo(
        bgRef.current,
        { y: '-10%' },
        {
          y: '10%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  });

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48 bg-[#0D0D0D] text-[#F9F9F7] overflow-hidden flex flex-col items-center justify-center min-h-[80vh]">
      
      {/* Subtle Texture/Gradient Background */}
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0 opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-800/40 via-[#0D0D0D] to-[#0D0D0D]"
      />

      <div className="container relative z-10 mx-auto px-6 text-center flex flex-col items-center">
        <div ref={textRef} className="mb-12 flex flex-col items-center">
          <div className="overflow-hidden">
            <h2 className="text-line block font-serif text-[clamp(3rem,8vw,8rem)] leading-[0.9] tracking-tight">
              YOUR NEXT
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2 className="text-line block font-serif text-[clamp(3rem,8vw,8rem)] leading-[0.9] tracking-tight italic text-stone-400">
              LOOK STARTS
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2 className="text-line block font-serif text-[clamp(3rem,8vw,8rem)] leading-[0.9] tracking-tight">
              HERE.
            </h2>
          </div>
        </div>

        <p className="cta-desc text-stone-400 font-sans text-lg md:text-xl max-w-md mx-auto mb-12 font-light">
          Ready to transform? Book your consultation today.
        </p>

        <div ref={btnsRef} className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-lg">
          <Link 
            href="/book"
            className="flex-1 bg-white text-[#0D0D0D] px-8 py-5 text-sm uppercase tracking-widest text-center hover:bg-stone-200 transition-colors font-medium"
          >
            Book Now
          </Link>
          <a 
            href="tel:+15551234567"
            className="flex-1 bg-transparent text-white border border-white/30 px-8 py-5 text-sm uppercase tracking-widest text-center hover:bg-white/10 transition-colors"
          >
            Call Us
          </a>
        </div>
      </div>
    </section>
  );
}
