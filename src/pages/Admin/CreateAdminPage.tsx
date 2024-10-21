import React, { useCallback, useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import AdminTable from "../../components/Admin/CreateAdmin/AdminTable";
import CreateAdminForm from "../../components/Admin/CreateAdmin/CreateAdminForm";
import axios from "axios";
import { Admin } from "../../components/Admin/CreateAdmin/Admin"; // Import the Admin type

const CreateAdminPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [admins, setAdmins] = useState<Admin[]>([]); // State to hold the list of admins

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get("https://ilpex-backend.onrender.com/api/v1/users");
        setAdmins(response.data); // Assume response.data contains an array of Admin objects
      } catch (error) {
        console.error("Error fetching admins:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  const handleCreateAdmin = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await axios.post("https://ilpex-backend.onrender.com/api/v1/users/save", {
        username,
        email,
        password,
        rolesId: "1",
      });
      // Update the admin list to include the new admin
      setAdmins((prevAdmins) => [...prevAdmins, response.data]); // Assuming the response contains the new admin
    } catch (error) {
      console.error("Error creating admin:", error);
    }
  };

  const handleDeleteClick = useCallback(
    async (adminId: number) => {
      try {
        await axios.delete(`https://ilpex-backend.onrender.com/api/v1/users/${adminId}`);
        // Update the state to remove the deleted admin
        setAdmins((prevAdmins) => prevAdmins.filter(admin => admin.id !== adminId));
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
        padding: "8px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "row",
        gap: "16px",
        alignItems: "flex-start",
      }}
    >
      {/* Create Admin Form */}
      <Box
        sx={{
          width: "50%",
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
          width: "50%",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <AdminTable admins={admins} onDeleteClick={handleDeleteClick} />
      </Box>
    </Box>
  );
};

export default CreateAdminPage;
