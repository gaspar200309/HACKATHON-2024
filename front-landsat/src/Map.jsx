import { Container } from "@mui/material";
import NavBar from "./components/NavBar";
// import SpectralSignatureChart from "./components/Camb";
// import LocationInput from "./components/Prueba";
import Cordenadas from "./pages/maps/cordenadas";
// import LocationSelector from "./pages/maps/Mapa";
function Map() {
  return (
    <div className="App">
      <Container maxWidth="xl">
        <NavBar />
        {/* <LocationSelector /> */}
        {/* <SpectralSignatureChart /> */}
        {/* <LocationInput /> */}
        <Cordenadas />
      </Container>
    </div>
  );
}

export default Map;
