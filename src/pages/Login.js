import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  InputAdornment,
  IconButton,
  Divider,
  Alert,
  Checkbox,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff, PowerSettingsNewRounded } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const validationSchema = Yup.object({
  userType: Yup.string().required("User type is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().min(4, "Password must be at least 4 characters").required("Password is required"),
});

const Login = () => {
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const formik = useFormik({
    initialValues: {
      userType: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        // Simulate API call (Replace with actual login API)
        const response = await axios.post("https://jsonplaceholder.typicode.com/posts", values);
        console.log("Login Response:", response.data);

        setMessage("✅ Login successful! Redirecting...");
        setTimeout(() => {
          navigate("/landing"); // Redirect to Landing.js
        }, 2000);
      } catch (error) {
        setMessage("❌ Login failed. Please check your credentials.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "url('/images/login-bg.jpg') center/cover no-repeat",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", 
          zIndex: 1,
        },
      }}
    >
      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 2 }}>
        <Box
          p={4}
          boxShadow={6}
          borderRadius={3}
          bgcolor="rgba(255, 255, 230, 0.85)"
          sx={{ width: "100%", maxWidth: 480 }}
        >
          {/* Header Section */}
          <Box textAlign="center" my={2}>
            <img src="/Emblem_of_India.png" alt="Emblem of India" style={{ height: "70px", marginBottom: "10px" }} />
            <Typography variant="h6" fontWeight="bold">
              Government of India
            </Typography>
            <Typography variant="subtitle1">Ministry of Agriculture and Farmers Welfare</Typography>
            <Typography variant="body2">Department of Agriculture and Farmers Welfare</Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Sign In Header */}
          <Box display="flex" alignItems="center" justifyContent="center">
            <PowerSettingsNewRounded sx={{ fontSize: 30, color: "green", mr: 1 }} />
            <Typography variant="h5" textAlign="center" fontWeight="bold">
              Sign In
            </Typography>
          </Box>

          {/* Success/Error Message */}
          {message && (
            <Alert severity={message.includes("✅") ? "success" : "error"} sx={{ my: 2, fontSize: "1rem", textAlign: "center" }}>
              {message}
            </Alert>
          )}

          <form onSubmit={formik.handleSubmit}>
            {/* User Type Dropdown */}
            <FormControl fullWidth margin="normal" error={formik.touched.userType && Boolean(formik.errors.userType)}>
              <InputLabel>User Type</InputLabel>
              <Select
                name="userType"
                value={formik.values.userType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <MenuItem value="" disabled>Select User Type</MenuItem>
                <MenuItem value="central_user">Central User</MenuItem>
                <MenuItem value="scheme_admin">Scheme Admin</MenuItem>
                <MenuItem value="state_user">State User</MenuItem>
                <MenuItem value="district_user">District User</MenuItem>
                <MenuItem value="stl">STL</MenuItem>
                <MenuItem value="supervisor">Supervisor</MenuItem>
              </Select>
              {formik.touched.userType && formik.errors.userType && <FormHelperText>{formik.errors.userType}</FormHelperText>}
            </FormControl>

            {/* Email Input */}
            <TextField
              fullWidth
              label="Username/Email"
              variant="outlined"
              margin="normal"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            {/* Password Input */}
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              margin="normal"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Remember Me & Forgot Password */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
              <FormControlLabel
                control={<Checkbox checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />}
                label="Remember Me"
              />
              <Typography variant="body2" color="primary" sx={{ cursor: "pointer" }} onClick={() => alert("Redirecting to password reset...")}>
                Forgot Password?
              </Typography>
            </Box>

            {/* Submit Button with Loading Indicator */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2, py: 1.5, fontWeight: "bold", fontSize: "1rem" }}
              disabled={!formik.dirty || !formik.isValid || loading}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <Divider sx={{ my: 3 }} />

          {/* Registration Button */}
          <Box textAlign="center" mt={2}>
            <Button variant="outlined" color="secondary" href="/register" fullWidth>
              User Registration
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
