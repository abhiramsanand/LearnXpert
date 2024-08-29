import React, { useEffect, useState } from 'react';
import styles from './TraineeCourseReport.module.css';

interface TraineeCourseReportData {
  traineeName: string;
  totalDuration: string; // Converted to hours and minutes
  estimatedDuration: string; // Converted to hours and minutes
  totalCourses: number; // Total courses will now reflect total course days completed
  estimatedCourses: number; // Updated based on distinct course count
}

const TraineeCourseReport: React.FC = () => {
  const [reportData, setReportData] = useState<TraineeCourseReportData[]>([]);
  const [totalCourseDurationMinutes, setTotalCourseDurationMinutes] = useState<number>(0);
  const [totalCourseDaysCompleted, setTotalCourseDaysCompleted] = useState<number>(0); // State for total course days completed

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        // Fetch the total course duration
        const totalDurationResponse = await fetch('http://localhost:8080/api/courses/total-duration/15');
        const totalDurationData = await totalDurationResponse.json();
        setTotalCourseDurationMinutes(totalDurationData.totalDurationMinutes);

        // Fetch the course duration per trainee
        const courseDurationResponse = await fetch('http://localhost:8080/api/v1/ilpex/traineeprogress/course-duration?batchId=15');
        const courseDurationData = await courseDurationResponse.json();

        // Fetch the total days completed per batch
        const totalDaysCompletedResponse = await fetch('http://localhost:8080/api/courses/total-course-days-completed/15');
        const totalDaysCompletedData = await totalDaysCompletedResponse.json();
        setTotalCourseDaysCompleted(totalDaysCompletedData.totalCourseDaysCompleted); // Set the total course days completed

        // Fetch distinct course duration count per trainee
        const distinctCourseCountResponse = await fetch('http://localhost:8080/api/v1/ilpex/traineeprogress/course-count/15');
        const distinctCourseCountData = await distinctCourseCountResponse.json();

        // Combine data and map each trainee's estimated duration
        const combinedData: TraineeCourseReportData[] = courseDurationData.map((course: any) => {
          const estimatedDuration = course.totalCourseDuration;
          const estimatedCourses = distinctCourseCountData.find((data: any) => data.traineeName === course.traineeName)?.distinctCourseDurationCount || 0;
          
          return {
            traineeName: course.traineeName,
            totalDuration: formatMinutesToHours(totalCourseDurationMinutes), // Common duration in hours
            estimatedDuration: formatSecondsToHours(estimatedDuration),
            totalCourses: totalCourseDaysCompleted, // Set to total course days completed
            estimatedCourses: estimatedCourses, // Update with distinct course count
          };
        });

        setReportData(combinedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchReportData();
  }, [totalCourseDurationMinutes, totalCourseDaysCompleted]);

  const getCellClass = (totalCourses: number, estimatedCourses: number) => {
    const difference = totalCourses - estimatedCourses;
    if (difference > 4) {
      return styles.redCell;
    } else if (difference > 0) {
      return styles.yellowCell;
    } else {
      return '';
    }
  };

  const formatMinutesToHours = (minutes: number): string => {
    if (isNaN(minutes)) return '0h 0m'; // Return default value if input is NaN
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const formatSecondsToHours = (seconds: number): string => {
    if (isNaN(seconds)) return '0h 0m'; // Return default value if input is NaN
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <div className={styles.reportContainer}>
      <h1>Trainee Course Report</h1>
      <div className={styles.scrollableTableContainer}>
        <table className={styles.reportTable}>
          <thead>
            <tr>
              <th>Trainee Name</th>
              <th>Total Duration</th>
              <th>Estimated Duration</th>
              <th>Total Courses</th>
              <th>Estimated Courses</th> {/* Updated with distinct course count */}
            </tr>
          </thead>
          <tbody>
            {reportData.map((trainee, index) => (
              <tr key={index}>
                <td>{trainee.traineeName}</td>
                <td>{trainee.totalDuration}</td>
                <td>{trainee.estimatedDuration}</td>
                <td className={getCellClass(trainee.totalCourses, trainee.estimatedCourses)}>
                  {trainee.totalCourses}
                </td>
                <td className={getCellClass(trainee.totalCourses, trainee.estimatedCourses)}>
                  {trainee.estimatedCourses}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TraineeCourseReport;
