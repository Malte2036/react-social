import React from "react";
import logo from "./logo.svg";
import "./App.css";
import WelcomePage from "./welcome/WelcomePage";
import Database from "./database/database";

function App() {
  const database = new Database("http://192.168.179.115/v1", "react-test");

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <WelcomePage database={database}></WelcomePage>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
