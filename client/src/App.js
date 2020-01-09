import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Test React</h2>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a href="http://localhost:5000/auto/google">sign in with google</a>

      </header>
    </div>
  );
}

export default App;
