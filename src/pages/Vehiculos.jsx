import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { fotosVehiculos } from "../assets/imagenes";

const Vehiculos = () => {
    const { store, dispatch } = useGlobalReducer();
    const [vehicles, setVehiculos] = useState([]);
    const [loading, setLoading] = useState(true);

    const fotosName = (name) => {
        const found = fotosVehiculos.find(img => img.name === name);
        return found ? found.url : "https://via.placeholder.com/400x200";
    };

    useEffect(() => {
        const getVehiculos = async () => {
            try {
                const res = await fetch("https://www.swapi.tech/api/vehicles");
                const data = await res.json();
                const detalles = await Promise.all(
                    data.results.map(async (vehiculo) =>{
                        const detalleRes = await fetch(vehiculo.url);
                        const detalleData = await detalleRes.json();
                        return {
                            ...vehiculo,
                            properties: detalleData.result.properties
                        };
                    })
                );
                setVehiculos(detalles);
            } catch (error) {
                console.error("Error al obtener vehículos:", error);
            } finally {
                setLoading(false);
            }
        };
        getVehiculos();
    }, []);

    if (loading) return <p className="text-center">Cargando vehículos...</p>;

    return (
        <>
            {vehicles.map((vehiculo) => {
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
