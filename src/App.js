import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Devteam from "./pages/landing/devteamPage";
import AppPage from "./pages/app/appPage";
import Navbar from "./components/common/navBar";
import NewsBanner from "./components/newsBanner.js";
import Landing from "./pages/landing/landingPage";
import Playground from "./pages/playground";
import Footer from "./components/common/footer";
import ReservationForm from "./pages/reservationForm";
import Amenities from "./pages/amenities";
import Footer from "./components/common/footer";
import SignIn from "./pages/signIn/signInPage";
import Login from "./pages/loginPage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { appContext, loginContext } from "./appContext";
import DBAccess from "./utils/dbAccess";

const queryClient = new QueryClient();

const App = () => {
  const usersDB = new DBAccess("UsersPrivate");
  const [loginData, setLoginData] = useState({
    login: null,
  });

  const navBarData = {
    mainBannerRef: useRef(null),
    aboutUsRef: useRef(null),
    ourCustomersRef: useRef(null),
    featuresRef: useRef(null),
    pricingRef: useRef(null),
    registerRef: useRef(null),
  };

  const getUserData = () => {
    // this is a listener that will be triggered every time the user changes
    onAuthStateChanged(auth, async (user) => {
      console.log("auth user changed: ");
      console.log(user);
      if (user) {
        // if user is logged in then query the user data from the DB
        user.aditionalData = await usersDB.getOneById(user.uid);
      }
      setLoginData(user);
    });
  };

  const auth = getAuth();
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="bg-[#fffefa] scroll-smooth">
      <appContext.Provider value={navBarData}>
        <loginContext.Provider value={loginData}>
          <BrowserRouter>
            <QueryClientProvider client={queryClient}>
              <NewsBanner></NewsBanner>
              <Navbar></Navbar>
              <Routes>
                <Route exact path="" element={<Landing></Landing>} />
                <Route exact path="/devTeam" element={<Devteam></Devteam>} />
                <Route exact path="/sign-in/*" element={<SignIn></SignIn>} />
                <Route exact path="/login/*" element={<Login></Login>} />
                <Route exact path="/app/*" element={<AppPage></AppPage>} />
              </Routes>
              <Footer></Footer>
            </QueryClientProvider>
          </BrowserRouter>
        </loginContext.Provider>
      </appContext.Provider>
    </div>
  );
};
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App tab="home" />);
