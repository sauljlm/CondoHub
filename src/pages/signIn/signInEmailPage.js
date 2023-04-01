import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailSignIn from "../../components/signIn/emailSignIn";
import Dropdown from "../../components/common/inputs/dropdown";
import TextInput from "../../components/common/inputs/textInput";

const SignInEmail = () => {
  let navigate = useNavigate();
  const CONDOMINIUM_OPTIONS = ["Solarium", "La Colina", "Obelisco"];
  const [validationTrigger, setValidationTrigger] = useState(0);
  const [name, setName] = useState("");
  const [id, setID] = useState("");
  const [condoNumber, setCondoNumber] = useState("");
  const [condoName, setCondoName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userData = () => {
    const data = {
      name: name,
      id: id,
      condoNumber: condoNumber,
      condoName: condoName,
      email: email,
      password: password,
    };
    return data;
  };

  const handleBackButon = () => {
    navigate("/sign-in/");
  };

  const validateName = (name) => {
    const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s']{1,50}$/;
    let valid = regex.test(name);
    name === "" ? (valid = false) : null;
    return valid;
  };

  const validateID = (id) => {
    const regex = /^[a-zA-Z0-9]{6,20}$/;
    const valid = regex.test(id);
    return valid;
  };

  const validateCondoNumber = (condoNumber) => {
    const regex = /^[a-zA-Z0-9]{1,20}$/;
    const valid = regex.test(condoNumber);
    return valid;
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
    const valid =
      validateName(name) &&
      validateID(id) &&
      validateCondoNumber(condoNumber) &&
      validateEmail(email) &&
      validatePassword(password);
    setValidationTrigger(validationTrigger + 1);
    return valid;
  };

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
          <TextInput
            labelText="Nombre"
            errorText="Introduzca un nombre válido"
            type="text"
            id="name"
            name="name"
            placeholder="Nombre"
            setValue={setName}
            validationTrigger={validationTrigger}
            validationFunction={validateName}
          />
        </div>
        <div className="mb-4">
          <TextInput
            labelText="ID / Cédula"
            errorText="Introduzca una identificación válida"
            type="text"
            id="id"
            name="id"
            placeholder="ID / Cédula"
            setValue={setID}
            validationTrigger={validationTrigger}
            validationFunction={validateID}
          />
        </div>

        <div className="mb-4">
          <TextInput
            labelText="Número de condominio"
            errorText="Introduzca un número de condominio válido"
            type="text"
            id="houseNumber"
            name="houseNumber"
            placeholder="Número de condominio"
            setValue={setCondoNumber}
            validationTrigger={validationTrigger}
            validationFunction={validateCondoNumber}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="condominium" className="block mb-2 text-gray-500">
            Condominio
          </label>
          <Dropdown options={CONDOMINIUM_OPTIONS} setSelectedValue={setCondoName} optionName="Condominio"></Dropdown>
        </div>

        <div className="mb-4">
          <TextInput
            labelText="Email"
            errorText="Introduzca un correo electrónico válido (ej: juan.perez@ejemplo.com)"
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            setValue={setEmail}
            validationTrigger={validationTrigger}
            validationFunction={validateEmail}
          />
        </div>

        <div className="mb-6">
          <TextInput
            labelText="Contraseña"
            errorText="La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial"
            type="password"
            id="password"
            name="password"
            placeholder="Contraseña"
            setValue={setPassword}
            validationTrigger={validationTrigger}
            validationFunction={validatePassword}
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
          <EmailSignIn userData={userData()} onClick={validateForm} className="m-10"></EmailSignIn>
        </div>
      </div>
    </form>
  );
};

export default SignInEmail;
