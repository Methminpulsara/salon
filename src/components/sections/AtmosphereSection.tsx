'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AtmosphereSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageLeftRef = useRef<HTMLDivElement>(null);
  const imageRightRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Parallax Background
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.3,
        },
      });

      // Section Color Transition
      gsap.to(sectionRef.current, {
        backgroundColor: '#1A1A1A',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'center center',
          scrub: true,
        },
      });

      // Text Mask Reveal
      const revealElements = textRef.current?.querySelectorAll('.reveal-text');
      if (revealElements && revealElements.length > 0) {
        gsap.fromTo(
          revealElements,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Detail Images Parallax & Scale
      if (imageLeftRef.current) {
        gsap.fromTo(
          imageLeftRef.current,
          { scale: 0.8, rotation: -3, y: 50 },
          {
            scale: 1,
            rotation: 0,
            y: -50,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );
      }

      if (imageRightRef.current) {
        gsap.fromTo(
          imageRightRef.current,
          { scale: 0.8, y: 100 },
          {
            scale: 1,
            y: -100,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 40%',
              end: 'bottom top',
              scrub: 1.5,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  });

  return (
    <section ref={sectionRef} className="relative min-h-[150vh] flex items-center bg-[#F9F9F7] overflow-hidden py-32 transition-colors duration-1000">
      {/* Background Parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div ref={bgRef} className="absolute inset-0 -top-[30%] -bottom-[30%] w-full h-[160%] opacity-40">
          <Image
            src="/images/atmosphere-1.jpg"
            alt="Salon Atmosphere"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Detail Image */}
          <div className="lg:col-span-4 hidden md:block">
            <div ref={imageLeftRef} className="relative aspect-[3/4] w-full max-w-sm ml-auto rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/images/atmosphere-2.jpg"
                alt="Salon Detail"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 33vw"
              />
            </div>
          </div>

          {/* Center Text Block */}
          <div ref={textRef} className="lg:col-span-4 text-center">
            <div className="overflow-hidden mb-4">
              <span className="reveal-text block uppercase tracking-[0.3em] text-xs text-white/70">
                The Environment
              </span>
            </div>
            <div className="overflow-hidden mb-8">
              <h2 className="reveal-text block font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
                A SPACE<br />
                <span className="italic text-white/90">DESIGNED FOR</span><br />
                TRANSFORMATION
              </h2>
            </div>
            <div className="overflow-hidden">
              <p className="reveal-text block text-white/80 font-sans max-w-md mx-auto font-light leading-relaxed">
                Step into a sanctuary of calm and creativity. Our studio is thoughtfully curated to provide an immersive, relaxing experience from the moment you arrive.
              </p>
            </div>
          </div>

          {/* Right Detail Image */}
          <div className="lg:col-span-4 hidden md:block">
            <div ref={imageRightRef} className="relative aspect-[4/5] w-full max-w-xs mr-auto rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/images/salon-detail.jpg"
                alt="Salon Tools"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 33vw"
              />
            </div>
          </div>

          {/* Mobile Stacked Images */}
          <div className="col-span-1 md:hidden flex flex-col gap-8 mt-12">
            <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden shadow-xl">
              <Image src="/images/atmosphere-2.jpg" alt="Salon Detail" fill className="object-cover" sizes="100vw" />
            </div>
            <div className="relative aspect-[4/5] w-5/6 ml-auto rounded-lg overflow-hidden shadow-xl">
              <Image src="/images/salon-detail.jpg" alt="Salon Tools" fill className="object-cover" sizes="100vw" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
