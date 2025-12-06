import Categories from "@/components/modules/Home/Categories";
import CTA from "@/components/modules/Home/Cta";
import FeaturedEvents from "@/components/modules/Home/Featuredevents";
import Hero from "@/components/modules/Home/Hero";
import HowItWorks from "@/components/modules/Home/HowItWorks";
import Testimonials from "@/components/modules/Home/Testimonials";
import WhyChooseUs from "@/components/modules/Home/Whychooseus";
import React from "react";

const Home = () => {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <FeaturedEvents />
      <Categories />
      <WhyChooseUs />
      <Testimonials />
      <CTA />
    </div>
  );
};

export default Home;
