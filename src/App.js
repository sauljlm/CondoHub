import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Devteam from "./pages/landing/devteamPage";
import Navbar from "./components/common/navBar";
import NewsBanner from "./components/newsBanner.js";
import Landing from "./pages/landing/landingPage";
import Playground from "./pages/playground";
import Footer from "./components/common/footer";
import ReservationForm from "./pages/reservationForm";
import Amenities from "./pages/amenities";
import Register from "./components/landing/register";
import Footer from "./components/common/footer";
import SignIn from "./pages/signIn/signInPage";
// import Login from "./pages//signIn";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { appContext } from "./appContext";

const queryClient = new QueryClient();

const App = () => {
  const [login, setLogin] = useState("");
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setLogin(user);
      }
    });
  }, []);

  const navBarRefs = {
    mainBannerRef: useRef(null),
    aboutUsRef: useRef(null),
    ourCustomersRef: useRef(null),
    featuresRef: useRef(null),
    pricingRef: useRef(null),
    registerRef: useRef(null),
  };

  return (
    <div className="bg-[#fffefa] scroll-smooth">

      <appContext.Provider value={navBarRefs}>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <NewsBanner></NewsBanner>
            {/* {login ? <div>{login.displayName}</div> : null}; */}
            <Navbar></Navbar>
            <Routes>
              <Route exact path="" element={<Landing></Landing>} />
              <Route exact path="/reservationForm" element={<ReservationForm></ReservationForm>} />
              <Route exact path="/devTeam" element={<Devteam></Devteam>} />
              <Route exact path="/playground" element={<Playground></Playground>} />
              <Route exact path="/sign-in/*" element={<SignIn></SignIn>} />
              <Route exact path="/amenities" element={<Amenities></Amenities>} />
              {/* <Route exact path="/login/*" element={<login></login>} /> */}
            </Routes>
            <Footer></Footer>
          </QueryClientProvider>
        </BrowserRouter>
      </appContext.Provider>
    </div>
  );
};
const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App tab="home" />);
