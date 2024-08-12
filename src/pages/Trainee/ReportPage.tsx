import React, { useEffect, useState } from 'react';
import { Grid, Box } from '@mui/material';
import SearchBar from '../../components/Trainee/Reports/SearchBar';
import SortBy from '../../components/Trainee/Reports/SortBy';
import ReportsTable from '../../components/Trainee/Reports/ReportsTable';
import { Report } from '../../components/Trainee/Reports/types';

const ReportPage: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    fetch('/WholeReport.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setReports(data.reports))
      .catch((error) => console.error('Error loading report data:', error));
  }, []);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const handleSortChange = (sortOrder: 'asc' | 'desc') => {
    setSortOrder(sortOrder);
  };

  const filteredReports = reports.filter((report) =>
    report.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedReports = [...filteredReports].sort((a, b) => {
    if (a.course < b.course) return sortOrder === 'asc' ? -1 : 1;
    if (a.course > b.course) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <Box sx={{ padding: '5px', height: '100vh', overflow: 'hidden' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ textAlign: 'right', marginBottom: '16px' }}>
          <SearchBar onSearch={handleSearch} />
          <SortBy onSortChange={handleSortChange} />
        </Grid>
        <Grid item xs={12}>
          <ReportsTable reports={sortedReports} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReportPage;
