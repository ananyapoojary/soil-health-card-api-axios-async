import React, { useEffect, useState } from "react";
import { 
  Box, Button, Container, Grid, Typography, Card, 
  CardContent, CircularProgress, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, Paper 
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
        <Typography 
          variant="h3" 
          fontWeight="bold" 
          color="primary"
          component={motion.div}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          🌱 Welcome to the Soil Health Dashboard
        </Typography>
        <Typography variant="h6" color="textSecondary" mt={2}>
          Manage Soil Health Reports & User Insights
        </Typography>
        <Box mt={3}>
          <Button 
            variant="contained" 
            color="primary" 
            sx={{ mr: 2 }} 
            onClick={() => navigate("/login")}
            component={motion.button}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            🔐 Login
          </Button>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={() => navigate("/register")}
            component={motion.button}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            📝 Register
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
            color: "#4CAF50",
          },
          {
            title: "Pending Reports",
            value: "18",
            description: "Soil health reports awaiting approval",
            color: "#FFC107",
          },
          {
            title: "Active Soil Tests",
            value: "45",
            description: "Ongoing soil analysis processes",
            color: "#2196F3",
          },
        ].map((card, index) => (
          <Grid item xs={12} md={4} key={index}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card sx={{ boxShadow: 3, textAlign: "center", p: 3, backgroundColor: card.color, color: "white" }}>
                <CardContent>
                  <Typography variant="h5" fontWeight="bold">
                    {card.title}
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
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
        <Typography 
          variant="h4" 
          fontWeight="bold" 
          color="primary" 
          textAlign="center" 
          mb={3}
          component={motion.div}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          📊 User Metrics
        </Typography>
        {loading ? (
          <Box textAlign="center">
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer 
            component={Paper} 
            sx={{ 
              maxHeight: 400, 
              borderRadius: "10px", 
              boxShadow: 3, 
              overflow: "hidden",
              marginBottom: 4
            }}
          >
            <Table stickyHeader>
              {/* Table Header */}
              <TableHead>
                <TableRow sx={{ backgroundColor: "#1565C0" }}>
                  <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: "16px", textTransform: "uppercase" }}>
                    User ID
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: "16px", textTransform: "uppercase" }}>
                    Full Name
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: "16px", textTransform: "uppercase" }}>
                    Email Address
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: "16px", textTransform: "uppercase" }}>
                    City
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: "16px", textTransform: "uppercase" }}>
                    Company
                  </TableCell>
                </TableRow>
              </TableHead>


              {/* Table Body */}
              <TableBody>
                {users.map((user, index) => (
                  <TableRow 
                    key={user.id} 
                    hover 
                    component={motion.tr} 
                    whileHover={{ scale: 1.02 }} 
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#f5f5f5" : "white",
                      transition: "background-color 0.3s",
                      "&:hover": { backgroundColor: "#E3F2FD", boxShadow: 3 }
                    }}
                  >
                    <TableCell sx={{ fontWeight: "bold", fontSize: "14px" }}>{user.id}</TableCell>
                    <TableCell sx={{ fontSize: "14px", fontWeight: "500" }}>{user.name}</TableCell>
                    <TableCell sx={{ fontSize: "14px", fontWeight: "500" }}>{user.email}</TableCell>
                    <TableCell sx={{ fontSize: "14px", fontWeight: "500" }}>{user.address.city}</TableCell>
                    <TableCell sx={{ fontSize: "14px", fontWeight: "500" }}>{user.company.name}</TableCell>
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
