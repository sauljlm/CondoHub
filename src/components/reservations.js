//Floatui component https://www.floatui.com/

import { useState, useEffect } from "react";
// import { dbAccess } from "./dbAccess.js";
import { db } from "../firebaseConfig.js";
import { collection, getDocs, addDoc, doc } from "firebase/firestore";

export default () => {
  const [email, setEmail] = useState("Correo");
  const [amenityReserved, setAmenityReserved] = useState("Amenidad");
  const [reservationDate, setReservationDate] = useState("Fecha");
  const reservationCollectionRef = collection(db, "ReservationData");

  const createReservation = async () => {
    console.log("Creando nueva reservacion...");
    await addDoc(reservationCollectionRef, {
      email: email,
      amenityReserved: amenityReserved,
      reservationDate: reservationDate,
      metaData: "ComprobantePago",
    });
    console.log("Reservacion creada");
  };

  const getReservation = async () => {
    console.log("Descargando lista completa de reservaciones...");
    await getDocs(collection(db, "ReservationData")).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    });
  };

  return (
    <section className="max-w-xl mx-auto px-100 mb-20 mt-50" id="reservations">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl text-gray-800 font-semibold">RESERVACION DE AMENIDADES</h1>
        <p className="text-gray-600 leading-relaxed">Acceso exclusivo a amenidades de su condominio</p>
      </div>
      <div className="mt-5">
        <form onSubmit={(e) => e.preventDefault()} className="items-center justify-center sm:flex">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="text-gray-500 w-full p-3 rounded-md border outline-none focus:border-indigo-600"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Amenidad"
            className="text-gray-500 w-full p-3 rounded-md border outline-none focus:border-indigo-600"
            onChange={(event) => {
              setAmenityReserved(event.target.value);
            }}
          />
          <input
            type="date"
            placeholder="Fecha"
            className="text-gray-500 w-full p-3 rounded-md border outline-none focus:border-indigo-600"
            onChange={(event) => {
              setReservationDate(event.target.value);
            }}
          />

          <button
            className="w-full mt-3 px-5 py-3 rounded-md text-white bg-red-800 outline-none shadow-md focus:shadow-none focus:ring-2 ring-offset-2 ring-indigo-600 sm:mt-0 sm:ml-3 sm:w-auto hover:bg-red-500"
            // type="submit"
            onClick={createReservation}
          >
            Crear Reserva
          </button>
        </form>
        <p className="mt-3 mx-auto text-center max-w-xl text-[15px] text-gray-400"></p>
      </div>
      <div className="space-y-4 text-center P-20">
        <h1 className="text-3xl text-gray-800 font-semibold mt-20">LISTA DE RESERVACIONES DE AMENIDADES</h1>
        <p className="text-gray-600 leading-relaxed">Consulte la lista de reservaciones que ha realizado.</p>
      </div>
      <div className="mt-5 items-center justify-center sm:flex">
        <button
          className="w-full mt-3 px-5 py-3 rounded-md text-white bg-red-800 outline-none shadow-md focus:shadow-none focus:ring-2 ring-offset-2 ring-indigo-600 sm:mt-0 sm:ml-3 sm:w-auto hover:bg-red-500"
          // type="submit"
          onClick={getReservation}
        >
          Ver Lista
        </button>
      </div>
    </section>
  );
};
