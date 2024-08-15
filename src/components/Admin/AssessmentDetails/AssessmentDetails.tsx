import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import AssessmentHeader from './AssessmentHeader';
import StudentTable from './StudentTable';
import assessmentData from '../../../../public/AssessmentList.json';

interface StudentAttended {
  name: string;
  status: string;
  marks: number;
}

interface Assessment {
  assessmentName: string;
  status: string;
  studentsAttended: {
    count: number;
    students: StudentAttended[];
  };
}

interface Batch {
  batch: string;
  assessments: Assessment[];
}

interface AssessmentList {
  batches: Batch[];
}

const AssessmentDetails: React.FC = () => {
  const { name } = useParams();
  const data: AssessmentList = assessmentData;

  // Find the assessment details
  const assessment = data.batches
    .flatMap(batch => batch.assessments)
    .find(assessment => assessment.assessmentName === name);

  if (!assessment) {
    return <div>Assessment not found.</div>;
  }

  const [searchTerm, setSearchTerm] = useState<string>('');

  // Filter students based on search term
  const filteredStudents = assessment.studentsAttended.students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to get status style
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Submitted':
        return { color: 'green' }; // Green for Submitted
      case 'Pending':
        return { color: 'red' }; // Red for Pending
      default:
        return { color: 'black' }; // Default color for other statuses
    }
  };

  return (
    <div style={{ padding: 0 }}>
      <div style={{ marginTop: 0 }}> {/* Adjust marginTop as needed */}
        <AssessmentHeader assessmentName={assessment.assessmentName} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <StudentTable students={filteredStudents} getStatusStyle={getStatusStyle} />
    </div>
  );
};

export default AssessmentDetails;
