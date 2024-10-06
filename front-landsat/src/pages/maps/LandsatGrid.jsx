// LandsatGrid.js
import React from 'react';
import './LandsatGrid.css';

const LandsatGrid = () => {
  return (
    <div className="landsat-grid-container">
      <h1>Cuadrícula Landsat (3x3)</h1>
      <div className="grid">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="grid-cell">
            Píxel {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandsatGrid;
