import { useState } from "react";
import DBAccess from "../utils/dbAccess";

// This component is a proff of concept for the dbAccess component to demostrate its usage
function FirestoreTest() {
  // Set variables for each textfield or element we need to track state using the useState hook
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");
  const [docId, setDocId] = useState("");
  const [docIdToDelete, setDocIdToDelete] = useState("");
  const [updateDocId, setUpdateDocId] = useState("");
  const [updatePartialDocId, setUpdatePartialDocId] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //A DBAccess objects needs to be initialized for each collection you want to access, for this example we will access Tests collection
  const testDataDB = new DBAccess("Tests");

  //Create functions to do the async work
  const testCreate = async () => {
    setIsLoading(true);
    const id = await testDataDB.create({ user: "John Doe", text: text });
    setResults([{ message: `New document created with ID ${id}` }]);
    setIsLoading(false);
  };

  const testGetAll = async () => {
    setIsLoading(true);
    const docs = await testDataDB.getAll();
    setResults(docs);
    setIsLoading(false);
  };

  const testGetOneById = async () => {
    setIsLoading(true);
    const doc = await testDataDB.getOneById(docId);
    setResults([doc]);
    setIsLoading(false);
  };

  const testUpdateFullDoc = async () => {
    setIsLoading(true);
    const result = await testDataDB.updateFullDoc(updateDocId, { user: "John Doe Reloaded", text: text2 });
    setResults([{ message: `Document updated: ${result}` }]);
    setIsLoading(false);
  };

  const testUpdatePartialDoc = async () => {
    setIsLoading(true);
    const result = await testDataDB.updatePartialDoc(updatePartialDocId, { user: "John Doe partialUpdateNameChange" });
    setResults([{ message: `Document updated: ${result}` }]);
    setIsLoading(false);
  };

  const testRemove = async () => {
    setIsLoading(true);
    const result = await testDataDB.remove(docIdToDelete);
    setResults([{ message: `Document removed: ${result}` }]);
    setIsLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Firestore Test {isLoading && <span> Loading data over the internet...</span>}
      </h1>

      <div className="flex flex-wrap gap-4">
        <form onSubmit={(e) => e.preventDefault()} className="items-center justify-center sm:flex">
          <input
            type="text"
            placeholder="test text"
            className="text-gray-500 w-full p-3 rounded-md border outline-none focus:border-greenTheme"
            onChange={(event) => {
              setText(event.target.value);
            }}
          />
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={testCreate}>
            Create document
          </button>
        </form>
      </div>
      <div className="mt-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={testGetAll}>
          Get all documents
        </button>
      </div>
      <div className="mt-4">
        <form onSubmit={(e) => e.preventDefault()} className="items-center justify-center sm:flex">
          <input
            type="text"
            placeholder="docId"
            className="text-gray-500 w-full p-3 rounded-md border outline-none focus:border-greenTheme"
            onChange={(event) => {
              setDocId(event.target.value);
            }}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={testGetOneById}
          >
            Get one document by ID
          </button>
        </form>
      </div>
      <div className="mt-4">
        <form onSubmit={(e) => e.preventDefault()} className="items-center justify-center sm:flex">
          <input
            type="text"
            placeholder="docID"
            className="text-gray-500 w-full p-3 rounded-md border outline-none focus:border-greenTheme"
            onChange={(event) => {
              setUpdateDocId(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="text to update"
            className="text-gray-500 w-full p-3 rounded-md border outline-none focus:border-greenTheme"
            onChange={(event) => {
              setText2(event.target.value);
            }}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={testUpdateFullDoc}
          >
            Update document (full)
          </button>
        </form>
      </div>
      <div className="mt-4">
        <form onSubmit={(e) => e.preventDefault()} className="items-center justify-center sm:flex">
          <input
            type="text"
            placeholder="docID"
            className="text-gray-500 w-full p-3 rounded-md border outline-none focus:border-greenTheme"
            onChange={(event) => {
              setUpdatePartialDocId(event.target.value);
            }}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={testUpdatePartialDoc}
          >
            Update document (partial)
          </button>
        </form>
      </div>
      <div className="mt-4">
        <form onSubmit={(e) => e.preventDefault()} className="items-center justify-center sm:flex">
          <input
            type="text"
            placeholder="docID"
            className="text-gray-500 w-full p-3 rounded-md border outline-none focus:border-greenTheme"
            onChange={(event) => {
              setDocIdToDelete(event.target.value);
            }}
          />
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={testRemove}>
            Remove document
          </button>
        </form>
      </div>
      <div className="mt-4">
        {results.map((result, index) => (
          <p key={index} className="bg-gray-200 py-2 px-4 rounded mb-2">
            {JSON.stringify(result)}
          </p>
        ))}
      </div>
    </div>
  );
}

export default FirestoreTest;
