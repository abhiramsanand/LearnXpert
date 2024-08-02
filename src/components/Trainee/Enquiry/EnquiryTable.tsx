// src/components/EnquiryTable.tsx

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import { styled } from '@mui/system';

const TableWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  overflowX: 'auto',
  maxHeight: '270px',
  width: '100%',
});

const TableHeading = styled(Typography)({
  fontSize: '16px',
  fontWeight: 'bold',
  marginBottom: '10px',
  borderBottom: '2px solid #8518FF',
  paddingBottom: '5px',
  color: '#8518FF',
  marginLeft: '8%',
});

const TableContainerStyled = styled(TableContainer)({
  backgroundColor: '#CBC3E3',
  borderRadius: '8px',
  padding: '10px',
  maxHeight: '300px',
  overflowY: 'auto',
  width: '85%',
  marginLeft: '8%',
});

const TableHeadStyled = styled(TableHead)({
  position: 'sticky',
  top: 0,
  backgroundColor: '#8518FF',
  color: '#fff',
  fontSize: '14px',
  zIndex: 1100,
  borderBottom: '2px solid #A54BFF',
});

const TableRowStyled = styled(TableRow)(({ isEven }: { isEven: boolean }) => ({
  backgroundColor: isEven ? '#FFFFFF' : '#F5F5F5',
  fontSize: '12px',
  '&:hover': {
    backgroundColor: '#DADADA',
  },
}));

const TableCellStyled = styled(TableCell)({
  padding: '6px 12px',
  textAlign: 'left',
  fontSize: '12px',
  color: '#333',
});

interface Enquiry {
  enquiry: string;
  date: string;
}

interface EnquiryTableProps {
  enquiries: Enquiry[];
}

const EnquiryTable: React.FC<EnquiryTableProps> = ({ enquiries }) => {
  return (
    <TableWrapper>
      <TableHeading>Recent Enquiries</TableHeading>
      <TableContainerStyled component={Paper}>
        <Table>
          <TableHeadStyled>
            <TableRow>
              <TableCellStyled>
                <Typography variant="h6" style={{ fontWeight: 'bold', color: '#fff', fontSize: '14px' }}>
                  Enquiry
                </Typography>
              </TableCellStyled>
              <TableCellStyled>
                <Typography variant="h6" style={{ fontWeight: 'bold', color: '#fff', fontSize: '14px' }}>
                  Date
                </Typography>
              </TableCellStyled>
            </TableRow>
          </TableHeadStyled>
          <TableBody>
            {enquiries.map((enquiry, index) => (
              <TableRowStyled key={index} isEven={index % 2 === 0}>
                <TableCellStyled>
                  {enquiry.enquiry}
                </TableCellStyled>
                <TableCellStyled>
                  {enquiry.date}
                </TableCellStyled>
              </TableRowStyled>
            ))}
          </TableBody>
        </Table>
      </TableContainerStyled>
    </TableWrapper>
  );
};

export default EnquiryTable;
