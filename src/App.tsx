import React from "react";
import "./App.css";
import ToastComponent from "./component/toast/toastComponent";
import WeatherForecast from "./container/weatherForecast";

function App() {
  return (
    <div className="App">
      <WeatherForecast />
      <ToastComponent />
    </div>
  );
}

export default App;
