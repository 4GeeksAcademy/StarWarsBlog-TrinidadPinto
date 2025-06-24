import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";
import { fotosPersonajes, fotosPlanetas, fotosVehiculos } from "../assets/imagenes";

export const Resultados = () => {
	const { store, dispatch } = useGlobalReducer();
	const { busquedas, favoritos } = store;

    const obtenerImagen = (item) => {
        const coleccion = {
            people: fotosPersonajes,
            planets: fotosPlanetas,
            vehicles: fotosVehiculos
        }[item.type];

        const found = coleccion?.find(img => img.name === item.name);
        return found ? found.url : "https://via.placeholder.com/400x200";
    };

    const toggleFavorito = (item) => {
        dispatch({ type: "TOGGLE_FAVORITO", payload: item });
    };

	if (busquedas.length === 0) {
		return <p className="text-center mt-4">No se encontraron resultados.</p>;
	}

	return (
		<div className="container my-4">
			<h2 className="text-danger mb-4">Resultados de búsqueda</h2>
			<div className="row g-4">
				{busquedas.map((item, i) => {
                    const esFavorito = favoritos.some(fav => fav.uid === item.uid && fav.type === item.type);
					const { gender, hair_color, eye_color, climate, population, model } = item.properties || {};
                    return (
                        <div key={item.uid || i} className="col-sm-6 col-md-4 col-lg-3">
                            <div className="card h-100">
                                <img
                                    src={obtenerImagen(item)}
                                    className="card-img-top"
                                    alt={item.name}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{item.name}</h5>

                                    {item.type === "people" && (
                                        <>
                                            <p>Género: {gender}</p>
                                            <p>Color pelo: {hair_color}</p>
                                            <p>Color ojos: {eye_color}</p>
                                        </>
                                    )}

                                    {item.type === "planets" && (
                                        <>
                                            <p>Clima: {climate}</p>
                                            <p>Población: {population}</p>
                                        </>
                                    )}

                                    {item.type === "vehicles" && (
                                        <>
                                            <p>Modelo: {model}</p>
                                        </>
                                    )}
                                    
                                    <div className="mt-auto d-flex justify-content-between align-item-center">
                                        <Link to={`/single/${item.type}/${item.uid}`} className="btn btn-primary">Ver más</Link>
                                        <button className="btn btn-outline-warning ms-2" onClick={() => toggleFavorito(item)}>
                                            <i className={`fa-${esFavorito ? "solid" : "regular"} fa-heart`}></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
			</div>
		</div>
	);
};
