import React from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';

interface QuestionCardProps {
  questionId: number;
  questionText: string;
  options: {
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
  };
  selectedOption: string;
  onResponseChange: (questionId: number, optionKey: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ questionId, questionText, options, selectedOption, onResponseChange }) => {
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedOptionKey = (event.target as HTMLInputElement).value;
    onResponseChange(questionId, selectedOptionKey);
  };

  return (
    <div>
      <Typography variant="h6">{questionText}</Typography>
      <FormControl component="fieldset">
        <RadioGroup value={selectedOption} onChange={handleOptionChange}>
          <FormControlLabel value="optionA" control={<Radio />} label={options.optionA} />
          <FormControlLabel value="optionB" control={<Radio />} label={options.optionB} />
          <FormControlLabel value="optionC" control={<Radio />} label={options.optionC} />
          <FormControlLabel value="optionD" control={<Radio />} label={options.optionD} />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default QuestionCard;
