'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { siteConfig } from '@/config/site';
import SiteFooter from '@/components/sections/SiteFooter';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ServicesPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hero Parallax
    gsap.to('.hero-image', {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Services Reveal
    const services = gsap.utils.toArray('.service-item');
    services.forEach((service: any) => {
      const img = service.querySelector('.service-img');
      const text = service.querySelector('.service-text');
      
      gsap.fromTo(img, 
        { scale: 1.1, autoAlpha: 0 },
        { 
          scale: 1, 
          autoAlpha: 1, 
          duration: 1.2, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: service,
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo(text.children,
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: service,
            start: 'top 75%',
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="bg-[#fcfbf9] min-h-screen pt-32">
      {/* Hero Section */}
      <section className="hero-section relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden mb-24">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/styling-tools.jpg"
            alt="Styling Tools"
            fill
            priority
            className="hero-image object-cover object-center scale-110"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6">Our Services</h1>
          <p className="font-sans text-lg md:text-xl tracking-wide max-w-2xl mx-auto font-light">
            Artistry and precision for every hair type and style
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-32">
        <div className="flex flex-col gap-y-32 md:gap-y-48">
          {siteConfig.services.map((service, index) => {
            const isEven = index % 2 !== 0;
            const number = String(index + 1).padStart(2, '0');

            return (
              <div key={service.id} className="service-item flex flex-col md:flex-row gap-12 md:gap-24 items-center">
                {/* Image */}
                <div className={`w-full md:w-1/2 aspect-[4/5] relative overflow-hidden ${isEven ? 'md:order-2' : ''}`}>
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="service-img object-cover"
                  />
                </div>

                {/* Content */}
                <div className={`service-text w-full md:w-1/2 flex flex-col ${isEven ? 'md:order-1 items-start' : 'items-start'}`}>
                  <span className="font-serif text-3xl text-stone-300 mb-6 block">{number}</span>
                  <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-stone-900 mb-6">
                    {service.title}
                  </h2>
                  <p className="font-sans text-stone-600 text-lg leading-relaxed mb-8 max-w-xl">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between w-full max-w-md border-t border-stone-200 pt-8 mb-10">
                    <span className="font-sans text-stone-500 uppercase tracking-widest text-sm">
                      Investment
                    </span>
                    <span className="font-sans text-stone-900 font-medium">
                      {service.price ? service.price : 'Consultation Required'}
                    </span>
                  </div>
                  <Link
                    href={`/book?service=${service.id}`}
                    className="inline-flex items-center justify-center px-8 py-4 bg-stone-900 text-white font-sans text-sm tracking-widest uppercase hover:bg-stone-800 transition-colors"
                  >
                    Book This Service
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
