import { addDoc, setDoc, getDocs, getDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import CollectionsReducer from "./collectionsReducer";

class DBAccess {
  collectionsReducer;
  collectionReference;

  constructor(collectionKey) {
    this.collectionsReducer = new CollectionsReducer();
    this.collectionReference = this.collectionsReducer.getCollectionReference(collectionKey);
  }

  // save a new document in the database
  create = async (data) => {
    const DOC_REFERENCE = await addDoc(this.collectionReference, data);
    return DOC_REFERENCE.id;
  };

  // get all documents in a collection as an array of js objects (carefull with data usage, don't pull big collections)
  getAll = async () => {
    const QUERY_SNAPSHOT = await getDocs(this.collectionReference);
    const DOCS = [];
    QUERY_SNAPSHOT.forEach((doc) => {
      DOCS.push({ id: doc.id, ...doc.data() });
    });
    return DOCS;
  };

  // returns one document by id as js object
  getOneById = async (queryKey) => {
    const DOC_REFERENCE = doc(this.collectionReference, queryKey);
    const SNAPSHOT = await getDoc(DOC_REFERENCE);
    if (SNAPSHOT.exists()) {
      return SNAPSHOT.data();
    }
    return {};
  };

  // update an existing document with new data (data contains the full document)
  updateFullDoc = async (docId, data) => {
    const DOC_REFERENCE = doc(this.collectionReference, docId);
    return await setDoc(DOC_REFERENCE, data);
  };

  // update an existing document with new data (data contains a partial document)
  updatePartialDoc = async (docId, data) => {
    const DOC_REFERENCE = doc(this.collectionReference, docId);
    return await updateDoc(DOC_REFERENCE, data);
  };

  // delete an existing document from the collection
  remove = async (docId) => {
    const DOC_REFERENCE = doc(this.collectionReference, docId);
    return await deleteDoc(DOC_REFERENCE);
  };
}

export default DBAccess;
