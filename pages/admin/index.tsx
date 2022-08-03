import {FC} from 'react';
import {Stack, Box, Typography} from '@mui/material';

const Dashboard: FC = () => {
  return (
    <Stack>
      <Typography component={Box} variant="body2">
        Dashboard page. WIP
      </Typography>
      <Typography component={Box} variant="body2">Things to add</Typography>
      <Typography component={Box} variant="body2">Admin settings</Typography>
      <Typography component={Box} variant="body2">Admin settings</Typography>
      <Typography component={Box} variant="body2">Analytics??</Typography>
    </Stack>
  );
};

export default Dashboard;
