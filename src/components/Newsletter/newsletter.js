//Floatui component https://www.floatui.com/

import { useState } from "react";
// import { dbAccess } from "./dbAccess.js";
import { db } from "../../firebaseConfig.js";
import { collection, getDocs, addDoc } from "firebase/firestore";

export default () => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("506 88 88 88 88");
  const usersCollectionRef = collection(db, "UsersData");

  const createUser = async () => {
    console.log("hey1");
    await addDoc(usersCollectionRef, {
      email: email,
      phoneNumber: phoneNumber,
      metaData: "stuff",
    });
    console.log("hey2");
  };

  return (
    <section className="max-w-xl mt-12 mx-auto px-4 mb-20 mt-20" id="newsletter">
      <div className="space-y-4 text-center">
        {/* <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -=-> */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="h-14 w-14 mx-auto text-gray-300">
          <path d="M192 64C86 64 0 150 0 256S86 448 192 448H448c106 0 192-86 192-192s-86-192-192-192H192zM496 248c-22.1 0-40-17.9-40-40s17.9-40 40-40s40 17.9 40 40s-17.9 40-40 40zm-24 56c0 22.1-17.9 40-40 40s-40-17.9-40-40s17.9-40 40-40s40 17.9 40 40zM168 200c0-13.3 10.7-24 24-24s24 10.7 24 24v32h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H216v32c0 13.3-10.7 24-24 24s-24-10.7-24-24V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h32V200z" />
        </svg>
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-14 w-14 mx-auto text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
          />
        </svg> */}
        <h1 className="text-3xl text-gray-800 font-semibold">Suscríbete a la beta cerrada</h1>
        <p className="text-gray-600 leading-relaxed">
          {/* prettier-ignore */}
          Tendrás acceso exclusivo a la beta cerrada y noticias del avance en el dessarrollo y lanzamiento
        </p>
      </div>
      <div className="mt-5">
        <form onSubmit={(e) => e.preventDefault()} className="items-center justify-center sm:flex">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="text-gray-500 w-full p-3 rounded-md border outline-none focus:border-indigo-600"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />

          <button
            className="w-full mt-3 px-5 py-3 rounded-md text-white bg-red-800 outline-none shadow-md focus:shadow-none focus:ring-2 ring-offset-2 ring-indigo-600 sm:mt-0 sm:ml-3 sm:w-auto hover:bg-red-500"
            // type="submit"
            onClick={createUser}
          >
            Suscribirse
          </button>
        </form>
        <p className="mt-3 mx-auto text-center max-w-xl text-[15px] text-gray-400">
          No al spam, nos preocupamos por la protección de tus datos.
          {/* TODO Write a privacy policy and link it here
          Lee nuestra{" "}
          <a className="text-indigo-600 underline" href="javascript:void(0)">
            {" "}
            Política de Privacidad{" "}
          </a> */}
        </p>
      </div>
    </section>
  );
};
