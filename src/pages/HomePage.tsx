import Hero from "../components/Hero";
import { Testimonials } from "../components/Testimonials";
import TopMenu from "../components/TopMenu";
import { Footer } from "../components/Footer";

const HomePage = () => {
  return (
    <div className="h-screen pattern text-white bg-neutral-50 dark:bg-neutral-900">
      <TopMenu />
      <Hero />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default HomePage;
