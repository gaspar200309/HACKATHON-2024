// MapView.js
import { MapContainer, TileLayer, Marker, LayersControl, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; 
import L from 'leaflet';
import { useState, useEffect } from 'react';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const MapView = ({ currentLocation, setLocation }) => {
  const [position, setPosition] = useState(null);

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
        setLocation(e.latlng);
      }
    });
    return position === null ? null : (
      <Marker position={position}></Marker>
    );
  };

  return (
    <div className="map-container">
      <MapContainer center={currentLocation} zoom={13} style={{ height: "100%", width: "100%" }} id="map">
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Mapa de OpenStreetMap">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Mapa Satelital (Esri)">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution='&copy; <a href="https://www.esri.com/">Esri</a> contributors'
            />
          </LayersControl.BaseLayer>

          <LayersControl.Overlay name="Límites de los países (Esri)">
            <TileLayer
              url="https://services.arcgisonline.com/arcgis/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
              attribution='&copy; <a href="https://www.esri.com/">Esri</a> contributors'
            />
          </LayersControl.Overlay>
        </LayersControl>

        <MapEvents />
      </MapContainer>
    </div>
  );
};

export default MapView;
