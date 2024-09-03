import React from 'react';
import { Modal, Box, Typography, IconButton, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface Report {
  day: string;
  course: string;
  timeTaken: string;
  status: string;
  keyLearnings: string;
  planForTomorrow: string;
}

interface ReportModalComponentProps {
  open: boolean;
  onClose: () => void;
  report: Report;
  onPrevious: () => void;
  onNext: () => void;
}

const ReportModalComponent: React.FC<ReportModalComponentProps> = ({
  open,
  onClose,
  report,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: 4,
          width: 800,
          position: 'relative',
          maxHeight: '80vh',
          overflowY: 'auto',
          boxSizing: 'border-box', // Ensures padding doesn't affect width
        }}
      >
        <IconButton
          onClick={onClose}
          aria-label="Close"
          sx={{ position: 'absolute', top: 1, right: 1, color: 'red' }}
        >
          <CloseIcon />
        </IconButton>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2, p: 2 }}>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, textAlign: 'center', textTransform: 'uppercase' }}
          >
            {report.course}
          </Typography>
        </Stack>
        <Box
          sx={{
            backgroundColor: '#D5CBEC',
            padding: 2,
            borderRadius: 2,
            width: '100%',
            boxSizing: 'border-box', // Ensure padding doesn't affect width
          }}
        >
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="h6"
              sx={{
                backgroundColor: '#D5CBEC',
                padding: 1,
                color: 'black',
                textAlign: 'center',
                borderRadius: 0,
              }}
            >
              Key Learnings
            </Typography>
            <Typography
              sx={{
                backgroundColor: 'white',
                padding: 2,
                borderRadius: 4,
                textAlign: 'center',
                border: '1px solid lightgray', // Border for key learnings text
                mt: 1,
                fontSize: '0.875rem', // Reduced font size
              }}
            >
              {report.keyLearnings}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{
                backgroundColor: '#D5CBEC',
                padding: 1,
                color: 'black',
                textAlign: 'center',
                borderRadius: 0,
              }}
            >
              Plan for Tomorrow
            </Typography>
            <Typography
              sx={{
                backgroundColor: 'white',
                padding: 2,
                borderRadius: 4,
                textAlign: 'center',
                border: '1px solid lightgray', // Border for plan for tomorrow text
                mt: 1,
                fontSize: '0.875rem', // Reduced font size
              }}
            >
              {report.planForTomorrow}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ReportModalComponent;
