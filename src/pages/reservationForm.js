import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebaseConfig.js";
import { collection, getDocs, addDoc, doc } from "firebase/firestore";
import Dropdown from "../components/common/inputs/dropdown";

function ReservationForm() {
  const getToday = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedTodayDate = `${year}-${month}-${day}`;
    return formattedTodayDate;
  };

  const [userId, setUserId] = useState("1-123-456");
  const [userName, setUserName] = useState("John Doe");

  const [amenityReserved, setAmenityReserved] = useState("Amenity");
  const [reservationDate, setReservationDate] = useState(getToday());
  const [reservationTime, setReservationTime] = useState("StartTime");
  const reservationCollectionRef = collection(db, "ReservationData");
  const AMENITY_OPTIONS = ["Piscina", "Rancho", "Cancha Multiuso"];
  const AMENITY_HOUR_BLOCK = ["6:00-7:00", "7:00-8:00", "8:00-9:00"];

  const createReservation = async () => {
    const response = await addDoc(reservationCollectionRef, {
      userId: userId,
      userName: userName,
      amenityReserved: amenityReserved,
      reservationDate: reservationDate,
      reservationTime: reservationTime,
    });
    console.log(userId);
    console.log(userName);
    console.log(amenityReserved);
    console.log(reservationDate);
    console.log(reservationTime);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Crear reservación</h2>
      <form onSubmit={(e) => e.preventDefault()} className="p-10">
        <div className="mb-4">
          <label htmlFor="amenityName" className="block mb-2 text-gray-500">
            Seleccione una amenidad
          </label>
          <Dropdown
            options={AMENITY_OPTIONS}
            setSelectedValue={setAmenityReserved}
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
        <div className="flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-8">
            Cargar horarios
          </button>
        </div>
        <div className="mb-4">
          <label htmlFor="reservationTime" className="block mb-2 text-gray-500">
            Seleccione horario disponible
          </label>
          <Dropdown
            options={AMENITY_HOUR_BLOCK}
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
  );
}

export default ReservationForm;
