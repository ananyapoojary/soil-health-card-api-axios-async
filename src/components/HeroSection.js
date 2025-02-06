import { Container, Typography, Button, Box, Toolbar, AppBar } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <Box>
      {/* Navigation Bar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Soil Health Card
          </Typography>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/register">
            Register
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Container
        component={motion.div}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        sx={{
          textAlign: 'center',
          py: 5,
          backgroundImage: 'linear-gradient(to right, #ff7e5f, #feb47b)',
          color: 'white',
          borderRadius: 2,
          mt: 2,
        }}
      >
        <Typography variant="h3" gutterBottom>
          Welcome to Soil Health Card System
        </Typography>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Get insights into soil quality and optimize agricultural practices.
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={Link}
          to="/dashboard"
          sx={{ backgroundColor: '#4CAF50', '&:hover': { backgroundColor: '#388E3C' } }}
        >
          Get Started
        </Button>
      </Container>
    </Box>
  );
};

export default HeroSection;
