'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number; // 0 to 1, higher is faster
  className?: string;
  priority?: boolean;
  maskReveal?: boolean;
}

export function ParallaxImage({
  src,
  alt,
  speed = 0.5,
  className = '',
  priority = false,
  maskReveal = false,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !imageRef.current) return;

    // Mask reveal animation
    if (maskReveal) {
      gsap.fromTo(
        containerRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        { 
          clipPath: 'inset(0% 0 0 0)', 
          duration: 1.5, 
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 90%',
          }
        }
      );
      
      gsap.fromTo(
        imageRef.current,
        { scale: 1.2 },
        { 
          scale: 1, 
          duration: 1.5, 
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 90%',
          }
        }
      );
    }

    // Parallax effect
    gsap.fromTo(
      imageRef.current,
      { y: '-15%' },
      {
        y: '15%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={`relative overflow-hidden w-full h-full ${className}`}>
      <div className="absolute inset-[-15%] w-[130%] h-[130%]">
        <Image
          ref={imageRef}
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
