import { React } from "react";
import AboutUs from "../../components/landing/aboutUs";
import MainBanner from "../../components/landing/mainBanner";
import OurCustomers from "../../components/landing/ourCustomers";
import Features from "../../components/landing/features";
import Pricing from "../../components/landing/pricing";
import Register from "../../components/landing/register";

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
