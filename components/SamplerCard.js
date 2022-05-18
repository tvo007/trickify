import {Stack} from '@mui/material';
import {Typography, Box, Button} from '@mui/material';

import Link from 'next/link';
import React from 'react';
import {useContext} from 'react';
import AuthContext from '../lib/contexts/AuthContext';

function SamplerCard({sampler}) {
  const {isAuth} = useContext (AuthContext);
  return (
    <Box>
      <Box sx={{pl: '.7rem'}}>
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
      <Stack direction="row">
        <Button size="small">View Sampler</Button>

        {isAuth && <Button size="small">Edit Scenes</Button>}
      </Stack>
    </Box>
  );
}

export default SamplerCard;
