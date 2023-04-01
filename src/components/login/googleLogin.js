import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { myAuth, myGoogleAuthProvider } from "../../firebaseConfig.js";
import DBAccess from "../../utils/dbAccess";

function GoogleLogin() {
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
    signInWithPopup(myAuth, myGoogleAuthProvider).then((data) => {
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
        <FcGoogle className="mx-8 text-lg"></FcGoogle>
        Iniciar sesión con Google
      </button>
    </div>
  );
}

export default GoogleLogin;
