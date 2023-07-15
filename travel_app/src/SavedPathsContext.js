import React, { createContext } from 'react';

const SavedPathsContext = createContext({
    savedPaths: [],
    addPath: () => {},
    deletePath: () => {},
});

export default SavedPathsContext;