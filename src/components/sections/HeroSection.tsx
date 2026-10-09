'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const container = useRef<HTMLElement>(null);
  const imageWrapper = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);
  const tagline = useRef<HTMLParagraphElement>(null);
  const ctas = useRef<HTMLDivElement>(null);
  const metadata = useRef<HTMLDivElement>(null);
  const scrollIndicator = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    gsap.set(imageWrapper.current, { clipPath: 'inset(100% 0 0 0)' });
    gsap.set(headline.current, { y: 100, opacity: 0 });
    gsap.set(tagline.current, { opacity: 0 });
    gsap.set(ctas.current, { y: 20, opacity: 0 });
    gsap.set(metadata.current, { opacity: 0 });
    gsap.set(scrollIndicator.current, { opacity: 0 });

    tl.to(imageWrapper.current, {
      clipPath: 'inset(0% 0 0 0)',
      duration: 1.5,
      ease: 'power3.inOut',
    })
      .to(headline.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
      }, '-=0.5')
      .to(tagline.current, {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.6')
      .to(ctas.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.6')
      .to(metadata.current, {
        opacity: 1,
        duration: 0.8,
      }, '-=0.4')
      .to(scrollIndicator.current, {
        opacity: 1,
        duration: 0.8,
      }, '-=0.4');

    // Scroll Indicator pulse
    gsap.to('.scroll-line', {
      y: 10,
      opacity: 0,
      duration: 1.5,
      repeat: -1,
      ease: 'power1.inOut',
    });

    // Parallax on scroll
    gsap.to(imageRef.current, {
      scale: 1.15,
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    gsap.to(headline.current, {
      y: -150,
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative min-h-screen w-full bg-zinc-950 text-white overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-12 md:grid-rows-1 h-full w-full">
        {/* Mobile: image is full width, overlaid by text. Desktop: image takes right ~65% */}
        <div 
          ref={imageWrapper} 
          className="absolute inset-0 md:relative md:col-start-5 md:col-end-13 h-full w-full z-0 overflow-hidden"
        >
          <Image
            ref={imageRef}
            src="/images/hero.jpg"
            alt="Cinematic salon experience"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay for mobile legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:hidden" />
        </div>

        {/* Text Composition */}
        <div className="relative z-10 flex flex-col justify-end md:justify-center p-6 md:p-12 md:col-start-1 md:col-end-8 h-full">
          <div className="md:-mr-32 pt-24 md:pt-0 pb-32 md:pb-0">
            <h1 
              ref={headline} 
              className="font-serif text-[clamp(4rem,10vw,8rem)] leading-[0.9] tracking-tighter uppercase mb-6"
            >
              Aurèle
            </h1>
            <div className="max-w-md">
              <p 
                ref={tagline}
                className="font-sans text-lg md:text-xl tracking-wide uppercase mb-12 text-zinc-300"
              >
                The Art of Beautiful Hair
              </p>
              
              <div ref={ctas} className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <button className="bg-white text-black px-8 py-4 font-sans uppercase tracking-widest text-sm hover:bg-zinc-200 transition-colors">
                  Book Your Experience
                </button>
                <a href="#explore" className="font-sans uppercase tracking-widest text-sm underline-offset-8 decoration-1 underline hover:text-zinc-300 transition-colors">
                  Explore Our World
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Editorial Metadata */}
        <div ref={metadata} className="absolute top-8 left-6 md:left-12 flex justify-between w-full pr-12 md:pr-24 z-10">
          <span className="font-sans text-xs tracking-[0.2em] uppercase text-zinc-400">EST. MMXXIV</span>
          <span className="font-sans text-xs tracking-[0.2em] uppercase text-zinc-400 hidden md:block">Paris / New York</span>
        </div>

        {/* Scroll Indicator */}
        <div ref={scrollIndicator} className="absolute bottom-8 left-6 md:left-12 z-10 flex flex-col items-center gap-4">
          <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-zinc-400 [writing-mode:vertical-lr]">Scroll</span>
          <div className="w-[1px] h-12 bg-zinc-800 relative overflow-hidden">
            <div className="scroll-line absolute top-0 left-0 w-full h-1/2 bg-white" />
          </div>
        </div>
      </div>
    </section>
  );
}
