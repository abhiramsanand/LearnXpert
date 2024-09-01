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
  Collapse,
} from "@mui/material";
import {
  Home as HomeIcon,
  Group as GroupIcon,
  Assessment as AssessmentIcon,
  School as SchoolIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
  Report as ReportIcon,
  Menu as MenuIcon,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";

import NoteAddIcon from "@mui/icons-material/NoteAdd";
import SummarizeIcon from "@mui/icons-material/Summarize";
import { Link, useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(window.innerWidth > 600);
  const [openBatches, setOpenBatches] = useState(false);
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

  const handleBatchesClick = () => {
    setOpenBatches(!openBatches);
  };

  const menuItems = [
    {
      text: "Home",
      icon: <HomeIcon />,
      to: "/Admin-Home",
    },
    {
      text: "Batches",
      icon: <GroupIcon />,
      onClick: handleBatchesClick,
      subItems: [
        {
          text: "Batch Report",
          icon: <SummarizeIcon />,
          to: "/Admin-Batches",
        },
        {
          text: "Create Batch",
          icon: <NoteAddIcon />,
          to: "/Admin-BatchAdd",
        },
      ],
    },
    {
      text: "Assessments",
      icon: <AssessmentIcon />,
      to: "/Admin-Assessments",
    },
    {
      text: "Daily Report",
      icon: <ReportIcon />,
      to: "/Admin-DailyReport",
    },
    {
      text: "Courses",
      icon: <SchoolIcon />,
      to: "/Admin-Courses",
    },
    {
      text: "Add Admin",
      icon: <AdminPanelSettingsIcon />,
      to: "/Add-Admin",
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
          <div key={item.text}>
            <ListItem
              button
              onClick={item.onClick || (() => {})}
              component={item.to ? Link : "div"}
              to={item.to || "#"}
              sx={{
                backgroundColor:
                  location.pathname === item.to
                    ? "rgba(128, 97, 195, 0.8)"
                    : "transparent",
                borderRadius: "7px",
                width: "80%",
                ml: 2,
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
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
              {item.subItems && (
                <IconButton
                  edge="end"
                  sx={{
                    ml: "auto",
                    display: { xs: "none", sm: "inline-flex" },
                    color: "#8061C3",
                  }}
                >
                  {openBatches ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              )}
            </ListItem>
            {item.subItems && (
              <Collapse in={openBatches} timeout="auto" unmountOnExit>
                <List
                  component="div"
                  disablePadding
                  sx={{
                    backgroundColor: "rgba(128, 97, 195, 0.1)",
                    border: "1px rgba(128, 97, 195, 0.3) solid",
                    borderRadius: "0px 0px 7px 7px ",
                    width: "80%",
                    ml: 2,
                  }}
                >
                  {item.subItems && (
                    <Collapse in={openBatches} timeout="auto" unmountOnExit>
                      <List
                        component="div"
                        disablePadding
                        sx={{
                          backgroundColor: "transparent",
                          borderRadius: "7px",
                        }}
                      >
                        {item.subItems.map((subItem) => (
                          <ListItem
                            button
                            key={subItem.text}
                            component={Link}
                            to={subItem.to}
                            sx={{
                              pl: 3,
                              backgroundColor:
                                location.pathname === subItem.to
                                  ? "rgba(128, 97, 195, 0.8)"
                                  : "transparent",
                              borderRadius: "7px",
                              "&:hover": {
                                backgroundColor: "rgba(0, 0, 0, 0.1)",
                              },
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                color:
                                  location.pathname === subItem.to
                                    ? "#FFFFFF"
                                    : "#8061C3",
                                fontSize:
                                  subItem.text === "Create Batch" ||
                                  subItem.text === "Batch Report"
                                    ? "12px"
                                    : "24px",
                                minWidth: "12px",
                              }}
                            >
                              {subItem.icon}
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography
                                  sx={{
                                    fontSize:
                                      subItem.text === "Create Batch" ||
                                      subItem.text === "Batch Report"
                                        ? "12px"
                                        : "inherit",
                                    color:
                                      location.pathname === subItem.to
                                        ? "#FFFFFF"
                                        : "#8061C3",
                                  }}
                                >
                                  {subItem.text}
                                </Typography>
                              }
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  )}
                </List>
              </Collapse>
            )}
          </div>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
