'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function CustomCursor() {
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);
  const cursorText = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorState, setCursorState] = useState('');
  const [text, setText] = useState('');
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      
      gsap.to(cursorDot.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
      });
      
      gsap.to(cursorRing.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power2.out',
      });

      gsap.to(cursorText.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: 'power2.out',
      });
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorTarget = target.closest('[data-cursor]');
      
      if (cursorTarget) {
        const type = cursorTarget.getAttribute('data-cursor');
        setCursorState('cursor-active');
        
        switch(type) {
          case 'link': setText(''); break;
          case 'gallery': setText('VIEW'); break;
          case 'service': setText('EXPLORE'); break;
          case 'book': setText('BOOK'); break;
          case 'drag': setText('DRAG'); break;
          default: setText('');
        }
        
        gsap.to([cursorDot.current, cursorRing.current], { opacity: 0, duration: 0.2 });
        if (type !== 'link') {
          gsap.to(cursorText.current, { 
            width: 80, height: 80, opacity: 1, duration: 0.3, ease: 'back.out(1.5)' 
          });
        }
      } else {
        setCursorState('');
        setText('');
        gsap.to([cursorDot.current, cursorRing.current], { opacity: 1, duration: 0.2 });
        gsap.to(cursorText.current, { width: 0, height: 0, opacity: 0, duration: 0.2 });
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', handleHover);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleHover);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (isTouch) return null;

  return (
    <div className={`pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div ref={cursorDot} className="cursor-dot" />
      <div ref={cursorRing} className={`cursor-ring ${cursorState === 'cursor-active' ? 'scale-150' : 'scale-100'} transition-transform duration-300`} />
      <div 
        ref={cursorText} 
        className="cursor-text rounded-full absolute"
        style={{ width: 0, height: 0, overflow: 'hidden' }}
      >
        {text}
      </div>
    </div>
  );
}
