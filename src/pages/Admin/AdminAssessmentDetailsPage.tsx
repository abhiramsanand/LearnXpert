import React from 'react'
import AssignmentDetails from '../../components/Admin/AssessmentDetails/AssessmentDetails'
import AdminHeader from '../../shared components/AdminHeader'
import Footer from '../../shared components/Footer'
import Sidebar from '../../shared components/Sidebar'

const AdminAssessmentDetailsPage = () => {
  return (
    <div>
      <AdminHeader/>
      <Sidebar/>
      <AssignmentDetails/>

      <Footer/>
    </div>
  )
}

export default AdminAssessmentDetailsPage
