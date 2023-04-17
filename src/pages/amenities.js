import React, { useState, useEffect } from "react";
import DBAccess from "../utils/dbAccess";
import TimeBlock from "../components/amenities/timeBlock";

const Amenities = () => {
  const dataDB = new DBAccess("Amenities");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [items, setItems] = useState([]);
  const [timeBlocks, setTimeBlocks] = useState([
    {
      id: 1,
      startTime: '00:00',
      endTime: '23:59',
    },
  ]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

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
  } 

  const newTimeBlock = () => {
    timeBlockData = {
      id: timeBlocks.length + 1,
      startTime: '00:00',
      endTime: '23:59',
    };

    setTimeBlocks([...timeBlocks, timeBlockData]);
  };

  const updateAmenitie = async() => {
    const result = await dataDB.updatePartialDoc(editingItem, {
      name: name,
      description: description,
      price: price,
      timeBlocks: timeBlocks
    });
    loadData();
  }

  const handleEdit = async(item) => {
    await restoreValues();
    setEditingItem(item.id);
    setName(item.name);
    setDescription(item.description);
    setPrice(item.price);
    setTimeBlocks(item.timeBlocks);
  }

  const handleDelete = async (id) => {
    const result = await dataDB.remove(id);
    loadData();
  };

  const handleSubmit = async (e) => {
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
        startTime: '00:00',
        endTime: '23:59',
      },
    ]);
  }

  return (
    <div>
      <div className="max-w-md mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-5">Amenidades</h2>
        <h3 className="text-1xl font-bold mb-5">Registrar nueva Amenidad</h3>
        <form onSubmit={(e) => e.preventDefault()} className="mt-8 space-y-5">
          <div className="mb-4">
            <label className="block mb-2 text-gray-500">Nombre</label>
            <input
              type="name"
              required
              value={name}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-500">Description</label>
            <input
              type="description"
              required
              value={description}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-500">Precio</label>
            <input
              type="price"
              required
              value={price}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
          </div>
          <div className="flex justify-between">
            <h3 className="text-1xl font-bold mb-5">Horarios</h3>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => newTimeBlock()}
            >
              Agregar nuevo
            </button>
          </div>
          <div className="mb-4">
            {timeBlocks.map((result) => (
              <TimeBlock id={result.id}  setTimeBlocks={setTimeBlocks} timeBlock={result} timeBlocks={timeBlocks} />
            ))}
          </div>
          <div className="flex justify-center m-8">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-8"
              onClick={() => handleSubmit()}
            >
              {editingItem ? 'Actualizar' : 'Guardar'}
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-8"
             onClick={() => restoreValues()}
            >
              Cancelar
            </button>
          </div>
        </form>

      </div>
      <div className="mt-12 max-w-4xl mx-auto">
        <h3 className="text-1xl font-bold mb-5">Amenidades creadas</h3>
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">Nombre</th>
                <th className="py-3 px-6">Descripcion</th>
                <th className="py-3 px-6">Precio</th>
                <th className="py-3 px-6">Horarios</th>
                <th className="py-3 px-6"></th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {items.map((data, idx) => (
                
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {data.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {data.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {data.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ul>
                      {/*console.log(data.timeBlocks)*/}
                      {data.timeBlocks.map((element) => {
                        // <li>
                        //   Start time: {element.startTime} End time: {element.endTime}
                        // </li>
                        <li>hola</li>
                      })}
                    </ul>
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
  );
};

export default Amenities;
