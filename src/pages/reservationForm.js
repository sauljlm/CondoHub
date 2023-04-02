import React from "react";
import { useContext, useState, useEffect } from "react";
import { getDocs, addDoc, doc } from "firebase/firestore";
import DBAccess from "../utils/dbAccess";
import Dropdown from "../components/common/inputs/dropdown";
import { loginContext } from "../../src/appContext";

function ReservationForm() {
  const getToday = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedTodayDate = `${year}-${month}-${day}`;
    return formattedTodayDate;
  };

  const reservationDB = new DBAccess("Reservations");
  const amenitiesDB = new DBAccess("Amenities");
  const userContext = useContext(loginContext);

  const [userUid, setUserUid] = useState("");
  const [amenityNameSelected, setAmenityNameSelected] = useState("");
  const [reservationDate, setReservationDate] = useState(getToday());
  const [reservationTime, setReservationTime] = useState("");
  const [amenityOptions, setAmenityOptions] = useState([]);
  const [timeBlockOptions, setTimeBlockOptions] = useState([]);
  const [allUserReservations, setAllUserReservations] = useState([]);
  const [amenitiesMap, setAmenitiesMap] = useState(new Map());

  const retrieveAllAmenities = async () => {
    const allAmenities = await amenitiesDB.getAll();
    const array = [];
    allAmenities.map((item) => {
      amenitiesMap.set(item.name, item.id);
      array.push(item.name);
    });
    setAmenityOptions(array);
  };

  const retrieveAllUserReservations = async () => {
    const filter = {
      part1: "userUid",
      operator: "==",
      part2: userContext.uid,
    };

    const allUserReservations = await reservationDB.getAllWhere(filter);
    setAllUserReservations(allUserReservations);
  };

  useEffect(() => {
    retrieveAllAmenities();
    setUserUid(userContext.uid);
    retrieveAllUserReservations();
  }, []);

  const retrieveAmenityTimeblock = async () => {
    const selectedAmenity = await amenitiesDB.getOneById(
      amenitiesMap.get(amenityNameSelected)
    );
    console.log(selectedAmenity);
    const amenityTimeBlocks = selectedAmenity.timeBlocks;

    const timeBlocksArray = amenityTimeBlocks.map(
      (item) => `${item.startTime} - ${item.endTime}`
    );

    console.log("amenityTimeBlocks");
    console.log(amenityTimeBlocks);
    console.log(timeBlocksArray);

    setTimeBlockOptions(timeBlocksArray);
  };

  useEffect(() => {
    retrieveAmenityTimeblock();
  }, [amenityNameSelected]);

  const createReservation = async () => {
    await reservationDB.create({
      userUid: userUid,
      amenitySelected: amenityNameSelected,
      reservationDate: reservationDate,
      reservationTime: reservationTime,
    });
    retrieveAllUserReservations();
    console.log(userUid);
    console.log(amenityNameSelected);
    console.log(reservationDate);
    console.log(reservationTime);
  };

  return (
    <div className="mx-auto mt-10">
      <div className="max-w-md mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-5">Crear reservación</h2>
        <form onSubmit={(e) => e.preventDefault()} className="p-10">
          <div className="mb-4">
            <label htmlFor="amenityName" className="block mb-2 text-gray-500">
              Seleccione una amenidad
            </label>
            <Dropdown
              options={amenityOptions}
              setSelectedValue={setAmenityNameSelected}
            ></Dropdown>
          </div>
          <div className="mb-4">
            <label
              htmlFor="reservationDate"
              className="block mb-2 text-gray-500"
            >
              Seleccione fecha a reservar
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="reservationDate"
              type="date"
              defaultValue={getToday()}
              onChange={(event) => {
                setReservationDate(event.target.value);
              }}
            />
          </div>
          <div className="flex justify-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-8">
              Cargar horarios
            </button>
          </div>
          <div className="mb-4">
            <label
              htmlFor="reservationTime"
              className="block mb-2 text-gray-500"
            >
              Seleccione horario disponible
            </label>
            <Dropdown
              options={timeBlockOptions}
              setSelectedValue={setReservationTime}
            ></Dropdown>
          </div>
          <div className="flex justify-center m-8">
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Cancelar
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
              type="submit"
              onClick={createReservation}
            >
              Reservar
            </button>
          </div>
        </form>
      </div>
      <div className="max-w-3xl mx-auto mt-10 pb-12">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="items-start justify-between md:flex">
            <div className="max-w-lg">
              <h2 className="text-2xl font-bold mb-5">
                Reservaciones existentes
              </h2>
            </div>
          </div>
          <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
            <table className="w-full table-auto text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                <tr>
                  <th className="py-3 px-6">Amenidad</th>
                  <th className="py-3 px-6">Fecha</th>
                  <th className="py-3 px-6">Horario</th>
                  <th className="py-3 px-6"></th>
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y">
                {allUserReservations.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.amenitySelected}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.reservationDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.reservationTime}
                    </td>
                    <td className="text-right px-6 whitespace-nowrap">
                      <a
                        href="javascript:void()"
                        className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                      >
                        Editar
                      </a>
                      <button
                        href="javascript:void()"
                        className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
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
}

export default ReservationForm;
