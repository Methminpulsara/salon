'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function BrandStatement() {
  const container = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    // Split text animation for quote
    const words = quoteRef.current?.querySelectorAll('.word');
    if (words) {
      gsap.from(words, {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: quoteRef.current,
          start: 'top 80%',
        }
      });
    }

    // Parallax image
    gsap.to(imageRef.current, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });
  }, { scope: container });

  const text = 'We believe beautiful hair is an art form — one that requires patience, expertise, and an unwavering attention to detail.';
  const words = text.split(' ');

  return (
    <section ref={container} className="relative w-full bg-[#FAF7F2] text-zinc-900 py-32 md:py-48 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 items-center">
        
        <div className="md:col-span-7 z-10">
          <div className="mb-12 w-16 h-[1px] bg-zinc-900/20" />
          <h2 ref={quoteRef} className="font-serif text-[clamp(2rem,4vw,3.5rem)] leading-tight">
            {words.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
                <span className="word inline-block">{word}</span>
              </span>
            ))}
          </h2>
          <div className="mt-12 w-16 h-[1px] bg-zinc-900/20" />
        </div>

        <div className="md:col-span-4 md:col-start-9 relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
          <Image
            ref={imageRef}
            src="/images/salon-interior.jpg"
            alt="Salon interior"
            fill
            className="object-cover scale-125 origin-top"
          />
        </div>

      </div>
    </section>
  );
}
