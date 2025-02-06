import React from "react";
import { Box, Container, Typography } from "@mui/material";
import Header from "../components/Header"; // Import the reusable header
import UserMetricsTable from "../components/UserMetricsTable"; // Import the new component

const Dashboard = () => {
  return (
    <Container maxWidth="xl">
      <Header /> {/* Reusable Header Component */}

      {/* Dashboard Content */}
      <Box textAlign="center" mt={4}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Welcome to the Soil Health Dashboard
        </Typography>
        <Typography variant="h6" color="textSecondary" mt={2}>
          View and manage soil health data efficiently.
        </Typography>
      </Box>

      {/* User Metrics Table */}
      <UserMetricsTable />

      {/* Footer */}
      <Box textAlign="center" mt={6} py={3} bgcolor="primary.main" color="white">
        <Typography variant="body1">&copy; 2025 Soil Health Card | Government of India</Typography>
      </Box>
    </Container>
  );
};

export default Dashboard;
