import React, { useState, useEffect } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CourseDetails from './CourseDetails';
import styles from './CourseContainer.module.css'; // Import the CSS module

interface CourseData {
  courseName: string;
  dayNumber: number;
  batchName: string;
  courseDuration: string;
}

const CourseContainer = () => {
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [batchData, setBatchData] = useState<Map<string, any>>(new Map());
  const [daysData, setDaysData] = useState<any>(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/batches/daywise-courses')
      .then((response) => response.json())
      .then((data: { data: CourseData[] }) => {
        const transformedData = data.data.reduce((acc, item) => {
          if (!acc[item.batchName]) {
            acc[item.batchName] = {};
          }
          if (!acc[item.batchName][item.dayNumber]) {
            acc[item.batchName][item.dayNumber] = {
              duration: item.courseDuration,
              sessions: []
            };
          }
          acc[item.batchName][item.dayNumber].sessions.push({ title: item.courseName });
          return acc;
        }, {} as Record<string, Record<number, { duration: string, sessions: { title: string }[] }>>);

        setBatchData(new Map(Object.entries(transformedData)));
        if (selectedBatch) {
          setDaysData(transformedData[selectedBatch]);
        }
      })
      .catch((error) => console.error('Error fetching the API data:', error));
  }, [selectedBatch]);

  const handleBatchChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const batch = event.target.value as string;
    setSelectedBatch(batch);
    setDaysData(batchData.get(batch) || null);
    setSelectedDay(null); // Reset selected day when batch changes
  };

  const days = daysData ? Object.keys(daysData).map(Number) : [];

  return (
    <Box className={styles.outerContainer}>
      <FormControl fullWidth sx={{ marginBottom: '20px' }} className={styles.selectBatch}>
        <InputLabel id="batch-select-label">Select Batch</InputLabel>
        <Select
          labelId="batch-select-label"
          value={selectedBatch || ''}
          onChange={handleBatchChange}
          displayEmpty
        >
          <MenuItem value="" disabled>Select Batch</MenuItem>
          {Array.from(batchData.keys()).map(batch => (
            <MenuItem key={batch} value={batch}>{batch}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedBatch && (
        <Box className={styles.scrollableDaysContainer}>
          {days.map((day) => (
            <Accordion
              key={day}
              expanded={selectedDay === day}
              onChange={() => setSelectedDay(selectedDay === day ? null : day)}
              className={styles.accordionItem}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ backgroundColor: 'white', border: '1px solid #D1B2FF', borderRadius: '8px', padding: '0' }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                  <Typography variant="h6" sx={{ fontSize: '14px', fontWeight: 'bold' }}>{`Day ${day}`}</Typography>
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
