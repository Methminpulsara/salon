'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GALLERY = [
  { num: '01', title: 'Effortless Waves', image: '/images/portrait-1.jpg', caption: 'Natural movement and dimension', width: '40vw' },
  { num: '02', title: 'Bold Color', image: '/images/color-work.jpg', caption: 'Vibrant, lasting color artistry', width: '30vw' },
  { num: '03', title: 'Sleek Precision', image: '/images/portrait-3.jpg', caption: 'Clean lines, sharp finish', width: '45vw' },
  { num: '04', title: 'Textured Volume', image: '/images/texture-hair.jpg', caption: 'Body and movement', width: '35vw' },
  { num: '05', title: 'Classic Elegance', image: '/images/portrait-4.jpg', caption: 'Timeless sophistication', width: '50vw' },
  { num: '06', title: 'Modern Edge', image: '/images/gallery-4.jpg', caption: 'Contemporary and bold', width: '30vw' },
];

export default function HorizontalGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Only apply horizontal scroll on desktop
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      if (!trackRef.current || !containerRef.current) return;

      const trackWidth = trackRef.current.scrollWidth;
      const windowWidth = window.innerWidth;
      
      gsap.to(trackRef.current, {
        x: () => -(trackWidth - windowWidth + 100), // extra padding
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: '+=300%', // 400vh total height
          invalidateOnRefresh: true,
        }
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <>
      {/* Desktop Horizontal Scroll */}
      <section ref={containerRef} className="hidden md:block h-[400vh] bg-stone-900 text-stone-50 relative">
        <div className="h-screen w-full flex items-center overflow-hidden sticky top-0">
          <div ref={trackRef} className="flex h-[70vh] items-center px-[5vw] gap-12 whitespace-nowrap will-change-transform">
            
            <div className="flex-shrink-0 flex items-center h-full mr-12">
              <h2 className="text-6xl lg:text-8xl font-serif uppercase [writing-mode:vertical-lr] rotate-180 tracking-widest text-stone-100">
                Signature Looks
              </h2>
            </div>

            {GALLERY.map((item, idx) => (
              <div 
                key={idx} 
                className="flex-shrink-0 flex flex-col h-full group relative cursor-pointer"
                style={{ width: item.width }}
                data-cursor="gallery"
              >
                <div className="relative w-full h-[80%] overflow-hidden mb-6">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:opacity-0" />
                </div>
                
                <div className="flex items-start justify-between whitespace-normal">
                  <div>
                    <h3 className="text-3xl font-serif mb-2">{item.title}</h3>
                    <p className="text-stone-400 font-sans italic text-sm">{item.caption}</p>
                  </div>
                  <span className="text-sm font-medium tracking-widest text-stone-500">
                    {item.num}
                  </span>
                </div>
              </div>
            ))}
            
            <div className="w-[10vw] flex-shrink-0" /> {/* End padding */}
          </div>
        </div>
      </section>

      {/* Mobile Vertical Gallery */}
      <section className="md:hidden py-24 px-6 bg-stone-900 text-stone-50">
        <header className="mb-16">
          <h2 className="text-4xl font-serif uppercase tracking-widest mb-4">
            Signature Looks
          </h2>
          <div className="w-12 h-px bg-stone-500"></div>
        </header>

        <div className="flex flex-col gap-16">
          {GALLERY.map((item, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="relative w-full aspect-[3/4] overflow-hidden mb-6">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-serif mb-1">{item.title}</h3>
                  <p className="text-stone-400 font-sans italic text-sm">{item.caption}</p>
                </div>
                <span className="text-xs font-medium tracking-widest text-stone-500">
                  {item.num}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
