import {Grid, Typography} from '@mui/material';
import {Box} from '@mui/system';
import React from 'react';

const SamplerPageInfo = ({sampler, isAuth}) => {
  return (
    <Grid container direction="row" justifyContent={'space-between'}>
      <Grid item>
        <Typography component={Box} fontWeight="bold">
          {sampler.name}
        </Typography>
        <Typography component={Box} color={'#6F6F6F'}>
          {sampler.created_by}
        </Typography>
        <Typography component={Box} color={'#6F6F6F'}>
          Total runtime: {sampler.runtime} seconds
        </Typography>
        <Typography component={Box} color={'#6F6F6F'}>
          {sampler.uploaded_at}
        </Typography>
      </Grid>
      {/**editor button, auth only */}
      {isAuth &&
        <Grid item>
          <Link href={`/admin/${sampler.id}`} passHref>
            <Button size="small">View in Editor</Button>
          </Link>
        </Grid>}
    </Grid>
  );
};

export default SamplerPageInfo;
