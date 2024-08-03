import React from 'react';
import { Grid, Container, Box } from '@mui/material';
import BarChart from './BarChart';
import PieChart from './PieChart';
import PieChart2 from './PieChart2';

const Graph: React.FC = () => {
  const pieData = {
    datasets: [
      {
        data: [72, 28],
        backgroundColor: ['#8518FF', '#F5F5F5'],
      },
    ],
  };

  const pieData2 = {
    datasets: [
      {
        data: [90, 10],
        backgroundColor: ['#8518FF', '#F5F5F5'],
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
    <Container sx={{ height: '300px' }}>
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          <Grid item md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
            <BarChart />
          </Grid>
          <Grid item md={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PieChart data={pieData} options={options}/>
          </Grid>
          <Grid item md={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PieChart2 data={pieData2} options={options} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Graph;
