import React, { useState } from 'react';
import axios from 'axios';

const LocationInput = () => {
  const [locationType, setLocationType] = useState('place'); // 'place' o 'coordinates'
  const [placeName, setPlaceName] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: '', lon: '' });
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let locationData;
    
    if (locationType === 'place') {
      locationData = { type: 'place', place_name: placeName };
    } else {
      locationData = { type: 'coordinates', latitude: coordinates.lat, longitude: coordinates.lon };
    }

    try {
      const response = await axios.post('/api/location', locationData);
      setResult(response.data);
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  return (
    <div>
      <h2>Define your target location</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <input 
              type="radio" 
              value="place" 
              checked={locationType === 'place'} 
              onChange={() => setLocationType('place')} 
            /> 
            Enter place name
          </label>
          <label>
            <input 
              type="radio" 
              value="coordinates" 
              checked={locationType === 'coordinates'} 
              onChange={() => setLocationType('coordinates')} 
            /> 
            Enter coordinates
          </label>
        </div>

        {locationType === 'place' && (
          <div>
            <label>Place Name:</label>
            <input 
              type="text" 
              value={placeName} 
              onChange={(e) => setPlaceName(e.target.value)} 
              placeholder="Enter place name" 
            />
          </div>
        )}

        {locationType === 'coordinates' && (
          <div>
            <label>Latitude:</label>
            <input 
              type="text" 
              value={coordinates.lat} 
              onChange={(e) => setCoordinates({ ...coordinates, lat: e.target.value })} 
              placeholder="Enter latitude" 
            />
            <label>Longitude:</label>
            <input 
              type="text" 
              value={coordinates.lon} 
              onChange={(e) => setCoordinates({ ...coordinates, lon: e.target.value })} 
              placeholder="Enter longitude" 
            />
          </div>
        )}

        <button type="submit">Submit</button>
      </form>

      {result && (
        <div>
          <h3>Coordinates Result:</h3>
          <p>Latitude: {result.coordinates.lat}</p>
          <p>Longitude: {result.coordinates.lon}</p>
        </div>
      )}
    </div>
  );
};

export default LocationInput;
