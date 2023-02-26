import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Devteam from "./components/devTeam/Devteam";
import Navbar from "./components/navBar/navBar";
import NewsBanner from "./components/newsBanner.js";
import Landing from "./pages/landing/landing";
import Playground from "./pages/playground/playground";
import Footer from "./components/footer/footer";

const App = () => {
  return (
    <div className="bg-[#fffefa] scroll-smooth">
      <BrowserRouter>
        <NewsBanner></NewsBanner>
        <Navbar></Navbar>
        <Routes>
          <Route exact path="/devTeam" element={<Devteam></Devteam>} />
          <Route exact path="" element={<Landing></Landing>} />
          <Route exact path="/playground" element={<Playground></Playground>} />
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
};

ReactDOM.render(React.createElement(App), document.getElementById("root"));
