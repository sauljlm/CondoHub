//Floatui component https://www.floatui.com/

import { useState } from "react";
import appLogo from "../../assets/logos/condoHubLogoOnlyTransparentGreenLight.png";

const Navbar = () => {
  const [state, setState] = useState(false);
  const pathname = window.location.pathname;
  let navigation = [];
  if (pathname !== "/devteam") {
    navigation = [
      { title: "Inicio", path: "#start" },
      { title: "Quienes somos", path: "#aboutUs" },
      { title: "Nuestros clientes", path: "#ourCustomers" },
      { title: "Funciones", path: "#features" },
      { title: "Precios", path: "#pricing" },
      { title: "DevTeam", path: "/devteam" },
      { title: "Contacto", path: "#contact" },
    ];
  }

  return (
    <nav className="bg-stone-900 w-full border-b sticky top-0 z-50 md:border-0 mt:mb-5">
      <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between py-2 md:py-5 md:block">
          <a className="flex" href="/">
            <img src={appLogo} width={50} height={50} alt="CondoHUB UI logo" />
            <div className="font-bold text-white text-lg ml-5 grid place-content-center">
              <span className="self-center">CondoHUB</span>
            </div>
          </a>
          <div className="md:hidden">
            <button
              className="text-gray-100 outline-none bg-lightGreenTheme p-2 rounded-md focus:border-grey-500 focus:border"
              onClick={() => setState(!state)}
            >
              {state ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? "block" : "hidden"}`}>
          <ul className="justify-center items-center space-y-8 md:flex md:space-x-10 md:space-y-0">
            {navigation.map((item, idx) => {
              return (
                <li key={idx} className="text-white font-bold  hover:text-lightGreenTheme">
                  <a href={item.path}>{item.title}</a>
                </li>
              );
            })}
          </ul>
        </div>
        {pathname !== "/devteam" && (
          <div className="hidden md:inline-block">
            <a
              href="#newsletter"
              className="py-3 px-4 text-black bg-lightGreenTheme hover:bg-greenTheme rounded-md shadow"
            >
              Login
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
