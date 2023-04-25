import React from "react";
import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import DBAccess from "../utils/dbAccess";
import Dropdown from "../components/common/inputs/dropdown";
import { loginContext, toastContext } from "../../src/appContext";

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
  const toastPopup = useContext(toastContext);

  const [userUid, setUserUid] = useState("");
  const [userCondoNumber, setUserCondoNumber] = useState("condoNumber");
  const [amenityNameSelected, setAmenityNameSelected] = useState("");
  const [reservationDate, setReservationDate] = useState(getToday());
  const [reservationTime, setReservationTime] = useState("");
  const [amenityOptions, setAmenityOptions] = useState([]);
  const [availableTimeBlockOptions, setAvailableTimeBlockOptions] = useState([]);
  const [allUserReservations, setAllUserReservations] = useState([]);
  const [amenitiesMap, setAmenitiesMap] = useState(new Map());
  const [amenityURLParam, setAmenityURLParam] = useState("");
  const [amenityURLNameParam, setAmenityURLNameParam] = useState("");
  const routeParams = useParams();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setAmenityURLParam(urlParams.get("amenity"));
  }, [availableTimeBlockOptions]);

  const retrieveAllAmenities = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    setAmenityURLParam(urlParams.get("amenity"));
    const allAmenities = await amenitiesDB.getAll();
    const array = [];
    allAmenities.map((item) => {
      item.id === routeParams.id && setAmenityURLNameParam(item.name);
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
    const selectedAmenity = await amenitiesDB.getOneById(amenitiesMap.get(amenityNameSelected));
    const amenityTimeBlocks = selectedAmenity.timeBlocks;
    const timeBlocksArray = amenityTimeBlocks.map((item) => `${item.startTime} - ${item.endTime}`);

    const filter = {
      part1: "amenitySelected",
      operator: "==",
      part2: amenityNameSelected,
    };
    const allAmenityReservations = await reservationDB.getAllWhere(filter);
    const filteredData = allAmenityReservations.filter(
      (item) => item.reservationDate === reservationDate && item.status !== "Rechazado"
    );
    const timeArray = filteredData.map((item) => item.reservationTime);
    const uniqueValues = timeBlocksArray.filter((value) => !timeArray.includes(value));
    setAvailableTimeBlockOptions(uniqueValues);
  };

  useEffect(() => {
    retrieveAllAmenities();
    setUserUid(userContext?.uid);
    setUserCondoNumber(userContext?.aditionalData?.condoNumber);
    retrieveAllUserReservations();
  }, [userContext]);

  useEffect(() => {
    availableAmenityTimeblocks();
  }, [amenityNameSelected, reservationDate]);

  const createReservation = async () => {
    try {
      const reservationYear = reservationDate.substring(0, 4);
      const reservationMonth = reservationDate.substring(5, 7) - 1; // months are zero-based
      const reservationDay = reservationDate.substring(8, 10);
      const reservation = new Date(reservationYear, reservationMonth, reservationDay);

      const today = new Date();
      today.setHours(0, 0, 0, 0); // set the time to midnight

      if (reservation < today) {
        toastPopup.set({
          message: "No es posible crear una reservación en una fecha pasada.",
          type: "error",
          timeOut: 4500,
        });
        return; // exit the function if the reservation date is in the past
      }

      const response = await reservationDB.create({
        userUid: userUid,
        condoNumber: userCondoNumber,
        amenitySelected: amenityNameSelected,
        reservationDate: reservationDate,
        reservationTime: reservationTime,
        status: "Aprobación pendiente",
      });
      if (response) {
        toastPopup.set({
          message: "Reservación creada exitosamente.",
          type: "success",
          timeOut: 4500,
        });
      }
    } catch (error) {
      console.error(error); // log the error to the console
      toastPopup.set({
        message: "No hay horarios disponibles, seleccione otra fecha.",
        type: "error",
        timeOut: 4500,
      });
    }
    retrieveAllUserReservations();
    availableAmenityTimeblocks();
  };

  const deleteReservation = async (docIdToDelete) => {
    await reservationDB.remove(docIdToDelete);
    retrieveAllUserReservations();
    availableAmenityTimeblocks();
  };

  return (
    <div className=" p-10 bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Reservaciones</h1>
      <div className="flex">
        <div className=" flex items-start justify-center bg-white rounded-lg overflow-hidden shadow-lg p-10">
          <div>
            <h3 className="text-1xl font-bold mb-5">Crear reservación</h3>
            <form onSubmit={(e) => e.preventDefault()} className="p-10">
              <div className="mb-4">
                <label htmlFor="amenityName" className="block mb-2 text-gray-500">
                  Seleccione una amenidad
                </label>
                <Dropdown
                  options={amenityOptions}
                  setSelectedValue={setAmenityNameSelected}
                  defaultSelectedValue={amenityURLNameParam}
                ></Dropdown>
              </div>
              <div className="mb-4">
                <label htmlFor="reservationDate" className="block mb-2 text-gray-500">
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
                <label htmlFor="reservationTime" className="block mb-2 text-gray-500">
                  Seleccione horario disponible
                </label>
                <Dropdown options={availableTimeBlockOptions} setSelectedValue={setReservationTime}></Dropdown>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className={`mt-20 items-center justify-center px-3 py-3 rounded-lg h-11 w-40 font-semibold text-sm duration-150 text-white bg-greenTheme hover:bg-indigo-500 active:bg-indigo-700`}
                  // onClick={() => handleSubmit()}
                  onClick={createReservation}
                >
                  Reservar
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className=" mx-auto bg-white rounded-lg overflow-hidden shadow-lg p-10">
          <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="items-start justify-between md:flex">
              <div className="max-w-lg">
                <h3 className="text-1xl font-bold mb-5">Reservaciones existentes</h3>
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
                      <td className="px-6 py-4 whitespace-nowrap">{item.amenitySelected}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.reservationDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.reservationTime}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.status}</td>
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
    </div>
  );
}

export default ReservationForm;
