import React, { useState, useEffect } from 'react';
import { Container, Box, Typography } from '@mui/material';

import SearchBarComponent from '../../components/Trainee/WholeReport/SearchBarComponent';
import SortByComponent from '../../components/Trainee/WholeReport/SortByComponent';
import ReportsTableComponent from '../../components/Trainee/WholeReport/ReportsTableComponent';
import BackButtonComponent from '../../components/Trainee/WholeReport/BackButtonComponent';
import StudentSearchComponent from '../../components/Admin/WholeReportNameWise/StudentSearchComponent';

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

const AdminReportPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<string>('');

  useEffect(() => {
    fetch('/WholeReportMultipleStudent.json') // Adjust path as needed
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setStudents(data.students);
        // Optionally, set the default student and their reports
        if (data.students.length > 0) {
          setSelectedStudent(data.students[0].name);
          setFilteredReports(data.students[0].reports);
        }
      })
      .catch((error) => console.error('Error loading students:', error));
  }, []);

  const handleStudentSelect = (studentName: string) => {
    setSelectedStudent(studentName);
    const selected = students.find(student => student.name === studentName);
    if (selected) {
      setFilteredReports(selected.reports);
    }
  };

  const handleSearch = (searchValue: string) => {
    setFilteredReports(
      students
        .find(student => student.name === selectedStudent)?.reports
        .filter((report) =>
          report.course.toLowerCase().includes(searchValue.toLowerCase())
        ) || []
    );
  };

  const handleSortChange = (sortBy: keyof Report) => {
    const sortedReports = [...filteredReports].sort((a, b) =>
      a[sortBy].localeCompare(b[sortBy])
    );
    setFilteredReports(sortedReports);
  };

  return (
    <Container>
      <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
        <BackButtonComponent /> {/* Move the button slightly to the left */}

        <Box sx={{ ml: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold',fontSize: '1.25rem' }}>Daily Report</Typography>
          <Typography variant="h6" sx={{ mt: 1, color: 'textSecondary' }}>
            {selectedStudent || 'No student selected'}
          </Typography>
        
        </Box>
        <Box sx={{ display: 'flex', gap: 1, ml: 'auto', mt: 1 }}>
        <StudentSearchComponent students={students} onStudentSelect={handleStudentSelect}   />
          <SearchBarComponent
            onSearch={handleSearch}
            sx={{ width: 300, height: 20 }}
            // Set placeholder with selected student's name
          />
          <SortByComponent onSortChange={handleSortChange} sx={{ width: 50, height: 40 }} />
        </Box>
      </Box>
      <Box sx={{ mt: 2 }}>
        <ReportsTableComponent reports={filteredReports} />
      </Box>
    </Container>
  );
};

export default AdminReportPage;
