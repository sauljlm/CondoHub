import UserProfile from "../userProfile";
import { Routes, Route } from "react-router-dom";
import Amenities from "../amenities.js";
import RegistrationForm from "../reservationForm.js";
import AdminReservation from "../adminReservation.js";
import Playground from "../playground.js";
import NewsPage from "../newsPage.js";
import ManageNewsPage from "../manageNewsPage.js";
import ManageAmenitiesPage from "../manageAmenitiesPage.js";

const MainContent = () => {
  return (
    <div className="m-2 col-start-2 col-span-9 bg-gray-100" style={{ minHeight: "calc(100vh - 80px)" }}>
      <Routes>
        <Route path="/profile" element={<UserProfile></UserProfile>} />
        <Route path="/amenities" element={<Amenities></Amenities>} />
        <Route path="/manageAmenities" element={<ManageAmenitiesPage></ManageAmenitiesPage>} />
        <Route path="/reservationForm/:id" element={<RegistrationForm></RegistrationForm>} />
        <Route path="/reservationForm/" element={<RegistrationForm></RegistrationForm>} />
        <Route path="/adminReservation" element={<AdminReservation></AdminReservation>} />
        <Route path="/playground" element={<Playground></Playground>} />
        <Route path="/news" element={<NewsPage></NewsPage>} />
        <Route path="/manageNews" element={<ManageNewsPage></ManageNewsPage>} />
        <Route path="/*" element={<NewsPage></NewsPage>} />
      </Routes>
    </div>
  );
};

export default MainContent;
