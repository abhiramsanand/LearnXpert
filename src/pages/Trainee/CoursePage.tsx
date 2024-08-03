import React from 'react';
import CourseComponent from '../../components/Trainee/Course/Course';
import TraineeHeader from '../../constants/TraineeHeader';

const CoursePage = () => {
  return (
    <div>
      <TraineeHeader title={'Courses'} />
      <div style={{ marginTop: '7%' }}> {/* Adjust the margin as needed */}
        <CourseComponent />
      </div>
    </div>
  );
};

export default CoursePage;
