//Floatui component https://www.floatui.com/
import { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import { appContext, loginContext } from "../../../appContext.js";
import { CgProfile } from "react-icons/cg";
import { BsBell } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import appLogo from "../../../assets/logos/condoHubLogoOnlyTransparentGreenLight.png";
import NavigationManager from "../../../utils/navigationManager.js";
import ProfilePopup from "./profilePopup.js";
import NotificationsPopup from "./notificationsPopup.js";

const Navbar = () => {
  let navigate = useNavigate();
  const [state, setState] = useState(false);
  const [pathname, setPathname] = useState(window.location.pathname);
  const context = useContext(appContext);
  const userContext = useContext(loginContext);
  const [photoURL, setPhotoURL] = useState(userContext?.photoURL);
  const navigationManager = new NavigationManager();
  const [displayProfilePopup, setDisplayProfilePopup] = useState(false);
  const [displayNotificationsPopup, setDisplayNotificationsPopup] =
    useState(false);
  const profileButtonRef = useRef(null);
  const notificationsButtonRef = useRef(null);
  useEffect(() => {
    navigationManager.manageUsersAccess();
    setPathname(window.location.pathname);
  });

  useEffect(() => {
    setPhotoURL(userContext?.photoURL);
  }, [userContext?.photoURL]);

  let navigation = [];

  if (pathname == "/") {
    navigation = [
      { title: "Inicio", refName: "mainBannerRef" },
      { title: "Quienes somos", refName: "aboutUsRef" },
      { title: "Nuestros clientes", refName: "ourCustomersRef" },
      { title: "Funciones", refName: "featuresRef" },
      { title: "Precios", refName: "pricingRef" },
      { title: "Contacto", refName: "registerRef" },
      { title: "DevTeam", path: "/devTeam" },
    ];
  }

  const handleClick = (context, item) => {
    if (userContext !== null && window.location.pathname.includes("app")) {
      navigate("/app");
      return;
    }
    if (item.refName) {
      window.scrollTo({
        behavior: "smooth",
        top: context[item.refName].current.offsetTop - 100,
      });
      return;
    }
    navigate(item.path);
    window.scrollTo({ behavior: "smooth", top: 0 });
  };

  const clickProfile = () => {
    setDisplayProfilePopup(!displayProfilePopup);
  };

  const clickNotifications = () => {
    setDisplayNotificationsPopup(!displayNotificationsPopup);
  };

  return (
    <nav className="bg-stone-900 w-full border-b sticky top-0 z-50 md:border-0 mt:mb-5">
      <div
        className={`items-center px-10  mx-8 md:flex md:px-1 ${
          pathname.includes("app") ? "max-w-full ml-6 h-20" : "mx - 1"
        }`}
      >
        <div className="flex items-center justify-between py-2 md:py-5 md:block">
          <button
            className="flex flex-row items-center justify-between"
            onClick={() => {
              pathname.includes("app") && userContext !== null
                ? navigate("/app/news")
                : handleClick(context, { path: "/" });
            }}
          >
            <img src={appLogo} width={50} height={50} alt="CondoHUB UI logo" />
            <div className="font-bold text-white text-lg ml-5 grid place-content-center">
              <span className="self-center">CondoHUB</span>
            </div>
          </button>
          <div className="md:hidden">
            <button
              className="text-gray-100 outline-none bg-lightGreenTheme p-2 rounded-md focus:border-grey-500 focus:border"
              onClick={() => setState(!state)}
            >
              {state ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div
          className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            state ? "block" : "hidden"
          }`}
        >
          <ul className="justify-center items-center space-y-8 md:flex md:space-x-10 md:space-y-0">
            {navigation.map((item, idx) => {
              return (
                <li
                  key={idx}
                  className="text-white font-bold  hover:text-lightGreenTheme"
                >
                  <button
                    onClick={() => {
                      handleClick(context, item);
                    }}
                  >
                    {item.path ? <Link to={item.path}></Link> : null}
                    {item.title}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        {pathname === "/" && (
          <div className="hidden md:inline-block">
            <button
              onClick={() => {
                handleClick(context, { path: "/login" });
              }}
              className="py-3 px-4 mr-5 w-auto text-white border-lightGreenTheme border-2 hover:bg-greenTheme hover:border-greenTheme hover:text-black rounded-md shadow"
            >
              Login
            </button>
            <button
              onClick={() => {
                handleClick(context, { path: "/sign-in" });
              }}
              className="py-3 px-4 w-auto text-black border-lightGreenTheme border-2 bg-lightGreenTheme hover:bg-greenTheme hover:border-greenTheme rounded-md shadow"
            >
              Registrarse
            </button>
          </div>
        )}
        {pathname.includes("app") && userContext !== null && (
          <div className="flex items-center px-10 max-w  mx-auto md:flex md:px-1 max-w-full ml-6 h-20">
            <button
              ref={notificationsButtonRef}
              className="w-auto rounded-full mx-6"
              onClick={() => clickNotifications()}
            >
              <BsBell className="w-fit rounded-full text-white h-11 text-4xl p-3 hover:bg-zinc-700 "></BsBell>
            </button>
            <button
              ref={profileButtonRef}
              className="w-auto rounded-full text-white text-4xl mr-4 hover:border-lightGreenTheme "
              onClick={() => clickProfile()}
            >
              {(photoURL === null || photoURL === undefined) && (
                <CgProfile className="text-4xl "></CgProfile>
              )}
              {photoURL !== null && photoURL !== undefined && (
                <img
                  src={photoURL}
                  alt="Imagen de perfil"
                  className="w-9 h-9 rounded-full"
                />
              )}
            </button>
            <NotificationsPopup
              display={displayNotificationsPopup}
              buttonRef={notificationsButtonRef}
            />
            <ProfilePopup
              display={displayProfilePopup}
              buttonRef={profileButtonRef}
            />
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
