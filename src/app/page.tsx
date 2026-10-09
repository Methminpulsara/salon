import { HeroSection } from '@/components/sections/HeroSection';
import { ScrollStorySection } from '@/components/sections/ScrollStorySection';
import { BrandStatement } from '@/components/sections/BrandStatement';
import ServiceExplorer from '@/components/sections/ServiceExplorer';
import HorizontalGallery from '@/components/sections/HorizontalGallery';
import ProcessSection from '@/components/sections/ProcessSection';
import BeforeAfterSection from '@/components/sections/BeforeAfterSection';
import AtmosphereSection from '@/components/sections/AtmosphereSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import LocationSection from '@/components/sections/LocationSection';
import FinalBookingCTA from '@/components/sections/FinalBookingCTA';
import SiteFooter from '@/components/sections/SiteFooter';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ScrollStorySection />
      <BrandStatement />
      <ServiceExplorer />
      <HorizontalGallery />
      <ProcessSection />
      <BeforeAfterSection />
      <AtmosphereSection />
      <TestimonialsSection />
      <LocationSection />
      <FinalBookingCTA />
      <SiteFooter />
    </main>
  );
}
