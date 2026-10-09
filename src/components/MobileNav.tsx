'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useSmoothScroll } from './SmoothScrollProvider';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    if (!containerRef.current || !linksRef.current) return;

    tl.current = gsap.timeline({ paused: true })
      .to(containerRef.current, {
        autoAlpha: 1,
        duration: 0.4,
        ease: 'power2.inOut',
      })
      .fromTo(
        linksRef.current.children,
        { y: 50, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
        "-=0.2"
      );
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      tl.current?.play();
    } else {
      document.body.style.overflow = '';
      tl.current?.reverse();
    }
  }, [isOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    onClose();
    setTimeout(() => scrollTo(target), 400); // Wait for menu to close
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-[#FAF7F2] invisible opacity-0 flex flex-col px-6 py-12"
    >
      <div className="flex justify-between items-center mb-16">
        <span className="text-2xl font-serif font-semibold tracking-wider text-[#1A1A1A]">
          AURÈLE
        </span>
        <button onClick={onClose} className="p-2" data-cursor="link">
          <span className="block text-sm uppercase tracking-widest font-medium">Close</span>
        </button>
      </div>

      <nav className="flex-1 flex flex-col justify-center">
        <ul ref={linksRef} className="space-y-6">
          {['About', 'Services', 'Gallery', 'Journal', 'Book'].map((item) => (
            <li key={item} className="overflow-hidden">
              <a
                href={`#${item.toLowerCase()}`}
                onClick={(e) => handleNavClick(e, `#${item.toLowerCase()}`)}
                className="text-6xl font-serif text-[#1A1A1A] block hover:text-[#C4A882] transition-colors"
                data-cursor="link"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
