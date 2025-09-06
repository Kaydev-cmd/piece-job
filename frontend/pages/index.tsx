import GetPaidInstantly from "@/components/sections/GetPaidInstantly";
import Hero from "@/components/sections/Hero";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import HowItWorks from "@/components/sections/HowItWorks";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <GetPaidInstantly />
      <HowItWorks />
    </>
  );
};

export default HomePage;
