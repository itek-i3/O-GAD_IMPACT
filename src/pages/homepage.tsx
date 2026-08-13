import HeroSection from '@/components/components/herosection';
import AboutSection from '@/components/components/about';
import ContactSection from '@/components/components/contact';

export default function Homepage() {
  return (
    <div className='bg-white'>
      <HeroSection />
      <AboutSection />
      <ContactSection />
    </div>
  )
}
