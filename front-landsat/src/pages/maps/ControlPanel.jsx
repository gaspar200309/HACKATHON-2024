// ControlPanel.js
import React, { useState } from 'react';
import './ControlPanel.css'; // Asegúrate de crear este archivo para los estilos

const ControlPanel = ({ setLocation }) => {
  const [inputCoords, setInputCoords] = useState({ lat: '', lng: '' });
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [position, setPosition] = useState(null); // Para mostrar coordenadas seleccionadas

  // Manejar el cambio en los campos de coordenadas ingresadas manualmente
  const handleCoordsChange = (e) => {
    setInputCoords({
      ...inputCoords,
      [e.target.name]: e.target.value
    });
  };

  // Actualizar la posición del mapa según las coordenadas ingresadas manualmente
// Actualizar el handleCoordsSubmit en ControlPanel
const handleCoordsSubmit = () => {
    if (inputCoords.lat && inputCoords.lng) {
      const newCoords = {
        lat: parseFloat(inputCoords.lat),
        lng: parseFloat(inputCoords.lng),
      };
      setPosition(newCoords);
      setLocation(newCoords); // Asegúrate de pasar las coordenadas correctas
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

      {/* Rango de fechas */}
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
