import React, { Suspense } from "react";
import "./App.css";
const ToastComponent = React.lazy(
  () => import("./component/toast/toastComponent")
);
const WeatherForecast = React.lazy(() => import("./container/weatherForecast"));
function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <WeatherForecast />
        <ToastComponent />
      </Suspense>
    </div>
  );
}

export default App;
