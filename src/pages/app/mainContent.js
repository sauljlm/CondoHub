import SideNav from "../../components/common/sideNav.js";
import UserProfile from "../userProfile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Amenities from "../amenities.js";
import RegistrationForm from "../reservationForm.js";
import Playground from "../playground.js";

const MainContent = () => {
  return (
    <div className="m-2 w-100 col-start-2 col-span-9">
      <Routes>
        <Route path="/profile" element={<UserProfile></UserProfile>} />
        <Route path="/amenities" element={<Amenities></Amenities>} />
        <Route path="/reservationForm" element={<RegistrationForm></RegistrationForm>} />
        <Route path="/playground" element={<Playground></Playground>} />
      </Routes>
      {/* <UserProfile></UserProfile> */}
    </div>
  );
};

export default MainContent;
