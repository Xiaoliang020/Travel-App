import './App.css';
import { useRoutes } from "react-router-dom"
import router from "./router"

function App() {
  const outlet = useRoutes(router)
  return (
    <div className="App">
      {/* <Link to="/home">Home</Link> 
      <Link to="/settings">Settings</Link>
      <Link to="/community">Community</Link> */}

      {/* Used to show components */}
      {/* <Outlet></Outlet> */}
      {outlet}
    </div>
  );
}

export default App;
