import { Box } from "@mui/material";
import Plot from "react-plotly.js";

const SpectralSignatureChart = ({ spectralData }) => {
  return (
    <Box minHeight={"80vh"}>
      <Plot
        data={[
          {
            x: ["Blue", "Green", "Red", "NIR", "SWIR1", "SWIR2"],
            y: spectralData,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "blue" },
          },
        ]}
        layout={{ title: "Landsat SR Spectral Signature" }}
      />
    </Box>
  );
};

export default SpectralSignatureChart;
