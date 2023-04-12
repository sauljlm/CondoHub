import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import TextInput from "../../components/common/inputs/textInput";
import { myAuth } from "../../firebaseConfig.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toastContext } from "../../appContext.js";

const LoginEmailPage = () => {
  const toast = useContext(toastContext);
  let navigate = useNavigate();
  const [validationTrigger, setValidationTrigger] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = (path) => {
    navigate(path);
    window.scrollTo({ behavior: "smooth", top: 0 });
  };

  const validateEmail = (email) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const valid = regex.test(email);
    return valid;
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    const valid = regex.test(password);
    return valid;
  };

  const validateForm = () => {
    const valid = validateEmail(email) && validatePassword(password);
    setValidationTrigger(validationTrigger + 1);
    return valid;
  };

  //
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        await signInWithEmailAndPassword(myAuth, email, password).then((userCredential) => {});
        // Sign in successful
      } catch (error) {
        console.log(error);
        // Handle sign in error
        if (error.code === "auth/user-not-found") {
          toast.set({
            message:
              "El usuario no existe. Si no tienes una cuenta, regístrate para recibir más información y actualizaciones.",
            type: "error",
            timeOut: 5500,
          });
          return;
        }
        if (error.code === "auth/wrong-password") {
          toast.set({
            message: "La contraseña es incorrecta. Si no recuerdas tu contraseña, puedes restablecerla.",
            type: "error",
            timeOut: 5500,
          });
          return;
        }
        if (error.code === "auth/too-many-requests") {
          toast.set({
            message: "Usuario bloqueado por intentos fallidos. Por favor, inténtalo más tarde o contacta a soporte.",
            type: "error",
            timeOut: 5500,
          });
          return;
        }

        toast.set({
          message: "Error desconocido, contacta a soporte.",
          type: "error",
          timeOut: 5500,
        });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-red border-black-800 border-2 w-full max-w-xl mx-auto rounded-md shadow-md p-10 m-20"
    >
      <h1 className="text-gray-800 font-bold text-4xl md:text-4xl flex justify-center pb-10">
        Iniciar sesión en_ <span className="text-greenTheme">CondoHUB </span>
      </h1>
      <div className="max-w-md mx-auto">
        <div className="mb-4">
          <TextInput
            labelText="Email"
            errorText="Introduzca un email válido (ejemplo: usuario@correo.com)"
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            setValue={setEmail}
            validationTrigger={validationTrigger}
            validationFunction={validateEmail}
          />
        </div>
        <div className="mb-4 relative">
          <TextInput
            labelText="Contraseña"
            errorText="La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial"
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Contraseña"
            setValue={setPassword}
            validationTrigger={validationTrigger}
            validationFunction={validatePassword}
          />
          <button
            className="absolute text-3xl top-5 right-0 mr-4 mt-4 bg-transparent hover:bg-transparent text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
            type="button"
          >
            {showPassword ? <AiOutlineEyeInvisible></AiOutlineEyeInvisible> : <AiOutlineEye></AiOutlineEye>}
          </button>
        </div>
        <div className="flex justify-center space-x-10 mt-10">
          <button
            type="submit"
            className="px-3 py-3 rounded-lg w-40 font-semibold text-sm duration-150 text-white bg-gray-500 hover:bg-indigo-500 active:bg-indigo-700"
            onClick={() => {
              handleClick("/login");
            }}
          >
            Regresar
          </button>
          <button
            type="submit"
            className="px-3 py-3 rounded-lg w-40 font-semibold text-sm duration-150 bg-greenTheme text-white hover:bg-indigo-500 active:bg-indigo-700"
          >
            Iniciar sesión
          </button>
        </div>
        <div className="text-center mt-8 text-gray-600">
          <p className="text-center text-gray-500 text-sm">
            ¿Aun no tienes una cuenta?{" "}
            <button
              className=" text-black font-bold"
              onClick={() => {
                handleClick("/sign-in");
              }}
            >
              Regístrate aquí
            </button>
          </p>
        </div>
      </div>
    </form>
  );
};

export default LoginEmailPage;
