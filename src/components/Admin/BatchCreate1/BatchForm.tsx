import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import * as XLSX from "xlsx";
import SuccessModal from "./SuccessModal";

const BatchForm: React.FC = () => {
  const navigate = useNavigate();
  const [batchName, setBatchName] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | ArrayBuffer | null>(
    null
  );
  const [programs, setPrograms] = useState<string[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<string>("");
  const [fileSelected, setFileSelected] = useState<boolean>(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [excelData, setExcelData] = useState<any[][]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/programs"
        );
        setPrograms(
          response.data.map(
            (program: { programName: string }) => program.programName
          )
        );
      } catch (error) {
        console.error("Error fetching programs", error);
        alert("Error fetching programs.");
      }
    };

    fetchPrograms();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      setFileSelected(true);

      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        setExcelData(json);
        setFilePreview(e.target?.result);
      };
      reader.readAsArrayBuffer(selectedFile);
    }
  };

  const handleExcelDataChange = (
    value: string,
    rowIndex: number,
    cellIndex: number
  ) => {
    const updatedData = [...excelData];
    updatedData[rowIndex][cellIndex] = value;
    setExcelData(updatedData);
  };

  const handleSubmit = async () => {
    if (selectedProgram === "") {
      setErrorMessages(["Please select a program."]);
      return;
    }

    const formData = new FormData();
    const batchData = JSON.stringify({
      batchName,
      startDate,
      endDate,
      programName: selectedProgram,
    });
    formData.append("batchData", batchData);

    if (file) {
      // Convert the updated excelData back to a workbook
      const ws = XLSX.utils.aoa_to_sheet(excelData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

      // Convert workbook to a binary array
      const updatedFile = XLSX.write(wb, { bookType: "xlsx", type: "array" });

      // Convert the binary array to a Blob
      const updatedBlob = new Blob([updatedFile], {
        type: "application/octet-stream",
      });
      const updatedFileObj = new File([updatedBlob], file.name);

      formData.append("file", updatedFileObj);
    } else {
      setErrorMessages(["Please upload a file."]);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/batches/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const batchId = response.data;
      setSuccessMessage("Batch created successfully!");
      setSuccessModalOpen(true);
      navigate(`/Admin-BatchAdd2/${batchId}`);
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessages([error.response.data]);
      } else {
        setErrorMessages(["There was an error creating the batch."]);
      }
    }
  };

  const handleCloseSuccessModal = () => {
    setSuccessModalOpen(false);
  };

  // Filtered data based on the search term
  const filteredExcelData = excelData.filter((row) =>
    row.some((cell) =>
      cell.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  return (
    <Container
      sx={{
        maxHeight: "calc(100vh - 64px)",
        overflowY: "auto",
        p: 2,
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#8061C3",
          borderRadius: "4px",
        },
      }}
    >
      <Box
        sx={{
          mt: "-50px",
          p: 4,
          borderRadius: "15px",
          boxShadow: "4px 8px 10px rgba(0, 0, 0, 0.4)",
        }}
      >
        <Typography variant="h4" fontFamily={"Montserrat, sans-serif"} mb={3}>
          CREATE BATCH
        </Typography>

        <form>
          <Grid container spacing={3}>
            <Grid container item xs={12} spacing={3} alignItems="center">
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Program</InputLabel>
                  <Select
                    value={selectedProgram}
                    onChange={(e) =>
                      setSelectedProgram(e.target.value as string)
                    }
                    label="Program"
                  >
                    {programs.map((program) => (
                      <MenuItem key={program} value={program}>
                        {program}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Batch Name"
                  variant="outlined"
                  placeholder="ILP-2023-B03"
                  value={batchName}
                  onChange={(e) => setBatchName(e.target.value)}
                  InputProps={{
                    sx: {
                      bgcolor: "#FFF",
                      borderRadius: "4px",
                    },
                  }}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid container item xs={12} spacing={3} mt={2}>
              <Grid item xs={6}>
                <TextField
                  label="Start Date (Tentative)"
                  variant="outlined"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    bgcolor: "#FFF",
                    borderRadius: "4px",
                  }}
                  fullWidth
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="End Date (Tentative)"
                  variant="outlined"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    borderRadius: "4px",
                  }}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="caption" color="textSecondary">
                Upload the list of trainees (Format: .xlsx)
              </Typography>
            </Grid>

            <Grid item xs={12} display="flex" alignItems="center">
              <Button
                variant="contained"
                component="label"
                sx={{
                  color: "#8061C3",
                  bgcolor: "#ffff",
                  border: "6px #8061C3",
                  borderRadius: "24px",
                  height: "46px",
                  fontSize: "16px",
                  marginRight: "26px",
                  borderColor: "#8061C3",
                  "&:hover": {
                    bgcolor: "#D0C7FF",
                  },
                }}
              >
                + UPLOAD FILE
                <input
                  type="file"
                  hidden
                  accept=".xlsx"
                  onChange={handleFileChange}
                />
              </Button>

              {fileSelected && (
                <CheckCircleIcon
                  sx={{
                    color: "#4caf50",
                    ml: 1,
                    fontSize: "24px",
                  }}
                />
              )}

              <Typography variant="caption" color="textSecondary" ml={1}>
                Don’t have a template? Download it from{" "}
                <a
                  href="/Batch_Creation_Template.xlsx"
                  download
                  style={{
                    color: "#3f51b5",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  here
                </a>
              </Typography>
            </Grid>

            {excelData.length > 0 && (
              <Grid item xs={12} mt={2}>
                <Typography variant="h6" mb={2}>
                  Excel File Content
                </Typography>
                <Grid container spacing={2} mb={2}></Grid>

                <Box
                  sx={{
                    maxHeight: "300px",
                    overflowY: "auto",
                    "&::-webkit-scrollbar": {
                      width: "8px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      background: "#8061C3",
                      borderRadius: "4px",
                    },
                  }}
                >
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Sl. No</TableCell>
                        {excelData[0].map((cell: any, index: number) => (
                          <TableCell key={index}>{cell}</TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredExcelData.slice(1).map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                          <TableCell>{rowIndex + 1}</TableCell>
                          {row.map((cell, cellIndex) => (
                            <TableCell key={cellIndex}>
                              <TextField
                                value={cell}
                                onChange={(e) =>
                                  handleExcelDataChange(
                                    e.target.value,
                                    rowIndex + 1,
                                    cellIndex
                                  )
                                }
                                variant="standard"
                              />
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Grid>
            )}
          </Grid>

          {errorMessages.length > 0 && (
            <Box mt={2}>
              {errorMessages.map((message, index) => (
                <Typography key={index} color="error">
                  {message}
                </Typography>
              ))}
            </Box>
          )}

          <Box mt={4} display="flex" justifyContent="center">
            <Button
              variant="contained"
              sx={{
                borderRadius: "24px",
                width: "225px",
                height: "52px",
                bgcolor: "#8061C3",
                fontSize: "18px",
                fontWeight: "bold",
                "&:hover": {
                  bgcolor: "#8061C3",
                },
              }}
              onClick={handleSubmit}
            >
              Create Batch
            </Button>
          </Box>
        </form>
      </Box>

      {successModalOpen && (
        <SuccessModal
          open={successModalOpen}
          message={successMessage}
          onClose={handleCloseSuccessModal}
        />
      )}
    </Container>
  );
};

export default BatchForm;
