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
            dispatch({ type: "SET_PERSONAJES", payload: data.results });
        } catch (err) {
            console.error("Error cargando personajes:", err);
        }
    };
    const getPlanetas = async () => {
        try {
            const res = await fetch("https://www.swapi.tech/api/planets");
            const data = await res.json();
            dispatch({ type: "SET_PLANETAS", payload: data.results });
        } catch (err) {
            console.error("Error cargando planetas:", err);
        }
    };
    const getVehiculos = async () => {
        try {
            const res = await fetch("https://www.swapi.tech/api/vehicles");
            const data = await res.json();
            dispatch({ type: "SET_VEHICULOS", payload: data.results });
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