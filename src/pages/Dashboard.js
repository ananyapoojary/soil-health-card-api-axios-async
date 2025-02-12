import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import Header from "../components/Header";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });

  // Fetch Data
  useEffect(() => {
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
    const interval = setInterval(fetchUsers, 30000); // Auto-refresh every 30 sec
    return () => clearInterval(interval);
  }, []);

  // Handle Sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Sort Users
  const sortedUsers = [...users].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // Filter Users
  const filteredUsers = sortedUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.address.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toString().includes(searchQuery)
  );

  // Pagination Logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <Container maxWidth="xl">
      <Header />

      {/* Hero Section */}
      <Box textAlign="center" mt={4}>
        <Typography variant="h3" fontWeight="bold" color="primary">
          🌱 Soil Health Dashboard
        </Typography>
        <Typography variant="h6" color="textSecondary" mt={2}>
          Manage Soil Health Reports & User Insights
        </Typography>
      </Box>

      {/* Search and Filters */}
      <Box display="flex" justifyContent="space-between" mt={4}>
        <TextField
          label="Search Users"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: 300 }}
        />

        {/* Page Size Selection */}
        <FormControl sx={{ minWidth: 120 }}>
          <Select value={usersPerPage} onChange={(e) => setUsersPerPage(e.target.value)}>
            {[5, 10, 15, 20].map((size) => (
              <MenuItem key={size} value={size}>
                {size} per page
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* User Metrics Table */}
      <Box mt={4}>
        {loading ? (
          <Box textAlign="center">
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper} sx={{ borderRadius: "10px", boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#1595C0" }}>
                  {["User ID", "Full Name", "Email", "City", "Company"].map((header, index) => (
                    <TableCell
                      key={index}
                      sx={{ fontWeight: "bold", cursor: "pointer" }}
                      onClick={() => handleSort(header.replace(" ", "").toLowerCase())}
                    >
                      {header}
                      {sortConfig.key === header.replace(" ", "").toLowerCase() &&
                        (sortConfig.direction === "asc" ? " 🔼" : " 🔽")}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {currentUsers.length > 0 ? (
                  currentUsers.map((user) => (
                    <TableRow key={user.id} hover>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.address.city}</TableCell>
                      <TableCell>{user.company.name}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No users found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* Pagination Controls */}
      <Box mt={3} textAlign="center">
        <Button variant="contained" disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>
          ⬅️ Previous
        </Button>
        <Typography display="inline" mx={2}>
          Page {currentPage}
        </Typography>
        <Button variant="contained" disabled={indexOfLastUser >= filteredUsers.length} onClick={() => setCurrentPage((prev) => prev + 1)}>
          Next ➡️
        </Button>
      </Box>

      {/* Export Data */}
      <Box mt={3} textAlign="center">
        <Button variant="contained" color="secondary" onClick={() => alert("CSV Download Placeholder")}>
          Export CSV
        </Button>
      </Box>
    </Container>
  );
};

export default Dashboard;
