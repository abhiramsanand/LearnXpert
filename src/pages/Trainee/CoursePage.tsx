import CourseContainer from '../../components/Trainee/Course/CourseContainer';

const CoursePage = () => {
  const traineeId = parseInt(localStorage.getItem("traineeId") || "0", 10); 
 
  return (
    <div>
   
      <CourseContainer traineeId={traineeId} />
    </div>
  );
};

export default CoursePage;
