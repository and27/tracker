import Hero from "../components/Sections/Hero";
import { Testimonials } from "../components/Sections/Testimonials";
import { Footer } from "../components/Sections/Footer";
import { HomePageChart } from "../components/HomePageChart";
import Scurve from "../components/Sections/SCurve";

const HomePage = () => {
  return (
    <div className="h-screen pattern text-white bg-neutral-50 dark:bg-neutral-900">
      <Hero />
      <HomePageChart />
      <Testimonials />
      <Scurve />
      <Footer />
    </div>
  );
};

export default HomePage;
