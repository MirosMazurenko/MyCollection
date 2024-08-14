import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import Catalog from "../../features/catalog/Catalog";
import GamePage from "../../features/catalog/GamePage";

export const router = createBrowserRouter(([

    {
        path: '/',
        element: <App />,
        children: [
            { path: 'catalog', element: <Catalog /> },
            { path: 'catalog/:id', element: <GamePage /> },
        ]
    }
]))