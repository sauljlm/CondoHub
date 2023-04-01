import React from "react";
import GoogleSignIn from "../components/signIn/googleSignIn";
import { useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import GoogleLogin from "../components/login/googleLogin";
import FacebookLogin from "../components/login/facebookLogin";

const Login = () => {
  let navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
    window.scrollTo({ behavior: "smooth", top: 0 });
  };

  return (
    <div className="bg-red border-black-800 border-2 w-full max-w-xl mx-auto rounded-md shadow-md p-10 m-20">
      <h1 className="text-gray-800 font-bold text-4xl md:text-4xl text-center mb-5"> Iniciar sesión en CondoHUB</h1>
      <p className=" text-start">CondoHUB conecta tu condominio. Estás a un paso de disfrutar tu condo.</p>
      <p className="text-start mb-10 mt-5">Elije tu método preferido de inicio de sesión.</p>
      <div className="flex flex-col items-center">
        <div className="w-full mb-4" />
        <div>
          <GoogleLogin className="m-10"></GoogleLogin>
        </div>

        <div>
          {/* className="flex items-center justify-start py-3 rounded-lg w-80 font-semibold text-sm duration-150 text-black bg-neutral-200 hover:bg-red-400 hover:text-white active:bg-red-800 mb-7" */}
          <FacebookLogin className="m-10"></FacebookLogin>
        </div>

        <div>
          {/* className="flex items-start justify-start py-3 rounded-lg w-80 font-semibold text-sm duration-150 text-black bg-neutral-200 hover:bg-greenTheme hover:text-white active:bg-teal-800 mb-7" */}
          <GoogleLogin className="m-10"></GoogleLogin>
        </div>
        {/* <MdEmail className="mx-8 text-lg text-gray-700" /> */}

        <p className="text-center text-gray-500 text-sm">
          ¿Aun no tienes una cuenta?{" "}
          <button
            className=" text-black font-bold"
            onClick={() => {
              handleClick("/sign-in");
            }}
          >
            Registrarse
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
