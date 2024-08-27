import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material";

interface TraineeModalProps {
  open: boolean;
  onClose: () => void;
  selectedBatch: number;
}

interface TraineeData {
  [key: string]: number;
}

interface BatchData {
  id: number;
  batchName: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  dayNumber: number;
}

const TraineeModal: React.FC<TraineeModalProps> = ({
  open,
  onClose,
  selectedBatch,
}) => {
  const [traineeData, setTraineeData] = useState<TraineeData>({});
  const [batchData, setBatchData] = useState<BatchData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [traineesByCategory, setTraineesByCategory] = useState({
    ahead: [] as string[],
    onTrack: [] as string[],
    behind: [] as string[],
  });

  const fetchTraineeData = async () => {
    try {
      const batchResponse = await fetch(
        `http://localhost:8080/api/v1/batches/${selectedBatch}/dayNumber`
      );
      const batch = await batchResponse.json();
      setBatchData(batch);

      const traineeResponse = await fetch(
        `http://localhost:8080/api/v1/ilpex/traineeprogress/trainee/last-accessed-day-number`
      );
      const traineeProgress = await traineeResponse.json();
      setTraineeData(traineeProgress);

      const batchDayNumber = batch.dayNumber - 3;
      let ahead: string[] = [];
      let onTrack: string[] = [];
      let behind: string[] = [];

      Object.entries(traineeProgress).forEach(([name, dayNumber]) => {
        if (dayNumber < batchDayNumber) {
          behind.push(name);
        } else if (dayNumber === batchDayNumber) {
          onTrack.push(name);
        } else {
          ahead.push(name);
        }
      });

      const categorizedData = { ahead, onTrack, behind };
      setTraineesByCategory(categorizedData);

      // Store the data in local storage with a timestamp
      localStorage.setItem(
        "traineeData",
        JSON.stringify({
          traineeData: traineeProgress,
          batchData: batch,
          traineesByCategory: categorizedData,
          timestamp: Date.now(),
        })
      );

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedBatch && open) {
      const storedData = localStorage.getItem("traineeData");
      const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds

      if (storedData) {
        const parsedData = JSON.parse(storedData);
        const isDataFresh = Date.now() - parsedData.timestamp < fiveMinutes;

        if (isDataFresh) {
          setTraineeData(parsedData.traineeData);
          setBatchData(parsedData.batchData);
          setTraineesByCategory(parsedData.traineesByCategory);
          setLoading(false);
          return;
        }
      }

      setLoading(true);
      fetchTraineeData();
    }
  }, [selectedBatch, open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Trainees Progress</DialogTitle>
      <DialogContent>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            Loading...
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ahead</TableCell>
                <TableCell>On Track</TableCell>
                <TableCell>Behind</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  {traineesByCategory.ahead.map((trainee) => (
                    <div key={trainee}>{trainee}</div>
                  ))}
                </TableCell>
                <TableCell>
                  {traineesByCategory.onTrack.map((trainee) => (
                    <div key={trainee}>{trainee}</div>
                  ))}
                </TableCell>
                <TableCell>
                  {traineesByCategory.behind.map((trainee) => (
                    <div key={trainee}>{trainee}</div>
                  ))}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TraineeModal;
