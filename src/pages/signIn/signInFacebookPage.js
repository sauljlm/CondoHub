import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FacebookSignIn from "../../components/signIn/facebookSignIn";
import Dropdown from "../../components/common/inputs/dropdown";
import TextInput from "../../components/common/inputs/textInput";

const SignInGoogle = () => {
  let navigate = useNavigate();
  const CONDOMINIUM_OPTIONS = ["Solarium", "La Colina", "Obelisco"];
  const [validationTrigger, setValidationTrigger] = useState(0);
  const [name, setName] = useState("");
  const [id, setID] = useState("");
  const [condoNumber, setCondoNumber] = useState("");
  const [condoName, setCondoName] = useState("");
  const userData = () => {
    const data = {
      name: name,
      id: id,
      condoNumber: condoNumber,
      condoName: condoName,
    };
    return data;
  };

  const handleBackButon = () => {
    navigate("/sign-in/");
  };

  const validateName = (name) => {
    const regex = /^[a-zA-Z0-9]{2,40}$/;
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

  const validateForm = () => {
    const valid = validateName(name) && validateID(id) && validateCondoNumber(condoNumber);
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

        <div className="flex justify-center space-x-10 mt-10">
          <button
            type="submit"
            className="px-3 py-3 rounded-lg w-40 font-semibold text-sm duration-150 text-white bg-gray-500 hover:bg-indigo-500 active:bg-indigo-700"
            onClick={handleBackButon}
          >
            Regresar
          </button>
          <FacebookSignIn userData={userData()} onClick={validateForm} className="m-10"></FacebookSignIn>
        </div>
      </div>
    </form>
  );
};

export default SignInGoogle;
