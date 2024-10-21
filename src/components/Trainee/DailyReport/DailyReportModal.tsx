/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  Button,
  IconButton,
  Grid,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface DailyReportModalProps {
  open: boolean;
  handleClose: () => void;
  courseName: string;
  courseDetails: any;
  setCourseDetails: (newDetails: any) => void;
  traineeId: number;
  courseId: number;
}

const DailyReportModal: React.FC<DailyReportModalProps> = ({
  open,
  handleClose,
  courseName,
  courseDetails,
  setCourseDetails,
  traineeId,
  courseId,
}) => {
  const totalMinutes = courseDetails?.timeTaken || 0;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const handleFieldChange = (field: string, value: any) => {
    setCourseDetails((prevDetails: any) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const handleHoursChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newHours = parseInt(event.target.value, 10);
    if (!isNaN(newHours)) {
      const updatedTotalMinutes = newHours * 60 + minutes;
      handleFieldChange('timeTaken', updatedTotalMinutes);
    }
  };

  const handleMinutesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMinutes = parseInt(event.target.value, 10);
    if (!isNaN(newMinutes)) {
      const updatedTotalMinutes = hours * 60 + newMinutes;
      handleFieldChange('timeTaken', updatedTotalMinutes);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `https://ilpex-backend.onrender.com/api/v1/dailyreport/updateDetails?traineeId=${traineeId}&courseId=${courseId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            timeTaken: courseDetails.timeTaken,
            keyLearnings: courseDetails.keylearnings,
            planForTomorrow: courseDetails.planfortomorrow,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update the report');
      }

      handleClose();
    } catch (error) {
      console.error('Error submitting report:', error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        style: {
          borderRadius: '15px',
          padding: '0px',
          border: '3px solid #3A3AFF',
          overflow: 'hidden',
        },
      }}
    >
      <Box>
        <DialogTitle sx={{ p: 1 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Daily Report
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon sx={{ color: '#8061C3' }} />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ p: 4 }}>
          <Box component="form" display="flex" flexDirection="column" gap={1}>
            <TextField
              label="Course"
              value={courseName}
              variant="outlined"
              fullWidth
              sx={{ mt:1 }}
              InputProps={{
                readOnly: true,
                sx: {
                  borderRadius: '10px',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#8061C3',
                  },
                },
              }}
            />
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={6}>
                <Typography variant="body2" textAlign="center" sx={{ fontWeight: 'bold' }}>
                  Hours Of Learning
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  type="number"
                  value={hours}
                  variant="outlined"
                  inputProps={{ min: 0, style: { textAlign: 'center' } }}
                  fullWidth
                  InputProps={{
                    sx: {
                      borderRadius: '10px',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#8061C3',
                      },
                    },
                  }}
                  onChange={handleHoursChange}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  type="number"
                  value={minutes}
                  variant="outlined"
                  inputProps={{ min: 0, style: { textAlign: 'center' } }}
                  fullWidth
                  InputProps={{
                    sx: {
                      borderRadius: '10px',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#8061C3',
                      },
                    },
                  }}
                  onChange={handleMinutesChange}
                />
              </Grid>
              <Grid item xs={6}></Grid>
              <Grid item xs={3}>
                <Typography variant="caption" textAlign="center" display="block">
                  HOURS
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="caption" textAlign="center" display="block">
                  MINUTES
                </Typography>
              </Grid>
            </Grid>
            <TextField
              label="Key Learnings"
              placeholder="key learnings..."
              value={courseDetails?.keylearnings || ''}
              onChange={(e) => handleFieldChange('keylearnings', e.target.value)}
              variant="outlined"
              fullWidth
              multiline
              minRows={2}
              InputProps={{
                sx: {
                  borderRadius: '10px',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#3A3AFF',
                  },
                },
              }}
            />
            <TextField
              label="Plan For Tomorrow"
              placeholder="plan for tomorrow..."
              value={courseDetails?.planfortomorrow || ''}
              onChange={(e) => handleFieldChange('planfortomorrow', e.target.value)}
              variant="outlined"
              fullWidth
              multiline
              minRows={2}
              InputProps={{
                sx: {
                  borderRadius: '10px',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#3A3AFF',
                  },
                },
              }}
            />
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#8061C3',
                color: '#fff',
                textTransform: 'none',
                borderRadius: '10px',
                height: '45px',
                fontSize: '16px',
                fontWeight: 'bold',
                mt: 1,
              }}
              onClick={handleSubmit}
            >
              SUBMIT
            </Button>
          </Box>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default DailyReportModal;
