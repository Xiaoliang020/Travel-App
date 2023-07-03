import React, { createContext } from 'react';

const SavedPathsContext = createContext({
    savedPaths: [],
    addPath: () => { },
});

export default SavedPathsContext;
