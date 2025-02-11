import React from "react";
import { Box, Button, Container, Grid, Typography, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick"; // Import Slider for carousel
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Header from "../components/Header"; // Import Header

const LandingPage = () => {
  const navigate = useNavigate();

  // Carousel settings
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Container maxWidth="xl">
      <Header />

      {/* Hero Section */}
      <Box
        textAlign="center"
        mt={4}
        px={2}
        py={6}
        sx={{
          background: "linear-gradient(135deg, #67B26F 0%, #4ca2cd 100%)",
          borderRadius: "10px",
          color: "white",
        }}
      >
        <Typography variant="h3" fontWeight="bold">
          Soil Health Card: Ensuring Sustainable Agriculture
        </Typography>
        <Typography variant="h6" mt={2}>
          Empowering Farmers with Scientific Soil Analysis
        </Typography>
        <Box mt={3}>
          <Button variant="contained" color="secondary" onClick={() => navigate("/register")} sx={{ mr: 2 }}>
            Register
          </Button>
          <Button variant="outlined" color="inherit" onClick={() => navigate("/login")}>
            Login
          </Button>
        </Box>
      </Box>

      {/* Features Section */}
      <Box mt={6} textAlign="center">
        <Typography variant="h4" fontWeight="bold" color="primary">
          Why Use Soil Health Card?
        </Typography>
        <Grid container spacing={3} justifyContent="center" mt={3}>
          {[
            { title: "Accurate Soil Testing", desc: "Get detailed soil analysis reports." },
            { title: "Crop Recommendations", desc: "Receive customized fertilizer advice." },
            { title: "Government Schemes", desc: "Access exclusive subsidies & benefits." },
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ background: "#f0f0f0", height: "100%" }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" color="primary">
                    {feature.title}
                  </Typography>
                  <Typography>{feature.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Carousel Section */}
      <Box mt={6} textAlign="center">
        <Typography variant="h4" fontWeight="bold" color="secondary">
          Benefits of Healthy Soil
        </Typography>
        <Slider {...carouselSettings} style={{ maxWidth: "800px", margin: "auto", marginTop: "20px" }}>
          {[
            "💚 Improves crop yield & quality.",
            "🌍 Reduces environmental pollution.",
            "🌱 Helps in sustainable farming.",
            "🔬 Ensures better soil fertility.",
          ].map((text, index) => (
            <Box key={index} py={4} sx={{ background: "#e3f2fd", borderRadius: "10px" }}>
              <Typography variant="h6">{text}</Typography>
            </Box>
          ))}
        </Slider>
      </Box>

      {/* Testimonials Section */}
      <Box mt={6} textAlign="center">
        <Typography variant="h4" fontWeight="bold" color="primary">
          What Farmers Say
        </Typography>
        <Grid container spacing={3} justifyContent="center" mt={3}>
          {[
            { name: "Ramesh Kumar", feedback: "This platform helped me increase my crop yield by 30%!" },
            { name: "Priya Patel", feedback: "I now use the right fertilizers thanks to the Soil Health Card system." },
          ].map((testimonial, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card sx={{ bgcolor: "#f9f9f9", p: 2 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" color="secondary">
                    {testimonial.name}
                  </Typography>
                  <Typography>{testimonial.feedback}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Call to Action Section */}
      <Box mt={6} py={4} textAlign="center" sx={{ bgcolor: "#1565c0", color: "white", borderRadius: "10px" }}>
        <Typography variant="h4" fontWeight="bold">
          Get Your Soil Health Card Today!
        </Typography>
        <Typography variant="h6" mt={2}>
          Join thousands of farmers improving their soil health.
        </Typography>
        <Box mt={3}>
          <Button variant="contained" color="secondary" onClick={() => navigate("/register")} sx={{ mr: 2 }}>
            Sign Up Now
          </Button>
          <Button variant="outlined" color="inherit" onClick={() => navigate("/login")}>
            Login
          </Button>
        </Box>
      </Box>

      {/* Footer */}
      <Box textAlign="center" mt={6} py={3} bgcolor="primary.main" color="white">
        <Typography variant="body1">&copy; 2025 Soil Health Card | Government of India</Typography>
      </Box>
    </Container>
  );
};

export default LandingPage;
