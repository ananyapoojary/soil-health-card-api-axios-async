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
  Alert,
  Divider,
} from "@mui/material";
import { Visibility, VisibilityOff, PowerSettingsNewRounded } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // Import custom CSS for animations & colors

// Dummy State Data
const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", 
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", 
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", 
  "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep", "Delhi", "Puducherry", "Ladakh", "Lakshadweep", 
  "Jammu and Kashmir"
];


// Validation Schema
const validationSchema = Yup.object({
  userType: Yup.string().required("User type is required"),
  fullName: Yup.string().min(3, "Name must be at least 3 characters").required("Full name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  mobile: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number")
    .required("Mobile number is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  state: Yup.string().required("State is required"),
  district: Yup.string().required("District is required"),
});

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      userType: "",
      fullName: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      state: "",
      district: "",
    },
    validationSchema: validationSchema,
    validateOnMount: true, // ✅ Ensures form validates immediately
    onSubmit: (values) => {
      console.log("Registration Details:", values);
      setMessage("✅ Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    },
  });

  return (
    <Container maxWidth="sm">
      <Box className="register-container">
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
            Sign Up
          </Typography>
        </Box>

        {/* Success Message */}
        {message && (
          <Alert severity="success" className="success-message">
            {message}
          </Alert>
        )}

        <form onSubmit={formik.handleSubmit}>
          {/* User Type */}
          <FormControl fullWidth margin="normal" error={formik.touched.userType && Boolean(formik.errors.userType)}>
            <InputLabel>User Type</InputLabel>
            <Select name="userType" value={formik.values.userType} onChange={formik.handleChange} onBlur={formik.handleBlur}>
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

          {/* State Selection */}
          <FormControl fullWidth margin="normal" error={formik.touched.state && Boolean(formik.errors.state)}>
            <InputLabel>State</InputLabel>
            <Select name="state" value={formik.values.state} onChange={formik.handleChange} onBlur={formik.handleBlur}>
              {states.map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.state && formik.errors.state && <FormHelperText>{formik.errors.state}</FormHelperText>}
          </FormControl>

          {/* District */}
          <TextField
            fullWidth
            label="District"
            margin="normal"
            name="district"
            value={formik.values.district}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.district && Boolean(formik.errors.district)}
            helperText={formik.touched.district && formik.errors.district}
          />

          {/* Full Name */}
          <TextField
            fullWidth
            label="Full Name"
            margin="normal"
            name="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
          />

          {/* Email */}
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          {/* Mobile Number */}
          <TextField
            fullWidth
            label="Mobile Number"
            type="text"
            margin="normal"
            name="mobile"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
            helperText={formik.touched.mobile && formik.errors.mobile}
          />

          {/* Password */}
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
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
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Confirm Password */}
          <TextField
            fullWidth
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            margin="normal"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Register Button */}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={!formik.isValid || formik.isSubmitting}>
            Register
          </Button>

          {/* Row for Login & Dashboard Buttons */}
          <Box display="flex" justifyContent="space-between" gap={2} sx={{ mt: 1 }}>
            <Button onClick={() => navigate("/login")} variant="outlined" color="secondary" fullWidth>
              Login
            </Button>
            <Button onClick={() => navigate("/")} variant="outlined" color="secondary" fullWidth>
              Dashboard
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
