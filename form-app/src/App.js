import React from "react";
import FormComponent from "./components/FormComponent.js";
import "./App.css";
import Header from "./components/Header.js";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <FormComponent />
      </div>
    );
  }
}

export default App;
