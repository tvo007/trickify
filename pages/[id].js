import {useState, Fragment} from 'react';
import {useMutation, useQuery} from 'graphql-hooks';
import {useRouter} from 'next/router';
import {Typography, Button, TextField, Grid, Box, Stack} from '@mui/material';
// import Breadcrumbs from '../components/breadcrumbs';

import {SAMPLER_QUERY} from '../lib/graphql-query-mutation';
import {useEffect} from 'react';
import SamplerContent from '../components/SamplerContent';

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
        {/* <Grid item>
          <Typography
            component={Box}
            fontWeight={'medium'}
            color="text.primary"
          >
            {sampler.name}
          </Typography>
        </Grid>
        <Grid item sx={{mb: 2}}>
          <Box>
            <iframe
              width="853"
              height="480"
              // src={`https://www.youtube.com/embed/${youtube_parser (sampler.url)}`}
              src={`https://www.youtube.com/embed/${youtube_parser (sampler.url)}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </Box>

          <Box>
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
        </Grid>
        <Grid item>
          <Stack direction="column" spacing={2}>
            {sampler.scenes.map (scene => (
              <Box key={scene.id}>
                <Button>
                  <Typography component={Box} color={'#6F6F6F'}>
                    @ {scene.timestamp} - {scene.tricks}
                  </Typography>
                </Button>
              </Box>
            ))}
          </Stack>
        </Grid> */}
        <SamplerContent sampler={sampler}/>
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
