import React, { lazy } from "react"
// import Community from "../views/Community"
import Home from "../views/Home"
// import Settings from "../views/Settings"

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
                element: withLoadingComponent(<Settings />)
            },
            {
                path: "/community",
                element: withLoadingComponent(<Community />)
            },
            {
                path: "/location",
                element: withLoadingComponent(<Location />)
            },
            {
                path: "/map",
                element: withLoadingComponent(<Map />)
            },
            {
                path: "/helloworld",
                element: withLoadingComponent(<HelloWorld />)
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
    // {
    //     path:'/home',
    //     element: <Home />
    // },
    // {
    //     path:'settings',
    //     element: withLoadingComponent(<Settings />)
    // },
    // {
    //     path:'community',
    //     element: withLoadingComponent(<Community />)
    // }
]

export default routes