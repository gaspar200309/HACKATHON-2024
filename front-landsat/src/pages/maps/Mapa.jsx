import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  LayersControl, 
  useMapEvents, 
  useMap, 
  Circle,
  Rectangle 
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useState, useEffect } from 'react';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const MapView = ({ setSelectedLocation }) => {
  const [position, setPosition] = useState(null);
  const [destination, setDestination] = useState(null);

  // Función para calcular los límites del rectángulo 3x3
  const calculateBounds = (center) => {
    if (!center) return null;
    
    // Convertir 3 píxeles a grados (aproximadamente)
    const pixelToDegree = 0.00003; // Este valor puede necesitar ajuste según el nivel de zoom
    
    return [
      [center.lat - pixelToDegree, center.lng - pixelToDegree], // Esquina suroeste
      [center.lat + pixelToDegree, center.lng + pixelToDegree]  // Esquina noreste
    ];
  };

  const SetViewOnLocationChange = ({ location }) => {
    const map = useMap();
    useEffect(() => {
      if (location) {
        map.setView(location, 13);
      }
    }, [location, map]);
    return null;
  };

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        const newLocation = {
          lat: e.latlng.lat,
          lng: e.latlng.lng
        };
        setDestination(newLocation);
        setSelectedLocation(newLocation);
      }
    });
    return null;
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setPosition(userLocation);
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    }
  }, []);

  return (
    <div className="map-container">
      <MapContainer 
        center={position || [51.505, -0.09]} 
        zoom={13} 
        style={{ height: "100%", width: "100%" }} 
        id="map"
      >
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

        {position && (
          <>
            <Marker position={[position.lat, position.lng]} />
            <Circle center={[position.lat, position.lng]} radius={500} fillColor="blue" />
          </>
        )}

        {destination && (
          <>
            <Marker position={[destination.lat, destination.lng]} />
            <Rectangle 
              bounds={calculateBounds(destination)}
              pathOptions={{ color: 'red', weight: 1, fillOpacity: 0.3 }}
            />
          </>
        )}

        <MapEvents />
        <SetViewOnLocationChange location={position} />
      </MapContainer>
    </div>
  );
};

export default MapView;