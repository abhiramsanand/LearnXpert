import React from 'react';
import { TextField, Autocomplete } from '@mui/material';

interface Student {
  name: string;
}

interface StudentSearchComponentProps {
  students: Student[];
  onStudentSelect: (studentName: string) => void;
}

const StudentSearchComponent: React.FC<StudentSearchComponentProps> = ({ students, onStudentSelect }) => {
  return (
    <Autocomplete
      options={students.map(student => student.name)}
      renderInput={(params) => <TextField {...params} label="Select Student" variant="outlined" />}
      onChange={(_event, value) => onStudentSelect(value || '')}
    />
  );
};

export default StudentSearchComponent;
