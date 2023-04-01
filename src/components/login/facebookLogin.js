import React, { useEffect, useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { myAuth, myFacebookAuthProvider } from "../../firebaseConfig.js";
import DBAccess from "../../utils/dbAccess";

function FacebookLogin() {
  let navigate = useNavigate();
  const usersDB = new DBAccess("UsersPrivate");

  const saveUserData = async (data) => {
    const DATA_TO_SAVE = {
      userId: data.uid,
      displayName: data.displayName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      name: userData.name,
      id: userData.id,
      condoNumber: userData.condoNumber,
      condoName: userData.condoName,
    };
    await usersDB.create(DATA_TO_SAVE, data.uid);
  };

  const handleClick = () => {
    signInWithPopup(myAuth, myFacebookAuthProvider).then((data) => {
      console.log(data.user);
      navigate("/app");
    });
  };

  return (
    <div>
      <button
        type="submit"
        className="flex items-center justify-start py-3 rounded-lg w-80 font-semibold text-sm duration-150 text-black bg-neutral-200 hover:bg-red-400 hover:text-white active:bg-red-800 mb-7"
        onClick={() => {
          handleClick();
        }}
      >
        <FaFacebook className="mx-8 text-lg text-blue-700" />
        Iniciar sesión con Facebook
      </button>
    </div>
  );
}

export default FacebookLogin;
