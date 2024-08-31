import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Grid, TextField, Typography, MenuItem, Select, InputLabel, FormControl, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import axios from "axios";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import * as XLSX from 'xlsx';
import SuccessModal from "./SuccessModal";

const BatchForm: React.FC = () => {
    const navigate = useNavigate();
    const [batchName, setBatchName] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const [filePreview, setFilePreview] = useState<string | ArrayBuffer | null>(null);
    const [programs, setPrograms] = useState<string[]>([]);
    const [selectedProgram, setSelectedProgram] = useState<string>("");
    const [fileSelected, setFileSelected] = useState<boolean>(false);
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const [excelData, setExcelData] = useState<any[]>([]);

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/v1/programs");
                setPrograms(response.data.map((program: { programName: string }) => program.programName));
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

            // Create a FileReader to read the file
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target?.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: 'array' });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                setExcelData(json);
                setFilePreview(e.target?.result);
            };
            reader.readAsArrayBuffer(selectedFile);
        }
    };

    const handleSubmit = async () => {
        if (selectedProgram === '') {
            setErrorMessages(["Please select a program."]);
            return;
        }

        const formData = new FormData();
        const batchData = JSON.stringify({ batchName, startDate, endDate, programName: selectedProgram });
        formData.append("batchData", batchData);

        if (file) {
            formData.append("file", file);
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

    return (
        <Container
            sx={{
                maxHeight: "calc(100vh - 64px)", // Adjust this value based on header/footer height
                overflowY: "auto",
                p: 2,
            }}
        >
            <Box
                sx={{
                    mt: 1,
                    p: 4,
                    bgcolor: "#ffffff",
                    borderRadius: "15px",
                    boxShadow: "4px 8px 10px rgba(0, 0, 0, 0.4)",
                    minHeight: "100vh", // Ensures content takes up at least full viewport height
                }}
            >
                <Typography variant="h4" fontFamily={"Montserrat, sans-serif"}>
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
                                        onChange={(e) => setSelectedProgram(e.target.value as string)}
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
                                            width: "100%",
                                            borderRadius: "4px",
                                        }
                                    }}
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
                                        width: "100%",
                                        borderRadius: "4px",
                                    }}
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
                                        width: "100%",
                                        borderRadius: "4px",
                                    }}
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
                                <a href="/BatchCreationTemplate.xlsx" download style={{ color: "#6C63FF" }}>
                                    here
                                </a>
                            </Typography>
                        </Grid>

                        {file && (
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="caption">Uploaded file:</Typography>
                                <Typography variant="body2">{file.name}</Typography>
                                {/* Display file preview if it's an image */}
                                {file.type.startsWith("image/") && (
                                    <img src={filePreview as string} alt="File preview" style={{ maxWidth: "100%", maxHeight: "300px", marginTop: "10px" }} />
                                )}
                                {/* Display Excel data if the file is an Excel file */}
                                {file.type.includes("sheet") && (
                                    <Box sx={{ mt: 2 }}>
                                        <Typography variant="h6">Excel File Content:</Typography>
                                        <table>
                                            <thead>
                                                <tr>
                                                    {excelData[0]?.map((header: string, index: number) => (
                                                        <th key={index}>{header}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {excelData.slice(1).map((row: any[], rowIndex: number) => (
                                                    <tr key={rowIndex}>
                                                        {row.map((cell, cellIndex) => (
                                                            <td key={cellIndex}>{cell}</td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </Box>
                                )}
                            </Box>
                        )}

                        {errorMessages.length > 0 && (
                            <Box sx={{ mb: 2 }}>
                                {errorMessages.map((message, index) => (
                                    <Typography key={index} color="error">{message}</Typography>
                                ))}
                            </Box>
                        )}

                        <Grid item xs={12} sm={6}>
                            <Button
                                variant="outlined"
                                sx={{
                                    color: "#8061C3",
                                    borderColor: "#8061C3",
                                    borderRadius: "4px",
                                    height: "36px",
                                    width: "90px",
                                    fontSize: "16px",
                                    marginRight: "26px",
                                    "&:hover": {
                                        borderColor: "#D0C7FF",
                                        bgcolor: "white",
                                    },
                                }}
                                onClick={() => navigate(-1)} 
                            >
                                CANCEL
                            </Button>

                            <Button
                                variant="contained"
                                sx={{
                                    bgcolor: "#8061C3",
                                    color: "#FFFFFF",
                                    borderRadius: "4px",
                                    height: "36px",
                                    width: "90px",
                                    fontSize: "16px",
                                    "&:hover": {
                                        bgcolor: "#D0C7FF",
                                    },
                                }}
                                onClick={handleSubmit}
                            >
                                SUBMIT
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>

            <SuccessModal 
                open={successModalOpen} 
                onClose={handleCloseSuccessModal} 
                message={successMessage || "Batch created successfully!"} 
            />
        </Container>
    );
};



export default BatchForm;
