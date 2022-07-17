import {Stack} from '@mui/material';
import {Typography, Box, Button} from '@mui/material';
import Link from 'next/link';
import React from 'react';
import {useContext} from 'react';
import AuthContext from '../lib/contexts/AuthContext';

//represents each sampler on main index page
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
        {isAuth &&
          <Link href={`/admin/${sampler.id}`} passHref>
            <Button size="small">Edit Scenes</Button>
          </Link>}
      </Stack>
    </Box>
  );
}

export default SamplerCard;
