'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface TextMaskRevealProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function TextMaskReveal({
  children,
  className = '',
  as: Component = 'div',
  delay = 0,
  duration = 1,
  direction = 'up',
}: TextMaskRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!innerRef.current || !containerRef.current) return;

    let initialPos = { y: '100%', x: '0%' };
    if (direction === 'down') initialPos = { y: '-100%', x: '0%' };
    if (direction === 'left') initialPos = { x: '100%', y: '0%' };
    if (direction === 'right') initialPos = { x: '-100%', y: '0%' };

    gsap.fromTo(
      innerRef.current,
      initialPos,
      {
        y: '0%',
        x: '0%',
        duration,
        delay,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        }
      }
    );
  }, { scope: containerRef });

  return (
    <Component ref={containerRef} className={`overflow-hidden block ${className}`}>
      <span ref={innerRef} className="block w-full h-full">
        {children}
      </span>
    </Component>
  );
}
