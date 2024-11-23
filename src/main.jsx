// main.jsx
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider,Navigate } from "react-router-dom"

import 'boxicons'
import './css/main.css'
import './css/book.list.css'

import Root         from "./routes/root";
import OutletRoutes from './routes/outlet.routes.jsx';
import ErrorPage    from "./components/error-page";

const router = createBrowserRouter([
    {
        path: '/', // Root path
        element: <Navigate to="/NEW/All/new" replace /> // Redirect root to NEW submenu
    },
    {
        path: '/:menu/:submenu/:submenuid', // Dynamic paths
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/:menu/:submenu/:submenuid',
                element: <OutletRoutes />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);