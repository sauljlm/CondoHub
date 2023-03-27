import React from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";

const SignInSelection = () => {
  let navigate = useNavigate();

  function handleGoogleButon() {
    navigate("/sign-in/google");
  }

  function handleFacebookButon() {
    navigate("/sign-in/facebook");
  }

  function handleEmailButon() {
    navigate("/sign-in/email");
  }

  return (
    <div className="bg-red border-black-800 border-2 w-full max-w-xl mx-auto rounded-md shadow-md p-10 m-20">
      <h1 className="text-gray-800 font-bold text-4xl md:text-4xl text-center mb-5"> Unete a CondoHUB</h1>
      <p className=" text-start">
        CondoHUB conecta tu condominio. Para registrarte el administrador debe haber registrado el condominio
        previamente en CondoHUB
      </p>
      <p className="text-start mb-10 mt-5">Elije tu método de registro continuación.</p>
      <div className="flex flex-col items-center">
        <div className="w-full mb-4" />
        <button
          type="submit"
          className="flex items-center justify-start py-3 rounded-lg w-80 font-semibold text-sm duration-150 text-black bg-neutral-200 hover:bg-red-400 hover:text-white active:bg-red-800 mb-7"
          onClick={handleGoogleButon}
        >
          <FcGoogle className="mx-8 text-lg "></FcGoogle>
          Registrarse con Google
        </button>

        <button
          type="submit"
          className="flex items-center justify-start py-3 rounded-lg w-80 font-semibold text-sm duration-150 text-black bg-neutral-200 hover:bg-blue-500 hover:text-white active:bg-blue-800 mb-7"
          onClick={handleFacebookButon}
        >
          <FaFacebook className="mx-8 text-lg text-blue-700" />
          Registrarse con Facebook
        </button>
        <button
          type="submit"
          className="flex items-start justify-start py-3 rounded-lg w-80 font-semibold text-sm duration-150 text-black bg-neutral-200 hover:bg-greenTheme hover:text-white active:bg-teal-800 mb-7"
          onClick={handleEmailButon}
        >
          <MdEmail className="mx-8 text-lg text-gray-700" />
          Registrarse con Email
        </button>
        <p className="text-center text-gray-500 text-sm">
          ¿Ya tienes una cuenta?{" "}
          <a className=" text-black font-bold" href="login">
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignInSelection;
