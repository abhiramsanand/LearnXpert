import React from 'react';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
    Box
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Define your data type
interface Report {
    day: string;
    course: string;
    timeTaken: string;
    keyLearnings: string;
    planForTomorrow: string;
    status: string;
}

interface FilterComponentProps {
    reportType: string;
    setReportType: (value: string) => void;
    reportStatus: string;
    setReportStatus: (value: string) => void;
    reports: Report[];
    setFilteredReports: (reports: Report[]) => void;
}

const CustomFormControl = styled(FormControl)(({ theme }) => ({
    minWidth: 150,
    margin: theme.spacing(1),
    '& .MuiInputLabel-root': {
        color:'#8518FF',
    },
    '& .MuiSelect-root': {
        backgroundColor: '#8518FF',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor:  '#8518FF',
        },
        '&:hover fieldset': {
            borderColor:  '#8518FF',
        },
        '&.Mui-focused fieldset': {
            borderColor:  '#8518FF',
        },
    },
}));

const FilterComponent: React.FC<FilterComponentProps> = ({
    reportType,
    setReportType,
    reportStatus,
    setReportStatus,
    reports,
    setFilteredReports
}) => {

    const handleReportTypeChange = (event: SelectChangeEvent<string>) => {
        const selectedType = event.target.value as string;
        setReportType(selectedType);
        filterReports(selectedType, reportStatus);
    };

    const handleReportStatusChange = (event: SelectChangeEvent<string>) => {
        const selectedStatus = event.target.value as string;
        setReportStatus(selectedStatus);
        filterReports(reportType, selectedStatus);
    };

    const filterReports = (type: string, status: string) => {
        let filtered = reports;
        if (type !== 'all') {
            filtered = filtered.filter(report => report.course === type);
        }
        if (status !== 'all') {
            filtered = filtered.filter(report => report.status === status);
        }
        setFilteredReports(filtered);
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mb: 2 }}>
            <CustomFormControl variant="outlined">
                <InputLabel>Course Type</InputLabel>
                <Select value={reportType} onChange={handleReportTypeChange} label="Course Type">
                    <MenuItem value="all">All Courses</MenuItem>
                    <MenuItem value="React">React</MenuItem>
                    <MenuItem value="TypeScript">TypeScript</MenuItem>
                    <MenuItem value="JavaScript">JavaScript</MenuItem>
                    <MenuItem value="HTML & CSS">HTML & CSS</MenuItem>
                    <MenuItem value="Node.js">Node.js</MenuItem>
                    <MenuItem value="Database">Database</MenuItem>
                    <MenuItem value="DevOps">DevOps</MenuItem>
                </Select>
            </CustomFormControl>
            <CustomFormControl variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select value={reportStatus} onChange={handleReportStatusChange} label="Status">
                    <MenuItem value="all">All Statuses</MenuItem>
                    <MenuItem value="submitted">Submitted</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                </Select>
            </CustomFormControl>
        </Box>
    );
};

export default FilterComponent;
