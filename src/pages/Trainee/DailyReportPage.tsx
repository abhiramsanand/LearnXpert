import React, { useState } from 'react';
import DatePicker from '../../components/Trainee/DailyReport/DatePicker';
import ReportTable from '../../components/Trainee/DailyReport/ReportTable';
import Buttons from '../../components/Trainee/DailyReport/Button';
import data from '../../components/Trainee/DailyReport/data.json';
import PendingSubmissionsModal from '../../components/Trainee/DailyReport/PendingSubmissionsModal';
import TrackingForm from '../../components/Trainee/DailyReport/TrackingForm'; // Import TrackingForm
import { Container, Box, Typography, Button } from '@mui/material';
import TraineeHeader from '../../shared components/TraineeHeader';

const DailyReport: React.FC = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [reportData, setReportData] = useState(data.report);
  const [modalOpen, setModalOpen] = useState(false);
  const [trackingFormOpen, setTrackingFormOpen] = useState(false); // State for TrackingForm

  const handlePendingSubmissionsClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOpenTrackingForm = () => {
    setTrackingFormOpen(true);
  };

  const handleCloseTrackingForm = () => {
    setTrackingFormOpen(false);
  };

  return (
    <>
      <TraineeHeader title={'Daily Report'} />
      <Container >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography mt={2} variant="h6">
            <DatePicker date={date} setDate={setDate} />
          </Typography>
          <Buttons onPendingSubmissionsClick={handlePendingSubmissionsClick} />
        </Box>

        <ReportTable reportData={reportData} />
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            variant="contained"
            color="primary"
            sx={{ backgroundColor: '#8A2BE2', color: '#fff', borderRadius: '50%', minWidth: 50, minHeight: 50 }}
            onClick={handleOpenTrackingForm} // Open TrackingForm on click
          >
            +
          </Button>
        </Box>
        <Box display="flex" justifyContent="center" mt={1} />
        <PendingSubmissionsModal open={modalOpen} onClose={handleCloseModal} data={data.pendingSubmissions} />
        <TrackingForm open={trackingFormOpen} onClose={handleCloseTrackingForm} /> {/* Render TrackingForm */}
      </Container>
    </>
  );
};

export default DailyReport;
