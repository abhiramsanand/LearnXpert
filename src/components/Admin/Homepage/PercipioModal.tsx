import React, { useState } from "react";
import {
  Box,
  Typography,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface TraineeModalProps {
  open: boolean;
  onClose: () => void;
  traineeData: {
    below80: string[];
    between80and90: string[];
    between90and99: string[];
    exactly100: string[];
  };
}

const TraineeModal: React.FC<TraineeModalProps> = ({ open, onClose, traineeData }) => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 4;

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const sliceData = (data: string[]) => {
    return data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  };

  const maxPages = Math.ceil(
    Math.max(
      traineeData.below80.length,
      traineeData.between80and90.length,
      traineeData.between90and99.length,
      traineeData.exactly100.length
    ) / rowsPerPage
  );

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          maxWidth: 800,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 0,
          outline: "none",
        }}
      >
        <Paper
          sx={{
            position: "relative",
            bgcolor: "#EAE5F5",
            borderRadius: "8px 8px 0 0",
            p: 2,
            m: 0,
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <Typography variant="h6" gutterBottom id="modal-title">
            Percipio Assessment Score Details
          </Typography>
          <IconButton
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "red",
            }}
            onClick={(e) => {
              e.stopPropagation(); // Prevent event bubbling
              onClose(); // Trigger the onClose prop function
            }}
          >
            <CloseIcon />
          </IconButton>
        </Paper>
        <Box sx={{ p: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Typography sx={{whiteSpace: "nowrap"}}>Below 80%</Typography></TableCell>
                <TableCell><Typography sx={{whiteSpace: "nowrap"}}>80% - 90%</Typography></TableCell>
                <TableCell><Typography sx={{whiteSpace: "nowrap"}}>90% - 99%</Typography></TableCell>
                <TableCell><Typography sx={{whiteSpace: "nowrap"}}>100%</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  {sliceData(traineeData.below80).map((name, index) => (
                    <Typography key={index}>{name}</Typography>
                  ))}
                </TableCell>
                <TableCell>
                  {sliceData(traineeData.between80and90).map((name, index) => (
                    <Typography key={index}>{name}</Typography>
                  ))}
                </TableCell>
                <TableCell>
                  {sliceData(traineeData.between90and99).map((name, index) => (
                    <Typography key={index}>{name}</Typography>
                  ))}
                </TableCell>
                <TableCell>
                  {sliceData(traineeData.exactly100).map((name, index) => (
                    <Typography key={index}>{name}</Typography>
                  ))}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 5,
              gap: 2,
            }}
          >
            <IconButton
              onClick={() => handleChangePage(Math.max(0, page - 1))}
              disabled={page === 0}
              sx={{ color: page === 0 ? "rgba(128, 97, 195, 0.2)" : "rgba(128, 97, 195)" }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
            {Array.from({ length: maxPages }, (_, i) => (
              <Button
                key={i}
                onClick={() => handleChangePage(i)}
                sx={{
                  minWidth: 36,
                  color: i === page ? "#fff" : "rgba(128, 97, 195)",
                  bgcolor: i === page ? "rgba(128, 97, 195)" : "#f5f5f5",
                  "&:hover": {
                    bgcolor: i === page ? "rgba(128, 97, 195, 0.5)" : "#ddd",
                  },
                  borderRadius: "50%",
                }}
              >
                {i + 1}
              </Button>
            ))}
            <IconButton
              onClick={() => handleChangePage(Math.min(maxPages - 1, page + 1))}
              disabled={page === maxPages - 1}
              sx={{ color: page === maxPages - 1 ? "rgba(128, 97, 195, 0.2)" : "rgba(128, 97, 195)" }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default TraineeModal;
