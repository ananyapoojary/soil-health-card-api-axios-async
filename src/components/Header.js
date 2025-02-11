import React, { useState } from "react";
import { Box, Grid, Typography, Container, useMediaQuery, useTheme } from "@mui/material";

const Header = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ backgroundColor: "#1976D2", color: "white", py: 2 }}>
      <Container maxWidth="xl">
        <Grid container spacing={5} alignItems="center" justifyContent="center">
          
          {/* Government Emblem & Title */}
          <Grid item xs={12} md={5} display="flex" alignItems="center" justifyContent={isSmallScreen ? "center" : "flex-start"}>
            <img src="Emblem_of_India.png" alt="Indian Emblem" style={{ height: "80px", marginRight: "10px" }} />
            <Box textAlign="center">
              <Typography variant="h4" fontWeight="bold">Government of India</Typography>
              <Typography variant="h5" fontWeight="bold">Ministry of Agriculture and Farmers Welfare</Typography>
              <Typography variant="h6" fontWeight="bold">Department of Agriculture and Farmers Welfare</Typography>
            </Box>
          </Grid>

          {/* Soil Health Card Logo */}
          <Grid item xs={12} md={2} textAlign="center">
            <img src="soil-logo.png" alt="Soil Health Card Logo" style={{ height: "100px" }} />
          </Grid>

          {/* Soil Health Card Icon */}
          <Grid item xs={12} md={3} textAlign="center">
            <img src="soil-health-card.png" alt="Soil Health Card Icon" style={{ height: "100px" }} />
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default Header;
