import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore } from "../store" 

const StoreContext = createContext();

export function StoreProvider({ children }) {
    const [store, dispatch] = useReducer(storeReducer, initialStore());

    return (
        <StoreContext.Provider value={{ store, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
}

export default function useGlobalReducer() {
    const { dispatch, store } = useContext(StoreContext);

    const getPersonajes = async () => {
        try {
            const res = await fetch("https://www.swapi.tech/api/people");
            const data = await res.json();

            const detalles = await Promise.all(
                data.results.map(async (personaje) => {
                    try {
                        const detalleRes = await fetch(personaje.url);
                        const detalleData = await detalleRes.json();

                        return {
                            uid: detalleData.result.uid,
                            name: detalleData.result.properties.name,
                            properties: detalleData.result.properties
                        };
                    } catch (err) {
                        console.warn(`Error cargando detalles de ${personaje.name}:`, err);
                        return {
                            uid: personaje.uid,
                            name: personaje.name,
                            properties: null
                        };
                    }
                })
            );
            dispatch({ type: "SET_PERSONAJES", payload: detalles });
        } catch (err) {
            console.error("Error cargando personajes:", err);
        }
    };

    const getPlanetas = async () => {
        try {
            const res = await fetch("https://www.swapi.tech/api/planets");
            const data = await res.json();

            const detalles = await Promise.all(
                data.results.map(async (planeta) => {
                    try {
                        const detalleRes = await fetch(planeta.url);
                        const detalleData = await detalleRes.json();

                        return {
                            uid: detalleData.result.uid,
                            name: detalleData.result.properties.name,
                            properties: detalleData.result.properties
                        };
                    } catch (err) {
                        console.warn(`Error cargando detalles de ${planeta.name}:`, err);
                        return {
                            uid: planeta.uid,
                            name: planeta.name,
                            properties: null
                        };
                    }
                })
            );
            dispatch({ type: "SET_PLANETAS", payload: detalles });
        } catch (err) {
            console.error("Error cargando planetas:", err);
        }
    };

    const getVehiculos = async () => {
        try {
            const res = await fetch("https://www.swapi.tech/api/vehicles");
            const data = await res.json();

            const detalles = await Promise.all(
                data.results.map(async (vehiculo) => {
                    try {
                        const detalleRes = await fetch(vehiculo.url);
                        const detalleData = await detalleRes.json();

                        return {
                            uid: detalleData.result.uid,
                            name: detalleData.result.properties.name,
                            properties: detalleData.result.properties
                        };
                    } catch (err) {
                        console.warn(`Error cargando detalles de ${vehiculo.name}:`, err);
                        return {
                            uid: vehiculo.uid,
                            name: vehiculo.name,
                            properties: null
                        };
                    }
                })
            );
            dispatch({ type: "SET_VEHICULOS", payload: detalles });
        } catch (err) {
            console.error("Error cargando vehiculos:", err);
        }
    };

    const buscarGlobal = (query) => {
        const q = query.toLowerCase();
        const resultados = [
            ...store.personajes.map(p => ({ ...p, type: "people" })),
            ...store.planetas.map(p => ({ ...p, type: "planets" })),
            ...store.vehiculos.map(p => ({ ...p, type: "vehicles" }))
        ].filter(item => item.name.toLowerCase().includes(q));

        dispatch({ type: "SET_BUSQUEDAS", payload: resultados });
    };

    return {
        dispatch,
        store,
        actions: {
            getPersonajes,
            getPlanetas,
            getVehiculos,
            buscarGlobal
        }
    };
}