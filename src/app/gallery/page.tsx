'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { X } from 'lucide-react';
import SiteFooter from '@/components/sections/SiteFooter';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const GALLERY_IMAGES = [
  { src: '/images/portrait-1.jpg', span: 'col-span-1 row-span-2' },
  { src: '/images/color-work.jpg', span: 'col-span-2 row-span-1' },
  { src: '/images/portrait-2.jpg', span: 'col-span-1 row-span-1' },
  { src: '/images/texture-hair.jpg', span: 'col-span-1 row-span-2' },
  { src: '/images/portrait-3.jpg', span: 'col-span-1 row-span-1' },
  { src: '/images/gallery-1.jpg', span: 'col-span-2 row-span-2' },
  { src: '/images/gallery-2.jpg', span: 'col-span-1 row-span-1' },
  { src: '/images/portrait-4.jpg', span: 'col-span-1 row-span-2' },
  { src: '/images/gallery-3.jpg', span: 'col-span-1 row-span-1' },
  { src: '/images/gallery-4.jpg', span: 'col-span-2 row-span-1' },
  { src: '/images/portrait-5.jpg', span: 'col-span-1 row-span-2' },
  { src: '/images/gallery-5.jpg', span: 'col-span-1 row-span-1' },
];

export default function GalleryPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useGSAP(() => {
    const images = gsap.utils.toArray('.gallery-item');
    
    images.forEach((img: any) => {
      gsap.fromTo(img,
        { scale: 0.95, autoAlpha: 0, y: 30 },
        {
          scale: 1,
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: img,
            start: 'top 85%',
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="bg-[#fcfbf9] min-h-screen pt-32">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 text-center">
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-stone-900 mb-6">Gallery</h1>
        <p className="font-sans text-stone-500 text-lg md:text-xl tracking-wide max-w-2xl mx-auto font-light">
          A curated collection of our latest work, artistic transformations, and editorial styling.
        </p>
      </section>

      {/* Grid */}
      <section className="px-4 md:px-8 pb-32 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[250px] md:auto-rows-[350px] gap-4">
          {GALLERY_IMAGES.map((img, idx) => (
            <div 
              key={idx} 
              className={`gallery-item relative overflow-hidden group cursor-pointer ${img.span}`}
              data-cursor="gallery"
              onClick={() => setSelectedImage(img.src)}
            >
              <Image
                src={img.src}
                alt={`Gallery image ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-8"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} strokeWidth={1} />
          </button>
          <div className="relative w-full max-w-5xl h-full max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedImage}
              alt="Selected gallery image"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      <SiteFooter />
    </main>
  );
}
