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
  Grid,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

// Dummy State-District Data
const stateDistrictData = {
  Karnataka: ["Bengaluru", "Mysuru", "Hubballi", "Mangaluru"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik"],
  TamilNadu: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
};

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
      <Box
        mt={4}
        p={4}
        boxShadow={6}
        borderRadius={3}
        bgcolor="rgba(255, 255, 230, 0.95)"
        sx={{
          transition: "transform 0.3s ease-in-out",
          "&:hover": { transform: "scale(1.02)" },
        }}
      >
        <Typography variant="h5" textAlign="center" fontWeight="bold">
          User Registration
        </Typography>

        {/* Success Message */}
        {message && (
          <Alert severity="success" sx={{ my: 2, textAlign: "center" }}>
            {message}
          </Alert>
        )}

        <form onSubmit={formik.handleSubmit}>
          {/* User Type */}
          <FormControl fullWidth margin="normal" error={formik.touched.userType && Boolean(formik.errors.userType)}>
            <InputLabel>User Type</InputLabel>
            <Select name="userType" value={formik.values.userType} onChange={formik.handleChange} onBlur={formik.handleBlur}>
              <MenuItem value="farmer">Farmer</MenuItem>
              <MenuItem value="state_official">State Official</MenuItem>
              <MenuItem value="district_official">District Official</MenuItem>
              <MenuItem value="lab_technician">Lab Technician</MenuItem>
            </Select>
            {formik.touched.userType && formik.errors.userType && <FormHelperText>{formik.errors.userType}</FormHelperText>}
          </FormControl>

          {/* State Selection */}
          <FormControl fullWidth margin="normal">
            <InputLabel>State</InputLabel>
            <Select name="state" value={formik.values.state} onChange={formik.handleChange}>
              {Object.keys(stateDistrictData).map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* District Selection (Dynamic) */}
          <FormControl fullWidth margin="normal">
            <InputLabel>District</InputLabel>
            <Select name="district" value={formik.values.district} onChange={formik.handleChange} disabled={!formik.values.state}>
              {(stateDistrictData[formik.values.state] || []).map((district) => (
                <MenuItem key={district} value={district}>
                  {district}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Full Name */}
          <TextField fullWidth label="Full Name" margin="normal" name="fullName" value={formik.values.fullName}
            onChange={formik.handleChange} onBlur={formik.handleBlur}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
          />

          {/* Email */}
          <TextField fullWidth label="Email" type="email" margin="normal" name="email" value={formik.values.email}
            onChange={formik.handleChange} onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          {/* Mobile Number */}
          <TextField fullWidth label="Mobile Number" type="text" margin="normal" name="mobile" value={formik.values.mobile}
            onChange={formik.handleChange} onBlur={formik.handleBlur}
            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
            helperText={formik.touched.mobile && formik.errors.mobile}
          />

          {/* Password */}
          <TextField fullWidth label="Password" type={showPassword ? "text" : "password"} margin="normal" name="password"
            value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}
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
          <TextField fullWidth label="Confirm Password" type={showConfirmPassword ? "text" : "password"} margin="normal"
            name="confirmPassword" value={formik.values.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur}
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
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={!formik.isValid || !formik.dirty}>
            Register
          </Button>

          {/* Navigation Buttons */}
          <Grid container spacing={2} mt={2}>
            <Grid item xs={6}>
              <Button fullWidth variant="outlined" onClick={() => navigate("/login")}>Go to Login</Button>
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth variant="outlined" onClick={() => navigate("/")}>Back to Dashboard</Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
