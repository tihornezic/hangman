import React from "react";
import { NavLink } from "react-router-dom";
import {
  AppBar,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export const NAVIGATION_HEIGHT = "5rem";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/play", label: "Play" },
  { path: "/high-scores", label: "High Scores" },
];

const Navigation = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const navigationLinks = (
    <List
      component="nav"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        py: 0,
      }}
    >
      {navLinks.map((link) => (
        <ListItemButton
          key={link.path}
          component={NavLink}
          to={link.path}
          onClick={handleDrawerClose}
          sx={{ px: 2.5, borderRadius: 1 }}
        >
          <ListItemText primary={link.label} />
        </ListItemButton>
      ))}
    </List>
  );

  return (
    <>
      <AppBar position="static" sx={{ height: NAVIGATION_HEIGHT }}>
        <Toolbar disableGutters sx={{ height: "100%" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hangman
          </Typography>

          {!isMobile && navigationLinks}

          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerClose}
        sx={{
          ".MuiPaper-root": {
            width: "30%",
          },
        }}
      >
        {navigationLinks}
      </Drawer>
    </>
  );
};

export default Navigation;
