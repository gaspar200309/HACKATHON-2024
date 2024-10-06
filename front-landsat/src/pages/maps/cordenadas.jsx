import React, { useState, useEffect } from 'react';
import ControlPanel from './ControlPanel';
import MapView from './Mapa'
import './Cordenadas.css';
import LandsatGrid from './LandsatGrid';
import Result from './Result';

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
   
      <div style={{display:'flex', width:'100%', }}>
    
      <div className="control-panel-container" style={{width:'100%'}} >
        <ControlPanel setLocation={setSelectedLocation} />
      </div>
     
      <div  style={{width:'80%', height:'100%', display:'flex'}}>
      <MapView 
        setSelectedLocation={setSelectedLocation}
        currentLocation={currentLocation}
      />
      </div>
      </div>
      {selectedLocation && (
        <>
          <LandsatGrid location={selectedLocation} />
          <Result selectedLocation={selectedLocation} />
        </>
      )}
      <div>
        
      </div>
    </div>
  );
};

export default Cordenadas;