import React from "react";
import Navbar from "../components/User/UserNavbar";
import HeroSection from "../components/UserHome/HeroSection";
import FeaturesSection from "../components/UserHome/FeaturesSection";
import HowItWorksSection from "../components/UserHome/HowItWorksSection";
import TestimonialsSection from "../components/UserHome/TestimonialsSection";
import ContactSection from "../components/UserHome/ContactSection";
import Footer from "../components/Footer";


const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <HeroSection/>
      <FeaturesSection/>
      <HowItWorksSection/>
      <TestimonialsSection/>
      <ContactSection/>
      <Footer/>
    </div>
  );
};

export default Home;
