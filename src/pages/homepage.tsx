import HeroSection from '@/components/components/herosection';
import AboutSection from '@/components/components/about';
import ProgramsSection from '@/components/components/programs';
import ContactSection from '@/components/components/contact';

export default function Homepage() {
  return (
    <div className='bg-white'>
      <HeroSection />
      <AboutSection />
      <ProgramsSection />
      <ContactSection />
    </div>
  )
}
