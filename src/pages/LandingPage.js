import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header"; // Import Header

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="xl">
      <Header /> {/* Reusable Header Component */}

      {/* Hero Section */}
      <Box textAlign="center" mt={4} px={2}>
        <Typography variant="h3" fontWeight="bold" color="primary">
          Soil Health Card: Ensuring Sustainable Agriculture
        </Typography>
        <Typography variant="h6" color="textSecondary" mt={2}>
          Empowering Farmers with Scientific Soil Analysis
        </Typography>
        <Box mt={3}>
          <Button variant="contained" color="primary" onClick={() => navigate("/register")} sx={{ mr: 2 }}>
            User Registration
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => navigate("/login")}>
            Login
          </Button>
        </Box>
      </Box>

      {/* Footer */}
      <Box textAlign="center" mt={6} py={3} bgcolor="primary.main" color="white">
        <Typography variant="body1">&copy; 2025 Soil Health Card | Government of India</Typography>
      </Box>
    </Container>
  );
};

export default LandingPage;
