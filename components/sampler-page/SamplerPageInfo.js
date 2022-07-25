import {Grid, Typography, Button} from '@mui/material';
import {Box} from '@mui/system';
import React from 'react';
import Link from 'next/link';

const SamplerPageInfo = ({sampler}) => {
  return (
    <Grid container direction="row" justifyContent={'space-between'}>
      <Grid item>
        <Typography component={Box} fontWeight="bold">
          {sampler.name}
        </Typography>
        <Typography component={Box} color={'#6F6F6F'}>
          {sampler.created_by}
        </Typography>
      </Grid>
      {/**editor button, auth only */}
      
    </Grid>
  );
};

export default SamplerPageInfo;
