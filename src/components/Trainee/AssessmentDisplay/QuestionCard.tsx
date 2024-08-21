import React from 'react';
import { Card, CardContent, Typography, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';

interface QuestionCardProps {
  questionText: string;
  options: {
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
  };
}

const QuestionCard: React.FC<QuestionCardProps> = ({ questionText, options }) => {
  return (
    <Card sx={{ width: '100%', mb: 3, borderRadius: '16px', boxShadow: 3 }}>
      <CardContent sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem', mb: 2 }}>
          {questionText}
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup>
            {Object.entries(options).map(([key, value]) => (
              <FormControlLabel
                key={key}
                value={key}
                control={<Radio sx={{ '&.Mui-checked': { color: '#d1c4e9' } }} />}
                label={value}
                sx={{
                  backgroundColor: '#eaeaf1',
                  borderRadius: '8px',
                  mb: 1,
                  p: 1,
                  fontSize: '0.875rem',
                  color: '#494949',
                  width: '100%'
                }}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
