import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import Personajes from "./Personajes.jsx";
import Planetas from "./Planetas.jsx";
import Vehiculos from "./Vehiculos.jsx";
import { useActionState } from "react";

export const Home = () => {

  	const {store, actions} =useGlobalReducer()
	useEffect(() => {
		actions.getPersonajes();
		actions.getPlanetas();
		actions.getVehiculos();
	}, []);

	return (
		<div className="container my-4">
			<h2 className="text-danger mb-3">Personajes</h2>
			<div className="d-flex overflow-auto gap-3 pb-3">
				<Personajes />
			</div>

			<h2 className="text-danger mb-3">Planetas</h2>
			<div className="d-flex overflow-auto gap-3 pb-3">
				<Planetas />
			</div>

			<h2 className="text-danger mb-3">Vehiculos</h2>
			<div className="d-flex overflow-auto gap-3 pb-3">
				<Vehiculos />
			</div>
		</div>
	);
}; 