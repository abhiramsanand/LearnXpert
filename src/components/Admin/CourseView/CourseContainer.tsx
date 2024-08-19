import React, { useState, useEffect } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Grid, LinearProgress, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CourseDetails from './CourseDetails';

const CourseContainer = () => {
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [batchData, setBatchData] = useState<any>(null);
  const [daysData, setDaysData] = useState<any>(null);

  useEffect(() => {
    fetch('/AdminCourse.json')
      .then((response) => response.json())
      .then((data) => {
        setBatchData(data);
        if (selectedBatch) {
          setDaysData(data[selectedBatch]);
        }
      })
      .catch((error) => console.error('Error fetching the JSON data:', error));
  }, [selectedBatch]);

  const handleBatchChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const batch = event.target.value as string;
    setSelectedBatch(batch);
    setDaysData(batchData ? batchData[batch] : null);
    setSelectedDay(null); // Reset selected day when batch changes
  };

  const days = daysData ? Object.keys(daysData) : [];

  const calculateTotalProgress = (day: string): number => {
    if (!daysData) return 0;

    const dayData = daysData[day];
    if (!dayData || dayData.sessions.length === 0) return 0;

    // Assuming each session's completion is known, adjust accordingly
    return 100; // Placeholder for total progress calculation
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <FormControl fullWidth sx={{ marginBottom: '20px' }}>
        <InputLabel id="batch-select-label">Select Batch</InputLabel>
        <Select
          labelId="batch-select-label"
          value={selectedBatch || ''}
          onChange={handleBatchChange}
          displayEmpty
        >
          <MenuItem value="" disabled>Select Batch</MenuItem>
          {batchData && Object.keys(batchData).map(batch => (
            <MenuItem key={batch} value={batch}>{batch}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedBatch && (
        <Box>
          {days.map((day) => (
            <Accordion
              key={day}
              expanded={selectedDay === day}
              onChange={() => setSelectedDay(selectedDay === day ? null : day)}
              sx={{ marginBottom: '8px' }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ backgroundColor: 'white', border: '1px solid #D1B2FF', borderRadius: '8px', padding: '0' }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                  <Typography variant="h6" sx={{ fontSize: '14px', fontWeight: 'bold' }}>{day}</Typography>
                  <Typography variant="body2" sx={{ fontSize: '16px', fontWeight: 'bold', marginRight: '7%' }}>
                    {daysData[day].duration}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                {selectedDay === day && daysData ? (
                  <CourseDetails courses={daysData[day].sessions} />
                ) : (
                  <Typography variant="h6">Select a day to see course details</Typography>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default CourseContainer;
