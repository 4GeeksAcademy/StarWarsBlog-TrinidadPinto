import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { fotosVehiculos } from "../assets/imagenes";

const Vehiculos = () => {
    const { store, dispatch } = useGlobalReducer();
    const vehiculos = store.vehiculos;

    if (vehiculos.length === 0) return <p className="text-center">Cargando vehiculos...</p>

    const fotosName = (name) => {
        const found = fotosVehiculos.find(img => img.name === name);
        return found ? found.url : "https://via.placeholder.com/400x200";
    };

    return (
        <>
            {vehiculos.map((vehiculo) => {
                const esFavorito = store.favoritos.some(fav => fav.uid === vehiculo.uid && fav.type === "vehicles");
                const { cargo_capacity, passengers, vehicle_class } = vehiculo.properties || {};
                return(
                    <div key={vehiculo.uid} className="card" style={{minWidth: "400px"}}>
                        <img 
                        src={fotosName(vehiculo.name)}
                        className="card-img-top"
                        alt={vehiculo.name}
                        />
                        <div className="card-body">
                            <h5 className="card-title">{vehiculo.name}</h5>
                            {vehiculo.properties ? (
                                <>
                                    <p>Capacidad de carga: {cargo_capacity}</p>
                                    <p>Pasajeros: {passengers}</p>
                                    <p>Tipo de vehiculo: {vehicle_class}</p>
                                </>
                            ) : (
                                <p>Cargando descripcion...</p>
                            )}
                            <Link to={`/single/vehicles/${vehiculo.uid}`} className="btn btn-primary">
                            Ver más                            
                            </Link>
                            <button 
                                className="btn btn-outline-warning ms-2"
                                onClick={() => dispatch({ type: "TOGGLE_FAVORITO", payload: { uid: vehiculo.uid, name: vehiculo.name, tipo: "vehicles" }})}
                            >
                                <i className={`fa-${esFavorito ? "solido" : "regular"} fa-heart`}></i>
                            </button>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default Vehiculos;
