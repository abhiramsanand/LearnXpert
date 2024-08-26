// import React, { useEffect, useState } from 'react';
// import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography, TableContainer, Paper } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// interface AssessmentsTableProps {
//   batchId: number;
// }

// interface Assessment {
//   assessmentName: string;
//   assessmentStatus: string;
//   traineeCount: number;
// }

// const AssessmentsTable: React.FC<AssessmentsTableProps> = ({ batchId }) => {
//   const [assessments, setAssessments] = useState<Assessment[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAssessments = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/api/v1/ilpex/assessments/details?batchId=${batchId}`);
//         setAssessments(response.data.data);
//       } catch (error) {
//         console.error('Error fetching assessments data:', error);
//         setError('Failed to fetch assessments. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAssessments();
//   }, [batchId]);

//   const handleRowClick = (assessmentName: string) => {
//     navigate(`/assignment/${assessmentName}`);
//   };

//   if (loading) {
//     return <Typography>Loading assessments...</Typography>;
//   }

//   if (error) {
//     return <Typography color="error">{error}</Typography>;
//   }

//   return (
//     <Box>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>#</TableCell>
//               <TableCell>Assessment Name</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Trainees Attended</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {assessments.map((assessment, index) => (
//               <TableRow
//                 key={index}
//                 onClick={() => handleRowClick(assessment.assessmentName)}
//                 style={{ cursor: 'pointer' }}
//               >
//                 <TableCell>{index + 1}</TableCell>
//                 <TableCell>{assessment.assessmentName}</TableCell>
//                 <TableCell>{assessment.assessmentStatus}</TableCell>
//                 <TableCell>{assessment.traineeCount}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default AssessmentsTable;
