'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticButton } from './MagneticButton';
import { MobileNav } from './MobileNav';
import { useSmoothScroll } from './SmoothScrollProvider';

gsap.registerPlugin(ScrollTrigger);

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const { scrollTo } = useSmoothScroll();

  useGSAP(() => {
    ScrollTrigger.create({
      start: 'top -50',
      onUpdate: (self) => {
        setIsScrolled(self.direction === 1 || self.scroll() > 50);
      },
    });
  }, { scope: headerRef });

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    scrollTo(target);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 transition-colors duration-500 flex items-center justify-between ${
          isScrolled ? 'bg-[#FAF7F2]/90 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <Link href="/" className="text-2xl font-serif font-semibold tracking-wider text-[#1A1A1A] mix-blend-difference" data-cursor="link">
          AURÈLE
        </Link>

        <nav className="hidden md:flex items-center space-x-12">
          {['About', 'Services', 'Gallery', 'Journal'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => handleNavClick(e, `#${item.toLowerCase()}`)}
              className="text-sm uppercase tracking-widest font-medium hover:text-[#C4A882] transition-colors"
              data-cursor="link"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <MagneticButton href="#book" data-cursor="book">
            <span className="px-6 py-3 border border-[#1A1A1A] rounded-full text-sm uppercase tracking-widest font-medium hover:bg-[#1A1A1A] hover:text-white transition-colors">
              Book Now
            </span>
          </MagneticButton>
        </div>

        <button
          className="md:hidden flex flex-col space-y-1.5 z-50 p-2"
          onClick={() => setMobileNavOpen(true)}
          data-cursor="link"
        >
          <span className="block w-6 h-[2px] bg-[#1A1A1A]" />
          <span className="block w-6 h-[2px] bg-[#1A1A1A]" />
        </button>
      </header>
      
      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </>
  );
}
