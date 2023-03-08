import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Devteam from "./components/devTeam/Devteam";
import Navbar from "./components/navBar/navBar";
import NewsBanner from "./components/newsBanner.js";
import Landing from "./pages/landing/landing";
import Playground from "./pages/playground/playground";
import Footer from "./components/footer/footer";

const queryClient = new QueryClient();

const App = () => {
  return (
    <div className="bg-[#fffefa] scroll-smooth">
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <NewsBanner></NewsBanner>
          <Navbar></Navbar>
          <Routes>
            <Route exact path="/devTeam" element={<Devteam></Devteam>} />
            <Route exact path="" element={<Landing></Landing>} />
            <Route exact path="/playground" element={<Playground></Playground>} />
          </Routes>
          <Footer></Footer>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
};

ReactDOM.render(React.createElement(App), document.getElementById("root"));
