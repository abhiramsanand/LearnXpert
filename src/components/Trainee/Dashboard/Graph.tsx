import React from 'react';
import { Container, Box } from '@mui/material';
import BarChart from './BarChart';
import PieChart from './PieChart';
import PieChart2 from './PieChart2';

const Graph: React.FC = () => {
  const pieData = {
    datasets: [
      {
        data: [72, 28],
        backgroundColor: ['#8061C3', '#F5F5F5'],
      },
    ],
  };

  const pieData2 = {
    datasets: [
      {
        data: [90, 10],
        backgroundColor: ['#8061C3', '#F5F5F5'],
      },
    ],
  };

  const options = {
    cutout: '70%',
    plugins: {
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <Container sx={{mt: '15px'}}>
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '80px' }}>
          <Box>
            <BarChart />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <PieChart data={pieData} options={options}/>
            <PieChart2 data={pieData2} options={options} />
          </Box>
      </Box>
    </Container>
  );
}

export default Graph;
