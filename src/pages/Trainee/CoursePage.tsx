import React from 'react';
import CourseContainer from '../../components/Trainee/Course/CourseContainer';

const CoursePage = () => {
 // Replace this with the actual trainee ID logic
 const traineeId = 2; 

 return (
   <div>
     <CourseContainer traineeId={traineeId} />
   </div>
 );
};

export default CoursePage;
