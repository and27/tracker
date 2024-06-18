import Hero from "../components/Hero";
import TopMenu from "../components/TopMenu";
import { Testimonials } from "../components/Testimonials";
import { Footer } from "../components/Footer";
import { HomePageChart } from "../components/HomePageChart";

const HomePage = () => {
  return (
    <div className="h-screen pattern text-white bg-neutral-50 dark:bg-neutral-900">
      <TopMenu />
      <Hero />
      <HomePageChart />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default HomePage;
