import React, { useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, IconButton, Paper, Menu, MenuItem, TablePagination } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FilterListIcon from '@mui/icons-material/FilterList';
import ReportModalComponent from './ReportModalComponent';
import axios from 'axios';

interface Report {
  day: string;
  course: string;
  timeTaken: string;
  status: string;
  keyLearnings: string;
  planForTomorrow: string;
  dailyReportId: number;  // Include dailyReportId for fetching detailed report
}

interface ReportsTableComponentProps {
  reports: Report[];
}

const ReportsTableComponent: React.FC<ReportsTableComponentProps> = ({ reports }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedReportId, setSelectedReportId] = useState<number | null>(null);  // Use dailyReportId instead of index
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [reportDetails, setReportDetails] = useState<Report | null>(null); // State to hold detailed report data

  // Function to fetch detailed report data when the "eye" icon is clicked
  const handleViewReport = async (dailyReportId: number) => {
    try {
      const response = await axios.get(
        `https://ilpex-backend.onrender.com/api/v1/dailyreport/editDetails?dailyReportId=${dailyReportId}`
      );

      const { keylearnings, planfortomorrow } = response.data;

      const updatedReport = reports.find(report => report.dailyReportId === dailyReportId);
      if (!updatedReport) return;

      const detailedReport = {
        ...updatedReport,
        keyLearnings: keylearnings,
        planForTomorrow: planfortomorrow,
      };

      setSelectedReportId(dailyReportId);
      setReportDetails(detailedReport);
    } catch (error) {
      console.error("Error fetching detailed report data:", error);
    }
  };

  const handlePrevious = () => {
    if (reportDetails && selectedReportId !== null) {
      const currentIndex = reports.findIndex(report => report.dailyReportId === selectedReportId);
      if (currentIndex > 0) {
        handleViewReport(reports[currentIndex - 1].dailyReportId);
      }
    }
  };

  const handleNext = () => {
    if (reportDetails && selectedReportId !== null) {
      const currentIndex = reports.findIndex(report => report.dailyReportId === selectedReportId);
      if (currentIndex < reports.length - 1) {
        handleViewReport(reports[currentIndex + 1].dailyReportId);
      }
    }
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
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
    ? reports.filter((report) => report.status === statusFilter)
    : reports;

  const displayedReports = filteredReports.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  return (
    <Paper sx={{ overflow: 'auto', maxHeight: 400, display: 'flex', flexDirection: 'column', mt: "-10px" }}>
      <Table sx={{ minWidth: 650, borderCollapse: 'separate', borderSpacing: '0 5px' }}>
        <TableHead>
          <TableRow sx={{ height: 48 }}>
            <TableCell sx={{ padding: '4px 8px', fontWeight: 'bold' }}>Day</TableCell>
            <TableCell sx={{ padding: '4px 8px', fontWeight: 'bold' }}>Course</TableCell>
            <TableCell sx={{ padding: '4px 8px', fontWeight: 'bold', whiteSpace: "nowrap" }}>Time Taken</TableCell>
            <TableCell sx={{ padding: '4px 8px', fontWeight: 'bold', whiteSpace: "nowrap" }}>
              Status
              <IconButton onClick={handleFilterClick} size="small">
                <FilterListIcon />
              </IconButton>
            </TableCell>
            <TableCell sx={{ padding: '4px 8px', fontWeight: 'bold' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedReports.map((report) => (
            <TableRow
              key={report.dailyReportId}
              sx={{
                height: 48,
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', 
                '&:not(:last-child)': {
                  marginBottom: '1px',
                },
              }}
            >
              <TableCell sx={{ padding: '4px 8px', whiteSpace: "nowrap" }}>{report.day}</TableCell>
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
                <IconButton onClick={() => handleViewReport(report.dailyReportId)}>
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
          border: 'none',
          '& .MuiTablePagination-select': {
            border: 'none',
          },
          '& .MuiTablePagination-actions': {
            border: 'none',
          },
          '& .MuiTablePagination-spacer': {
            display: 'none',
          },
        }}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => handleFilterClose('pending')}>Pending</MenuItem>
        <MenuItem onClick={() => handleFilterClose('completed')}>Completed</MenuItem>
        <MenuItem onClick={() => handleFilterClose(null)}>All</MenuItem>
      </Menu>
      {selectedReportId !== null && reportDetails && (
        <ReportModalComponent
          open={selectedReportId !== null}
          onClose={() => setSelectedReportId(null)}
          report={reportDetails}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      )}
    </Paper>
  );
};

export default ReportsTableComponent;
