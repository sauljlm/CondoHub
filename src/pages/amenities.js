import React, { useState, useEffect } from 'react';
import DBAccess from "../utils/dbAccess";
import TimeBlock from '../components/amenities/timeBlock';

const Amenities = () => {

    const dataDB = new DBAccess("Amenities");

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [items, setItems] = useState([]);
    const [timeBlocks, setTimeBlocks] = useState([{
        id : 1,
        startTime : "",
        endTime : ""
    }]);

    useEffect(async () => {
        loadData();
    }, [])

    useEffect(() => {
        console.log(timeBlocks);
    }, [timeBlocks]);

    const loadData = async () => {
        const docs = await dataDB.getAll();
        await setItems(docs);
    };

    const createAmenitie = async () => {
        await dataDB.create({ 
            name: name,
            description: description,
            price: price,
            timeBlocks: timeBlocks,
            metaData: "stuff",
        });
        loadData();
    };

    const newTimeBlock = () => {
        timeBlockData = {
            id : timeBlocks.length+1,
            startTime : "",
            endTime : ""
        }

        setTimeBlocks([...timeBlocks, timeBlockData]);
        console.log(timeBlocks)
    }

    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-5">Amenidades</h2>
            <h3 className="text-1xl font-bold mb-5">Registrar nueva Amenidad</h3>
            <form onSubmit={(e) => e.preventDefault()} className="mt-8 space-y-5">
                <div className="mb-4">
                    <label className="block mb-2 text-gray-500">Nombre</label>
                    <input
                        type="name"
                        required
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        onChange={(event) => {
                            setName(event.target.value);
                        }}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-gray-500">Description</label>
                    <input
                        type="description"
                        required
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        onChange={(event) => {
                            setDescription(event.target.value);
                        }}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-gray-500">Precio</label>
                    <input
                        type="price"
                        required
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        onChange={(event) => {
                            setPrice(event.target.value);
                        }}
                    />
                </div>
                <div class="flex justify-between">
                    <h3 className="text-1xl font-bold mb-5">Horarios</h3>
                    <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={newTimeBlock}
                    >
                        Agregar nuevo
                    </button>
                </div>
                <div className="mb-4">
                    {timeBlocks.map((result) => (
                        <TimeBlock
                            id = {result.id}
                            setTimeBlocks = {setTimeBlocks}
                            timeBlocks = {timeBlocks}
                        />
                    ))}
                </div>
                <div className="flex justify-center m-8">
                    <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-8"
                        onClick={() => createAmenitie()}
                    >
                        Registrar
                    </button>
                    <button 
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-8"
                    >
                        Cancelar
                    </button>
                </div>
            </form>

            
            <h3 className="text-1xl font-bold mb-5">Amenidades creadas</h3>

            <ul className="mt-12 space-y-6">
            {items.map((data, index) => (
                <li key={data.id} className="p-5 bg-white rounded-md drop-shadow-xl">
                    <div className="justify-between sm:flex">
                        <div className="flex-1">
                            <h3 className="text-xl font-medium text-cyan-600">
                                {data.name}
                            </h3>
                            <p className="text-gray-500 mt-2 pr-2">
                                {data.description}
                            </p>
                        </div>
                        
                    </div>
                    <div className="mt-4 items-center space-y-4 text-sm sm:flex sm:space-x-4 sm:space-y-0">
                        <span className="flex items-center text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                            </svg>
                            {data.price}
                        </span>
                    </div>
                </li>
            ))}
            </ul>
        </div>
    );
};

export default Amenities;