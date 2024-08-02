import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, Box } from '@mui/material';

interface TrackingFormProps {
  open: boolean;
  onClose: () => void;
}

const TrackingForm: React.FC<TrackingFormProps> = ({ open, onClose }) => {
  const [course, setCourse] = useState('Agile Methodology');
  const [date, setDate] = useState('2024-10-20');
  const [hours, setHours] = useState('2 hr 30 min');
  const [takeaways, setTakeaways] = useState('');
  const [plan, setPlan] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>E-Learning Tracking Sheet</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2} sx={{ backgroundColor: '#F3E5F5', padding: 2 }}>
          <TextField
            label="Course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            variant="outlined"
            fullWidth
            disabled
          />
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Hours of Learning"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Key Takeaways"
            value={takeaways}
            onChange={(e) => setTakeaways(e.target.value)}
            variant="outlined"
            fullWidth
            multiline
            rows={4}
          />
          <TextField
            label="Plan for Tomorrow"
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            variant="outlined"
            fullWidth
            multiline
            rows={4}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ backgroundColor: '#8A2BE2', color: '#fff' }}>
            Submit
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default TrackingForm;
