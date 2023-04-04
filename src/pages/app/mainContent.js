import UserProfile from "../userProfile";
import { Routes, Route } from "react-router-dom";
import Amenities from "../amenities.js";
import RegistrationForm from "../reservationForm.js";
import AdminReservation from "../adminReservation.js";
import Playground from "../playground.js";

const MainContent = () => {
  return (
    <div className="m-2 col-start-2 col-span-9" style={{ minHeight: `calc(100vh -80px)` }}>
      <Routes>
        <Route path="/profile" element={<UserProfile></UserProfile>} />
        <Route path="/amenities" element={<Amenities></Amenities>} />
        <Route path="/reservationForm" element={<RegistrationForm></RegistrationForm>} />
        <Route path="/adminReservation" element={<AdminReservation></AdminReservation>} />
        <Route path="/playground" element={<Playground></Playground>} />
      </Routes>
    </div>
  );
};

export default MainContent;
