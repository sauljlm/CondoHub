import devEduardoPhoto from "../../assets/devEduardoRomaguera.png";
import devTatianaPhoto from "../../assets/devTatianaAraya.png";
import devSaulPhoto from "../../assets/devSaulLopez.png";
import Dev from "../../components/landing/dev.js";
import SideNav from "../../components/common/sideNav.js";
import UserProfile from "../userProfile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainContent from "./mainContent";

const AppPage = () => {
  return (
    <div className="grid grid-cols-10">
      <SideNav></SideNav>
      <MainContent></MainContent>
    </div>
  );
};

export default AppPage;
