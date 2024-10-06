import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  Calendar,
  Clock,
  Download,
  Cloud,
  Satellite,
  MapPin,
  ThermometerSun,
} from "lucide-react";
import { Box, Button, TextField } from "@mui/material";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";

const Result = ({ selectedLocation }) => {
  const [landSatData, setLandSatData] = useState({
    satellite: "Landsat 9",
    acquisitionDate: "2024-03-15",
    acquisitionTime: "10:30 UTC",
    path: 123,
    row: 45,
    cloudCover: 12,
    imageQuality: 9.2,
    wrs2Path: "P123",
    wrs2Row: "R045",
    thermalTemp: 298.15, // Kelvin
    spectralData: [
      { wavelength: "440nm", reflectance: 0.04, band: "Coastal/Aerosol" },
      { wavelength: "480nm", reflectance: 0.06, band: "Blue" },
      { wavelength: "560nm", reflectance: 0.09, band: "Green" },
      { wavelength: "655nm", reflectance: 0.12, band: "Red" },
      { wavelength: "865nm", reflectance: 0.45, band: "NIR" },
      { wavelength: "1610nm", reflectance: 0.28, band: "SWIR 1" },
      { wavelength: "2200nm", reflectance: 0.31, band: "SWIR 2" },
    ],
  });

  const [notifications, setNotifications] = useState({
    enabled: false,
    method: "email",
    frequency: "daily",
    cloudThreshold: 15,
  });

  // Función para descargar datos en formato CSV
  const downloadCSV = () => {
    const headers = ["Parameter", "Value"];
    const data = [
      ["Satellite", landSatData.satellite],
      ["Acquisition Date", landSatData.acquisitionDate],
      ["Acquisition Time", landSatData.acquisitionTime],
      ["Path", landSatData.path],
      ["Row", landSatData.row],
      ["Cloud Cover (%)", landSatData.cloudCover],
      ["Image Quality", landSatData.imageQuality],
      ["WRS-2 Path", landSatData.wrs2Path],
      ["WRS-2 Row", landSatData.wrs2Row],
      ["Surface Temperature (K)", landSatData.thermalTemp],
      ["Latitude", selectedLocation.lat],
      ["Longitude", selectedLocation.lng],
      ["", ""],
      ["Spectral Data", ""],
      ["Wavelength", "Reflectance", "Band"],
      ...landSatData.spectralData.map((d) => [
        d.wavelength,
        d.reflectance,
        d.band,
      ]),
    ];

    const csvContent = data.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `landsat_data_${selectedLocation.lat}_${selectedLocation.lng}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div
        className="grid-container"
        style={{ display: "flex", gap: "5rem", width: "100%" }}
      >
        {/* Información básica de ubicación */}

        <div className="card ">
          <div className="card-header">
            <MapPin className="icon" />
            <h3>Ubicación Seleccionada</h3>
          </div>
          <div className="card-content">
            <p>Latitud: {selectedLocation.lat.toFixed(6)}</p>
            <p>Longitud: {selectedLocation.lng.toFixed(6)}</p>
          </div>
        </div>

        {/* Metadatos de la escena */}
        <div className="card">
          <div className="card-header">
            <Satellite className="icon" />
            <h3>Metadatos de la Escena</h3>
          </div>
          <div className="card-content">
            <div className="grid-cols">
              <div>
                <p>
                  <Calendar className="icon-small" /> Fecha:{" "}
                  {landSatData.acquisitionDate}
                </p>
                <p>
                  <Clock className="icon-small" /> Hora:{" "}
                  {landSatData.acquisitionTime}
                </p>
                <p>
                  <Cloud className="icon-small" /> Cobertura de nubes:{" "}
                  {landSatData.cloudCover}%
                </p>
              </div>
              <div>
                <p>Path: {landSatData.path}</p>
                <p>Row: {landSatData.row}</p>
                <p>Calidad de imagen: {landSatData.imageQuality}/10</p>
              </div>
            </div>
          </div>
        </div>

        {/* Gráfico espectral */}
        <div className="card">
          <div className="card-header">
            <h3>Firma Espectral</h3>
          </div>
          <div className="card-content">
            <LineChart
              width={600}
              height={300}
              data={landSatData.spectralData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="wavelength" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="reflectance" stroke="#8884d8" />
            </LineChart>
          </div>
        </div>
        <div>
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 1,
              }}
            >
              Añadir evento a Google Calendar
            </Button>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: "2rem" }}>
        {/* Configuración de notificaciones */}
        <div className="card">
          <div className="card-header">
            <h3>Configuración de Notificaciones</h3>
          </div>
          <div className="card-content">
            <div className="flex-input">
              <input
                type="number"
                placeholder="Umbral de nubes (%)"
                value={notifications.cloudThreshold}
                onChange={(e) =>
                  setNotifications((prev) => ({
                    ...prev,
                    cloudThreshold: e.target.value,
                  }))
                }
                min="0"
                max="100"
                className="input"
              />
              <select
                value={notifications.method}
                onChange={(e) =>
                  setNotifications((prev) => ({
                    ...prev,
                    method: e.target.value,
                  }))
                }
                className="select"
              >
                <option value="email">Email</option>
                <option value="sms">SMS</option>
              </select>
            </div>
          </div>
        </div>

        {/* Temperatura superficial */}
        <div className="card">
          <div className="card-header">
            <ThermometerSun className="icon" />
            <h3>Temperatura Superficial</h3>
          </div>
          <div className="card-content">
            <p>{(landSatData.thermalTemp - 273.15).toFixed(2)}°C</p>
          </div>
        </div>

        {/* Botón de descarga */}
        <Box>
          <Button
            startIcon={<Download className="icon-small" />}
            onClick={downloadCSV}
            variant="contained"
          >
            Descargar datos (CSV)
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default Result;
