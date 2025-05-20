import useGlobalReducer from "../hooks/useGlobalReducer";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fotosPersonajes, fotosPlanetas, fotosVehiculos } from "../assets/imagenes";

export const Single = () => {
  const { type, uid } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const fotosName = (name) => {
    const dict = {
      people: fotosPersonajes,
      planets: fotosPlanetas,
      vehicles: fotosVehiculos
    };
    const arr = dict[type];
    if (!arr) return "https://via.placeholder.com/600x400";
    const found = arr.find(img => img.name === name);
    return found ? found.url : "https://via.placeholder.com/600x400";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://www.swapi.tech/api/${type}/${uid}`);
        const data = await res.json();
        setItem(data.result);
      } catch (error) {
        console.error("Error al cargar el recurso:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [type, uid]);
  
  if (loading) return <p className="text-center mt-4">Cargando datos...</p>;
  if (!item) return <p className="text-center mt-4">No se encontró el elemento.</p>;

  const { description, properties } = item;
  const name = properties?.name || "Sin nombre";

  const keysToShow = {
    people: ["gender", "birth_year", "eye_color", "hair_color", "height", "mass"],
    planets: ["climate", "population", "orbital_period", "rotation_period", "diameter"],
    vehicles: ["model", "manufacturer", "cost_in_credits", "max_atmosphering_speed", "crew", "passengers"]
  };
  
  return (
    <div className="container my-5 text-dark">
      <div className="row align-items-center">
        <div className="col-md-6 mb-4">
          <img src={fotosName(name)} alt={name} className="img-fluid rounded" style={{ maxHeight: "400px", objectFit: "cover" }} />
        </div>
        <div className="col-md-6">
          <h1 className="text">{name}</h1>
          <p className="mt-3">
            {description || "No hay descripción disponible. Lorem ipsum dolor sit amet consectetur adipiscing elit."}
          </p>
        </div>
      </div>

      <hr className="border-danger my-5" />

      <div className="row text-center text-danger">
        {keysToShow[type]?.map(key => (
          <div className="col-6 col-md-2 mb-3" key={key}>
            <h6 className="text-uppercase fw-bold">{key.replaceAll("_", " ")}</h6>
            <p className="mb-0">{properties[key]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
