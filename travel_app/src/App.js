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

  const deletePath = (pathId) => {
    const updatedPaths = savedPaths.filter((path) => path.key !== pathId);
    setSavedPaths(updatedPaths);
    console.log(`Deleted path with ID ${pathId}`);
    console.log(`Current number of updated paths is ${updatedPaths.length}`);
    console.log(`Current number of saved paths is ${savedPaths.length}`);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <SavedPathsContext.Provider value={{
        savedPaths,
        addPath,
        deletePath,
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
