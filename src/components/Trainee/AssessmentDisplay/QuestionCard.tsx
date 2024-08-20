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
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {questionText}
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup>
            {Object.entries(options).map(([key, value]) => (
              <FormControlLabel
                key={key}
                value={key}
                control={<Radio />}
                label={value}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
