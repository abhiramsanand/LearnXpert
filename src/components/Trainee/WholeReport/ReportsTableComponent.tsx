import React, { useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, IconButton, Paper, Menu, MenuItem, TablePagination } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FilterListIcon from '@mui/icons-material/FilterList'; // Import filter icon
import ReportModalComponent from './ReportModalComponent';

interface Report {
  day: string;
  course: string;
  timeTaken: string;
  status: string;
  keyLearnings: string;
  planForTomorrow: string;
}

interface ReportsTableComponentProps {
  reports: Report[];
}

const ReportsTableComponent: React.FC<ReportsTableComponentProps> = ({ reports }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedReportIndex, setSelectedReportIndex] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const handleViewReport = (index: number) => {
    setSelectedReportIndex(index);
  };

  const handlePrevious = () => {
    if (selectedReportIndex !== null && selectedReportIndex > 0) {
      setSelectedReportIndex(selectedReportIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedReportIndex !== null && selectedReportIndex < reports.length - 1) {
      setSelectedReportIndex(selectedReportIndex + 1);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = (status: string | null) => {
    setStatusFilter(status);
    setAnchorEl(null);
  };

  const filteredReports = statusFilter
    ? reports.filter(report => report.status === statusFilter)
    : reports;

  const displayedReports = filteredReports.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  return (
    <Paper sx={{ overflow: 'auto', maxHeight: 400, display: 'flex', flexDirection: 'column' }}>
      <Table sx={{ minWidth: 650, borderCollapse: 'separate', borderSpacing: '0 5px' }}>
        <TableHead>
          <TableRow sx={{ height: 48 }}>
            <TableCell sx={{ padding: '4px 8px',fontWeight:'bold' }}>Day</TableCell>
            <TableCell sx={{ padding: '4px 8px',fontWeight:'bold' }}>Course</TableCell>
            <TableCell sx={{ padding: '4px 8px',fontWeight:'bold' }}>Time Taken</TableCell>
            <TableCell sx={{ padding: '4px 8px',fontWeight:'bold' }}>
              Status
              <IconButton onClick={handleFilterClick} size="small">
                <FilterListIcon />
              </IconButton>
            </TableCell>
            <TableCell sx={{ padding: '4px 8px',fontWeight:'bold' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedReports.map((report, index) => (
            <TableRow
              key={index}
              sx={{
                height: 48,
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Add shadow effect to rows
                '&:not(:last-child)': {
                  marginBottom: '1px', // Add space between rows
                }
              }}
            >
              <TableCell sx={{ padding: '4px 8px' }}>{report.day}</TableCell>
              <TableCell sx={{ padding: '4px 8px' }}>{report.course}</TableCell>
              <TableCell sx={{ padding: '4px 8px' }}>{report.timeTaken}</TableCell>
              <TableCell
                sx={{
                  padding: '4px 8px',
                  color: report.status === 'submitted' ? 'green' : (report.status === 'pending' ? 'red' : 'inherit'),
                }}
              >
                {report.status}
              </TableCell>
              <TableCell sx={{ padding: '4px 8px' }}>
                <IconButton onClick={() => handleViewReport(index)}>
                  <VisibilityIcon sx={{ color: 'blue' }} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredReports.length}
        rowsPerPage={itemsPerPage}
        page={currentPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          alignSelf: 'center',
          border:'none',
          '& .MuiTablePagination-select': {
            border: 'none', // Remove border from rows per page select
          },
          '& .MuiTablePagination-actions': {
            border: 'none', // Remove border from pagination actions
          },
          '& .MuiTablePagination-spacer': {
            display: 'none', // Hide any spacers if needed
          }
        }}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => handleFilterClose('pending')}>Pending</MenuItem>
        <MenuItem onClick={() => handleFilterClose('submitted')}>Submitted</MenuItem>
        <MenuItem onClick={() => handleFilterClose(null)}>All</MenuItem>
      </Menu>
      {selectedReportIndex !== null && (
        <ReportModalComponent
          open={selectedReportIndex !== null}
          onClose={() => setSelectedReportIndex(null)}
          report={filteredReports[selectedReportIndex]}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      )}
    </Paper>
  );
};

export default ReportsTableComponent;
