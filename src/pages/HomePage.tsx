import Hero from "../components/Hero";
import TopMenu from "../components/TopMenu";

const HomePage = () => {
  return (
    <div className="h-screen bg-neutral-50">
      <TopMenu />
      <Hero />
    </div>
  );
};

export default HomePage;
