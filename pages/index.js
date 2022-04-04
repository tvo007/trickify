import {ClientContext, useQuery} from 'graphql-hooks';
import Link from 'next/link';
import {Grid, Typography, Button, TextField, Box, Stack} from '@mui/material';
import {
  ALL_POSTS_QUERY,
  ALL_SAMPLERS_QUERY,
  CREATE_POST_MUTATION,
  GET_ME_QUERY,
} from '../lib/graphql-query-mutation';
import SamplerCard from '../components/SamplerCard';
import {IconButton} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ExitToApp from '@mui/icons-material/ExitToApp';
import {useContext} from 'react';
import AuthContext from '../lib/contexts/AuthContext';

export default function Home () {
  // const sysClient = new GraphQLClient ({
  //   url: process.env.NEXT_PUBLIC_API_URL + '/system',
  //   headers: client.headers,
  // });

  const client = useContext (ClientContext);

  const {user, tokens, logoutHandler} = useContext (AuthContext);

  const {data, refetch} = useQuery (ALL_SAMPLERS_QUERY);

  // const {data: authData, error: authError} = useQuery (GET_ME_QUERY, {
  //   client: sysClient,
  // });

  //fetch graphql data here
  //todo: create new ALL POSTS QUERY

  // const [createPost] = useMutation (CREATE_POST_MUTATION);

  if (!data) return <div>Loading...</div>;

  const {Samplers: samplers} = data;

  // console.log (sysClient);
  // console.log (authData);
  // console.log (client);
  // console.log (user);
  // console.log (tokens);

  return (
    <section>
      <Grid
        container
        direction="column"
        alignItems="flex-start"
        justifyContent={'flex-start'}
        sx={{minHeight: '100vh', pt: '5rem'}}
      >
        <Stack
          direction="row"
          justifyContent={'space-between'}
          sx={{minWidth: '100%'}}
        >
          <Typography
            variant="h4"
            component={Box}
            fontWeight="bold"
            sx={{color: '#ff5252', mb: '3rem'}}
          >
            Trickify
          </Typography>
          {user &&
            <Box>
              <IconButton sx={{color: 'primary.main'}} onClick={logoutHandler}>
                <ExitToApp />
              </IconButton>
            </Box>}
        </Stack>
        <Stack direction="column" spacing={2}>
          {samplers.map (sampler => (
            <SamplerCard key={sampler.id} sampler={sampler} />
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
