import React, { useState } from 'react';
import { useAuth } from '../../context/useAuthContext';
import {
  Box,
  Button,
  CircularProgress,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import { Menu as MenuIcon, AccountCircle } from '@mui/icons-material';
import { Person as ProfileIcon, Logout as LogoutIcon, Settings as SettingsIcon } from '@mui/icons-material';
import logo from '../../Images/logo.png';
import useStyles from './useStyles';
import { Link } from 'react-router-dom';
import profile from '../../Images/profile.png';

const Navbar: React.FC = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { loggedInUser, logout } = useAuth();

  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };
  console.log(loggedInUser);
  return (
    <AppBar className={classes.root} position="static">
      <Toolbar className={classes.toolbar}>
        {/* <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton> */}
        {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My App
        </Typography> */}
        <Link to={'/home'}>
          <img src={logo}></img>
        </Link>
        {!loggedInUser && (
          <>
            <div className={classes.flexContainer}>
              <Link className={classes.link} to={'/'}>
                BECOME A SITTER
              </Link>
              <Link className={classes.buttonLink} to={'/login'}>
                <Button type="submit" className={classes.login}>
                  LOGIN
                </Button>
              </Link>
              <Link className={classes.buttonLink} to={'/signup'}>
                <Button type="submit" size="large" variant="contained" className={classes.signup}>
                  SIGN UP
                </Button>
              </Link>
            </div>
          </>
        )}
        {loggedInUser && (
          <>
            <div className={classes.flexContainer}>
              <Link className={classes.myJobsLink} to={'/home'}>
                My Jobs
              </Link>
              <Link className={classes.messagesLink} to={'/home'}>
                Messages
              </Link>
              <IconButton
                className={classes.iconButton}
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuOpen}
                color="inherit"
              >
                <img className={classes.navProfileImage} src={profile}></img>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <Link style={{ textDecoration: 'none' }} to={'/profile'}>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <ProfileIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Profile</ListItemText>
                  </MenuItem>
                </Link>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </MenuItem>
              </Menu>
            </div>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export { Navbar };
