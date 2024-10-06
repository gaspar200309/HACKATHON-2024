import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "transparent",
          color: "white",
        }}
        elevation={0}
      >
        <Toolbar sx={{ justifyContent: "flex-end" }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/location-selector">Location Selector</Button>
          <Button color="inherit" component={Link} to="/spectral-signature">Spectral Signature</Button>
          <Button color="inherit" component={Link} to="/location-input">Location Input</Button>
        </Toolbar>
      </AppBar>

      <svg
        width="1435"
        height="34"
        viewBox="0 0 1435 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 33H175.25H262.875H306.688L350.5 1L701 1H1440"
          stroke="url(#paint0_linear_15_13)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_15_13"
            x1="0.000183096"
            y1="0.500297"
            x2="1440"
            y2="0.500285"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" stopOpacity="0" />
            <stop offset="0.503125" stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default NavBar;
