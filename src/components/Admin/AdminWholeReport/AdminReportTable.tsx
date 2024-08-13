import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Filters from './Filters'; // Import the Filters component
import { SelectChangeEvent } from '@mui/material';

interface Report {
  name: string;
  day: string;
  course: string;
  timeTaken: string;
  keyLearnings: string;
  planForTomorrow: string;
  status: string;
}

const AdminReportTable: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [selectedName, setSelectedName] = useState<string>('');
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  useEffect(() => {
    fetch('/AdminWholereport.json')
      .then((response) => response.json())
      .then((data) => {
        setReports(data.reports);
        setFilteredReports(data.reports);
      })
      .catch((error) => console.error('Error fetching reports:', error));
  }, []);

  useEffect(() => {
    filterReports();
  }, [selectedName, selectedDay, selectedStatus]);

  const filterReports = () => {
    let filtered = reports;

    if (selectedName) {
      filtered = filtered.filter((report) => report.name === selectedName);
    }
    if (selectedDay) {
      filtered = filtered.filter((report) => report.day === selectedDay);
    }
    if (selectedStatus) {
      filtered = filtered.filter((report) => report.status === selectedStatus);
    }

    setFilteredReports(filtered);
  };

  const handleNameChange = (event: SelectChangeEvent<string>) => {
    setSelectedName(event.target.value as string);
  };

  const handleDayChange = (event: SelectChangeEvent<string>) => {
    setSelectedDay(event.target.value as string);
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setSelectedStatus(event.target.value as string);
  };

  return (
    <Box sx={{ padding: '16px' }}>
      
      <Filters
        names={[...new Set(reports.map((report) => report.name))]}
        days={[...new Set(reports.map((report) => report.day))]}
        statuses={[...new Set(reports.map((report) => report.status))]}
        selectedName={selectedName}
        selectedDay={selectedDay}
        selectedStatus={selectedStatus}
        onNameChange={handleNameChange}
        onDayChange={handleDayChange}
        onStatusChange={handleStatusChange}
      />
      <TableContainer component={Paper}sx={{ maxHeight: '320px', overflow: 'auto','&::-webkit-scrollbar': {
        width: '6px',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#8518FF',
        borderRadius: '8px',
    },
    '&::-webkit-scrollbar-track': {
        backgroundColor: 'white',
        borderRadius: '8px',
    }, }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Day</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Time Taken</TableCell>
              <TableCell>Key Learnings</TableCell>
              <TableCell>Plan for Tomorrow</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredReports.map((report, index) => (
              <TableRow key={index}>
                <TableCell>{report.name}</TableCell>
                <TableCell>{report.day}</TableCell>
                <TableCell>{report.course}</TableCell>
                <TableCell>{report.timeTaken}</TableCell>
                <TableCell>{report.keyLearnings}</TableCell>
                <TableCell>{report.planForTomorrow}</TableCell>
                <TableCell>{report.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminReportTable;
