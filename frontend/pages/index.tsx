import GetPaidInstantly from "@/components/sections/GetPaidInstantly";
import Hero from "@/components/sections/Hero";
import JobExpertise from "@/components/sections/JobExpertise";
import StatsBanner from "@/components/sections/StatsBanner";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import HowItWorks from "@/components/sections/HowItWorks";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <GetPaidInstantly />
      <JobExpertise />
      <HowItWorks />
      <StatsBanner />
    </>
  );
};

export default HomePage;
