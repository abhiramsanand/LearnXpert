import React from 'react';
import data from '../../../public/dummyData.json';
import styles from './ReportPage.module.css';

const ReportPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Trainee Report</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Estimated Duration</th>
            <th>Trainee Name</th>
            <th>Actual Duration</th>
          </tr>
        </thead>
        <tbody>
          {data.map((course: any) =>
            course.trainees.map((trainee: any, index: number) => (
              <tr key={index}>
                <td>{course.courseName}</td>
                <td>{course.estimatedDuration}</td>
                <td>{trainee.name}</td>
                <td>{trainee.actualDuration}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReportPage;
