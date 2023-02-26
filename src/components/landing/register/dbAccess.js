import { db } from "../../../firebaseConfig.js";
import { collection, addDoc } from "firebase/firestore";

class DbAccess {
  #usersCollectionRef = collection(db, "UsersData");
  cosa = 90;
  saveEmail = async (email, phoneNumber, metaData) => {
    const data = {
      email: email,
      phoneNumber: phoneNumber,
      metaData: metaData,
    };
    await addDoc(this.#usersCollectionRef, data);
  };
}

export default new DbAccess();
