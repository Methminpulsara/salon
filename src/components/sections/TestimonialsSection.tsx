'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const philosophyItems = [
  {
    num: '01',
    title: 'Artistry First',
    desc: 'We approach every service as an art form, bringing creative vision and technical mastery to every client.',
    align: 'left'
  },
  {
    num: '02',
    title: 'Personal Connection',
    desc: 'Every appointment begins with listening. We understand your lifestyle, preferences, and aspirations.',
    align: 'center'
  },
  {
    num: '03',
    title: 'Lasting Quality',
    desc: 'We use premium products and proven techniques to ensure results that look beautiful long after you leave.',
    align: 'right'
  }
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.philosophy-item');

      items.forEach((item: any) => {
        const number = item.querySelector('.number');
        const title = item.querySelector('.title-reveal');
        const desc = item.querySelector('.desc-reveal');
        const line = item.querySelector('.accent-line');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
          }
        });

        tl.fromTo(number, 
          { scale: 2, opacity: 0, y: 50 }, 
          { scale: 1, opacity: 0.1, y: 0, duration: 1, ease: 'power3.out' }
        )
        .fromTo(line,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: 'power2.out', transformOrigin: 'left' },
          '-=0.5'
        )
        .fromTo([title, desc],
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power2.out' },
          '-=0.6'
        );
      });

      // Subtle parallax on entry
      gsap.fromTo(itemsRef.current,
        { y: 100 },
        {
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'top center',
            scrub: true
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  });

  return (
    <section ref={sectionRef} className="py-32 bg-[#1A1A1A] text-[#F9F9F7] overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-24 text-center">
          <h2 className="uppercase tracking-[0.2em] text-sm text-[#D4B5B0]">
            Our Philosophy
          </h2>
        </div>

        <div ref={itemsRef} className="flex flex-col space-y-32 md:space-y-48">
          {philosophyItems.map((item, index) => (
            <div 
              key={index} 
              className={`philosophy-item relative w-full md:w-2/3 ${
                item.align === 'left' ? 'mr-auto' : 
                item.align === 'center' ? 'mx-auto text-center' : 
                'ml-auto text-right'
              }`}
            >
              <div className="absolute -z-10 top-1/2 -translate-y-1/2 left-0 right-0 flex justify-center pointer-events-none">
                <span className="number font-serif text-[15rem] md:text-[20rem] leading-none text-white/5 opacity-10">
                  {item.num}
                </span>
              </div>
              
              <div className={`relative z-10 ${item.align === 'center' ? 'flex flex-col items-center' : item.align === 'right' ? 'flex flex-col items-end' : ''}`}>
                <div className={`accent-line h-px w-24 bg-[#D4B5B0] mb-8 ${item.align === 'center' ? 'origin-center' : item.align === 'right' ? 'origin-right' : 'origin-left'}`}></div>
                <div className="overflow-hidden mb-6">
                  <h3 className="title-reveal font-serif text-4xl md:text-5xl lg:text-6xl text-white">
                    {item.title}
                  </h3>
                </div>
                <div className="overflow-hidden max-w-md">
                  <p className="desc-reveal text-white/70 font-sans text-lg font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
