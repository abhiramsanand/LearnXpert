/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-unused-vars */
// StyledTableRow.tsx
import { styled } from "@mui/material/styles";
import { TableRow, TableRowProps } from "@mui/material"; 

const StyledTableRow = styled(TableRow)<TableRowProps>(({ }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#FFFFFF",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#E6E6FA",
  },
}));

export default StyledTableRow; // Export the StyledTableRow
