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
  courseDetails: any;
 
}
 
const DailyReportModal: React.FC<DailyReportModalProps> = ({ open, handleClose, courseDetails }) => {
  const totalMinutes = courseDetails?.timeTaken || 0; // Assume totalMinutes is a property in courseDetails
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
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
              placeholder="course name..."
              value={courseDetails?.courseName || ""} // Use optional chaining
              variant="outlined"
              fullWidth
              InputProps={{
                sx: {
                  borderRadius: '10px',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#8061C3',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#8061C3',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#8061C3',
                  },
                },
              }}
            />
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={6}>
                <Typography variant="body2" textAlign="center" sx={{ fontWeight: 'bold' }}>
                  Hours Of Learning
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  type="number"
                  value={hours||1}
                  variant="outlined"
                  inputProps={{ min: 0, style: { textAlign: 'center' } }}
                  fullWidth
                  InputProps={{
                    sx: {
                      borderRadius: '10px',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#8061C3',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#8061C3',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#8061C3',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  type="number"
                  value={minutes||0}                  variant="outlined"
                  inputProps={{ min: 0, style: { textAlign: 'center' } }}
                  fullWidth
                  InputProps={{
                    sx: {
                      borderRadius: '10px',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#8061C3',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#8061C3',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#8061C3',
                      },
                    },
                  }}
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
              value={courseDetails?.keylearnings || ""}
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
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#3A3AFF',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#3A3AFF',
                  },
                },
              }}
            />
            <TextField
              label="Plan For Tomorrow"
              placeholder="plan for tomorrow..."
              value={courseDetails?.planfortomorrow || ""}
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
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#3A3AFF',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
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