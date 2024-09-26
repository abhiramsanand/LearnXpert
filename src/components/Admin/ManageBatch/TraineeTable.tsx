import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Box,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import { Trainee } from "../ManageBatch/BatchDetails";
import AddTraineeModal from "../ManageBatch/AddTraineeModal";
import ConfirmationModal from "./ConfirmationModal"; // Import the confirmation modal component
import { useParams } from "react-router-dom";
import axios from "axios";
import SwapVertIcon from '@mui/icons-material/SwapVert';

interface TraineeTableProps {
  trainees: Trainee[];
  onAddTrainee: () => void;
}

const TraineeTable: React.FC<TraineeTableProps> = ({
  trainees,
  onAddTrainee,
}) => {
  const { batchId } = useParams<{ batchId: string }>();
  const [traineeList, setTraineeList] = useState<Trainee[]>(trainees);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false); // State for confirmation modal
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingTrainee, setEditingTrainee] = useState<Trainee | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [traineeToDelete, setTraineeToDelete] = useState<number | null>(null); // Track which trainee is being deleted
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleOpenAddModal = () => setIsAddModalOpen(true);
  const handleCloseAddModal = () => setIsAddModalOpen(false);

  const handleAddTrainee = async (
    userName: string,
    email: string,
    percipioEmail: string,
    password: string
  ) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/batches/${batchId}/trainees`,
        {
          userName,
          email,
          percipioEmail,
          password,
        }
      );
      setTraineeList([...traineeList, response.data]);
      handleCloseAddModal();
    } catch (error) {
      console.error("There was an error adding the trainee!", error);
    }
  };

  const handleEditTrainee = (index: number) => {
    setEditingIndex(index);
    setEditingTrainee({ ...traineeList[index] });
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditingTrainee(null);
  };

  const handleSaveTrainee = async () => {
    if (editingTrainee && editingIndex !== null) {
      try {
        await axios.put(
          `http://localhost:8080/api/v1/batches/trainees/${editingTrainee.traineeId}`,
          editingTrainee
        );
        const updatedList = [...traineeList];
        updatedList[editingIndex] = editingTrainee;
        setTraineeList(updatedList);
        setEditingIndex(null);
        setEditingTrainee(null);
      } catch (error) {
        console.error("There was an error updating the trainee!", error);
      }
    }
  };

  const handleOpenConfirmationModal = (traineeId: number) => {
    setTraineeToDelete(traineeId);
    setIsConfirmationModalOpen(true);
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
    setTraineeToDelete(null);
  };

  const handleDeleteTrainee = async () => {
    if (traineeToDelete === null) return;

    try {
      await axios.delete(
        `http://localhost:8080/api/v1/batches/trainees/${traineeToDelete}`
      );
      setTraineeList((prevTrainees) =>
        prevTrainees.filter((trainee) => trainee.traineeId !== traineeToDelete)
      );
      handleCloseConfirmationModal();
    } catch (error) {
      console.error("There was an error deleting the trainee!", error);
      alert(
        "There was an error deleting the trainee. Check the console for details."
      );
    }
  };

  const handleSort = () => {
    const sortedTrainees = [...traineeList].sort((a, b) => {
      const userNameA = a.userName.toLowerCase();
      const userNameB = b.userName.toLowerCase();
      if (userNameA < userNameB) return sortOrder === "asc" ? -1 : 1;
      if (userNameA > userNameB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    setTraineeList(sortedTrainees);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredTrainees = useMemo(
    () =>
      traineeList.filter(
        (trainee) =>
          trainee.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          trainee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          trainee.percipioEmail.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm, traineeList]
  );

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <Typography fontWeight="bold" sx={{ fontSize: "17px", ml: 1 }}>
          TRAINEE LIST
        </Typography>
        <Box>
          <TextField
            variant="outlined"
            placeholder="Search..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              "& .MuiInputBase-root": {
                padding: "4px 8px",
                width: "100%",
                height: "30px",
                backgroundColor: "#f0f0f0",
              },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#8061C3",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#A281EA",
                "&.Mui-focused": {
                  color: "#8061C3",
                },
              },
              mr: 2
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            onClick={handleOpenAddModal}
            sx={{
              color: "#fff",
              backgroundColor: "#8061C3",
              borderRadius: "4px",
              fontSize: "12px",
              height: "30px",
              padding: "0 10px",
              "&:hover": {
                backgroundColor: "#5b3f9f", 
              },
            }}
          >
            <AddIcon fontSize="small" />
            Add Trainee
          </Button>
        </Box>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          maxHeight: "calc(100vh - 335px)",
          overflowY: "auto",
          overflowX: "hidden",
          backgroundColor: "#F1EDEE",
          "&::-webkit-scrollbar": { width: "8px" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#8061C3",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-track": { backgroundColor: "#f1f1f1" },
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {["userName", "email", "percipioEmail", "password"].map(
                (field) => (
                  <TableCell
                    key={field}
                    sx={{
                      fontWeight: "bold",
                      backgroundColor: "#F1EDEE",
                      fontSize: "14px",
                    }}
                  >
                    {field === "userName" ? (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                        onClick={handleSort}
                      >
                        Username <SwapVertIcon fontSize="small" />
                      </Box>
                    ) : (
                      field.charAt(0).toUpperCase() + field.slice(1)
                    )}
                  </TableCell>
                )
              )}
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#F1EDEE",
                  fontSize: "14px",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTrainees.map((trainee, index) => (
              <TableRow
                key={trainee.traineeId}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#F9F6F7" : "#f9f9f9",
                }}
              >
                {["userName", "email", "percipioEmail", "password"].map(
                  (field) => (
                    <TableCell
                      key={field}
                      sx={{
                        fontSize: "13px",
                        backgroundColor: "inherit",
                      }}
                    >
                      {editingIndex === index && editingTrainee ? (
                        <TextField
                          value={editingTrainee[field as keyof Trainee]}
                          onChange={(e) =>
                            setEditingTrainee((prev) =>
                              prev
                                ? {
                                    ...prev,
                                    [field]: e.target.value,
                                  }
                                : null
                            )
                          }
                          variant="standard" // Use standard variant for underline effect
                          sx={{
                            "& .MuiInputBase-root": {
                              fontSize: "13px",
                            },
                          }}
                        />
                      ) : (
                        trainee[field as keyof Trainee]
                      )}
                    </TableCell>
                  )
                )}
                <TableCell
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "8px",
                  }}
                >
                  {editingIndex === index ? (
                    <>
                      <IconButton color="primary" onClick={handleSaveTrainee}>
                        <SaveIcon fontSize="small" />
                      </IconButton>
                      <IconButton color="secondary" onClick={handleCancelEdit}>
                        <CancelIcon fontSize="small" />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton
                        color="primary"
                        onClick={() => handleEditTrainee(index)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() =>
                          handleOpenConfirmationModal(trainee.traineeId)
                        }
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Trainee Modal */}
      <AddTraineeModal
        open={isAddModalOpen}
        onClose={handleCloseAddModal}
        onAddTrainee={handleAddTrainee}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        open={isConfirmationModalOpen}
        onClose={handleCloseConfirmationModal}
        onConfirm={handleDeleteTrainee}
        title="Delete Trainee"
        message="Are you sure you want to delete this trainee?"
      />
    </Box>
  );
};

export default TraineeTable;
