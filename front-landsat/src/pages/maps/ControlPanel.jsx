import React, { useState } from 'react';
import './ControlPanel.css';

const ControlPanel = ({ setLocation }) => {
  const [inputCoords, setInputCoords] = useState({ lat: '', lng: '' });
  const [inputLocation, setInputLocation] = useState(''); // Para el nombre del lugar
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [position, setPosition] = useState(null);

  const handleCoordsChange = (e) => {
    setInputCoords({
      ...inputCoords,
      [e.target.name]: e.target.value
    });
  };

  // Manejar el cambio en el campo de nombre de lugar
  const handleLocationChange = (e) => {
    setInputLocation(e.target.value);
  };

  // Actualizar la posición del mapa según las coordenadas ingresadas manualmente
  const handleCoordsSubmit = () => {
    if (inputCoords.lat && inputCoords.lng) {
      const newCoords = {
        lat: parseFloat(inputCoords.lat),
        lng: parseFloat(inputCoords.lng),
      };
      setPosition(newCoords);
      setLocation(newCoords);
    }
  };

  // Buscar la ubicación mediante nombre de lugar
  const handleLocationSubmit = async () => {
    if (inputLocation) {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${inputLocation}&format=json&limit=1`);
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const newCoords = { lat: parseFloat(lat), lng: parseFloat(lon) };
        setPosition(newCoords);
        setLocation(newCoords); // Actualiza la ubicación en el mapa
      } else {
        alert('Ubicación no encontrada');
      }
    }
  };

  // Manejar el cambio en el rango de fechas
  const handleDateChange = (e) => {
    setDateRange({
      ...dateRange,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="control-panel">
      <h3>Panel de Control</h3>

      {/* Coordenadas obtenidas */}
      {position && (
        <div>
          <h4>Coordenadas Seleccionadas</h4>
          <p>Latitud: {position.lat}</p>
          <p>Longitud: {position.lng}</p>
        </div>
      )}

      {/* Ingresar coordenadas manualmente */}
      <div>
        <h4>Ingresar Coordenadas</h4>
        <input
          type="text"
          name="lat"
          placeholder="Latitud"
          value={inputCoords.lat}
          onChange={handleCoordsChange}
        />
        <input
          type="text"
          name="lng"
          placeholder="Longitud"
          value={inputCoords.lng}
          onChange={handleCoordsChange}
        />
        <button onClick={handleCoordsSubmit}>Actualizar Ubicación</button>
      </div>

      {/* Buscar por nombre de lugar */}
      <div>
        <h4>Buscar Ubicación</h4>
        <input
          type="text"
          placeholder="Nombre del lugar"
          value={inputLocation}
          onChange={handleLocationChange}
        />
        <button onClick={handleLocationSubmit}>Buscar</button>
      </div>

      <div>
        <h4>Seleccionar Rango de Fechas</h4>
        <label>Fecha Inicio: </label>
        <input
          type="date"
          name="start"
          value={dateRange.start}
          onChange={handleDateChange}
        />
        <label>Fecha Fin: </label>
        <input
          type="date"
          name="end"
          value={dateRange.end}
          onChange={handleDateChange}
        />
      </div>
    </div>
  );
};

export default ControlPanel;
