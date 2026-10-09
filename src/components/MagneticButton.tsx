'use client';

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  'data-cursor'?: string;
}

export function MagneticButton({ children, className = '', onClick, href, 'data-cursor': dataCursor, ...rest }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouch || !buttonRef.current) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    
    const x = (clientX - (left + width / 2)) * 0.4;
    const y = (clientY - (top + height / 2)) * 0.4;

    gsap.to(buttonRef.current, {
      x,
      y,
      duration: 1,
      ease: 'power3.out',
    });
  };

  const handleMouseLeave = () => {
    if (isTouch || !buttonRef.current) return;
    
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 1,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  const Component = href ? 'a' : 'button';
  const props = href ? { href, ...rest } : { onClick, ...rest };

  return (
    <Component
      ref={buttonRef as any}
      className={`inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor={dataCursor}
      {...props}
    >
      {children}
    </Component>
  );
}
