
import {useQuery, useMutation} from 'graphql-hooks';
import Link from 'next/link';
import {
  Grid,
  Typography,
  Button,
  TextField,
  Box,
  Stack,
} from '@mui/material';
import {
  ALL_POSTS_QUERY,
  ALL_SAMPLERS_QUERY,
  CREATE_POST_MUTATION,
} from '../lib/graphql-query-mutation';
import SamplerCard from '../components/SamplerCard';

export default function Home () {
  const {data, refetch} = useQuery (ALL_SAMPLERS_QUERY);
  //fetch graphql data here
  //todo: create new ALL POSTS QUERY

  // const [createPost] = useMutation (CREATE_POST_MUTATION);

  if (!data) return <div>Loading...</div>;

  const {Samplers: samplers} = data;
  return (
    <section>
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
        <Stack direction="column" spacing={2}>
          {samplers.map (sampler => (
            <SamplerCard key={sampler.id} sampler={sampler}/>
          ))}

        </Stack>

      </Grid>

    </section>
  );
}

export async function getStaticProps () {
  return {
    props: {},
  };
}

//init