import HeroSection from '../features/designs/HeroSection';
import HowItWorks from '../features/designs/HowItWorks';
import CardOfDesigner from '../features/designs/CardOfDesigner';
import PageTitle from '../components/PageTitle';

export default function CustomizePage() {
  return (
    <div className="py-10">
      <PageTitle title="Customize" />

      {/* Her Section  */}
      <HeroSection />

      {/* how it work section */}
      <HowItWorks />
      {/* cards */}
      <CardOfDesigner />
    </div>
  );
}
