import GetPaidInstantly from "@/components/sections/GetPaidInstantly";
import Hero from "@/components/sections/Hero";
import StatsBanner from "@/components/sections/StatsBanner";
import WhyChooseUs from "@/components/sections/WhyChooseUs";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <GetPaidInstantly />
      <StatsBanner />
    </>
  );
};

export default HomePage;
