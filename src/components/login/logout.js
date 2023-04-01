import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { appContext } from "../../appContext.js";
import { myAuth, myGoogleAuthProvider } from "../../firebaseConfig.js";
// import firebase from "firebase/app";
import "firebase/auth";

function LogOut({ userData, onClick }) {
  const context = useContext(appContext);

  const handleClick = () => {
    myAuth
      .signOut()
      .then(function () {
        console.log("Sign-out successful");
      })
      .catch(function (error) {
        console.log("An error happened.");
      });
  };

  return (
    <div>
      <button
        type="submit"
        // className="flex items-center justify-center px-3 py-3 rounded-lg w-60 font-semibold text-sm duration-150 text-white bg-blue-900 hover:bg-red-700 active:bg-red-800"
        onClick={() => {
          handleClick();
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
}

export default LogOut;
