import React, { useState } from "react";
import { Box, Button, Grid, Typography, useMediaQuery, useTheme, Menu, MenuItem, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleRedirect = (path) => {
    navigate(path);
    handleMenuClose();
  };

  return (
    <Box sx={{ backgroundColor: "#1976D2", color: "white", py: 2 }}>
      <Container maxWidth="xl">
        <Grid container spacing={5} alignItems="center" justifyContent="center">
          {/* Government Emblem & Title */}
          <Grid item xs={12} md={5} display="flex" alignItems="center" justifyContent={isSmallScreen ? "center" : "flex-start"}>
            <img src="Emblem_of_India.png" alt="Indian Emblem" style={{ height: "80px", marginRight: "10px" }} />
            <Box textAlign="center" width="100%">
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

          {/* Navigation Buttons */}
          <Grid item xs={12} md={5} display="flex" justifyContent={isSmallScreen ? "center" : "flex-end"} alignItems="center">
            <Button variant="contained" color="secondary" size="large" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button variant="contained" color="success" size="large" sx={{ mx: 2 }} onClick={() => navigate("/register")}>
              Register
            </Button>
            <Button variant="text" sx={{ color: "white", mx: 2 }} onClick={() => navigate("/about")}>
              About Us
            </Button>
            <Button variant="text" sx={{ color: "white", mx: 2 }} onClick={() => navigate("/contact")}>
              Contact Us
            </Button>
            <Button variant="text" sx={{ color: "white", mx: 2 }} onClick={handleMenuClick}>
              Related Links
            </Button>

            {/* Dropdown Menu for Related Links */}
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={() => handleRedirect("/Mkisan")}>mKisan</MenuItem>
              <MenuItem onClick={() => handleRedirect("/farmer-portal")}>Farmer Portal</MenuItem>
              <MenuItem onClick={() => handleRedirect("/crop-insurance")}>Crop Insurance</MenuItem>
              <MenuItem onClick={() => handleRedirect("/agricoop")}>Agricoop</MenuItem>
              <MenuItem onClick={() => handleRedirect("/ifms")}>Integrated Fertilizer Management System</MenuItem>
              <MenuItem onClick={() => handleRedirect("/kisan-suvidha")}>Kisan Suvidha</MenuItem>
              <MenuItem onClick={() => handleRedirect("/digital-seva-connect")}>Digital Seva Connect</MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Header;
