/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  IconButton,
  Typography,
  Pagination,
  PaginationItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

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

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

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

      const batchDayNumber = batch.dayNumber - 4;
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

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const paginate = (array: string[], page: number) => {
    return array.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle
        sx={{ backgroundColor: "#EAE5F5", color: "black", padding: "10px" }}
      >
        <Typography variant="h6">Trainees Progress</Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "red",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            Loading...
          </Box>
        ) : (
          <Box>
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
                    {paginate(traineesByCategory.ahead, currentPage).map(
                      (trainee) => (
                        <div key={trainee}>{trainee}</div>
                      )
                    )}
                  </TableCell>
                  <TableCell>
                    {paginate(traineesByCategory.onTrack, currentPage).map(
                      (trainee) => (
                        <div key={trainee}>{trainee}</div>
                      )
                    )}
                  </TableCell>
                  <TableCell>
                    {paginate(traineesByCategory.behind, currentPage).map(
                      (trainee) => (
                        <div key={trainee}>{trainee}</div>
                      )
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Box display="flex" justifyContent="center" padding="20px">
              <Pagination
                count={Math.ceil(
                  Math.max(
                    traineesByCategory.ahead.length,
                    traineesByCategory.onTrack.length,
                    traineesByCategory.behind.length
                  ) / itemsPerPage
                )}
                page={currentPage}
                onChange={handlePageChange}
                renderItem={(item) => (
                  <PaginationItem
                    components={{
                      previous: ArrowBackIosNewIcon,
                      next: ArrowForwardIosIcon,
                    }}
                    {...item}
                    sx={{
                      minWidth: 36,
                      color: item.selected ? "#fff" : "rgba(128, 97, 195)", // Text color
                      bgcolor: item.selected ? "rgba(128, 97, 195)" : "#f5f5f5", // Background color
                      "&.Mui-selected": {
                        color: "#fff",
                        bgcolor: "rgba(128, 97, 195)",
                      },
                      "&:hover": {
                        bgcolor: item.selected
                          ? "rgba(128, 97, 195, 0.5)"
                          : "#ddd",
                      },
                      borderRadius: "50%",
                    }}
                  />
                )}
              />
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TraineeModal;
