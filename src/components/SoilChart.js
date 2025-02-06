import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Paper, Typography } from '@mui/material';

const data = [
  { month: 'Jan', pH: 6.8 },
  { month: 'Feb', pH: 7.0 },
  { month: 'Mar', pH: 6.5 },
  { month: 'Apr', pH: 7.2 },
];

const SoilChart = () => {
  return (
    <Paper sx={{ p: 2, my: 3, textAlign: 'center' }}>
      <Typography variant="h6" fontWeight="bold">Soil pH Levels Over Time</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis domain={[6, 7.5]} />
          <Tooltip />
          <Line type="monotone" dataKey="pH" stroke="#4CAF50" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default SoilChart;
