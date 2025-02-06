import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header"; // Import Header

const stateDistrictData = {
  Karnataka: ["Bengaluru", "Mysuru", "Hubballi", "Mangaluru"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik"],
  TamilNadu: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
};

const validationSchema = Yup.object({
  userType: Yup.string().required("User type is required"),
  fullName: Yup.string().min(3, "Name must be at least 3 characters").required("Full name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  mobile: Yup.string().matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number").required("Mobile number is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match").required("Confirm Password is required"),
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
    <>
      <Header /> {/* Add Header Here */}
      <Container maxWidth="sm">
        <Box
          mt={4}
          p={4}
          boxShadow={6}
          borderRadius={3}
          bgcolor="rgba(255, 255, 230, 0.95)"
        >
          <Typography variant="h5" textAlign="center" fontWeight="bold">
            User Registration
          </Typography>

          {message && (
            <Alert severity="success" sx={{ my: 2, textAlign: "center" }}>
              {message}
            </Alert>
          )}

          <form onSubmit={formik.handleSubmit}>
            <FormControl fullWidth margin="normal">
              <InputLabel>User Type</InputLabel>
              <Select name="userType" value={formik.values.userType} onChange={formik.handleChange}>
                <MenuItem value="farmer">Farmer</MenuItem>
                <MenuItem value="state_official">State Official</MenuItem>
                <MenuItem value="district_official">District Official</MenuItem>
                <MenuItem value="lab_technician">Lab Technician</MenuItem>
              </Select>
            </FormControl>

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

            <TextField fullWidth label="District" margin="normal" name="district" value={formik.values.district} onChange={formik.handleChange} />

            <TextField fullWidth label="Full Name" margin="normal" name="fullName" value={formik.values.fullName} onChange={formik.handleChange} />

            <TextField fullWidth label="Email" type="email" margin="normal" name="email" value={formik.values.email} onChange={formik.handleChange} />

            <TextField fullWidth label="Mobile Number" type="text" margin="normal" name="mobile" value={formik.values.mobile} onChange={formik.handleChange} />

            <TextField fullWidth label="Password" type={showPassword ? "text" : "password"} margin="normal" name="password" value={formik.values.password} onChange={formik.handleChange} 
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

            <Button type="submit" variant="contained" color="primary" fullWidth disabled={!formik.isValid}>
              Register
            </Button>

            <Button fullWidth variant="outlined" color="secondary" onClick={() => navigate("/login")} sx={{ mt: 1 }}>
              Go to Login
            </Button>

            <Button fullWidth variant="outlined" color="success" onClick={() => navigate("/")} sx={{ mt: 1 }}>
              Back to Dashboard
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default Register;
