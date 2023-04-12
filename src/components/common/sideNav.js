import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { loginContext } from "../../appContext.js";

const SideNav = () => {
  const [sideNavButtons, setSideNavButtons] = useState([]);
  const userContext = useContext(loginContext);
  let navigate = useNavigate();
  const handleClick = (path) => {
    navigate(path);
    window.scrollTo({ behavior: "smooth", top: 0 });
  };

  useEffect(() => {
    if (userContext?.aditionalData?.roles?.includes("admin")) {
      setSideNavButtons(adminButtons);
    } else {
      setSideNavButtons(userButtons);
    }
  }, [userContext]);

  let userButtons = [
    ["news", "Noticias"],
    ["amenities", "Amenidades"],
    ["reservationForm", "Reservaciones"],
  ];

  let adminButtons = [
    ["news", "Noticias"],
    ["manageNews", "Administrar Noticias"],
    ["amenities", "Amenidades"],
    ["reservationForm", "Reservaciones"],
    ["adminReservation", "Administrar Reservaciones"],
  ];

  return (
    <div className="fixed bg-darkBlueTheme min-h-screen  max-h-screen  w-48 text-white flex flex-col justify-between mt-[-80px]">
      <div className="mt-32">
        <ul className="list-none ">
          <li className="flex flex-row w-full justify-center mb-10">
            <span className="font-semibold italic tracking-widest">
              {userContext && userContext.aditionalData && userContext.aditionalData.condoName
                ? userContext.aditionalData.condoName
                : "Loading..."}
            </span>
          </li>
          {sideNavButtons.map((button) => {
            return (
              <li className="my-px" key={button[0]}>
                <button
                  onClick={() => {
                    handleClick(button[0]);
                  }}
                  className="flex flex-row w-full my-6 items-center text-left h-12 px-4 rounded-lg text-gray-300 hover:bg-gray-700"
                >
                  <span className="flex items-center justify-center text-lg text-gray-400">
                    <i className="bx bx-user"></i>
                  </span>
                  <span className="ml-3">{button[1]}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      {/* <div className="my-px py-7">
        <button className="flex flex-row w-full items-center text-left h-12 rounded-lg text-gray-300 hover:bg-gray-700">
          <LogOut></LogOut>
        </button>
      </div> */}
    </div>
  );
};

export default SideNav;
