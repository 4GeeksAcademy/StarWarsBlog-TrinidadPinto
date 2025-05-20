import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { fotosPersonajes } from "../assets/imagenes";

const Personajes = () => {
    const { store, dispatch } = useGlobalReducer();
    const [characters, setPersonajes] = useState([]);
    const [loading, setLoading] = useState(true);

    const fotosName = (name) => {
        const found = fotosPersonajes.find(img => img.name === name);
        return found ? found.url : "https://via.placeholder.com/400x200";
    };
    
    useEffect(() => {
        const getPersonajes = async () => {
            try {
                const res = await fetch("https://www.swapi.tech/api/people");
                const data = await res.json();
                const detalles = await Promise.all(
                    data.results.map(async (personaje) =>{
                        const detalleRes = await fetch(personaje.url);
                        const detalleData = await detalleRes.json();
                        return {
                            ...personaje,
                            properties: detalleData.result.properties
                        };
                    })
                );
                setPersonajes(detalles);
            } catch (error) {
                console.error("Error al obtener personajes:", error);
            } finally {
                setLoading(false);
            }
        };

        getPersonajes();
    }, []);

    if (loading) return <p className="text-center">Cargando personajes...</p>;

    return (
        <>
            {characters.map((personaje) => {
                const esFavorito = store.favoritos.some(fav => fav.uid === personaje.uid && fav.type === "people");
                const { gender, hair_color, eye_color } = personaje.properties || {};
                return (
                    <div key={personaje.uid} className="card" style={{minWidth: "400px"}}>
                        <img 
                        src={fotosName(personaje.name)}
                        className="card-img-top"
                        alt={personaje.name}
                        />
                        <div className="card-body">
                            <h5 className="card-title">{personaje.name}</h5>
                            {personaje.properties ? (
                                <>
                                    <p>Genero: {gender}</p>
                                    <p>Color pelo: {hair_color}</p>
                                    <p>Color ojos: {eye_color}</p>
                                </>
                            ) : (
                                <p>Cargando descripcion...</p>
                            )}
                            <Link to={`/single/people/${personaje.uid}`} className="btn btn-primary">
                            Ver más
                            </Link>
                            <button 
                                className="btn btn-outline-warning ms-2"
                                onClick={() => dispatch({ type: "TOGGLE_FAVORITO", payload: { uid: personaje.uid, name: personaje.name, type: "people" }})}
                            >
                                <i className={`fa-${esFavorito ? "solid" : "regular"} fa-heart`}></i>
                            </button>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default Personajes;
