import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Devteam from "./pages/landing/devteamPage";
import AppPage from "./pages/app/appPage";
import Navbar from "./components/common/navBar/navBar";
import NewsBanner from "./components/newsBanner.js";
import Landing from "./pages/landing/landingPage";
import Footer from "./components/common/footer";
import Footer from "./components/common/footer";
import SignIn from "./pages/signIn/signInPage";
import Login from "./pages/login/loginPage";
import LoginEmailPage from "./pages/login/emailLoginPage";
import Playground from "./pages/playground";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { appContext, loginContext, toastContext } from "./appContext";
import DBAccess from "./utils/dbAccess";
import ToastNotification from "./components/common/toastNotification";

const queryClient = new QueryClient();

const App = () => {
  const usersDB = new DBAccess("UsersPrivate");
  const [toastData, setToastData] = useState({ message: "CondoHub", type: "success", timeOut: 3000 });
  const [loginData, setLoginData] = useState({ login: null });

  const auth = getAuth();
  useEffect(() => {
    getUserData();
  }, []);

  const navBarData = {
    mainBannerRef: useRef(null),
    aboutUsRef: useRef(null),
    ourCustomersRef: useRef(null),
    featuresRef: useRef(null),
    pricingRef: useRef(null),
    registerRef: useRef(null),
  };

  const toastState = {
    data: toastData,
    set: setToastData,
  };

  const getUserData = () => {
    // this is a listener that will be triggered every time the user changes
    onAuthStateChanged(auth, async (user) => {
      console.log("UserData: ");
      if (user) {
        // if user is logged in then query the user data from the DB
        user.aditionalData = await usersDB.getOneById(user.uid);
        user
          .getIdTokenResult()
          .then((token) => {
            const customClaims = token.claims;
            user.aditionalData.roles = customClaims.appRoles;
          })
          .catch((error) => {
            // handle error
          });
      }
      console.log(user);
      setLoginData(user);
    });
  };

  return (
    <div className="bg-[#fffefa] scroll-smooth">
      <appContext.Provider value={navBarData}>
        <loginContext.Provider value={loginData}>
          <toastContext.Provider value={toastState}>
            <BrowserRouter>
              <QueryClientProvider client={queryClient}>
                <NewsBanner></NewsBanner>
                <Navbar></Navbar>
                <Routes>
                  <Route exact path="" element={<Landing></Landing>} />
                  <Route exact path="/devTeam" element={<Devteam></Devteam>} />
                  <Route exact path="/sign-in/*" element={<SignIn></SignIn>} />
                  <Route exact path="/login/*" element={<Login></Login>} />
                  <Route exact path="/login/email/*" element={<LoginEmailPage></LoginEmailPage>} />
                  <Route exact path="/app/*" element={<AppPage></AppPage>} />
                  <Route exact path="/playground/*" element={<Playground></Playground>} />
                </Routes>
                <ToastNotification></ToastNotification>
                <Footer></Footer>
              </QueryClientProvider>
            </BrowserRouter>
          </toastContext.Provider>
        </loginContext.Provider>
      </appContext.Provider>
    </div>
  );
};
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App tab="home" />);
