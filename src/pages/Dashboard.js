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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Divider,
} from "@mui/material";
import { Phone, Language, Home, Business } from "@mui/icons-material";
import axios from "axios";
import Header from "../components/Header";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const [openDialog, setOpenDialog] = useState(false); // For modal visibility
  const [selectedUser, setSelectedUser] = useState(null); // For storing selected user details

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

  // Handle User Click
  const handleUserClick = (user) => {
    setSelectedUser(user); // Set selected user
    setOpenDialog(true); // Open dialog
  };

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
                    <TableRow key={user.id} hover onClick={() => handleUserClick(user)}>
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


      {/* User Details Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{
            backgroundColor: "#1595C0",
            color: "white",
            fontWeight: "bold",
            padding: "16px",
            textAlign: "center",
          }}
        >
          User Details
        </DialogTitle>
        <DialogContent>
          {selectedUser && (
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6" color="primary">
                    {selectedUser.name}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" fontWeight="bold">
                    <Phone sx={{ fontSize: 18, mr: 1 }} />
                    Phone:
                  </Typography>
                  <Typography variant="body2">{selectedUser.phone}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" fontWeight="bold">
                    <Language sx={{ fontSize: 18, mr: 1 }} />
                    Website:
                  </Typography>
                  <Typography variant="body2">{selectedUser.website}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" fontWeight="bold">
                    <Home sx={{ fontSize: 18, mr: 1 }} />
                    Address:
                  </Typography>
                  <Typography variant="body2">{`${selectedUser.address.street}, ${selectedUser.address.city}`}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" fontWeight="bold">
                    <Business sx={{ fontSize: 18, mr: 1 }} />
                    Company:
                  </Typography>
                  <Typography variant="body2">{selectedUser.company.name}</Typography>
                </Grid>
              </Grid>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color="textSecondary">
                Email: {selectedUser.email}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary" variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dashboard;
