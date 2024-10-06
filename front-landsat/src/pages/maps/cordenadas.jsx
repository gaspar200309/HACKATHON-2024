// Cordenadas.js
import React, { useState, useEffect } from 'react';
import ControlPanel from './ControlPanel';
import MapView from './Mapa';
import './Cordenadas.css'; // Asegúrate de crear este archivo para los estilos

const Cordenadas = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState([51.505, -0.09]); // Coordenadas iniciales (Londres)

  // Obtener ubicación actual del usuario
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation([latitude, longitude]);
        },
        (error) => {
          console.error("Error al obtener la ubicación:", error);
        }
      );
    } else {
      console.error("La geolocalización no es compatible con este navegador.");
    }
  }, []);

  return (
    <div className="layout-container">
      <div className="control-panel-container">
        <h1>Selecciona una ubicación en el mapa</h1>
        {selectedLocation && (
          <p>
            Coordenadas seleccionadas: Latitud: {selectedLocation.lat}, Longitud: {selectedLocation.lng}
          </p>
        )}
        <ControlPanel setLocation={setSelectedLocation} />
      </div>
      <MapView currentLocation={currentLocation} setLocation={setSelectedLocation} />
    </div>
  );
};

export default Cordenadas;
