import React, { lazy } from "react"
import Home from "../views/Home"

//Navigate redirect component
import { Navigate } from "react-router-dom"

// lazy loading
const Community = lazy(() => import("../views/Community"))
const Settings = lazy(() => import("../views/Settings"))
const Location = lazy(() => import("../views/Location"))
const Map = lazy(() => import("../views/Map"))
const HelloWorld = lazy(() => import("../views/HelloWorld"))
const Login = lazy(() => import("../views/Login"))
const Register = lazy(() => import("../views/Register"))

const withLoadingComponent = (comp) => (
    <React.Suspense fallback={<div>Loading...</div>}>
        {comp}
    </React.Suspense>
)

const isAuthenticated = () => {
    // Retrieve the user info from sessionStorage
    const userStr = sessionStorage.getItem("user") || "{}"
    const user = JSON.parse(userStr)
    return !!user.username; // Return true if the user is authenticated, false otherwise
};

const authRoute = (component) => {
    const authenticated = isAuthenticated();
    return authenticated ? withLoadingComponent(component) : withLoadingComponent(<Navigate to="/login"/>);
};

const routes = [
    {
        path: '/',
        element: <Navigate to="/login" />
    },
    {
        path: "/",
        element: <Home />,
        children: [
            {
                path: "/settings",
                element: authRoute(<Settings />)
            },
            {
                path: "/community",
                element: authRoute(<Community />)
            },
            {
                path: "/location",
                element: authRoute(<Location />)
            },
            {
                path: "/map",
                element: authRoute(<Map />)
            },
            {
                path: "/helloworld",
                element: authRoute(<HelloWorld />)
            },
        ]
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "*",
        element: <Navigate to="/" />,
    },
]

export default routes