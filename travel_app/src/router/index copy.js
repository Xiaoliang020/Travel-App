// Write router as Componet
import App from "../App"
import Community from "../views/Community"
import Home from "../views/Home"
import Settings from "../views/Settings"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

const baseRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>}>
                <Route path="/" element={<Navigate to="/home" />}></Route>
                <Route path="/home" element={<Home/>}></Route>
                <Route path="/settings" element={<Settings/>}></Route>
                <Route path="/community" element={<Community/>}></Route>
            </Route>
        </Routes>
    </BrowserRouter>
)
export default baseRouter
