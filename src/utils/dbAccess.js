import { addDoc, setDoc, getDocs, getDoc, updateDoc, deleteDoc, doc, query, where } from "firebase/firestore";
import CollectionsReducer from "./collectionsReducer";
import { db } from "../firebaseConfig.js";
import { collection } from "firebase/firestore";

class DBAccess {
  collectionKey;
  collectionsReducer;
  collectionReference;

  constructor(collectionKey) {
    this.collectionKey = collectionKey;
    this.collectionsReducer = new CollectionsReducer();
    this.collectionReference = this.collectionsReducer.getCollectionReference(collectionKey);
  }

  // save a new document in the database, if it receives a documentID it will create a custom documentID
  createOLD = async (data, documentID = 0) => {
    let docReference = this.collectionReference;
    if (documentID !== 0) {
      docReference = doc(this.collectionReference, documentID);
      const RESPONSE = await setDoc(docReference, data);
      return RESPONSE;
    }
    const RESPONSE = await addDoc(docReference, data);
    return RESPONSE.id;
  };

  create = async (data, documentID = 0, subCollectionName = 0) => {
    let docReference = this.collectionReference;
    if (documentID !== 0 && subCollectionName === 0) {
      docReference = doc(this.collectionReference, documentID);
      const RESPONSE = await setDoc(docReference, data);
      return RESPONSE;
    }
    if (subCollectionName !== 0) {
      docReference = doc(this.collectionReference, documentID);
      docReference = collection(docReference, subCollectionName);
    }
    const RESPONSE = await addDoc(docReference, data);
    return RESPONSE.id;
  };

  // // save a new document in the database, if it receives a documentID it will create/save in a custom documentID, if it receives a subCollectionName it will create/save in a subcollection
  // create = async (data, documentID = 0, subCollectionName = 0) => {
  //   let docReference = this.collectionReference;
  //   if (documentID !== 0 && subCollectionName === 0) {
  //     docReference = doc(this.collectionReference, documentID);
  //   }
  //   if (documentID !== 0 && subCollectionName !== 0) {
  //     docReference = collection(docReference, subCollectionName);
  //   }
  //   const RESPONSE = await addDoc(docReference, data);
  //   return RESPONSE.id;
  // };

  // get all documents in a collection as an array of js objects (carefull with data usage, don't pull big collections)
  getAll = async (documentId = 0, subCollectionName = 0) => {
    let query = this.collectionReference;
    if (documentId !== 0 && subCollectionName === 0) {
      query = doc(query, documentId);
    }
    if (documentId !== 0 && subCollectionName !== 0) {
      query = collection(query, documentId, subCollectionName);
    }
    const querySnapshot = await getDocs(query);
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ id: doc.id, ...doc.data() });
    });
    return docs;
  };

  // get all documents in a collection that meet the filter criteria, a valid filter object
  getAllWhere = async (filter) => {
    const myQuery = query(this.collectionReference, where(filter.part1, filter.operator, filter.part2));

    const QUERY_SNAPSHOT = await getDocs(myQuery);
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
  // remove = async (docId) => {
  //   const DOC_REFERENCE = doc(this.collectionReference, docId);
  //   return await deleteDoc(DOC_REFERENCE);
  // };

  remove = async (docId, subCollectionName = 0, subDocId = 0) => {
    let DOC_REFERENCE = doc(this.collectionReference, docId);
    if (subCollectionName !== 0 && subDocId !== 0) {
      const SUB_COLLECTION_REFERENCE = collection(doc(this.collectionReference, docId), subCollectionName);
      DOC_REFERENCE = doc(SUB_COLLECTION_REFERENCE, subDocId);
    }
    return await deleteDoc(DOC_REFERENCE);
  };
}

export default DBAccess;
