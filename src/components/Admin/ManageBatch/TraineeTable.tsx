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
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { Trainee } from "../ManageBatch/BatchDetails";
import AddTraineeModal from "../ManageBatch/AddTraineeModal";
import ConfirmationModal from "./ConfirmationModal"; // Import the confirmation modal component
import { useParams } from "react-router-dom";
import axios from "axios";

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
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortField, setSortField] = useState<string>("userName"); // Track the column being sorted
  const [traineeToDelete, setTraineeToDelete] = useState<number | null>(null); // Track which trainee is being deleted

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

  const handleSort = (field: string) => {
    setSortField(field);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const sortedTrainees = useMemo(() => {
    return [...traineeList].sort((a, b) => {
      const comparison = a[sortField].localeCompare(b[sortField]);
      return sortOrder === "asc" ? comparison : -comparison;
    });
  }, [traineeList, sortOrder, sortField]);

  const filteredTrainees = useMemo(
    () =>
      sortedTrainees.filter(
        (trainee) =>
          trainee.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          trainee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          trainee.percipioEmail.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm, sortedTrainees]
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
              marginRight: "8px",
              "& .MuiInputBase-root": {
                padding: "4px 8px",
                width: "100%",
                height: "30px",
                fontSize: "12px",
              },
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
          maxHeight: "350px",
          overflowY: "auto",
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
                      cursor: "pointer",
                    }}
                    onClick={() => handleSort(field)}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {field === "userName"
                        ? "Username"
                        : field.charAt(0).toUpperCase() + field.slice(1)}
                      <IconButton size="small" sx={{ marginLeft: "8px" }}>
                        <SwapVertIcon fontSize="small" />
                      </IconButton>
                    </Box>
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
                  backgroundColor: index % 2 === 0 ? "#F9F6F7" : "#f9f9f9", // Alternating row colors
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
                          sx={{
                            "& .MuiInputBase-root": {
                              padding: "4px 8px",
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
                <TableCell>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    {editingIndex === index ? (
                      <>
                        <IconButton
                          color="primary"
                          size="small"
                          onClick={handleSaveTrainee}
                        >
                          <SaveIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          size="small"
                          onClick={handleCancelEdit}
                        >
                          <CancelIcon fontSize="small" />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton
                          color="success"
                          size="small"
                          onClick={() => handleEditTrainee(index)}
                          sx={{ color: "#8061C3" }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() =>
                            handleOpenConfirmationModal(trainee.traineeId)
                          }
                          sx={{ color: "#D22B2B" }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddTraineeModal
        open={isAddModalOpen}
        onClose={handleCloseAddModal}
        onAddTrainee={handleAddTrainee}
      />

      <ConfirmationModal
        open={isConfirmationModalOpen}
        onClose={handleCloseConfirmationModal}
        onConfirm={handleDeleteTrainee}
      />
    </Box>
  );
};

export default TraineeTable;
