import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import {Single} from "./pages/Single"
import { Resultados } from "./pages/Resultados";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "single/:type/:uid", element: <Single /> },
      { path: "resultados", element: <Resultados /> },
      { path: "*", element: <p>Not found!</p> },
    ],
  },
]);