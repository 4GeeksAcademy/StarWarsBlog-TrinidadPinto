import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { fotosPlanetas } from "../assets/imagenes";

const Planetas = () => {
    const { store, dispatch } = useGlobalReducer();
    const [planets, setPlanetas] = useState([]);
    const [loading, setLoading] = useState(true);

    const fotosName = (name) => {
        const found = fotosPlanetas.find(img => img.name === name);
        return found ? found.url : "https://via.placeholder.com/400x200";
    };

    useEffect(() => {
        const getPlanetas = async () => {
            try {
                const res = await fetch("https://www.swapi.tech/api/planets");
                const data = await res.json();
                const detalles = await Promise.all(
                    data.results.map(async (planeta) =>{
                        const detalleRes = await fetch(planeta.url);
                        const detalleData = await detalleRes.json();
                        return {
                            ...planeta,
                            properties: detalleData.result.properties
                        };
                    })
                );
                setPlanetas(detalles);
            } catch (error) {
                console.error("Error al obtener planetas:", error);
            } finally {
                setLoading(false);
            }
        };

        getPlanetas();
    }, []);

    if (loading) return <p className="text-center">Cargando planetas...</p>;

    return (
        <>
            {planets.map((planeta) => {
                const esFavorito = store.favoritos.some(fav => fav.uid === planeta.uid && fav.type === "planets");
                const { population, terrain } = planeta.properties || {};
                return (
                    <div key={planeta.uid} className="card" style={{minWidth: "400px"}}>
                        <img 
                        src={fotosName(planeta.name)}
                        className="card-img-top"
                        alt={planeta.name}
                        />
                        <div className="card-body">
                            <h5 className="card-title">{planeta.name}</h5>
                            {planeta.properties ? (
                                <>
                                    <p>Poblacion: {population}</p>
                                    <p>Terreno: {terrain}</p>
                                </>
                            ) : (
                                <p>Cargando descripcion...</p>
                            )}
                            <Link to={`/single/planets/${planeta.uid}`} className="btn btn-primary">
                            Ver más
                            </Link>
                            <button 
                                className="btn btn-outline-warning ms-2"
                                onClick={() => dispatch({ type: "TOGGLE_FAVORITO", payload: { uid: planeta.uid, name: planeta.name, type: "planets" }})}
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

export default Planetas;
