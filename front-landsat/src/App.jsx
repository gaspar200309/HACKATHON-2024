import "./App.css";
import Home from "./pages/home/Home";
import LocationInput from "./components/Prueba";
import LocationSelector from "./pages/maps/Mapa";
import SpectralSignatureChart from "./components/Camb";
import NavBar from "./components/NavBar";
import Hero from "./pages/hero/Hero";
import { Container, Toolbar } from "@mui/material";

function App() {
  return (
    <>
      <div className="App">
        <Container maxWidth="xl">
          <NavBar />
          <Hero />
          <Toolbar />
          <Home />
          <LocationSelector />
          <SpectralSignatureChart />
          <LocationInput />
        </Container>
      </div>
    </>
  );
}

export default App;
