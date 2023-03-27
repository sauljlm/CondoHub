import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleSignIn from "../../components/signIn/googleSignIn";
import Dropdown from "../../components/common/inputs/dropdown";
import TextInput from "../../components/common/inputs/textInput";

const SignInEmail = () => {
  let navigate = useNavigate();
  const CONDOMINIUM_OPTIONS = ["Solarium", "La Colina", "Obelisco"];
  const [name, setName] = useState("");
  const [id, setID] = useState("");
  const [condoNumber, setCondoNumber] = useState("");
  const [condoName, setCondoName] = useState("");
  const [email, setEmail] = useState("");
  const userData = () => {
    const data = {
      name: name,
      id: id,
      condoNumber: condoNumber,
      condoName: condoName,
    };
    return data;
  };

  function handleBackButon() {
    navigate("/sign-in/");
  }

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="bg-red border-black-800 border-2 w-full max-w-xl mx-auto rounded-md shadow-md p-10 m-20"
    >
      <h1 className="text-gray-800 font-bold text-4xl md:text-4xl flex justify-center pb-10">
        Registrarse en_ <span className="text-greenTheme">CondoHUB_ </span>
      </h1>
      <div className="max-w-md mx-auto">
        <div className="mb-4">
          <TextInput labelText="Nombre" type="text" id="name" name="name" placeholder="Nombre" />
        </div>
        <div className="mb-4">
          <TextInput labelText="ID / Cédula" type="text" id="id" name="id" placeholder="ID / Cédula" />
        </div>

        <div className="mb-4">
          <TextInput
            labelText="Número de condominio"
            type="text"
            id="houseNumber"
            name="houseNumber"
            placeholder="Número de condominio"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="condominium" className="block mb-2 text-gray-500">
            Condominio
          </label>
          <Dropdown options={CONDOMINIUM_OPTIONS} setSelectedValue={setCondoName} optionName="Condominio"></Dropdown>
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-gray-500">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Email"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-gray-500">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Contraseña"
          />
        </div>

        <div className="flex justify-center space-x-10 mt-10">
          <button
            type="submit"
            className="px-3 py-3 rounded-lg w-40 font-semibold text-sm duration-150 text-white bg-gray-500 hover:bg-indigo-500 active:bg-indigo-700"
            onClick={handleBackButon}
          >
            Regresar
          </button>
          <GoogleSignIn userData={userData()} className="m-10"></GoogleSignIn>
        </div>
      </div>
    </form>
  );
};

export default SignInEmail;
