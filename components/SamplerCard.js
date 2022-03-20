import {Typography} from '@mui/material';
import {Box} from '@mui/material';
import Link from 'next/link';
import React from 'react';

function SamplerCard({sampler}) {
  return (
    <Box>
      <Box fontWeight={'medium'}>
        <Typography
          component={Link}
          href={`/${sampler.id}`}
          color={'text.primary'}
        >
          {sampler.name}
        </Typography>
      </Box>
      <Typography component={Box} color={'#6F6F6F'}>
        {sampler.created_by}
      </Typography>
      <Typography component={Box} color={'#6F6F6F'}>
        {sampler.runtime} seconds
      </Typography>
      <Typography component={Box} color={'#6F6F6F'}>
        {sampler.uploaded_at}
      </Typography>
    </Box>
  );
}

export default SamplerCard;
