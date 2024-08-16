import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Autocomplete, TextField } from '@mui/material';
import ReportsTableComponent from '../../components/Admin/WholeReportNameWise/ReportsTableComponent';
import BackButtonComponent from '../../components/Admin/WholeReportNameWise/BackButtonComponent';

interface Report {
  day: string;
  course: string;
  timeTaken: string;
  status: string;
  keyLearnings: string;
  planForTomorrow: string;
}

interface Student {
  name: string;
  reports: Report[];
}

const AdminWholeReportPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  useEffect(() => {
    fetch('/WholeReportMultipleStudent.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setStudents(data.students); // Adjust if your JSON structure is different
        setFilteredReports(data.reports); // This might be replaced with student-specific data
      })
      .catch((error) => console.error('Error loading reports:', error));
  }, []);

  const handleStudentChange = (event: any, newValue: Student | null) => {
    setSelectedStudent(newValue);
    if (newValue) {
      setFilteredReports(newValue.reports);
    } else {
      setFilteredReports([]);
    }
  };

  return (
    <Container>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
        <BackButtonComponent /> {/* Move the button slightly to the left */}
        <Typography sx={{ ml: 1, fontWeight: 'bold', fontSize: '20px' }}>Report</Typography>
        <Box sx={{ display: 'flex', gap: 2, ml: 'auto', mt: 3 }}>
          <Autocomplete
            options={students}
            getOptionLabel={(option) => option.name}
            onChange={handleStudentChange}
            renderInput={(params) => <TextField {...params} label="Select Student" variant="outlined" />}
            sx={{ width: 300, height: 40 }}
          />
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}>
        <ReportsTableComponent reports={filteredReports} />
      </Box>
    </Container>
  );
};

export default AdminWholeReportPage;
