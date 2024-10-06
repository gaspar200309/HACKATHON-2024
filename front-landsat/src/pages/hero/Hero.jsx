import { alpha, Box, Button, Container, Typography } from "@mui/material";

function Hero() {
return (
    <Box position={"relative"} height={"85vh"} display="flex" alignItems="center">
        <img
            style={{
                width: "clamp(250px, 100%, 550px)",
                height: "auto",
                position: "absolute",
                top: "50%",
                right: "-100px",
                zIndex: "999",
                transform: "translateY(-50%)",
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
                    gap: 2,
                }}
            >
                <Box>
                    <svg
                        width="234"
                        height="2"
                        viewBox="0 0 234 2"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M0 1L113.913 1L234 1"
                            stroke="url(#paint0_linear_15_14)"
                        />
                        <defs>
                            <linearGradient
                                id="paint0_linear_15_14"
                                x1="2.97532e-05"
                                y1="0.500297"
                                x2="234"
                                y2="0.500296"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="white" stopOpacity="0" />
                                <stop offset="0.503125" stopColor="white" />
                                <stop offset="1" stopColor="white" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                    </svg>
                </Box>
                <img
                    src="/titulo.svg"
                    alt="Descripción de la imagen"
                    style={{
                        height: "clamp(150px, 10vw, 200px)",
                    }}
                />
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
                        mt: 5,
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
