import { useState } from "react";
import React from 'react';
import { db } from "../firebaseConfig.js";
import { collection, getDocs, addDoc, doc } from "firebase/firestore";

const amenidadesCollectionRef = collection(db, "AmenidadesData");

class Amenidades extends React.Component {
	constructor(props) {
		super(props);


		this.state = {
            name: "",
            description: "",
            price: "",
			items: []
		}

        this.createAmenidad = this.createAmenidad.bind(this);

		this.loadData();
	}

    newId() {
		return Math.floor(Math.random() * (1 - 1000 + 1) ) + 1;
	}

    async loadData() {
        await getDocs(collection(db, "AmenidadesData")).then((querySnapshot)=> {
            querySnapshot.forEach((doc) => {
                const currentItem = {
                    name : doc.data().name,
                    description: doc.data().description,
                    price: doc.data().price
                }
                this.setState({
                    items: [...this.state.items, currentItem]
                });
            })
        })
    };

    async createAmenidad () {
        await addDoc(amenidadesCollectionRef, {
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
            metaData: "stuff",
        });
    };

    generateAmenidad(data) {
		return (
            <li key={data.id} className="p-5 bg-white rounded-md shadow-sm">
                <div>
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
                </div>
            </li>
		)
	}

    renderAmenidades() {
		let items = [];
		this.state.items.map((item, index) => {
            const dataItem = {
                id:index,
                name: item.name, 
                description: item.description, 
                price: item.price, 
            }
            items.push(this.generateAmenidad(dataItem));
		});
		if (items.length > 0) {
			return items;
		}
	}

    render() {
        const content = this.renderAmenidades();
		
		return (
			<main className="w-full h-screen flex flex-col items-center justify-center px-4">
                <div className="max-w-sm w-full text-gray-600">
                    <div className="text-center">
                        <div className="mt-5 space-y-2">
                            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Amenidades</h3>
                        </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed mt-5 space-y-2">Registrar nueva Amenidad</p>
                    <form onSubmit={(e) => e.preventDefault()} className="mt-8 space-y-5">
                        <div>
                        <label className="font-medium">Nombre</label>
                        <input
                            type="name"
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            onChange={(event) => {
                                this.setState({
                                    name: event.target.value
                                });
                            }}
                        />
                        </div>
                        <div>
                        <label className="font-medium">Description</label>
                        <input
                            type="description"
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            onChange={(event) => {
                                this.setState({
                                    description: event.target.value
                                });
                            }}
                        />
                        </div>
                        <div>
                        <label className="font-medium">Precio</label>
                        <input
                            type="price"
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            onChange={(event) => {
                                this.setState({
                                    price: event.target.value
                                });
                            }}
                        />
                        </div>
                        <button 
                            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                            onClick={this.createAmenidad}
                        >
                        Registrar
                        </button>
                    </form>

                    <section className="mt-12 max-w-screen-lg mx-auto px-4 md:px-8">
                        <div>
                            <h1 className="text-gray-800 text-3xl font-semibold">
                                Amenidades
                            </h1>
                        </div>

                        <ul className="mt-12 space-y-6">{content}</ul>
                    </section>
                </div>
            </main>
		);
	}
}

export default Amenidades;