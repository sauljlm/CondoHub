import React, { useEffect, useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { signInWithPopup } from "firebase/auth";
import { myAuth, myFacebookAuthProvider } from "../../firebaseConfig.js";
import DBAccess from "../../utils/dbAccess";

function FacebookSignIn({ userData, onClick }) {
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
    if (!onClick()) {
      return;
    }
    signInWithPopup(myAuth, myFacebookAuthProvider).then((data) => {
      saveUserData(data.user);
      localStorage.setItem("email", data.user.email);
      localStorage.setItem("userName", data.user.displayName.toString());
      localStorage.setItem("uid", data.user.uid);
    });
  };

  return (
    <div>
      <button
        type="submit"
        className="flex items-center justify-center px-3 py-3 rounded-lg w-60 font-semibold text-sm duration-150 text-white bg-blue-900 hover:bg-red-700 active:bg-red-800"
        onClick={() => {
          handleClick();
        }}
      >
        <FaFacebook className="mr-2" />
        Registrarse con Facebook
      </button>
    </div>
  );
}

export default FacebookSignIn;
