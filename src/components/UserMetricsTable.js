import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import axios from "axios";

const UserMetricsTable = () => {
  const [users, setUsers] = useState([]);  // State for storing user data
  const [loading, setLoading] = useState(true); // State for tracking loading state

  useEffect(() => {
    // Fetch user data asynchronously
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
    <Box mt={5} p={3} component={Paper} elevation={3}>
      <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>
        User Metrics
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" py={3}>
          <CircularProgress /> {/* Show loading spinner while data is fetching */}
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>User ID</b></TableCell>
                <TableCell><b>Full Name</b></TableCell>
                <TableCell><b>Username</b></TableCell>
                <TableCell><b>Email Address</b></TableCell>
                <TableCell><b>Location (City)</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.address.city}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default UserMetricsTable;
