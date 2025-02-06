import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [hover, setHover] = useState(false);

  return (
    <AppBar position="sticky" sx={{ bgcolor: hover ? 'secondary.main' : 'primary.main', transition: '0.3s' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>🌱 Soil Health Card</Typography>
        <Button color="inherit" component={Link} to="/" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>Dashboard</Button>
        <Button color="inherit" component={Link} to="/login">Login</Button>
        <Button color="inherit" component={Link} to="/Register">Register</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
