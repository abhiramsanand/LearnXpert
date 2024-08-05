// src/pages/BatchListPage.tsx
import React from 'react';
import { Container, Box } from '@mui/material';
import BatchCard from '../../components/Admin/AdminBatchList/BatchCard';
import AdminHeader from '../../shared components/AdminHeader';
import Sidebar from '../../shared components/Sidebar';
import Footer from '../../shared components/Footer';



const BatchListPage: React.FC = () => {
  return (
    <>
    <AdminHeader/>
    <Sidebar/>
    <Container>
      <Box mt={4}>
       <BatchCard/>
      </Box>
    </Container>
    <Footer/>
    
    </>
  );
};

export default BatchListPage;
