import React, { useState, useEffect } from "react";
import DBAccess from "../utils/dbAccess";
import TimeBlock from "../components/amenities/timeBlock";
import TextInput from "../components/common/inputs/textInput";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { time } from "console";

const Amenities = () => {
  const dataDB = new DBAccess("Amenities");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [validationTrigger, setValidationTrigger] = useState(0);
  const [items, setItems] = useState([]);
  const [timeBlocks, setTimeBlocks] = useState([
    {
      id: 1,
      startTime: "07:00",
      endTime: "08:00",
    },
  ]);
  const [editingItem, setEditingItem] = useState(null);
  const [isTimeBlockValid, setIsTimeBlockValid] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    validateTimeBlock();
  }, [timeBlocks]);

  const loadData = async () => {
    const docs = await dataDB.getAll();
    setItems(docs);
  };

  const createAmenitie = async () => {
    await dataDB.create({
      name: name,
      description: description,
      price: price,
      timeBlocks: timeBlocks,
      metaData: "stuff",
    });
    loadData();
  };

  const restoreValues = () => {
    setName("");
    setDescription("");
    setPrice(0);
    setTimeBlocks([]);
    setEditingItem(null);
  };

  const newTimeBlock = () => {
    timeBlockData = {
      id: timeBlocks.length + 1,
      startTime: "",
      endTime: "",
    };
    setTimeBlocks([...timeBlocks, timeBlockData]);
  };

  const deleteTimeBlock = () => {
    const newTimeBlock = [...timeBlocks];
    newTimeBlock.pop();
    setTimeBlocks(newTimeBlock);
  };

  const updateAmenitie = async () => {
    const result = await dataDB.updatePartialDoc(editingItem, {
      name: name,
      description: description,
      price: price,
      timeBlocks: timeBlocks,
    });
    loadData();
  };

  const handleEdit = async (item) => {
    await restoreValues();
    setEditingItem(item.id);
    setName(item.name);
    setDescription(item.description);
    setPrice(item.price);
    setTimeBlocks(item.timeBlocks);
  };

  const handleDelete = async (id) => {
    const result = await dataDB.remove(id);
    loadData();
  };

  const handleSubmit = async (e) => {
    const validation = validateTimeBlock();
    if (!validation) {
      return;
    }
    if (!name || !description || !price || !timeBlocks) return;
    if (!editingItem) {
      createAmenitie();
    } else {
      updateAmenitie();
      setEditingItem(null);
    }
    await restoreValues();
    setTimeBlocks([
      {
        id: 1,
        startTime: "00:00",
        endTime: "23:59",
      },
    ]);
  };

  const validateNotEmpty = (value) => {
    const valid = value.trim().length > 0;
    return valid;
  };

  const validateForm = () => {
    const valid = validateNotEmpty(title) && validateNotEmpty(content);
    setValidationTrigger(validationTrigger + 1);
    return valid;
  };

  const validateTimeBlock = () => {
    for (let i = 0; i < timeBlocks.length; i++) {
      const block1 = timeBlocks[i];
      // check if the time block is valid
      if (block1.endTime < block1.startTime) {
        // the two time blocks are invalid
        setIsTimeBlockValid(false);
        return false;
      }
      for (let j = i + 1; j < timeBlocks.length; j++) {
        const block2 = timeBlocks[j];
        // check if the time blocks overlap
        if (block1.startTime < block2.endTime && block1.endTime > block2.startTime) {
          // the two time blocks overlap
          setIsTimeBlockValid(false);
          return false;
        }
      }
    }
    // no time blocks overlap
    setIsTimeBlockValid(true);
    return true;
  };

  return (
    <div className=" p-10 bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Administrar amenidades</h1>
      <div className="flex">
        <div className=" flex items-start justify-center bg-white rounded-lg overflow-hidden shadow-lg p-10">
          <div className="max-w-md">
            <h3 className="text-1xl font-bold mb-5">Registrar nueva Amenidad</h3>
            <form onSubmit={(e) => e.preventDefault()} className="mt-8 m-10 w-[272px]">
              <div className="mb-4">
                <TextInput
                  labelText="Nombre"
                  id="nombre"
                  name="nombre"
                  placeholder="Nombre"
                  setValue={setName}
                  validationFunction={validateNotEmpty}
                  validationTrigger={validationTrigger}
                  errorText="Escriba un nombre para la amenidad."
                />
              </div>
              <div className="mb-4">
                <TextInput
                  labelText="Descripción"
                  id="descripcion"
                  name="descripcion"
                  placeholder="Descripción"
                  setValue={setDescription}
                  validationFunction={validateNotEmpty}
                  validationTrigger={validationTrigger}
                  errorText="Escriba una descripción para la amenidad."
                />
              </div>
              <div className="mb-4">
                <TextInput
                  labelText="Precio"
                  id="precio"
                  name="precio"
                  placeholder="Precio"
                  type="number"
                  setValue={setPrice}
                  validationFunction={validateNotEmpty}
                  validationTrigger={validationTrigger}
                  errorText="Escriba un precio para la amenidad."
                />
              </div>
              <div className="flex justify-between items-center  mt-10 mb-5">
                <h3 className="text-1xl font-bold">Bloques de horarios</h3>
                <button
                  className="text-red-500 hover:text-indigo-500 active:text-indigo-700 text-3xl font-bold  rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={() => deleteTimeBlock()}
                >
                  <AiFillMinusCircle></AiFillMinusCircle>
                </button>
                <button
                  className="text-teal-500 hover:text-indigo-500 active:text-indigo-700 text-3xl font-bold  rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={() => newTimeBlock()}
                >
                  <AiFillPlusCircle></AiFillPlusCircle>
                </button>
              </div>
              <div className="mb-4">
                {timeBlocks.map((result) => (
                  <TimeBlock id={result.id} setTimeBlocks={setTimeBlocks} timeBlock={result} timeBlocks={timeBlocks} />
                ))}
              </div>
              <p className="font-semibold text-red-800">{isTimeBlockValid ? "" : "Bloques de tiempo inválidos"}</p>

              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className={`mt-10 items-center justify-center px-3 py-3 rounded-lg h-11 w-40 font-semibold text-sm duration-150 text-white bg-greenTheme hover:bg-indigo-500 active:bg-indigo-700 ${
                    isTimeBlockValid ? "" : "bg-gray-500 hover:bg-gray-700 cursor-not-allowed"
                  }`}
                  onClick={() => handleSubmit()}
                  disabled={!isTimeBlockValid}
                >
                  {editingItem ? "Actualizar amenidad" : "Crear amenidad"}
                </button>
              </div>
              {/* <button
                  className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-8 ${
                    isTimeBlockValid ? "" : "bg-gray-500 hover:bg-gray-700 cursor-not-allowed"
                  }`}
                  onClick={() => handleSubmit()}
                  disabled={!isTimeBlockValid}
                >
                  {editingItem ? "Actualizar" : "Guardar"}
                </button> */}
            </form>
          </div>
        </div>
        <div className="max-w-4xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg p-10">
          <h3 className="text-1xl font-bold mb-5">Amenidades creadas</h3>
          <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
            <table className="w-full table-auto text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                <tr>
                  <th className="py-3 px-3">Nombre</th>
                  <th className="py-3 px-">Descripcion</th>
                  <th className="py-3 px-3">Precio</th>
                  <th className="py-3">Horarios</th>
                  <th className="py-3"></th>
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y">
                {items.map((data, idx) => (
                  <tr key={idx}>
                    <td className="px-3 py-4 whitespace-nowrap">{data.name}</td>
                    <td className="px-3 py-4 whitespace-nowrap">{data.description}</td>
                    <td className="px-3 py-4 whitespace-nowrap">{data.price}</td>
                    <td className=" py-4 whitespace-nowrap">
                      {data.timeBlocks.map((element) => {
                        return (
                          <ul>
                            {element.startTime} - {element.endTime}{" "}
                          </ul>
                        );
                      })}
                    </td>
                    <td className="text-right px-6 whitespace-nowrap">
                      <button
                        className="py-2 leading-none px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                        onClick={() => handleEdit(data)}
                      >
                        Editar
                      </button>
                      <button
                        className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                        onClick={() => handleDelete(data.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Amenities;
