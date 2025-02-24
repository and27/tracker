import Hero from "../components/Sections/Hero";
import { Testimonials } from "../components/Sections/Testimonials";
import { Footer } from "../components/Sections/Footer";
import { HomePageChart } from "../components/HomePageChart";
import Scurve from "../components/Sections/SCurve";
import HomeDemo from "../components/Sections/HomeDemo";

const HomePage = () => {
  return (
    <div className="h-screen pattern bg-neutral-100 dark:bg-neutral-900 dark:text-neutral-100   ">
      <Hero />
      <HomePageChart />
      <HomeDemo />
      <Testimonials />
      <Scurve />
      <Footer />
    </div>
  );
};

export default HomePage;
