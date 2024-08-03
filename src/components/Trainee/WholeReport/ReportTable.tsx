import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Box
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FilterComponent from './FilterComponent'; // Adjust the path as needed

// Define your data type
interface Report {
    day: string;
    course: string;
    timeTaken: string;
    keyLearnings: string;
    planForTomorrow: string;
    status: string;
}

// Define styled components
const CustomTableContainer = styled(Box)(({ theme }) => ({
    maxHeight: 300,
    overflowY: 'auto',
    width: '100%',
    marginBottom: theme.spacing(2),
    backgroundColor: '#E6E6FA', 
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', 
    border: `1px solid #E6E6FA`,
    borderRadius: '10px',
    '&::-webkit-scrollbar': {
        width: '6px',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#8518FF',
        borderRadius: '8px',
    },
    '&::-webkit-scrollbar-track': {
        backgroundColor: 'white',
        borderRadius: '8px',
    },
    [theme.breakpoints.down('sm')]: {
        maxHeight: 300,
        fontSize: '0.75rem',
    },
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
    '& th': {
        fontSize: '1rem',
        padding: theme.spacing(1),
        backgroundColor: '#E6E6FA', 
        color: 'black',
        borderBottom: `2px solid #E6E6FA`,
        textAlign: 'left', // Center-align the text in header cells
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.75rem',
            padding: theme.spacing(0.5),
        },
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '& td': {
        border: 'none',
        fontSize: '0.9rem',
        padding: theme.spacing(1),
        backgroundColor: '#E6E6FA', // Set the background color to #E6E6FA
        textAlign: 'left', // Center-align the text in body cells
        transition: 'background-color 0.3s ease', // Add transition for hover effect
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.7rem',
            padding: theme.spacing(0.5),
        },
    },
    '&:nth-of-type(odd)': {
        backgroundColor: '#f0f0f0', // Add alternating row colors
    },
    '&:nth-of-type(even)': {
        backgroundColor: '#f9f9f9', // Add alternating row colors
    },
    '&:hover': {
        backgroundColor: 'red', // Add hover effect
        cursor: 'pointer', // Change cursor to pointer on hover
    },
}));


const ReportTable: React.FC = () => {
    const [reports, setReports] = useState<Report[]>([]);
    const [filteredReports, setFilteredReports] = useState<Report[]>([]);
    const [reportType, setReportType] = useState<string>('all');
    const [reportStatus, setReportStatus] = useState<string>('all');

    useEffect(() => {
        // Fetch reports from a JSON file or API
        fetch('/WholeReport.json') // Update the path to your JSON file
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setReports(data.reports);
                setFilteredReports(data.reports); // Initialize filteredReports with all data
            })
            .catch((error) => console.error('Error loading JSON data:', error));
    }, []);

    return (
        <div>
            <FilterComponent
                reportType={reportType}
                setReportType={setReportType}
                reportStatus={reportStatus}
                setReportStatus={setReportStatus}
                reports={reports}
                setFilteredReports={setFilteredReports}
            />
            <CustomTableContainer component={Paper}>
                <Table stickyHeader size="small">
                    <StyledTableHead>
                        <TableRow>
                            <TableCell>Day</TableCell>
                            <TableCell>Course</TableCell>
                            <TableCell>Time Taken</TableCell>
                            <TableCell>Key Learnings</TableCell>
                            <TableCell>Plan for Tomorrow</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </StyledTableHead>
                    <TableBody>
                        {filteredReports.map((report, index) => (
                            <StyledTableRow key={index}>
                                <TableCell>{report.day}</TableCell>
                                <TableCell>{report.course}</TableCell>
                                <TableCell>{report.timeTaken}</TableCell>
                                <TableCell>{report.keyLearnings}</TableCell>
                                <TableCell>{report.planForTomorrow}</TableCell>
                                <TableCell>{report.status}</TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </CustomTableContainer>
        </div>
    );
};

export default ReportTable;
