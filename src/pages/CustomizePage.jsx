import HeroSection from '../features/designs/HeroSection';
import HowItWorks from '../features/designs/HowItWorks';
import CardOfDesigner from '../features/designs/CardOfDesigner';

export default function CustomizePage() {
  return (
    <div className="py-10">

      {/* Her Section  */}
      <HeroSection />

      {/* how it work section */}
      <HowItWorks />
      {/* cards */}
      <CardOfDesigner />
    </div>
  );
}
