'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ScrollStorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const text4Ref = useRef<HTMLDivElement>(null);
  
  const img1WrapperRef = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLImageElement>(null);
  const img2WrapperRef = useRef<HTMLDivElement>(null);

  const gridBgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=400%',
        pin: true,
        scrub: 1,
      }
    });

    // Initial setup
    gsap.set(img1WrapperRef.current, { scale: 0, autoAlpha: 0 });
    gsap.set(img2WrapperRef.current, { x: 100, autoAlpha: 0 });
    gsap.set([text2Ref.current, text3Ref.current, text4Ref.current], { autoAlpha: 0, y: 50 });
    gsap.set(gridBgRef.current, { autoAlpha: 0 });
    
    const lines = text1Ref.current?.querySelectorAll('span');
    if (lines && lines.length > 0) {
      gsap.set(lines, { y: 100 });

      // BEAT 1 (0-20%): THE PROMISE
      tl.to(lines, {
        y: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out'
      }, 0);
    }

    // BEAT 2 (20-40%): THE CRAFT
    tl.to(text1Ref.current, { autoAlpha: 0, scale: 0.9, duration: 0.8 }, 1.5)
      .to(img1WrapperRef.current, {
        scale: 1,
        autoAlpha: 1,
        width: '40vw',
        height: '70vh',
        duration: 1.5,
        ease: 'power2.inOut'
      }, 1.5)
      .to(text2Ref.current, { autoAlpha: 1, y: 0, duration: 1 }, 2);

    // BEAT 3 (40-60%): THE DETAIL
    tl.to(text2Ref.current, { autoAlpha: 0, y: -50, duration: 0.8 }, 3.5)
      .to(img1WrapperRef.current, {
        width: '30vw',
        height: '45vh',
        x: '-15vw',
        duration: 1.5,
        ease: 'power2.inOut'
      }, 3.5)
      .to(img2WrapperRef.current, {
        x: 0,
        autoAlpha: 1,
        duration: 1.5,
        ease: 'power2.out'
      }, 3.8)
      .to(text3Ref.current, { autoAlpha: 1, y: 0, duration: 1 }, 4)
      .to(containerRef.current, { backgroundColor: '#18181b', duration: 1.5 }, 3.5); // Slightly lighter bg

    // BEAT 4 (60-80%): THE EXPERIENCE
    tl.to(text3Ref.current, { autoAlpha: 0, y: -50, duration: 0.8 }, 5.5)
      .to(img1WrapperRef.current, { x: '-25vw', duration: 1.5, ease: 'power2.inOut' }, 5.5)
      .to(img2WrapperRef.current, { x: '25vw', duration: 1.5, ease: 'power2.inOut' }, 5.5)
      .to(gridBgRef.current, { autoAlpha: 0.1, duration: 1 }, 5.8)
      .to(text4Ref.current, { autoAlpha: 1, y: 0, scale: 1.2, duration: 1.5 }, 6);

    // BEAT 5 (80-100%): TRANSITION
    tl.to(text4Ref.current, { autoAlpha: 0, scale: 0.8, duration: 1 }, 8)
      .to([img1WrapperRef.current, img2WrapperRef.current], { autoAlpha: 0, scale: 0.8, duration: 1 }, 8)
      .to(gridBgRef.current, { autoAlpha: 0, duration: 1 }, 8)
      .to(containerRef.current, { backgroundColor: '#FAF7F2', duration: 1.5 }, 8);

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="h-screen w-full relative overflow-hidden bg-black text-white">
      <div ref={containerRef} className="absolute inset-0 w-full h-full flex items-center justify-center bg-black">
        
        {/* Grid Background */}
        <div 
          ref={gridBgRef} 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Beat 1 Text */}
        <div ref={text1Ref} className="absolute z-20 flex flex-col items-center justify-center text-center">
          <div className="overflow-hidden">
            <span className="block font-serif text-[clamp(3rem,8vw,6rem)] uppercase tracking-tight leading-none">Where Artistry</span>
          </div>
          <div className="overflow-hidden">
            <span className="block font-serif text-[clamp(3rem,8vw,6rem)] uppercase tracking-tight leading-none italic text-zinc-400">Meets Precision</span>
          </div>
        </div>

        {/* Beat 2 Text */}
        <div ref={text2Ref} className="absolute z-20 md:right-24 bottom-24 p-6 md:p-0 md:bottom-auto">
          <h2 className="font-serif text-3xl md:text-5xl max-w-sm leading-snug">Every cut tells a story.</h2>
        </div>

        {/* Beat 3 Text */}
        <div ref={text3Ref} className="absolute z-20 w-full text-center bottom-24">
          <h2 className="font-sans text-xl uppercase tracking-[0.3em] text-zinc-300">Precision in every strand</h2>
        </div>

        {/* Beat 4 Text */}
        <div ref={text4Ref} className="absolute z-30 w-full text-center">
          <h2 className="font-serif text-4xl md:text-7xl max-w-3xl mx-auto leading-tight">An experience, <br/><span className="italic text-zinc-400">not just a visit.</span></h2>
        </div>

        {/* Images */}
        <div 
          ref={img1WrapperRef} 
          className="absolute z-10 overflow-hidden"
          style={{ width: '40vw', height: '70vh' }}
        >
          <Image
            ref={img1Ref}
            src="/images/portrait-2.jpg"
            alt="Salon portrait"
            fill
            className="object-cover"
          />
        </div>

        <div 
          ref={img2WrapperRef} 
          className="absolute z-10 overflow-hidden right-[10vw]"
          style={{ width: '25vw', height: '35vh' }}
        >
          <Image
            src="/images/styling-tools.jpg"
            alt="Styling tools"
            fill
            className="object-cover"
          />
        </div>

      </div>
    </section>
  );
}
