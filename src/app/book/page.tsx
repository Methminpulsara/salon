'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { siteConfig } from '@/config/site';
import SiteFooter from '@/components/sections/SiteFooter';
import Image from 'next/image';

export default function BookPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useGSAP(() => {
    gsap.fromTo('.form-element',
      { y: 20, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.2
      }
    );
  }, { scope: containerRef });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\\S+@\\S+\\.\\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Attempt mailto fallback
      const subject = encodeURIComponent(`Booking Enquiry from ${formData.name}`);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService: ${formData.service}\nPreferred Date: ${formData.date}\nPreferred Time: ${formData.time}\n\nMessage: ${formData.message}`);
      window.location.href = `mailto:${siteConfig.email || 'hello@example.com'}?subject=${subject}&body=${body}`;
    }, 1500);
  };

  return (
    <main ref={containerRef} className="bg-[#fcfbf9] min-h-screen pt-32">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 text-center">
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-stone-900 mb-6">Book Your Experience</h1>
        <p className="font-sans text-stone-500 text-lg md:text-xl tracking-wide max-w-2xl mx-auto font-light">
          Begin your transformation
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-32">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Form */}
          <div className="w-full lg:w-3/5">
            {isSuccess ? (
              <div className="bg-stone-100 p-12 text-center h-full flex flex-col justify-center items-center rounded-sm form-element">
                <h3 className="font-serif text-3xl text-stone-900 mb-4">Thank You</h3>
                <p className="font-sans text-stone-600 mb-8 max-w-md">
                  Thank you for your enquiry. Since our online booking is being set up, please contact us directly to confirm your appointment.
                </p>
                <div className="flex flex-col gap-4">
                  <a href={`mailto:${siteConfig.email || 'hello@example.com'}`} className="font-sans uppercase tracking-widest text-sm text-stone-900 hover:text-stone-500 transition-colors">{siteConfig.email || 'hello@example.com'}</a>
                  <a href={`tel:${siteConfig.phone || '+1234567890'}`} className="font-sans uppercase tracking-widest text-sm text-stone-900 hover:text-stone-500 transition-colors">{siteConfig.phone || '+1 (234) 567-890'}</a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 form-element">
                  {/* Name */}
                  <div className="flex flex-col gap-2 relative">
                    <label htmlFor="name" className="font-sans text-sm uppercase tracking-widest text-stone-500">Full Name *</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleChange}
                      className={`bg-transparent border-b ${errors.name ? 'border-red-500' : 'border-stone-300'} py-3 focus:outline-none focus:border-stone-900 transition-colors font-sans text-stone-900`}
                    />
                    {errors.name && <span className="text-red-500 text-xs absolute -bottom-5">{errors.name}</span>}
                  </div>
                  {/* Email */}
                  <div className="flex flex-col gap-2 relative">
                    <label htmlFor="email" className="font-sans text-sm uppercase tracking-widest text-stone-500">Email Address *</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      className={`bg-transparent border-b ${errors.email ? 'border-red-500' : 'border-stone-300'} py-3 focus:outline-none focus:border-stone-900 transition-colors font-sans text-stone-900`}
                    />
                    {errors.email && <span className="text-red-500 text-xs absolute -bottom-5">{errors.email}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 form-element">
                  {/* Phone */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="font-sans text-sm uppercase tracking-widest text-stone-500">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-transparent border-b border-stone-300 py-3 focus:outline-none focus:border-stone-900 transition-colors font-sans text-stone-900"
                    />
                  </div>
                  {/* Service */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="service" className="font-sans text-sm uppercase tracking-widest text-stone-500">Service</label>
                    <select 
                      id="service" 
                      name="service" 
                      value={formData.service}
                      onChange={handleChange}
                      className="bg-transparent border-b border-stone-300 py-3 focus:outline-none focus:border-stone-900 transition-colors font-sans text-stone-900 appearance-none rounded-none cursor-pointer"
                    >
                      <option value="">Select a service</option>
                      {siteConfig.services.map(s => (
                        <option key={s.id} value={s.id}>{s.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 form-element">
                  {/* Date */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="date" className="font-sans text-sm uppercase tracking-widest text-stone-500">Preferred Date</label>
                    <input 
                      type="date" 
                      id="date" 
                      name="date" 
                      value={formData.date}
                      onChange={handleChange}
                      className="bg-transparent border-b border-stone-300 py-3 focus:outline-none focus:border-stone-900 transition-colors font-sans text-stone-900 cursor-pointer"
                    />
                  </div>
                  {/* Time */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="time" className="font-sans text-sm uppercase tracking-widest text-stone-500">Preferred Time</label>
                    <select 
                      id="time" 
                      name="time" 
                      value={formData.time}
                      onChange={handleChange}
                      className="bg-transparent border-b border-stone-300 py-3 focus:outline-none focus:border-stone-900 transition-colors font-sans text-stone-900 appearance-none rounded-none cursor-pointer"
                    >
                      <option value="">Select time</option>
                      <option value="morning">Morning (9AM - 12PM)</option>
                      <option value="afternoon">Afternoon (12PM - 4PM)</option>
                      <option value="evening">Evening (4PM - 7PM)</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2 form-element">
                  <label htmlFor="message" className="font-sans text-sm uppercase tracking-widest text-stone-500">Additional Details</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="bg-transparent border-b border-stone-300 py-3 focus:outline-none focus:border-stone-900 transition-colors font-sans resize-none text-stone-900"
                  />
                </div>

                <div className="form-element pt-4">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-12 py-5 bg-stone-900 text-white font-sans text-sm tracking-widest uppercase hover:bg-stone-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending Enquiry...' : 'Submit Request'}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Sidecar Info Panel */}
          <div className="hidden lg:block w-2/5 form-element">
            <div className="bg-stone-100 p-12 h-full rounded-sm">
              <h3 className="font-serif text-3xl text-stone-900 mb-8">Visit Us</h3>
              
              <div className="flex flex-col gap-8">
                <div>
                  <h4 className="font-sans text-sm uppercase tracking-widest text-stone-500 mb-2">Location</h4>
                  <p className="font-sans text-stone-900 leading-relaxed whitespace-pre-wrap">
                    {siteConfig.address.full || '123 Salon Avenue, Suite 100\nFashion District, NY 10001'}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-sans text-sm uppercase tracking-widest text-stone-500 mb-2">Hours</h4>
                  <ul className="flex flex-col gap-1">
                    {siteConfig.hours.map((h, i) => (
                      <li key={i} className="flex justify-between font-sans text-stone-900 text-sm">
                        <span>{h.day}</span>
                        <span>{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-sans text-sm uppercase tracking-widest text-stone-500 mb-2">Contact</h4>
                  <p className="font-sans text-stone-900 leading-relaxed">
                    {siteConfig.phone || '+1 (234) 567-890'}<br />
                    {siteConfig.email || 'hello@example.com'}
                  </p>
                </div>

                <div className="relative w-full aspect-video mt-4 overflow-hidden rounded-sm">
                  <Image 
                    src="/images/salon-interior.jpg" 
                    alt="Salon Location" 
                    fill 
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
