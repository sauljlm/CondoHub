import React from "react";
import LogOut from "../signIn/logout";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { loginContext } from "../../appContext.js";

const SideNav = () => {
  const userContext = useContext(loginContext);
  let navigate = useNavigate();
  console.log(userContext);
  const handleClick = (path) => {
    navigate(path);
    window.scrollTo({ behavior: "smooth", top: 0 });
  };

  return (
    <div className="bg-darkBlueTheme min-h-screen w-full text-white flex flex-col justify-between mt-[-80px]">
      <div className="mt-32">
        <ul className="list-none ">
          <li className="flex flex-row w-full justify-center mb-10">
            <span className="font-semibold italic tracking-widest">
              {userContext && userContext.aditionalData && userContext.aditionalData.condoName
                ? userContext.aditionalData.condoName
                : "Loading..."}
            </span>
          </li>

          <li className="my-px">
            <button
              onClick={() => {
                handleClick("profile");
              }}
              className="flex flex-row w-full my-6 items-center h-12 px-4 rounded-lg text-gray-300 hover:bg-gray-700"
            >
              <span className="flex items-center justify-center text-lg text-gray-400">
                <i className="bx bx-user"></i>
              </span>
              <span className="ml-3">Perfil de usuario</span>
            </button>
          </li>
          <li className="my-px">
            <button
              onClick={() => {
                handleClick("news");
              }}
              className="flex flex-row w-full my-6 items-center h-12 px-4 rounded-lg text-gray-300 hover:bg-gray-700"
            >
              <span className="flex items-center justify-center text-lg text-gray-400">
                <i className="bx bx-news"></i>
              </span>
              <span className="ml-3">Noticias</span>
            </button>
          </li>
          <li className="my-px">
            <button
              onClick={() => {
                handleClick("amenities");
              }}
              className="flex flex-row w-full my-6 items-center h-12 px-4 rounded-lg text-gray-300 hover:bg-gray-700"
            >
              <span className="flex items-center justify-center text-lg text-gray-400">
                <i className="bx bx-basket"></i>
              </span>
              <span className="ml-3">Amenidades</span>
            </button>
          </li>
          <li className="my-px">
            <button
              onClick={() => {
                handleClick("reservationForm");
              }}
              className="flex flex-row w-full my-6 items-center h-12 px-4 rounded-lg text-gray-300 hover:bg-gray-700"
            >
              <span className="flex items-center justify-center text-lg text-gray-400">
                <i className="bx bx-calendar"></i>
              </span>
              <span className="ml-3">Reservaciones</span>
            </button>
          </li>
        </ul>
      </div>
      <div className="mb-8">
        <button className="flex flex-row w-full my-6 items-center h-12 px-4 rounded-lg text-gray-300 hover:bg-gray-700">
          <span className="flex items-center justify-center text-lg text-gray-400">
            <i className="bx bx-log-out"></i>
          </span>
          <span className="ml-3">
            <LogOut></LogOut>
          </span>
        </button>
      </div>
    </div>
  );
};

export default SideNav;
