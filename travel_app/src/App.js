import React, { useState } from 'react';
import './App.css';
import { useRoutes } from "react-router-dom"
import router from "./router"
import SavedPathsContext from "./SavedPathsContext"

export const ThemeContext = React.createContext();

function App() {
  const [savedPaths, setSavedPaths] = useState([]);
  const [displayedPath, setDisplayedPath] = useState([]);
  const [theme, setTheme] = useState('default');
  
  const outlet = useRoutes(router)
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}> 
      <SavedPathsContext.Provider value={{
        savedPaths,
        addPath: (path) => setSavedPaths((currentPaths) => [...currentPaths, path]),
        displayedPath,
        setDisplayedPath,
      }}>
        <div className="App">
          {/* <Link to="/home">Home</Link> 
          <Link to="/settings">Settings</Link>
          <Link to="/community">Community</Link> */}

          {/* Used to show components */}
          {/* <Outlet></Outlet> */}
          {outlet}
        </div>
      </SavedPathsContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
