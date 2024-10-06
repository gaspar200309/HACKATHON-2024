import "./App.css";
import Home from "./pages/home/Home";
import LocationInput from "./components/Prueba";
import LocationSelector from "./pages/maps/Mapa";
import SpectralSignatureChart from "./components/Camb";
import NavBar from "./components/NavBar";
import Hero from "./pages/hero/Hero";

function App() {
  return (
    <>
      <div className="App">
        <NavBar />
        <Hero />
        <Home />
        <LocationSelector />
        <SpectralSignatureChart />

        <LocationInput />
      </div>
    </>
  );
}

export default App;
