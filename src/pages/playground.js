import React from "react";
import Revervations from "../components/reservations";
import Amenidades from "../components/amenidades";
import FirestoreTest from "../components/firestoreTest";

const Playground = () => {
  return (
    <div>
      <FirestoreTest></FirestoreTest>
      <Revervations></Revervations>
      <Amenidades></Amenidades>
    </div>
  );
};

export default Playground;
