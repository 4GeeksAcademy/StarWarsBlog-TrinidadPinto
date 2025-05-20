export const initialStore=()=>{
   return{
    favoritos: [],
  };
};

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
    default:
      return store;
  }    
}
