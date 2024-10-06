import { MapContainer, TileLayer, Marker, LayersControl, useMapEvents, useMap, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; 
import L from 'leaflet';
import { useState, useEffect } from 'react';

// Configuración de íconos para los marcadores de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const MapView = ({ currentLocation, setLocation, destinationCoords }) => {
  const [position, setPosition] = useState(currentLocation); // Posición actual
  const [destination, setDestination] = useState(destinationCoords); // Posición de destino

  // Hook personalizado para centrar el mapa cuando la ubicación cambia
  const SetViewOnLocationChange = ({ location }) => {
    const map = useMap();
    useEffect(() => {
      if (location) {
        map.setView(location, 13);
      }
    }, [location, map]);
    return null;
  };

  // Función para manejar eventos en el mapa
  const MapEvents = () => {
    useMapEvents({
      click(e) {
        // Seleccionar la ubicación de destino al hacer clic en el mapa
        setDestination(e.latlng);
        setLocation(e.latlng);
      }
    });
    return null;
  };

  // Obtener la ubicación actual del usuario
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLocation = { lat: latitude, lng: longitude };
          setPosition(userLocation); // Establece la posición actual
          setLocation(userLocation);
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    }
  }, [setLocation]);

  // Actualizar la ubicación del destino cuando se cambian las coordenadas
  useEffect(() => {
    if (destinationCoords) {
      setDestination(destinationCoords);
    }
  }, [destinationCoords]);

  return (
    <div className="map-container">
      <MapContainer center={position || currentLocation} zoom={13} style={{ height: "100%", width: "100%" }} id="map">
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

        {/* Marcar la ubicación actual del usuario */}
        {position && (
          <>
            <Marker position={position} />
            <Circle center={position} radius={500} fillColor="blue" />
          </>
        )}

        {/* Marcar la ubicación de destino seleccionada */}
        {destination && <Marker position={destination} />}

        <MapEvents />
        <SetViewOnLocationChange location={position} />
      </MapContainer>
    </div>
  );
};

export default MapView;
