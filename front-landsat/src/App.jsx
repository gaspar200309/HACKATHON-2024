import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Map from "./Map";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inicio" element={<Map />} />
      </Routes>
    </>
  );
}

export default App;
