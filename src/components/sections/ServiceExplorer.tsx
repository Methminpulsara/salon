'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ArrowRight, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Fallback services in case siteConfig doesn't have them
const SERVICES = [
  { title: 'Signature Cut', description: 'Precision cutting tailored to your bone structure and lifestyle. Includes a deep conditioning treatment and blowout.', price: '$120+', image: '/images/portrait-1.jpg' },
  { title: 'Custom Color', description: 'Dimensional color, balayage, and vivids crafted to enhance your natural beauty while maintaining hair health.', price: '$200+', image: '/images/color-work.jpg' },
  { title: 'Texture & Smoothing', description: 'Frizz-reducing and smoothing treatments for effortless daily styling and incredible shine.', price: '$300+', image: '/images/texture-hair.jpg' },
  { title: 'Extensions', description: 'Premium hand-tied and tape-in extensions to add seamless volume, length, and dimensional color.', price: 'Consultation', image: '/images/portrait-3.jpg' },
  { title: 'Event Styling', description: 'Elegant updos, waves, and modern styling for weddings, galas, and your most important occasions.', price: '$150+', image: '/images/portrait-4.jpg' },
];

export default function ServiceExplorer() {
  const [activeService, setActiveService] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Section entrance
    gsap.fromTo(containerRef.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      }}
    );
  }, { scope: containerRef });

  const handleServiceChange = (index: number) => {
    if (index === activeService) return;
    
    const tl = gsap.timeline();
    
    // Image transition
    tl.to(imageRef.current, {
      opacity: 0,
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.inOut',
      onComplete: () => setActiveService(index)
    }).to(imageRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: 'power2.out'
    });

    // Text transition
    gsap.fromTo(textRef.current, 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, delay: 0.3, ease: 'power2.out' }
    );
  };

  return (
    <section ref={containerRef} className="py-24 px-6 md:px-12 lg:px-24 bg-stone-50 text-stone-900">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 md:mb-24">
          <p className="text-sm tracking-[0.2em] uppercase font-medium text-stone-500 mb-4">Our Services</p>
          <h2 className="text-4xl md:text-6xl font-serif">What We Create</h2>
        </header>

        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-12 gap-12 lg:gap-24 items-center">
          {/* Left: Services List */}
          <div className="col-span-5 flex flex-col gap-6">
            {SERVICES.map((service, idx) => (
              <button
                key={idx}
                onClick={() => handleServiceChange(idx)}
                className={`group flex items-center gap-6 text-left transition-all duration-300 ${
                  activeService === idx ? 'translate-x-4' : 'hover:translate-x-2 opacity-60 hover:opacity-100'
                }`}
              >
                <span className="text-sm font-medium tracking-widest text-stone-400">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className={`text-2xl lg:text-3xl font-sans transition-all duration-300 ${
                  activeService === idx ? 'font-semibold text-stone-900' : 'font-light text-stone-600'
                }`}>
                  {service.title}
                </span>
                {activeService === idx && (
                  <span className="h-[2px] w-12 bg-stone-900 block ml-4"></span>
                )}
              </button>
            ))}
          </div>

          {/* Right: Image Stage */}
          <div className="col-span-7 relative flex flex-col">
            <div className="aspect-[3/4] relative overflow-hidden bg-stone-200" ref={imageRef}>
              <Image
                src={SERVICES[activeService].image}
                alt={SERVICES[activeService].title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            
            <div ref={textRef} className="mt-8 flex flex-col md:flex-row gap-6 md:items-end justify-between">
              <div className="max-w-md">
                <h3 className="text-3xl font-serif mb-3">{SERVICES[activeService].title}</h3>
                <p className="text-stone-600 font-sans leading-relaxed mb-4">
                  {SERVICES[activeService].description}
                </p>
                <p className="font-medium tracking-wide uppercase text-sm">
                  {SERVICES[activeService].price}
                </p>
              </div>
              
              <button className="flex items-center gap-2 uppercase tracking-widest text-sm font-semibold group whitespace-nowrap">
                Book This Service
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Layout (Accordion) */}
        <div className="md:hidden flex flex-col gap-4">
          {SERVICES.map((service, idx) => (
            <div key={idx} className="border-b border-stone-200 pb-4">
              <button 
                onClick={() => setActiveService(activeService === idx ? -1 : idx)}
                className="w-full flex items-center justify-between py-4"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs font-medium tracking-widest text-stone-400">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className={`text-xl font-sans ${activeService === idx ? 'font-medium' : 'font-light'}`}>
                    {service.title}
                  </span>
                </div>
                <ChevronDown className={`w-5 h-5 text-stone-400 transition-transform duration-300 ${activeService === idx ? 'rotate-180' : ''}`} />
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${activeService === idx ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="pt-2 pb-6 flex flex-col gap-4">
                  <div className="aspect-[4/5] relative w-full overflow-hidden bg-stone-200 mb-2">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                  </div>
                  <p className="text-stone-600 font-sans text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-medium tracking-wide uppercase text-sm">
                      {service.price}
                    </span>
                    <button className="uppercase tracking-widest text-xs font-semibold underline underline-offset-4">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
