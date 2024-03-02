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
const Paths = lazy(() => import("../views/Paths"))
const SharedPage = lazy(() => import("../views/Share"))
const Post = lazy(() => import("../views/Post"))
const Image = lazy(() => import("../views/Image"))
const Message = lazy(() => import("../views/Message"))
const Conversation = lazy(() => import("../views/Conversation"))

const withLoadingComponent = (comp) => (
    <React.Suspense fallback={<div>Loading...</div>}>
        {comp}
    </React.Suspense>
)

const isAuthenticated = () => {
    // Retrieve the user info from localStorage
    const userStr = localStorage.getItem("user") || "{}"
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
                path: "/paths",
                element: authRoute(<Paths />)
            },
            {
                path: "/helloworld",
                element: authRoute(<HelloWorld />)
            },
            {
                path: "/post/:postId",
                element: authRoute(<Post />)
            },
            {
                path: "/message",
                element: authRoute(<Message />)
            },
            {
                path: "/conversation/:conversationId",
                element: authRoute(<Conversation />)
            }
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
        path: "/share/:pathId",
        element: <SharedPage />,
    },
    {
        path: "/img/:imageId.png",
        element: <Image />,
    }
]

export default routes