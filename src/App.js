import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Faq from "./components/faq";
import Login from "./components/login";
import NavBar from "./components/navBar";
import Newsletter from "./components/Newsletter/newsletter";
import Amenidades from "./components/amenidades";
import Reservations from "./components/reservations";

const App = () => {
  return (
    <div className="bg-[#fffefa] scroll-smooth">
      <NavBar></NavBar>
      <Faq></Faq>
      <Login></Login>
      <Reservations></Reservations>
      <Amenidades></Amenidades>
      <BrowserRouter>
        {/* <Navbar></Navbar> */}
        <Routes>
          {/* <Route exact path="/devTeam" element={<Devteam></Devteam>} /> */}
          {/* <Route exact path="" element={<Landing></Landing>} /> */}
        </Routes>
        {/* <Footer></Footer> */}
      </BrowserRouter>
    </div>
  );
};

ReactDOM.render(React.createElement(App), document.getElementById("root"));
