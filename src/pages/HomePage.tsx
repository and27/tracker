import Hero from "../components/Hero";
import { Testimonials } from "../components/Testimonials";
import TopMenu from "../components/TopMenu";

const HomePage = () => {
  return (
    <div className="h-screen pattern text-white bg-neutral-50 dark:bg-neutral-900">
      <TopMenu />
      <Hero />
      <Testimonials />
    </div>
  );
};

export default HomePage;
