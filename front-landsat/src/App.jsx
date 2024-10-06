import './App.css'
import Home from './pages/home/Home'
import LocationInput from './components/Prueba'
import LocationSelector from './pages/maps/Mapa'
import SpectralSignatureChart from './components/Camb'

function App() {

  return (
    <>
      <Home/>
      <LocationSelector/>
      <SpectralSignatureChart/>

    <LocationInput/>
    </>
  )
}

export default App
