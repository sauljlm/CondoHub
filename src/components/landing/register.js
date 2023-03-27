//Floatui component https://www.floatui.com/

import { useState } from "react";
import DBAccess from "../../utils/dbAccess";
import { useContext } from "react";
import { appContext } from "../../appContext.js";

export default () => {
  const context = useContext(appContext);
  const usersDataDB = new DBAccess("Tests");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("506 88 88 88 88");

  const saveData = async () => {
    const data = {
      email: email,
      phoneNumber: phoneNumber,
      metaData: "metaData",
    };
    usersDataDB.create(data);
  };

  return (
    <section ref={context.registerRef} className="max-w-xl mx-auto px-4 mb-20 mt-20" id="contact">
      <div className="space-y-4 text-center">
        <svg
          className="h-14 w-14 mx-auto text-black"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
          ></path>
        </svg>

        <h1 className="text-3xl text-gray-800 font-semibold">Registrarse</h1>
        <p className="text-gray-600 leading-relaxed">
          {/* prettier-ignore */}
          Te contactaremos para más información.
        </p>
      </div>
      <div className="mt-5">
        <form onSubmit={(e) => e.preventDefault()} className="items-center justify-center sm:flex">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="text-gray-500 w-full p-3 rounded-md border outline-none focus:border-greenTheme"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />

          <button
            className="w-full mt-3 px-5 py-3 rounded-md text-white bg-greenTheme outline-none shadow-md focus:shadow-none focus:ring-2 ring-offset-2 ring-greenTheme sm:mt-0 sm:ml-3 sm:w-auto hover:bg-indigo-500"
            // type="submit"
            onClick={saveData}
          >
            Enviar
          </button>
        </form>
        <p className="mt-3 mx-auto text-center max-w-xl text-[15px] text-gray-400">
          No al spam, nos preocupamos por la protección de tus datos.
          {/* TODO Write a privacy policy and link it here
          Lee nuestra{" "}
          <a className="text-greenTheme underline" href="javascript:void(0)">
            {" "}
            Política de Privacidad{" "}
          </a> */}
        </p>
      </div>
    </section>
  );
};
