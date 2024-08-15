import React from 'react'
import AssessmentCreation from '../../components/Admin/AssessmentCreation/AssessmentCreation'
import { Container } from '@mui/material'

const AdminAssessmentCreationPage = () => {
  return (
    <Container sx={{mt: 4}}>
      <AssessmentCreation/>
    </Container>
  )
}

export default AdminAssessmentCreationPage
