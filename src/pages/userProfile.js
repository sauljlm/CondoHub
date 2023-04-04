import React from "react";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { loginContext } from "../appContext.js";
import DBAccess from "../utils/dbAccess";

const UserProfile = () => {
  const userContext = useContext(loginContext);
  console.log("userContext");
  console.log(userContext);

  return (
    <div className=" flex flex-col items-center justify-center m-20">
      <div className="bg-white rounded-lg shadow-lg p-8 h-2/3 w-2/3 overflow-auto">
        <div className="flex justify-center mb-8">
          <img
            className="h-32 w-32 rounded-full object-cover"
            src={userContext ? userContext.photoURL : null}
            alt="Profile Image"
          />
        </div>
        <div>
          <h2 className="font-bold text-2xl mb-2">Nombre: {userContext ? userContext.displayName : null}</h2>
        </div>
        <div className="mt-6">
          <h3 className="font-bold text-lg mb-2">Condominio:</h3>
          <p className="text-gray-700">{`Nombre: ${
            userContext.aditionalData ? userContext.aditionalData.condoName : null
          }`}</p>
          <p className="text-gray-700">{`Número: ${
            userContext.aditionalData ? userContext.aditionalData.condoNumber : null
          }`}</p>
        </div>
        <div className="mt-6">
          <h3 className="font-bold text-lg mb-2">Información de contacto:</h3>
          <p className="text-gray-700 text-lg">{userContext ? userContext.email : null}</p>
          <p className="text-gray-700 text-lg">{userContext ? userContext.phoneNumber : null}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
