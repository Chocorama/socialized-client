import React, { useContext, useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/auth';

const MenuBar = () => {
  const { user, logout } = useContext(AuthContext);

  const links = ['/', '/login', '/register'];
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [setActiveItem, location.pathname]);

  function LinkTab(props) {
    return <Tab {...props} component={Link} />;
  }

  const handleChange = (e, newValue) => {
    setActiveItem(newValue);
  };

  const menuBar = user ? (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography style={{ margin: 'auto 0' }} variant='h5'>
        {user.username}
      </Typography>
      <Button color='inherit' onClick={logout}>
        Logout
      </Button>
    </div>
  ) : (
    <Tabs textColor='inherit' value={activeItem} onChange={handleChange}>
      <LinkTab label='home' value={links[0]} to={links[0]} />
      <LinkTab label='login' value={links[1]} to={links[1]} />
      <LinkTab label='register' value={links[2]} to={links[2]} />
    </Tabs>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='fixed'>
        <Toolbar>
          <MenuIcon />
          <Container>{menuBar}</Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MenuBar;
