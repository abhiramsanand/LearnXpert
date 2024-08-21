/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import {
  Home as HomeIcon,
  Group as GroupIcon,
  Assessment as AssessmentIcon,
  School as SchoolIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
  Notifications as NotificationsIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import Person2Icon from "@mui/icons-material/Person2";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(window.innerWidth > 600);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? 240 : 72,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? 240 : 72,
          boxSizing: "border-box",
          backgroundColor: "#F3E8FF",
        },
      }}
    >
      <Toolbar>
        {open && (
          <Typography variant="h6" noWrap sx={{ color: "#8518FF" }}>
            LearnXpert
          </Typography>
        )}
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            ml: open ? "auto" : 0,
            display: { xs: "none", sm: "inline-flex" }, 
          }}
        >
          <MenuIcon sx={{ color: "#8518FF" }} />
        </IconButton>
      </Toolbar>
      <List>
        {[
          { text: "Home", icon: <HomeIcon sx={{ color: "#8518FF" }} />, to: "/Admin-Home" },
          { text: "Batches", icon: <GroupIcon sx={{ color: "#8518FF" }} />, to: "/Admin-Batches" },
          { text: "Trainees", icon: <Person2Icon sx={{ color: "#8518FF" }} />, to: "/Admin-Trainees" },
          {
            text: "Assessments",
            icon: <AssessmentIcon sx={{ color: "#8518FF" }} />,
            to: "/Admin-Assessments",
          },
          { text: "Courses", icon: <SchoolIcon sx={{ color: "#8518FF" }} />, to: "/Admin-Courses" },
          {
            text: "Add Admin",
            icon: <AdminPanelSettingsIcon sx={{ color: "#8518FF" }} />,
            to: "/Add-Admin",
          },
        ].map((item, _index) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.to}
            sx={{
              "&:hover .MuiListItemText-root": {
                display: open ? "block" : "block",
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{ display: open ? "block" : "none" }}
            />
          </ListItem>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <List sx={{ mb: "50px" }}>
        {[
          {
            text: "Notifications",
            icon: <NotificationsIcon sx={{ color: "#8518FF" }} />,
            to: "",
          },
          { text: "Logout", icon: <LogoutIcon sx={{ color: "#8518FF" }} />, to: "/" },
        ].map((item, _index) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.to}
            sx={{
              "&:hover .MuiListItemText-root": {
                display: open ? "block" : "block",
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{ display: open ? "block" : "none" }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;