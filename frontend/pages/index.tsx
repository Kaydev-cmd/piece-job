import GetPaidInstantly from "@/components/sections/GetPaidInstantly";
import Hero from "@/components/sections/Hero";
import JobExpertise from "@/components/sections/JobExpertise";
import WhyChooseUs from "@/components/sections/WhyChooseUs";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <GetPaidInstantly />
      <JobExpertise />
    </>
  );
};

export default HomePage;
