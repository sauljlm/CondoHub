import { db } from "../firebaseConfig.js";
import { collection } from "firebase/firestore";

class CollectionsReducer {
  collections = new Map();

  //add a new line for each collection on the DB
  constructor() {
    this.collections = new Map();
    this.collections.set("Amenities", "AmenidadesData");
    this.collections.set("Reservations", "ReservationData");
    this.collections.set("Tests", "testCollection");
    this.collections.set("UsersPrivate", "users_private");
  }

  //Return the collection reference by name on the DB for the requested key
  getCollectionReference(collectionKey) {
    const COLLECTION_NAME = this.collections.get(collectionKey);
    const COLLECTION_REFERENCE = collection(db, COLLECTION_NAME);
    return COLLECTION_REFERENCE;
  }

  //Return the doc reference for the requested id
  getDocReference(collectionKey, docID) {
    const COLLECTION_NAME = this.collections.get(collectionKey);
    const DOC_REFERENCE = db.collection(COLLECTION_NAME).doc(docID);
    return DOC_REFERENCE;
  }
}

export default CollectionsReducer;
