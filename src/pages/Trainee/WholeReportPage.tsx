
import ReportTable from '../../components/Trainee/WholeReport/ReportTable';
import TraineeHeader from '../../shared components/TraineeHeader';

import Footer from '../../shared components/Footer';
const WholeReportPage: React.FC = () => {
  

    return (
        <div style={{ padding: '10px' }}>
            <TraineeHeader title={'Whole Report'} />
           
            <ReportTable/>
            <Footer/>
        </div>
    );
};

export default WholeReportPage;
