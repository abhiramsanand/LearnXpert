import React from 'react';
import CourseContainer from '../../components/Trainee/Course/CourseContainer';

const CoursePage = () => {
  return (
    <div>
      {/* <TraineeHeader title={'Courses'} /> */}
      <div style={{ marginTop: '7%' }}> {/* Adjust the margin as needed */}
       <CourseContainer/>
      </div>
    </div>
  );
};

export default CoursePage;
