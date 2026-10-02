import HeroSection from '../features/designs/HeroSection';
import HowItWorks from '../features/designs/HowItWorks';
import CardOfDesigner from '../features/designs/CardOfDesigner';
import PageTitle from '../components/PageTitle';
import Reveal from '../components/Reveal';
import VideoTutorial from '../features/designs/VideoTutorial';

export default function CustomizePage() {
  return (
    <div className="py-10">
      <PageTitle title="Customize" />

      <HeroSection />

      <Reveal>
        <HowItWorks />
      </Reveal>

      <Reveal>
        <CardOfDesigner />
      </Reveal>

      <Reveal>
        <VideoTutorial />
      </Reveal>
    </div>
  );
}
