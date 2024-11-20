import React from 'react';
import Gallery from './Gallery';
import './App.css';

/**
 * Root component for the Tour Comparison App.
 * Handles global application state and navigation (if necessary).
 */
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Tour Comparison App</h1>
      </header>
      <main>
        {/* Renders the Gallery component */}
        <Gallery />
      </main>
    </div>
  );
}

export default App;
