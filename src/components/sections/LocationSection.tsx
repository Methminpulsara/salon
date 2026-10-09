'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LocationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const hoursRef = useRef<HTMLUListElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Image scale down on enter
      gsap.fromTo(
        imageRef.current,
        { scale: 1.15 },
        {
          scale: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      );

      // Info panel slide in
      gsap.fromTo(
        infoRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          }
        }
      );

      // Hours stagger
      if (hoursRef.current) {
        gsap.fromTo(
          hoursRef.current.children,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: hoursRef.current,
              start: 'top 85%',
            }
          }
        );
      }

      // Coordinates text mask
      gsap.fromTo(
        '.coord-text',
        { y: '100%' },
        {
          y: '0%',
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.coord-text',
            start: 'top 90%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  });

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-stone-50 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Location Image */}
          <div className="order-1 lg:order-1 relative w-full aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
            <div ref={imageRef} className="w-full h-full transform origin-center">
              <Image
                src="/images/location.jpg"
                alt="Salon Location"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            
            {/* Decorative Coordinates */}
            <div className="absolute bottom-6 left-6 overflow-hidden bg-white/80 backdrop-blur px-3 py-1 rounded-sm">
              <span className="coord-text block text-xs tracking-widest font-mono text-stone-800">
                48°51'N 2°17'E
              </span>
            </div>
          </div>

          {/* Info Panel */}
          <div ref={infoRef} className="order-2 lg:order-2 flex flex-col justify-center">
            <div className="mb-8">
              <span className="uppercase tracking-[0.2em] text-sm text-stone-500 mb-4 block">
                Find Us
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6">
                Visit Our Studio
              </h2>
              <p className="text-stone-600 font-sans max-w-md">
                123 Elegance Avenue<br />
                Suite 400<br />
                New York, NY 10012
              </p>
            </div>

            <div className="mb-10">
              <h3 className="uppercase tracking-widest text-xs text-stone-400 mb-4 font-semibold">Opening Hours</h3>
              <ul ref={hoursRef} className="space-y-3 font-sans text-stone-700 max-w-md">
                <li className="flex justify-between border-b border-stone-200 pb-2">
                  <span>Tuesday - Friday</span>
                  <span>10:00 AM - 7:00 PM</span>
                </li>
                <li className="flex justify-between border-b border-stone-200 pb-2">
                  <span>Saturday</span>
                  <span>9:00 AM - 5:00 PM</span>
                </li>
                <li className="flex justify-between border-b border-stone-200 pb-2 text-stone-400">
                  <span>Sunday - Monday</span>
                  <span>Closed</span>
                </li>
              </ul>
            </div>

            <div className="mb-10">
              <p className="text-stone-700 font-sans mb-1">hello@aurelesalon.com</p>
              <p className="text-stone-700 font-sans">+1 (555) 123-4567</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/book"
                className="inline-block bg-stone-900 text-white px-8 py-4 text-sm uppercase tracking-widest text-center hover:bg-stone-800 transition-colors"
              >
                Book an Appointment
              </Link>
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-transparent text-stone-900 border border-stone-900 px-8 py-4 text-sm uppercase tracking-widest text-center hover:bg-stone-100 transition-colors"
              >
                Get Directions
              </a>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
