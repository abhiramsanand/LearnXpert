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
} from "@mui/material";
import {
  Home as HomeIcon,
  Class as ClassIcon,
  Assessment as AssessmentIcon,
  Report as ReportIcon,
  HelpOutline as HelpOutlineIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

const TraineeSidebar: React.FC = () => {
  const [open, setOpen] = useState(window.innerWidth > 600);
  const location = useLocation();

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

  const menuItems = [
    {
      text: "Dashboard",
      icon: <HomeIcon />,
      to: "/Trainee-Dashboard",
    },
    {
      text: "Courses",
      icon: <ClassIcon />,
      to: "/Trainee-Courses",
    },
    {
      text: "Assessments",
      icon: <AssessmentIcon />,
      to: "/Trainee-Assessments",
    },
    {
      text: "Daily Report",
      icon: <ReportIcon />,
      to: "/Trainee-DailyReport",
    },
    {
      text: "Enquiry",
      icon: <HelpOutlineIcon />,
      to: "/Trainee-Enquiry",
    },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? 240 : 72,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? 240 : 72,
          boxSizing: "border-box",
          backgroundColor: "rgba(128, 97, 195, 0.1)",
        },
      }}
    >
      <Toolbar>
        {open && (
          <Typography
            sx={{
              fontSize: "30px",
              color: "rgba(128, 97, 195)",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: "bold",
            }}
          >
            ILPex{" "}
            <span style={{ fontSize: "8px", marginLeft: "-8px" }}>WEB</span>
          </Typography>
        )}
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            ml: open ? "auto" : 0,
            display: { xs: "none", sm: "inline-flex" },
          }}
        >
          <MenuIcon sx={{ color: "rgba(128, 97, 195, 1)" }} />
        </IconButton>
      </Toolbar>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.to}
            sx={{
              backgroundColor:
                location.pathname === item.to
                  ? "rgba(128, 97, 195, 0.8)"
                  : "transparent",
              borderRadius: "7px",
              width: "80%",
              ml: 2,
              "&:hover": {
                backgroundColor: "rgba(128, 97, 195, 0.1)",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color:
                  location.pathname === item.to
                    ? "#FFFFFF"
                    : "rgba(128, 97, 195, 1)",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{
                display: open ? "block" : "none",
                color: location.pathname === item.to ? "#FFFFFF" : "#8061C3",
              }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default TraineeSidebar;
