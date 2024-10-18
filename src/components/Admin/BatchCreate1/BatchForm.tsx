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
import * as XLSX from "xlsx";
import SuccessModal from "./SuccessModal";

// Define the type for the Excel data
type ExcelRow = (string | number | null)[]; // Adjust this based on the expected data types in your Excel file

const BatchForm: React.FC = () => {
  const navigate = useNavigate();
  const [batchName, setBatchName] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [, setFilePreview] = useState<string | ArrayBuffer | null>(null);
  const [programs, setPrograms] = useState<string[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<string>("");
  const [fileSelected, setFileSelected] = useState<boolean>(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [excelData, setExcelData] = useState<ExcelRow[]>([]); // Update state type here
  const [searchTerm] = useState<string>("");

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
        const result = e.target?.result; // Can be string or ArrayBuffer
        if (result) {
          // Ensure result is defined
          const data = new Uint8Array(result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const json = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
          }) as ExcelRow[]; // Cast the type here
          setExcelData(json);
          setFilePreview(result);
        }
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
      const ws = XLSX.utils.aoa_to_sheet(excelData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

      const updatedFile = XLSX.write(wb, { bookType: "xlsx", type: "array" });
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
    } catch (error: unknown) {
      // Specify the error type as 'unknown'
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessages([error.response.data]);
      } else {
        setErrorMessages(["There was an error creating the batch."]);
      }
    }
  };

  const handleCloseSuccessModal = () => {
    setSuccessModalOpen(false);
  };

  const filteredExcelData = excelData.filter((row) =>
    row.some((cell) =>
      cell?.toString().toLowerCase().includes(searchTerm.toLowerCase())
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
                }}
              >
                Upload File
                <input
                  type="file"
                  accept=".xlsx"
                  hidden
                  onChange={handleFileChange}
                />
              </Button>
              {fileSelected && (
                <Typography variant="body1">{file?.name}</Typography>
              )}
            </Grid>

            {errorMessages.length > 0 && (
              <Grid item xs={12}>
                <Box
                  sx={{
                    backgroundColor: "#F8D7DA",
                    borderColor: "#F5C6CB",
                    color: "#721C24",
                    p: 2,
                    borderRadius: "4px",
                  }}
                >
                  {errorMessages.map((error, index) => (
                    <Typography key={index} variant="body1">
                      {error}
                    </Typography>
                  ))}
                </Box>
              </Grid>
            )}
          </Grid>
        </form>

        {excelData.length > 0 && (
          <Box mt={3}>
            <Table>
              <TableHead>
                <TableRow>
                  {excelData[0].map((_, index) => (
                    <TableCell key={index}>Column {index + 1}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredExcelData.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <TableCell key={cellIndex}>
                        <TextField
                          value={cell || ""}
                          onChange={(e) =>
                            handleExcelDataChange(
                              e.target.value,
                              rowIndex,
                              cellIndex
                            )
                          }
                          variant="outlined"
                          fullWidth
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{
            mt: 2,
            color: "#FFF",
            borderRadius: "24px",
            padding: "10px 24px",
            bgcolor: "#8061C3",
            "&:hover": {
              bgcolor: "#5c42a8",
            },
          }}
        >
          Submit
        </Button>
      </Box>

      <SuccessModal
        open={successModalOpen}
        message={successMessage}
        onClose={handleCloseSuccessModal}
      />
    </Container>
  );
};

export default BatchForm;
