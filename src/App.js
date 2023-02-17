import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import NavBar from "./components/navBar";

const App = () => {
  return (
    <div className="bg-[#fffefa] scroll-smooth">
      <NavBar></NavBar>
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
