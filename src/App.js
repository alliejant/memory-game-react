import React, { Component } from "react";
import Mock from "./Mock";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <h1>Memory Game</h1>
        </header>
        <Mock />
      </div>
    );
  }
}

export default App;
