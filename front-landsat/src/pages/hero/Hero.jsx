import { alpha, Box, Button, Container, Typography } from "@mui/material";

function Hero() {
  return (
    <Box position={"relative"} height={"500px"}>
      <img
        style={{
          width: "clamp(250px, 100%, 550px)",
          height: "auto",
          position: "absolute",
          bottom: "-100px",
          right: "-100px",
          zIndex: "999",
        }}
        src="/imagen-mundo.svg"
        alt="Descripción de la imagen"
      />
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Box
          sx={{
            pr: 60,
            display: "flex",
            textAlign: "center",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: "clamp(2rem, 10vw, 5rem)",
            }}
          >
            SUNLIT DREAMS
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontSize: "clamp(1rem, 2vw, 1.5rem)",
              opacity: 0.7,
            }}
          >
            MEDICIONES POR TELEDETECCIÓN
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
              opacity: 0.7,
            }}
          >
            Obtén los datos de reflectancia de la superficie de cualquier parte
            del planeta. Eligiendo las coordenadas de alguna parte de la Tierra
            podrás obtener resultados correspondientes a la actualidad o un
            historial de resultados del lugar.
          </Typography>
          <Button
            sx={{
              backgroundColor: `${alpha("#D9D9D9", 0.3)}`,
              color: "white",
              width: "150px",
              borderRadius: "20px",
              "&:hover": {
                backgroundColor: "#D9D9D9",
              },
            }}
          >
            Iniciar
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Hero;
