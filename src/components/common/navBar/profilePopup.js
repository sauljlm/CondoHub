import React, { useState, useContext, useEffect, useRef } from "react";
import { loginContext } from "../../../appContext.js";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import LogOut from "../../signIn/logout";

const ProfilePopup = ({ display, buttonRef }) => {
  let navigate = useNavigate();
  const userContext = useContext(loginContext);
  const [photoURL, setPhotoURL] = useState(userContext.photoURL);
  const [render, setRender] = useState(false);
  const profilePopupRef = useRef(null);

  useEffect(() => {
    setPhotoURL(userContext.photoURL);
  }, [userContext.photoURL]);

  useEffect(() => {
    setRender(!render);
  }, [display]);

  useEffect(() => {
    setRender(false);
  }, []);

  const handleClick = (path) => {
    navigate(path);
    window.scrollTo({ behavior: "smooth", top: 0 });
  };

  const handleClickOutside = (event) => {
    //this line checks if the click was outside of the popup but not in the button, the button reference is passed as a prop
    if (!profilePopupRef.current?.contains(event.target) && !buttonRef.current?.contains(event.target) && render) {
      document.removeEventListener("mouseup", handleClickOutside);
      setRender(!render);
    }
  };

  useEffect(() => {
    if (render) {
      document.addEventListener("mouseup", handleClickOutside);
    }
    if (!render) {
      document.removeEventListener("mouseup", handleClickOutside);
    }
  }, [render]);

  return (
    <div ref={profilePopupRef}>
      {render && (
        <div className="fixed top-16 right-10 bg-zinc-800 drop-shadow-xl rounded-lg p-4 text-gray-100">
          <div className="flex items-center mb-4"></div>
          <div className="flex items-center mb-4">
            {(photoURL === undefined || photoURL === null) && <CgProfile className="text-4xl mr-4"></CgProfile>}
            {photoURL !== undefined && photoURL !== null && (
              <img src={photoURL} alt="Imagen de perfil" className="w-16 h-16 rounded-full mr-4" />
            )}
            <div>
              <p className="text-lg font-bold">{userContext?.aditionalData?.displayName}</p>
              <p className="text-gray-300 text-sm">{userContext?.email}</p>
              <p className="text-gray-300 text-sm ">
                Condo: {userContext?.aditionalData?.condoNumber} | {userContext?.aditionalData?.condoName}
              </p>
            </div>
          </div>
          <button
            onClick={() => handleClick("app/profile")}
            className="flex flex-row w-full my-2 items-center text-left h-12 px-4 rounded-lg text-gray-300 hover:bg-gray-700"
          >
            Mi perfil
          </button>
          <button className="flex flex-row w-full mt-2 items-center text-left h-12 px-4 rounded-lg text-gray-300 hover:bg-gray-700">
            <LogOut></LogOut>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePopup;
