
import {Stack} from '@mui/material';

import SamplerCard from '../components/SamplerCard';
import {useQuery} from 'react-query';

import {getSamplers} from '../lib/api';

export default function Home () {
  const {
    status,
    data,
    error,
    isFetching,
    isSuccess,
  } = useQuery ('samplers', async () => getSamplers ());

  // if (!data) return <div>Loading...</div>;
  return (
    <Stack direction="column" spacing={2}>
      {isFetching && <h2>Loading</h2>}
      {data &&
        data.map (sampler => (
          <SamplerCard key={sampler.id} sampler={sampler} />
        ))}
    </Stack>
  );
}

export async function getStaticProps () {
  return {
    props: {},
  };
}

//init
