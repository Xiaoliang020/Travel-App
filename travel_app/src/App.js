import React, { useState } from 'react';
import './App.css';
import { useRoutes } from "react-router-dom"
import router from "./router"
import SavedPathsContext from "./SavedPathsContext"  // 根据你的文件路径替换这里

function App() {
  const [savedPaths, setSavedPaths] = useState([]);
  const outlet = useRoutes(router)
  return (
    <SavedPathsContext.Provider value={{
      savedPaths,
      addPath: (path) => setSavedPaths((currentPaths) => [...currentPaths, path]),
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
  );
}

export default App;
