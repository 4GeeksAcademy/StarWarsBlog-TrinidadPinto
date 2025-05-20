import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";
import { initialStore } from "../store";
import storeReducer from "../store";

export const Navbar = () => {

	const { store, dispatch } = useGlobalReducer();
	const {favoritos} = store;
	const toggleFavorito = (fav) =>{
		dispatch({ type:'TOGGLE_FAVORITO', payload: fav });
	};

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<img src="https://img.icons8.com/ios/50/star-wars.png" height="70" alt="logo" />
				</Link>
				<div className="dropdown">
					<button
						className="btn btn-primary dropdown-toggle"
						type="button"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						Favoritos <span className="badge bg-secondary">{favoritos.length}</span>
					</button>
					<ul className="dropdown-menu dropdown-menu-end">
						{favoritos.length === 0 ? (
                        	<li className="dropdown-item text-muted">0 favoritos</li>
                    	) : (
							favoritos.map((fav, index) => (
								<li key={index} className="dropdown-item d-flex justify-content-between align-items-center">
									<Link to={`/single/${fav.type}/${fav.uid}`} className="text-decoration-none me-2">
                                    	{fav.name}
                                	</Link>
									<i
										className="fa-solid fa-trash text-danger"
										role="button"
										onClick={() => toggleFavorito(fav)}
									></i>
								</li>
							))
						)}		
					</ul>
				</div>
			</div>
		</nav>
	);
};