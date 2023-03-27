import React, { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { signInWithPopup } from "firebase/auth";
import { auth, myGoogleAuthProvider } from "../../firebaseConfig.js";
import DBAccess from "../../utils/dbAccess";

function GoogleSignIn({ userData, onClick }) {
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
    await usersDB.create(DATA_TO_SAVE, UID);
  };

  const handleClick = () => {
    if (!onClick()) {
      return;
    }
    signInWithPopup(auth, myGoogleAuthProvider).then((data) => {
      saveUserData(data.user);
      localStorage.setItem("email", data.user.email);
      localStorage.setItem("userName", data.user.displayName.toString());
      localStorage.setItem("uid", data.user.uid);
    });
  };

  //lOG OUT code
  // firebase.auth().signOut().then(function() {
  //   // Sign-out successful.
  // }).catch(function(error) {
  //   // An error happened.
  // });

  return (
    <div>
      <button
        type="submit"
        className="flex items-center justify-center px-3 py-3 rounded-lg w-60 font-semibold text-sm duration-150 text-white bg-blue-900 hover:bg-red-700 active:bg-red-800"
        onClick={() => {
          handleClick();
        }}
      >
        <FaGoogle className="mr-2" />
        Registrarse con Google
      </button>
    </div>
  );
}

export default GoogleSignIn;
