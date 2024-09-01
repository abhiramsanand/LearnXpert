import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

interface CreateAdminFormProps {
  onCreate: (username: string, email: string, password: string) => void;
}

// Validation schema using Yup
const validationSchema = Yup.object({
  username: Yup.string()
    .matches(/^[A-Za-z]+$/, "Username must contain only alphabets")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const CreateAdminForm: React.FC<CreateAdminFormProps> = ({ onCreate }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleCreate = async (values: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      await axios.post("http://localhost:8080/api/v1/users/save", {
        userName: values.username,
        email: values.email,
        password: values.password,
        rolesId: 1,
      });
      // Notify parent component and open success dialog
      onCreate(values.username, values.email, values.password);
      setOpen(true);
    } catch (error) {
      console.error("Error creating admin:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      component="div"
      sx={{
        mb: 2,
        p: 2,
        backgroundColor: "#FFFFFF",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        minHeight: "60vh",
        mt: "15px",
      }}
    >
      <Typography
        align="center"
        sx={{
          color: "#8061C3",
          mb: 2,
          ml: "-3",
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        CREATE ADMIN
      </Typography>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleCreate(values)}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: 2 }}>
              <Field
                as={TextField}
                label="Username"
                name="username"
                variant="outlined"
                fullWidth
                error={touched.username && Boolean(errors.username)}
                helperText={<ErrorMessage name="username" />}
                sx={{
                  "& .MuiInputLabel-root": { color: "#8061C3" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor:
                        touched.username && errors.username ? "red" : "#8061C3",
                    },
                    "&:hover fieldset": { borderColor: "#6A529D" },
                    "&.Mui-focused fieldset": { borderColor: "#8061C3" },
                  },
                  "& input": { padding: "12px 8px", color: "#8061C3" },
                }}
              />
              <Field
                as={TextField}
                label="Email"
                name="email"
                variant="outlined"
                fullWidth
                error={touched.email && Boolean(errors.email)}
                helperText={<ErrorMessage name="email" />}
                sx={{
                  "& .MuiInputLabel-root": { color: "#8061C3" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor:
                        touched.email && errors.email ? "red" : "#8061C3",
                    },
                    "&:hover fieldset": { borderColor: "#6A529D" },
                    "&.Mui-focused fieldset": { borderColor: "#8061C3" },
                  },
                  "& input": { padding: "12px 8px", color: "#8061C3" },
                }}
              />
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 2,
                mt: 2,
              }}
            >
              <Field
                as={TextField}
                label="Password"
                type="password"
                name="password"
                variant="outlined"
                fullWidth
                error={touched.password && Boolean(errors.password)}
                helperText={<ErrorMessage name="password" />}
                sx={{
                  "& .MuiInputLabel-root": { color: "#8061C3" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor:
                        touched.password && errors.password ? "red" : "#8061C3",
                    },
                    "&:hover fieldset": { borderColor: "#6A529D" },
                    "&.Mui-focused fieldset": { borderColor: "#8061C3" },
                  },
                  "& input": { padding: "12px 8px", color: "#8061C3" },
                }}
              />
              <Field
                as={TextField}
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                variant="outlined"
                fullWidth
                error={
                  touched.confirmPassword && Boolean(errors.confirmPassword)
                }
                helperText={<ErrorMessage name="confirmPassword" />}
                sx={{
                  "& .MuiInputLabel-root": { color: "#8061C3" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor:
                        touched.confirmPassword && errors.confirmPassword
                          ? "red"
                          : "#8061C3",
                    },
                    "&:hover fieldset": { borderColor: "#6A529D" },
                    "&.Mui-focused fieldset": { borderColor: "#8061C3" },
                  },
                  "& input": { padding: "12px 8px", color: "#8061C3" },
                }}
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                sx={{
                  padding: "8px 16px",
                  borderRadius: "20px",
                  backgroundColor: "#8061C3",
                  "&:hover": { backgroundColor: "#6A529D" },
                }}
              >
                Create Admin
              </Button>
            </Box>
          </Form>
        )}
      </Formik>

      {/* Success Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-paper": {
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#fff",
            width: "400px", // Adjust width as needed
            maxWidth: "100%",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: "bold",
            color: "#8061C3",
            borderBottom: "1px solid #ccc",
            fontSize: "18px",
            textAlign: "center",
          }}
        >
          Success
        </DialogTitle>
        <DialogContent
          sx={{
            padding: "20px",
            textAlign: "center",
          }}
        >
          <Typography variant="body1" sx={{ color: "#333" }}>
            Admin created successfully!
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center",
            padding: "8px 16px",
            borderTop: "1px solid #ccc",
          }}
        >
          <Button
            onClick={handleClose}
            color="primary"
            sx={{ borderRadius: "20px" }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CreateAdminForm;
