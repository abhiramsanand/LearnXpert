import React from 'react';
import TraineeHeader from '../../shared components/TraineeHeader';
import TraineeSidebar from '../../shared components/TraineeSidebar';
import Footer from '../../shared components/Footer';
import DailyReportContainer from '../../components/Trainee/DailyReport/DailyReportContainer';

const DailyReportPage = () => {
  return (
    <>
      <TraineeSidebar />
      <TraineeHeader />
      <DailyReportContainer />
      <Footer />
    </>
  );
};

export default DailyReportPage;
