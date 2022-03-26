import {useState, Fragment} from 'react';
import {useMutation, useQuery} from 'graphql-hooks';
import {useRouter} from 'next/router';
import {
  Typography,
  Grid,
  Box,
  
} from '@mui/material';

// import Breadcrumbs from '../components/breadcrumbs';

import {SAMPLER_QUERY} from '../lib/graphql-query-mutation';
import PlayerContainer from '../components/PlayerContainer';

export default function SinglePage({id}) {
  // const theme = useTheme ();
  // const mdMatches = useMediaQuery (theme.breakpoints.up ('md'));

  


  const {data, refetch} = useQuery (SAMPLER_QUERY, {variables: {id}});

  if (!data) return <div>Loading...</div>;

  const {Samplers_by_id: sampler} = data;

  return (
    <Fragment>

      <Grid
        container
        direction="column"
        alignItems="flex-start"
        justifyContent={'flex-start'}
        sx={{minHeight: '100vh', pt: '5rem'}}
      >
        <Typography
          variant="h4"
          component={Box}
          fontWeight="bold"
          sx={{color: '#ff5252', mb: '3rem'}}
        >
          Trickify
        </Typography>
        <PlayerContainer sampler={sampler} refetch={refetch} />
      </Grid>
    </Fragment>
  );
}

export async function getServerSideProps (context) {
  const {id} = context.params;

  return {
    props: {id},
  };
}
