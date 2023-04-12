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
    <div
      className="flex items-center h-full w-full"
      onClick={() => {
        handleClick();
      }}
      type="submit"
    >
      <div className="pl">Cerrar sesión</div>
    </div>
  );
}

export default LogOut;
