import { db } from "../firebaseConfig.js";
import { collection } from "firebase/firestore";

class CollectionsReducer {
  collections = new Map();

  //add a new line for each collection on the DB
  constructor() {
    this.collections = new Map();
    this.collections.set("Amenities", "AmenidadesData");
    this.collections.set("Reservations", "ReservationData");
    this.collections.set("Users", "UsersData");
    this.collections.set("Tests", "testCollection");
  }

  //Return the collection name on the DB for the requested key
  getCollectionReference(key) {
    const COLLECTION_NAME = this.collections.get(key);
    const COLLECTION_REFERENCE = collection(db, COLLECTION_NAME);
    return COLLECTION_REFERENCE;
  }
}

export default CollectionsReducer;
