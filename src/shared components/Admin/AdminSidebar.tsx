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
} from "@mui/material";
import {
  Home as HomeIcon,
  Group as GroupIcon,
  Assessment as AssessmentIcon,
  School as SchoolIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
  Report as ReportIcon,
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
        {[
          {
            text: "Home",
            icon: <HomeIcon sx={{ color: "rgba(128, 97, 195, 1)" }} />,
            to: "/Admin-Home",
          },
          {
            text: "Batches",
            icon: <GroupIcon sx={{ color: "rgba(128, 97, 195, 1)" }} />,
            to: "/Admin-Batches",
          },
          {
            text: "Assessments",
            icon: <AssessmentIcon sx={{ color: "rgba(128, 97, 195, 1)" }} />,
            to: "/Admin-Assessments",
          },
          {
            text: "Daily Report",
            icon: <ReportIcon sx={{ color: "rgba(128, 97, 195, 1)" }} />,
            to: "/Admin-DailyReport",
          },
          {
            text: "Courses",
            icon: <SchoolIcon sx={{ color: "rgba(128, 97, 195, 1)" }} />,
            to: "/Admin-Courses",
          },
          {
            text: "Add Admin",
            icon: (
              <AdminPanelSettingsIcon sx={{ color: "rgba(128, 97, 195, 1)" }} />
            ),
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
    </Drawer>
  );
};

export default Sidebar;
