
import ReportTable from '../../components/Trainee/WholeReport/ReportTable';
import TraineeHeader from '../../constants/TraineeHeader';


const WholeReportPage: React.FC = () => {
  

    return (
        <div style={{ padding: '20px' }}>
            <TraineeHeader title={'Whole Report'} />
           
            <ReportTable/>
        </div>
    );
};

export default WholeReportPage;
