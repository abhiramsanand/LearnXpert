import React, { useCallback, useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import AdminTable from "../../components/Admin/CreateAdmin/AdminTable";
import CreateAdminForm from "../../components/Admin/CreateAdmin/CreateAdminForm";
import axios from "axios";

const CreateAdminPage: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleCreateAdmin = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      await axios.post("http://localhost:8080/api/v1/users/save", {
        username,
        email,
        password,
        rolesId: "1",
      });
      // Optionally refresh the admin list here
    } catch (error) {
      console.error("Error creating admin:", error);
    }
  };

  const handleDeleteClick = useCallback(
    async (admin: { slno: number; name: string }) => {
      try {
        await axios.delete(
          `http://localhost:8080/api/v1/users/${admin.slno}`
        );
        // Optionally refresh the admin list here
      } catch (error) {
        console.error("Error deleting admin:", error);
      }
    },
    []
  );

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="70vh"
      >
        <Typography
          sx={{
            fontSize: "30px",
            color: "#8061C3",
            fontFamily: "Montserrat, sans-serif",
            fontWeight: "bold",
            animation: "flip 1s infinite",
            "@keyframes flip": {
              "0%": { transform: "rotateX(0)" },
              "50%": { transform: "rotateX(180deg)" },
              "100%": { transform: "rotateX(360deg)" },
            },
          }}
        >
          ILPex <span style={{ fontSize: "8px", marginLeft: "-8px" }}>WEB</span>
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: "8px", // Adjust padding as needed
        minHeight: "100vh",
        display: "flex",
        flexDirection: "row", // Changed to row for side-by-side layout
        gap: "16px",
        alignItems: "flex-start",
      }}
    >
      {/* Create Admin Form */}
      <Box
        sx={{
          width: "50%", // Occupy half of the available width
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <CreateAdminForm onCreate={handleCreateAdmin} />
      </Box>

      {/* Admin Table */}
      <Box
        sx={{
          width: "50%", // Occupy half of the available width
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <AdminTable onDeleteClick={handleDeleteClick} />
      </Box>
    </Box>
  );
};

export default CreateAdminPage;
