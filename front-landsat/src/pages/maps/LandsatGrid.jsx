// LandsatGrid.js
import React from "react";
import "./LandsatGrid.css";

const LandsatGrid = () => {
  const getRandomColor = () => {
    const vegetationColors = [
      "rgb(34, 139, 34)", // ForestGreen
      "rgb(0, 128, 0)",   // Green
      "rgb(50, 205, 50)", // LimeGreen
      "rgb(107, 142, 35)" // OliveDrab
    ];
    const landColors = [
      "rgb(210, 180, 140)", // Tan
      "rgb(244, 164, 96)",  // SandyBrown
      "rgb(222, 184, 135)", // BurlyWood
      "rgb(210, 105, 30)"   // Chocolate
    ];

    // const allColors = [...vegetationColors, ...vegetationColors, ...landColors];
    const waterColors = [
      "rgb(70, 130, 180)", // SteelBlue
      "rgb(0, 191, 255)",  // DeepSkyBlue
      "rgb(30, 144, 255)", // DodgerBlue
      "rgb(0, 0, 255)"     // Blue
    ];

    const allColors = [
      ...vegetationColors, ...vegetationColors, ...landColors, ...landColors, 
      ...landColors, ...vegetationColors, ...waterColors
    ];

    return allColors[Math.floor(Math.random() * allColors.length)];
  };

  return (
    <div className="landsat-grid-container">
      <h1>Cuadrícula Landsat (3x3)</h1>
      <div className="grid">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="grid-cell"
            style={{
              backgroundColor: getRandomColor(),
              
            }}
          >
            {/* Píxel {i + 1} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandsatGrid;
