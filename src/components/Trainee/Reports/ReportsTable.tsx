import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Box } from '@mui/material';
import { Report } from './types';

interface ReportsTableProps {
  reports: Report[];
}

const ReportsTable: React.FC<ReportsTableProps> = ({ reports }) => {
  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Handle page change
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to 0 on rows per page change
  };

  // Get current page data
  const paginatedReports = reports.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Day</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Time Taken</TableCell>
              <TableCell>Key Learnings</TableCell>
              <TableCell>Plan For Tomorrow</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedReports.map((report, index) => (
              <TableRow key={index}>
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
      {/* Pagination controls outside the table */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '4px' }}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]} // Options for rows per page
          component="div"
          count={reports.length} // Total number of rows
          rowsPerPage={rowsPerPage} // Current rows per page
          page={page} // Current page
          onPageChange={handleChangePage} // Handle page change
          onRowsPerPageChange={handleChangeRowsPerPage} // Handle rows per page change
        />
      </Box>
    </Paper>
  );
};

export default ReportsTable;
