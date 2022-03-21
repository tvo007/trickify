import {useState, Fragment} from 'react';
import {useMutation, useQuery} from 'graphql-hooks';
import {useRouter} from 'next/router';
import {Typography, Button, TextField, Grid, Box, Stack} from '@mui/material';

// import Breadcrumbs from '../components/breadcrumbs';

import {SAMPLER_QUERY} from '../lib/graphql-query-mutation';
import {useEffect} from 'react';
import SamplerContent from '../components/SamplerContent';
import SceneForm from '../components/SceneForm';

export default function SinglePage({id}) {
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
        <Stack
          direction="row"
          justifyContent={'space-between'}
          sx={{maxWidth: '80%'}}
        >
          <Box
            sx={{
              maxWidth: '50%',
              width: '100%',

              p: '1rem',
            }}
          >
            <SceneForm samplerId={sampler.id} refetch={refetch} />

          </Box>
          <Box sx={{maxWidth: '40%'}}>
            <SamplerContent sampler={sampler} />
          </Box>

        </Stack>
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
