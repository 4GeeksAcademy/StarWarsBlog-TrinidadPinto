export const initialStore = () => ({
  favoritos: [],
  personajes: [],
  planetas: [],
  vehiculos: [],
  busquedas: [],
});

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'TOGGLE_FAVORITO': {
      const fav = action.payload;
      const exists = store.favoritos.some (
        item => item.uid === fav.uid && item.type === fav.type
      ); 
      const favoritosNuevos = exists
      ? store.favoritos.filter( item => !(item.uid === fav.uid && item.type === fav.type)) 
      : [...store.favoritos, fav];

      return {
        ...store,
        favoritos: favoritosNuevos
      };
    }

    case 'SET_PERSONAJES':
      return {
        ...store,
        personajes: action.payload
      };

    case 'SET_PLANETAS':
      return {
        ...store,
        planetas: action.payload
      };

    case 'SET_VEHICULOS':
      return {
        ...store,
        vehiculos: action.payload
      };

    case 'SET_BUSQUEDAS':
      return {
        ...store,
        busquedas: action.payload
      };
      
    default:
      return store;
  }    
}
