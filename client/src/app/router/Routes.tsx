import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import Catalog from "../../features/catalog/Catalog";
import GamePage from "../../features/catalog/GamePage";
import SignIn from "../../features/account/SignIn";
import Register from "../../features/account/Register";
import GameCollection from "../../features/gameCollection/GameCollection";
import RequireAuth from "./RequireAuth";

export const router = createBrowserRouter(([

    {
        path: '/',
        element: <App />,
        children: [
            {
                element: <RequireAuth />, children: [
                    { path: 'collection', element: <GameCollection /> },
                ]
            },
            { path: 'catalog', element: <Catalog /> },
            { path: 'catalog/:id', element: <GamePage /> },
            { path: 'sign-in', element: <SignIn /> },
            { path: 'register', element: <Register /> },
        ]
    }
]))