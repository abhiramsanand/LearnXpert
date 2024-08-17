import { Container } from '@mui/material';
import  AssessmentTabs from '../../components/Admin/AssessmentView/AssessmentTabs';


const AdminAssessmentViewPage = () => {
  return (
    <Container sx={{mt: 6}}>
       <AssessmentTabs />
    </Container>
  )
}

export default AdminAssessmentViewPage
