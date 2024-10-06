import "./App.css";
import { Route, Routes } from "react-router-dom";
import LocationInput from "./components/Prueba";
import Cordenadas from "./pages/maps/cordenadas";
import SpectralSignatureChart from "./components/Camb";
import NavBar from "./components/NavBar";
import Hero from "./pages/hero/Hero";
import { Container, Toolbar } from "@mui/material";

function App() {
  return (
    <div className="App">
      <Container maxWidth="xl">
        <NavBar />
        <Toolbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          {/* <Route path="/hero" element={<Home />} /> */}
          <Route path="/location-selector" element={<Cordenadas />} />
          <Route
            path="/spectral-signature"
            element={<SpectralSignatureChart />}
          />
          <Route path="/location-input" element={<LocationInput />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
