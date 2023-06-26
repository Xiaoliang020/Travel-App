import React, { lazy } from "react"
// import Community from "../views/Community"
import Home from "../views/Home"
// import Settings from "../views/Settings"

//Navigate redirect component
import { Navigate } from "react-router-dom"

// lazy loading
const Community = lazy(()=>import("../views/Community"))
const Settings = lazy(()=>import("../views/Settings"))
const Location = lazy(()=>import("../views/Location"))
const Map = lazy(()=>import("../views/Map"))

const withLoadingComponent = (comp) =>(
    <React.Suspense fallback={<div>Loading...</div>}>
        {comp}
    </React.Suspense>
)

const routes = [
    {
        path:'/',
        element: <Navigate to="/map"/>
    },
    {
        path:"/",
        element: <Home />,
        children:[
            {
                path:"/settings",
                element: withLoadingComponent(<Settings />)
            },
            {
                path:"/community",
                element: withLoadingComponent(<Community />)
            },
            {
                path:"/location",
                element: withLoadingComponent(<Location />)
            },
            {
                path:"/map",
                element: withLoadingComponent(<Map />)
            }
        ]
    }
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
