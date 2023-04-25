import React, { useState, useEffect } from "react";
import DBAccess from "../utils/dbAccess";
import { useNavigate } from "react-router-dom";
import TimeBlock from "../components/amenities/timeBlock";

const Amenities = () => {
  const dataDB = new DBAccess("Amenities");
  let navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const docs = await dataDB.getAll();
    setItems(docs);
  };

  const handleReserve = async (id) => {
    navigate(`/app/reservationForm/${id}`);
    window.scrollTo({ behavior: "smooth", top: 0 });
  };
  console.log(items[0]?.timeBlocks[0]);
  return (
    <div className=" p-10 bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Amenidades</h1>
      <h3 className="text-1xl font-bold mb-5">Amenidades disponibles para reservar</h3>
      <div className="mt-12 max-w-4xl mx-auto">
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">Nombre</th>
                <th className="py-3 px-6">Descripcion</th>
                <th className="py-3 px-6">Precio</th>
                <th className="py-3 px-6">Horarios</th>
                <th className="py-3 px-6">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {items.map((data, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap">{data.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{data.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{data.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
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
                      onClick={() => handleReserve(data.id)}
                    >
                      Reservar
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
