import React from "react";
import HeroSlider from "./HeroSlider";
import Crops2 from './Crops2';
import KrishiLink from './KrishiLink';
import AgroEvents from "./AgroEvents";
import WhatIsKrishiLink from "./WhatIsKrishiLink";
import OurServices from "./OurServices";
import Testimonials from "./Testimonials";
import FAQ from "./FAQ";
import CTASection from "./CTASection";
import NewsletterSection from "./NewsLetterSection";
import { ToastContainer } from "react-toastify";
const Home = () => {
  return (
    <div className="">
      <ToastContainer></ToastContainer>
      <HeroSlider />
      <WhatIsKrishiLink></WhatIsKrishiLink>
      <Crops2></Crops2>
      <CTASection></CTASection>
      <Testimonials></Testimonials>
      <AgroEvents></AgroEvents>
      <KrishiLink></KrishiLink>
      <NewsletterSection></NewsletterSection>
      <FAQ></FAQ>
      <OurServices></OurServices>
    </div>
  );
};

export default Home;
