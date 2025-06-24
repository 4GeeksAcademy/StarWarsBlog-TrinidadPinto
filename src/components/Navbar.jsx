import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export const Navbar = () => {

	const { store, dispatch, actions } = useGlobalReducer();
	const { favoritos } = store;
	const [busqueda, setBusqueda] = useState("");
	const navigate = useNavigate();

	const toggleFavorito = (fav) => {
		dispatch({ type:'TOGGLE_FAVORITO', payload: fav });
	};

	const handleSearch = (e) => {
		e.preventDefault();
		if (busqueda.trim() === "") return;
		actions.buscarGlobal(busqueda);
		navigate("/resultados");
		setBusqueda("");
	};

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container-fluid">
				<Link to="/">
					<img src="https://img.icons8.com/ios/50/star-wars.png" height="70" alt="logo" />
				</Link>
				<div className="d-flex ms-auto align-items-center gap-3">
					<form className="d-flex" onSubmit={handleSearch}>
						<input
							className="form-control me-2"
							type="search"
							placeholder="Buscar..."
							aria-label="Buscar"
							value={busqueda}
							onChange={(e) => setBusqueda(e.target.value)}
						/>
						<button className="btn btn-outline-danger" type="submit">Buscar</button>
					</form>
					<div className="dropdown">
						<button
							className="btn btn-danger dropdown-toggle"
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
			</div>
		</nav>
	);
};