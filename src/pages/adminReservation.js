import React from "react";
import { useContext, useState, useEffect } from "react";
import DBAccess from "../utils/dbAccess";
import { loginContext, toastContext } from "../appContext";

function AdminReservation() {
  const reservationDB = new DBAccess("Reservations");
  const userContext = useContext(loginContext);
  const toastPopup = useContext(toastContext);

  const [allReservations, setAllReservations] = useState([]);

  const retrieveAllReservations = async () => {
    const completeReservations = await reservationDB.getAll();
    setAllReservations(completeReservations);
  };

  useEffect(() => {
    retrieveAllReservations();
  }, []);

  const updateReservationStatus = async (doc, updatedStatus) => {
    if (doc.status === "Rechazado" && updatedStatus === "Aprobado") {
      toastPopup.set({
        message: "No es posible aprobar una reservación después de rechazarla.",
        type: "error",
        timeOut: 4500,
      });
      return;
    }
    doc.status = updatedStatus;
    await reservationDB.updatePartialDoc(doc.id, doc);
    retrieveAllReservations();
    toastPopup.set({
      message: "Reservación actualizada exitosamente.",
      type: "success",
      timeOut: 4500,
    });
    return;
  };

  return (
    <div className=" p-10 bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Lista general de reservaciones</h1>
      <div className="max-w-5xl mx-auto mt-10 pb-12">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
            <table className="w-full table-auto text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                <tr>
                  <th className="py-3 px-6">Condominio</th>
                  <th className="py-3 px-6">Amenidad</th>
                  <th className="py-3 px-6">Fecha</th>
                  <th className="py-3 px-6">Horario</th>
                  <th className="py-3 px-6">Estado</th>
                  <th className="py-3 px-6"></th>
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y">
                {allReservations.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap">{item.condoNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.amenitySelected}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.reservationDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.reservationTime}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.status}</td>
                    <td className="text-right px-6 whitespace-nowrap">
                      <button
                        className="py-2 leading-none px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                        onClick={() => updateReservationStatus(item, "Aprobado")}
                      >
                        Aprobar
                      </button>
                      <button
                        className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                        onClick={() => updateReservationStatus(item, "Rechazado")}
                      >
                        Rechazar
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

export default AdminReservation;
