import React, { useEffect, useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { myAuth } from "../../firebaseConfig.js";
import DBAccess from "../../utils/dbAccess";

function EmailSignIn({ userData, onClick }) {
  const usersDB = new DBAccess("UsersPrivate");

  const saveUserData = async (data) => {
    const DATA_TO_SAVE = {
      userId: data.uid,
      displayName: userData.name,
      email: data.email,
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
    createUserWithEmailAndPassword(myAuth, userData.email, userData.password).then((data) => {
      console.log("data");
      console.log(data);
      saveUserData(data.user);
      localStorage.setItem("email", data.user.email);
      localStorage.setItem("userName", userData.name.toString());
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
        <MdOutlineMail className="mr-2" />
        Registrarse con Email
      </button>
    </div>
  );
}

export default EmailSignIn;
