'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import SiteFooter from '@/components/sections/SiteFooter';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Parallax on images
    const images = gsap.utils.toArray('.parallax-image');
    images.forEach((img: any) => {
      gsap.to(img, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: img.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    // Text reveals
    const texts = gsap.utils.toArray('.reveal-text');
    texts.forEach((text: any) => {
      gsap.fromTo(text,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: text,
            start: 'top 85%',
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="bg-[#fcfbf9] min-h-screen pt-32">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-24 md:py-32 text-center reveal-text">
        <h1 className="font-serif text-6xl md:text-8xl text-stone-900 mb-8">Our Story</h1>
        <p className="font-sans text-xl md:text-2xl text-stone-600 font-light leading-relaxed">
          More than a salon, we are a collective of passionate artists dedicated to the craft of beautiful hair. Our space is designed to be a sanctuary where transformation and relaxation converge.
        </p>
      </section>

      {/* Philosophy */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className="reveal-text order-2 md:order-1">
            <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6">Our Philosophy</h2>
            <p className="font-sans text-stone-600 text-lg leading-relaxed mb-6">
              We believe that exceptional hair is the result of artistry combined with a deep understanding of individuality. Every client who sits in our chairs brings a unique canvas, and our role is to enhance their natural beauty through tailored techniques.
            </p>
            <p className="font-sans text-stone-600 text-lg leading-relaxed">
              Our commitment to continued education ensures that we remain at the forefront of the industry, bringing the latest editorial trends and refined classic styles to our guests.
            </p>
          </div>
          <div className="relative aspect-[3/4] w-full overflow-hidden order-1 md:order-2">
            <Image
              src="/images/salon-interior.jpg"
              alt="Salon Interior"
              fill
              className="parallax-image object-cover scale-110"
            />
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src="/images/styling-tools.jpg"
              alt="Styling Tools"
              fill
              className="parallax-image object-cover scale-110"
            />
          </div>
          <div className="reveal-text">
            <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6">Our Approach</h2>
            <p className="font-sans text-stone-600 text-lg leading-relaxed mb-6">
              Every service begins with a comprehensive consultation. We take the time to understand your lifestyle, styling habits, and hair goals. This allows us to create a customized plan that not only looks incredible when you leave the salon, but is manageable in your everyday life.
            </p>
            <p className="font-sans text-stone-600 text-lg leading-relaxed">
              We exclusively use premium, sustainable products that deliver unparalleled results while maintaining the integrity and health of your hair.
            </p>
          </div>
        </div>
      </section>

      {/* The Studio */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-16 reveal-text text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6">The Studio</h2>
          <p className="font-sans text-stone-600 text-lg leading-relaxed max-w-2xl mx-auto">
            A thoughtfully designed space that merges minimalist aesthetics with warm, inviting elements. Natural light, curated details, and a serene atmosphere await you.
          </p>
        </div>
        <div className="w-full h-[60vh] md:h-[80vh] relative overflow-hidden">
          <Image
            src="/images/atmosphere-1.jpg"
            alt="Salon Atmosphere"
            fill
            className="parallax-image object-cover scale-110"
          />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
