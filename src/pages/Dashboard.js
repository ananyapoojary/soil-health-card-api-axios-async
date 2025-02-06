import React, { useEffect, useState } from "react";
import { Box, Button, Container, Grid, Typography, Card, CardContent, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import Header from "../components/Header";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch User Metrics Data
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <Container maxWidth="xl">
      {/* Reusable Header */}
      <Header />

      {/* Hero Section */}
      <Box textAlign="center" mt={4} px={2}>
        <Typography variant="h3" fontWeight="bold" color="primary">
          Welcome to Your Dashboard
        </Typography>
        <Typography variant="h6" color="textSecondary" mt={2}>
          Manage Soil Health Reports & User Insights
        </Typography>
        <Box mt={3}>
          <Button variant="contained" color="primary" sx={{ mr: 2 }}>
            View Reports
          </Button>
          <Button variant="contained" color="secondary">
            Register
          </Button>
        </Box>
      </Box>

      {/* Interactive Cards */}
      <Grid container spacing={4} mt={6}>
        {[
          {
            title: "Total Farmers",
            value: users.length,
            description: "Registered Users in the System",
          },
          {
            title: "Pending Reports",
            value: "18",
            description: "Soil health reports awaiting approval",
          },
          {
            title: "Active Soil Tests",
            value: "45",
            description: "Ongoing soil analysis processes",
          },
        ].map((card, index) => (
          <Grid item xs={12} md={4} key={index}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card sx={{ boxShadow: 3, textAlign: "center", p: 3 }}>
                <CardContent>
                  <Typography variant="h5" fontWeight="bold" color="primary">
                    {card.title}
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="secondary">
                    {card.value}
                  </Typography>
                  <Typography variant="body1" mt={2}>
                    {card.description}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* User Metrics Table */}
      <Box mt={6}>
        <Typography variant="h4" fontWeight="bold" color="primary" textAlign="center" mb={3}>
          User Metrics
        </Typography>
        {loading ? (
          <Box textAlign="center">
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell><b>ID</b></TableCell>
                  <TableCell><b>Name</b></TableCell>
                  <TableCell><b>Email</b></TableCell>
                  <TableCell><b>City</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.address.city}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Container>
  );
};

export default Dashboard;
