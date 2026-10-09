'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTextProps {
  text: string;
  type?: 'fade-up' | 'mask-reveal' | 'chars-cascade' | 'words-stagger';
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  as?: React.ElementType;
}

export function AnimatedText({
  text,
  type = 'words-stagger',
  className = '',
  delay = 0,
  duration = 0.8,
  stagger = 0.05,
  as: Component = 'div',
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  const renderContent = () => {
    if (type === 'chars-cascade') {
      return text.split('').map((char, i) => (
        <span key={i} className="inline-block char opacity-0 translate-y-4">
          {char === ' ' ? '\u00A0' : char}
        </span>
      ));
    }
    
    if (type === 'words-stagger' || type === 'mask-reveal') {
      return text.split(' ').map((word, i) => (
        <span key={i} className="inline-block whitespace-nowrap overflow-hidden mr-[0.25em] pb-[0.1em]">
          <span className={`inline-block word ${type === 'mask-reveal' ? 'translate-y-full' : 'opacity-0 translate-y-4'}`}>
            {word}
          </span>
        </span>
      ));
    }

    return <span className="fade-text opacity-0 translate-y-4 inline-block">{text}</span>;
  };

  useGSAP(() => {
    if (!containerRef.current) return;

    const targets = type === 'chars-cascade' ? '.char' : type === 'words-stagger' || type === 'mask-reveal' ? '.word' : '.fade-text';
    
    gsap.to(gsap.utils.toArray(targets, containerRef.current), {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });
  }, { scope: containerRef });

  return (
    <Component ref={containerRef} className={className}>
      {renderContent()}
    </Component>
  );
}
