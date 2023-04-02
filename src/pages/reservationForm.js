import React from "react";
import { useContext, useState, useEffect } from "react";
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
  const [userCondoNumber, setUserCondoNumber] = useState("condoNumber");
  const [amenityNameSelected, setAmenityNameSelected] = useState("");
  const [reservationDate, setReservationDate] = useState(getToday());
  const [reservationTime, setReservationTime] = useState("");
  const [amenityOptions, setAmenityOptions] = useState([]);
  const [availableTimeBlockOptions, setAvailableTimeBlockOptions] = useState(
    []
  );
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

  const availableAmenityTimeblocks = async () => {
    const selectedAmenity = await amenitiesDB.getOneById(
      amenitiesMap.get(amenityNameSelected)
    );
    const amenityTimeBlocks = selectedAmenity.timeBlocks;
    const timeBlocksArray = amenityTimeBlocks.map(
      (item) => `${item.startTime} - ${item.endTime}`
    );

    const filter = {
      part1: "reservationDate",
      operator: "==",
      part2: reservationDate,
    };
    const allDateReservations = await reservationDB.getAllWhere(filter);
    const filteredData = allDateReservations.filter(
      (item) => item.amenitySelected === amenityNameSelected
    );
    const timeArray = filteredData.map((item) => item.reservationTime);
    const uniqueValues = timeBlocksArray.filter(
      (value) => !timeArray.includes(value)
    );
    setAvailableTimeBlockOptions(uniqueValues);

    console.log(amenityNameSelected);
    console.log("allDateReservations");
    console.log(allDateReservations);
  };

  useEffect(() => {
    retrieveAllAmenities();
    setUserUid(userContext.uid);
    setUserCondoNumber(userContext.aditionalData.condoNumber);
    retrieveAllUserReservations();
  }, []);

  useEffect(() => {
    availableAmenityTimeblocks();
  }, [amenityNameSelected, reservationDate]);

  const createReservation = async () => {
    await reservationDB.create({
      userUid: userUid,
      condoNumber: userCondoNumber,
      amenitySelected: amenityNameSelected,
      reservationDate: reservationDate,
      reservationTime: reservationTime,
      status: "Aprobación pendiente",
    });
    retrieveAllUserReservations();
    availableAmenityTimeblocks();
  };

  const deleteReservation = async (docIdToDelete) => {
    await reservationDB.remove(docIdToDelete);
    retrieveAllUserReservations();
    availableAmenityTimeblocks();
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
          <div className="mb-4">
            <label
              htmlFor="reservationTime"
              className="block mb-2 text-gray-500"
            >
              Seleccione horario disponible
            </label>
            <Dropdown
              options={availableTimeBlockOptions}
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
                  <th className="py-3 px-6">Estado</th>
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.status}
                    </td>
                    <td className="text-right px-6 whitespace-nowrap">
                      <button
                        className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                        onClick={() => deleteReservation(item.id)}
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
