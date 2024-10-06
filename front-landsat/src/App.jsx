import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import LocationInput from "./components/Prueba";
import LocationSelector from "./pages/maps/Mapa";
import Cordenadas from "./pages/maps/cordenadas";
import SpectralSignatureChart from "./components/Camb";
import NavBar from "./components/NavBar";
import Hero from "./pages/hero/Hero";
import { Container, Toolbar } from "@mui/material";

function App() {
  return (
    <Router>
      <div className="App">
        <Container maxWidth="xl">
          <NavBar />
          <Toolbar />
          <Routes>
            <Route path="/hero" element={<Home />} />
            <Route path="/" element={<Hero />} />
            <Route path="/location-selector" element={<Cordenadas />} />
            <Route path="/spectral-signature" element={<SpectralSignatureChart />} />
            <Route path="/location-input" element={<LocationInput />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
