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

  const outlet = useRoutes(router);

  const addPath = (pathData) => {
    setSavedPaths((currentPaths) => [...currentPaths, pathData]);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <SavedPathsContext.Provider value={{
        savedPaths,
        addPath,
        displayedPath,
        setDisplayedPath,
      }}>
        <div className="App">
          {outlet}
        </div>
      </SavedPathsContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
