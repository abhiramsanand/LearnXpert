import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  styled,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SwapVertIcon from "@mui/icons-material/SwapVert";

interface TraineeScoreModalProps {
  open: boolean;
  onClose: () => void;
  traineeScores: Record<string, number>;
}

const CustomDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogTitle-root': {
    backgroundColor: '#4A148C',
    color: theme.palette.primary.contrastText,
    position: 'relative',
    padding: theme.spacing(2),
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    maxHeight: 'calc(100vh - 250px)',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#E6E6FA',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#f0f0f0',
    },
  },
}));

const CustomDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: '#4A148C',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '0.9rem',
  color: theme.palette.text.primary,
  padding: theme.spacing(1),
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: "#FFFFFF",
  },
  '&:nth-of-type(even)': {
    backgroundColor: "#E6E6FA",
  },
}));

const FilterContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  paddingTop: '10px',
  marginBottom: theme.spacing(2),
  gap: theme.spacing(2),
}));

const FilterLabel = styled(InputLabel)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

const TableContainer = styled('div')(({ theme }) => ({
  maxHeight: '300px',
  overflowY: 'auto',
  paddingLeft: '20px',
  paddingRight: '20px',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#E6E6FA',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#f0f0f0',
  },
}));

const Footer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  padding: theme.spacing(1),
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: '#F5F5F5',
}));

const TraineeScoreModal: React.FC<TraineeScoreModalProps> = ({
  open,
  onClose,
  traineeScores,
}) => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof { name: string; score: number }>("name");
  const [filterScore, setFilterScore] = useState<string>("All");

  const handleRequestSort = (property: keyof { name: string; score: number }) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilterScore(event.target.value as string);
  };

  const filteredTrainees =
    filterScore === "All"
      ? Object.entries(traineeScores)
      : Object.entries(traineeScores).filter(([_, score]) => {
          if (filterScore === "<60") return score < 60;
          if (filterScore === "<80") return score < 80;
          return true;
        });

  const sortedTrainees = filteredTrainees
    .map(([name, score]) => ({ name, score }))
    .sort((a, b) => {
      if (a[orderBy] < b[orderBy]) {
        return order === "asc" ? -1 : 1;
      }
      if (a[orderBy] > b[orderBy]) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    });

  return (
    <CustomDialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <CustomDialogTitle>
        Trainee Assessment Scores
      </CustomDialogTitle>
      <DialogContent>
        <FilterContainer>
          <FilterLabel>Filter by Score:</FilterLabel>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={filterScore}
              onChange={handleFilterChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Filter by Score' }}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="<60">Less than 60</MenuItem>
              <MenuItem value="<80">Less than 80</MenuItem>
            </Select>
          </FormControl>
        </FilterContainer>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  <TableSortLabel
                    active={orderBy === "name"}
                    direction={orderBy === "name" ? order : "asc"}
                    onClick={() => handleRequestSort("name")}
                    IconComponent={() => <SwapVertIcon />}
                  >
                    Trainee Name
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell>
                  <TableSortLabel
                    active={orderBy === "score"}
                    direction={orderBy === "score" ? order : "asc"}
                    onClick={() => handleRequestSort("score")}
                    IconComponent={() => <SwapVertIcon />}
                  >
                    Average Score
                  </TableSortLabel>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedTrainees.map((trainee, index) => (
                <StyledTableRow key={index}>
                  <TableCell>{trainee.name}</TableCell>
                  <TableCell>{trainee.score.toFixed(2)}</TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <Footer>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            color: "white",
            backgroundColor: '#4A148C',
            '&:hover': {
              backgroundColor: '#6A1B9A',
            },
          }}
        >
          Close
        </Button>
      </Footer>
    </CustomDialog>
  );
};

export default TraineeScoreModal;
