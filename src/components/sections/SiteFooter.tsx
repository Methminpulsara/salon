'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { MapPin } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Logo text reveal
      gsap.fromTo(
        '.footer-logo span',
        { y: '100%' },
        {
          y: '0%',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
          }
        }
      );

      // Columns stagger
      gsap.fromTo(
        '.footer-col',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 75%',
          }
        }
      );

      // Bottom bar fade
      gsap.fromTo(
        '.footer-bottom',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          delay: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 75%',
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  });

  return (
    <footer ref={footerRef} className="bg-[#0D0D0D] text-[#F9F9F7] pt-24 pb-8 border-t border-white/10">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Logo Area */}
        <div className="mb-20 overflow-hidden">
          <h2 className="footer-logo font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none text-center lg:text-left">
            <span className="block">AURÈLE</span>
          </h2>
        </div>

        {/* Four Columns Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20 font-sans">
          
          {/* Col 1: Brand & Social */}
          <div className="footer-col flex flex-col items-center lg:items-start text-center lg:text-left">
            <p className="text-white/60 mb-8 max-w-xs font-light">
              Elevating the art of hair and beauty through personalized, premium experiences.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 border border-white/20 rounded-full hover:bg-white/10 hover:border-white/40 transition-all hover:scale-110">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="p-2 border border-white/20 rounded-full hover:bg-white/10 hover:border-white/40 transition-all hover:scale-110">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/></svg>
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="p-2 border border-white/20 rounded-full hover:bg-white/10 hover:border-white/40 transition-all hover:scale-110">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                <span className="sr-only">X (Twitter)</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="footer-col flex flex-col items-center lg:items-start">
            <h4 className="uppercase tracking-widest text-xs font-semibold mb-6 text-white/90">Navigation</h4>
            <ul className="space-y-4 text-center lg:text-left text-white/60">
              <li><Link href="/" className="hover:text-[#D4B5B0] transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-[#D4B5B0] transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-[#D4B5B0] transition-colors">Services</Link></li>
              <li><Link href="/gallery" className="hover:text-[#D4B5B0] transition-colors">Gallery</Link></li>
              <li><Link href="/contact" className="hover:text-[#D4B5B0] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="footer-col flex flex-col items-center lg:items-start">
            <h4 className="uppercase tracking-widest text-xs font-semibold mb-6 text-white/90">Services</h4>
            <ul className="space-y-4 text-center lg:text-left text-white/60">
              <li><Link href="/services#cut" className="hover:text-[#D4B5B0] transition-colors">Cut & Style</Link></li>
              <li><Link href="/services#color" className="hover:text-[#D4B5B0] transition-colors">Color Mastery</Link></li>
              <li><Link href="/services#treatment" className="hover:text-[#D4B5B0] transition-colors">Treatments</Link></li>
              <li><Link href="/services#bridal" className="hover:text-[#D4B5B0] transition-colors">Bridal</Link></li>
              <li><Link href="/services#extensions" className="hover:text-[#D4B5B0] transition-colors">Extensions</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact & Hours */}
          <div className="footer-col flex flex-col items-center lg:items-start">
            <h4 className="uppercase tracking-widest text-xs font-semibold mb-6 text-white/90">Studio</h4>
            <ul className="space-y-4 text-center lg:text-left text-white/60">
              <li className="flex items-start gap-2 justify-center lg:justify-start">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>123 Elegance Avenue, Suite 400<br/>New York, NY 10012</span>
              </li>
              <li><a href="tel:+15551234567" className="hover:text-[#D4B5B0] transition-colors">+1 (555) 123-4567</a></li>
              <li><a href="mailto:hello@aurelesalon.com" className="hover:text-[#D4B5B0] transition-colors">hello@aurelesalon.com</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40 font-sans">
          <p>&copy; 2026 Aurèle Salon. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
          <p>Crafted with care</p>
        </div>

      </div>
    </footer>
  );
}
