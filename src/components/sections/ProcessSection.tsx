'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  { 
    id: '01', 
    title: 'Consultation', 
    description: 'Understanding your vision and lifestyle. We begin every journey with an in-depth conversation to ensure our artistic direction aligns perfectly with your individual needs and daily routine.',
    image: '/images/salon-detail.jpg' 
  },
  { 
    id: '02', 
    title: 'Design', 
    description: 'Crafting a personalized approach. Analyzing your bone structure, skin tone, and hair texture to architect a bespoke style that enhances your natural geometry.',
    image: '/images/styling-tools.jpg' 
  },
  { 
    id: '03', 
    title: 'Creation', 
    description: 'Precision technique and artistry. The execution phase where masterful cutting and meticulous color application bring the envisioned design to life.',
    image: '/images/portrait-2.jpg' 
  },
  { 
    id: '04', 
    title: 'Refinement', 
    description: 'Perfecting every detail. The crucial stage of dry-cutting, texturizing, and tonal adjustments that elevates a good look to an extraordinary signature style.',
    image: '/images/color-work.jpg' 
  },
  { 
    id: '05', 
    title: 'Finish', 
    description: 'The final reveal. Styling and coaching on how to maintain the health and aesthetic of your new look at home, ensuring it remains immaculate until your next visit.',
    image: '/images/portrait-5.jpg' 
  },
];

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      // Pin the left panel while scrolling through the right panel
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: leftPanelRef.current,
        pinSpacing: false,
      });

      // Update active stage based on scroll position of right items
      const rightItems = gsap.utils.toArray<HTMLElement>('.process-stage-item');
      rightItems.forEach((item, i) => {
        ScrollTrigger.create({
          trigger: item,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => setActiveStage(i),
          onEnterBack: () => setActiveStage(i),
        });
        
        // Slight parallax on images
        const img = item.querySelector('.process-img');
        if (img) {
          gsap.to(img, {
            yPercent: 15,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            }
          });
        }
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative bg-stone-900 text-stone-100">
      
      {/* Desktop Layout */}
      <div className="hidden md:flex min-h-screen">
        {/* Left Sticky Panel */}
        <div ref={leftPanelRef} className="w-5/12 h-screen flex flex-col justify-center px-16 relative">
          <p className="text-sm tracking-[0.2em] uppercase font-medium text-stone-500 mb-8 absolute top-24">The Craft</p>
          
          <div className="relative h-[200px] flex flex-col justify-center">
            {STAGES.map((stage, idx) => (
              <div 
                key={idx}
                className={`absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-in-out ${
                  activeStage === idx ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
                }`}
              >
                <div className="flex items-center gap-6 mb-4">
                  <span className="text-[140px] leading-none font-serif text-stone-700/50">{stage.id}</span>
                  <div className="h-px w-24 bg-stone-500 mt-8" />
                </div>
                <h2 className="text-5xl font-serif text-stone-100 ml-4">{stage.title}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* Right Scrolling Panel */}
        <div ref={rightPanelRef} className="w-7/12 py-32 flex flex-col gap-[30vh]">
          {STAGES.map((stage, idx) => (
            <div key={idx} className="process-stage-item flex flex-col items-center justify-center min-h-[70vh] px-16">
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-stone-800 mb-8">
                <Image
                  src={stage.image}
                  alt={stage.title}
                  fill
                  className="process-img object-cover scale-110"
                  sizes="50vw"
                />
              </div>
              <div className="max-w-md self-start">
                <p className="text-xl font-sans font-light leading-relaxed text-stone-300">
                  {stage.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden py-24 px-6">
        <header className="mb-16">
          <p className="text-xs tracking-[0.2em] uppercase font-medium text-stone-500 mb-2">The Craft</p>
          <h2 className="text-4xl font-serif text-stone-100">Our Process</h2>
        </header>

        <div className="flex flex-col gap-20">
          {STAGES.map((stage, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="flex items-end gap-4 mb-6">
                <span className="text-6xl leading-none font-serif text-stone-700">{stage.id}</span>
                <h3 className="text-3xl font-serif pb-1">{stage.title}</h3>
              </div>
              
              <div className="relative w-full aspect-[4/5] overflow-hidden mb-6">
                <Image
                  src={stage.image}
                  alt={stage.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
              
              <p className="text-stone-300 font-sans leading-relaxed">
                {stage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
