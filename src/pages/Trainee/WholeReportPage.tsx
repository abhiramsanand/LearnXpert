import React, { useState, useEffect } from 'react';
import { Container, Box, Typography } from '@mui/material';

import SearchBarComponent from '../../components/Trainee/WholeReport/SearchBarComponent';
import SortByComponent from '../../components/Trainee/WholeReport/SortByComponent';
import ReportsTableComponent from '../../components/Trainee/WholeReport/ReportsTableComponent';
import BackButtonComponent from '../../components/Trainee/WholeReport/BackButtonComponent';

interface Report {
  day: string;
  course: string;
  timeTaken: string;
  status: string;
  keyLearnings: string;
  planForTomorrow: string;
}

const WholeReportPageComponent: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);

  useEffect(() => {
    fetch('/WholeReport.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setReports(data.reports); // Adjust if your JSON structure is different
        setFilteredReports(data.reports);
      })
      .catch((error) => console.error('Error loading reports:', error));
  }, []);

  const handleSearch = (searchValue: string) => {
    setFilteredReports(
      reports.filter((report) =>
        report.course.toLowerCase().includes(searchValue.toLowerCase())
      )
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
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
        <BackButtonComponent  /> {/* Move the button slightly to the left */}
        <Typography sx={{ ml: 1, fontWeight: 'bold', fontSize: '20px' }}>Report</Typography>
        <Box sx={{ display: 'flex', gap: 2, ml: 'auto' }}>
          <SearchBarComponent onSearch={handleSearch} sx={{ width: 300, height: 40 }} />
          <SortByComponent onSortChange={handleSortChange} sx={{ width: 50, height: 40 }} />
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}>
        <ReportsTableComponent reports={filteredReports} />
      </Box>
    </Container>
  );
};

export default WholeReportPageComponent;
