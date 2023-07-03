import { useContext } from 'react';
import SavedPathsContext from '../SavedPathsContext';


export default function Settings() {
    const { savedPaths } = useContext(SavedPathsContext);

    return (
        <div>
            <h1>Settings</h1>

            <h2>Saved Paths</h2>
            {savedPaths.map((path, index) => (
                <div key={index}>
                    {/* Replace this with how you want to display the path */}
                    Path {index + 1}: {path[0].lat}, {path[0].lng}
                </div>
            ))}
        </div>
    );
}