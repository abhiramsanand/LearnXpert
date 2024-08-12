import React from 'react';
import ReportTable from '../../components/Trainee/WholeReport/ReportTable';
import TraineeHeader from '../../shared components/TraineeHeader';
import Footer from '../../shared components/Footer';
import BackButton from '../../components/Trainee/WholeReport/BackButton';

const WholeReportPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{ position: 'relative' }}>
        <BackButton />
        <TraineeHeader title={'Whole Report'} />
      </div>
      <main style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
        <ReportTable />
      </main>
      <Footer />
    </div>
  );
};

export default WholeReportPage;
