import React from "react";
import AboutUs from "../../components/landing/aboutUs/aboutUs";
import MainBanner from "../../components/landing/mainBanner/mainBanner";
import OurCustomers from "../../components/landing/ourCustomers/ourCustomers";
import Features from "../../components/landing/features/features";
import Pricing from "../../components/landing/pricing/pricing";
import Register from "../../components/landing/register/register";

const Landing = () => {
  return (
    <div>
      <MainBanner></MainBanner>
      <AboutUs></AboutUs>
      <OurCustomers></OurCustomers>
      <Features></Features>
      <Pricing></Pricing>
      <Register></Register>
    </div>
  );
};

export default Landing;
