import { db } from "../../firebaseConfig.js";
import { collection, getDocs, addDoc } from "firebase/firestore";

const DbAccess = async (email, phoneNumber, metaData) => {
  const createData = async (email, phoneNumber, metaData) => {
    const usersCollectionRef = collection(db, "UsersData");
    const data = {
      email: email,
      phoneNumber: phoneNumber,
      metaData: metaData,
    };
    await addDoc(usersCollectionRef, data);
  };
};

export default DbAccess;
