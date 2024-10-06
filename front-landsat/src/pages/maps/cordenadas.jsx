

// Cordenadas.js
import React, { useState, useEffect } from 'react';
import ControlPanel from './ControlPanel';
import MapView from './Mapa'
import './Cordenadas.css';
import LandsatGrid from './LandsatGrid';

const Cordenadas = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState([51.505, -0.09]);

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
      <MapView 
        setSelectedLocation={setSelectedLocation}
        currentLocation={currentLocation}
      />
      
      <div className="control-panel-container">
        <ControlPanel setLocation={setSelectedLocation} />
      </div>
      
      <div className="metadata-container">
        <h2>Metadatos de la ubicación</h2>
        {selectedLocation ? (
          <p>Latitud: {selectedLocation.lat}, Longitud: {selectedLocation.lng}</p>
        ) : (
          <p>Selecciona una ubicación en el mapa.</p>
        )}
      </div>

      {selectedLocation && <LandsatGrid location={selectedLocation} />}
    </div>
  );
};

export default Cordenadas;