/* eslint-disable @typescript-eslint/no-explicit-any */
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
  TablePagination,
} from "@mui/material";

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
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sliceData = (data: string[]) => {
    return data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute" as const,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          maxWidth: 800,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Trainee Score Details
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Below 80%</TableCell>
              <TableCell>Between 80% and 90%</TableCell>
              <TableCell>Between 90% and 99%</TableCell>
              <TableCell>100%</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{sliceData(traineeData.below80).join(", ")}</TableCell>
              <TableCell>{sliceData(traineeData.between80and90).join(", ")}</TableCell>
              <TableCell>{sliceData(traineeData.between90and99).join(", ")}</TableCell>
              <TableCell>{sliceData(traineeData.exactly100).join(", ")}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={Math.max(
            traineeData.below80.length,
            traineeData.between80and90.length,
            traineeData.between90and99.length,
            traineeData.exactly100.length
          )}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Modal>
  );
};

export default TraineeModal;
