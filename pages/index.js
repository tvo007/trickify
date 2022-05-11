import {Stack} from '@mui/material';

import SamplerCard from '../components/SamplerCard';
import {useQuery} from 'react-query';

import {getSamplers} from '../lib/api';
import {Typography} from '@mui/material';

export default function Home({samplers}) {
  const {
    status,
    data,
    error,
    isFetching,
    isSuccess,
  } = useQuery ('samplers', getSamplers, {initialData: samplers});

  // if (!data) return <div>Loading...</div>;
  return (
    <Stack direction="column" spacing={2}>
      {/* {isFetching && <h2>Loading</h2>} */}
      {data.length > 0 &&
        data.map (sampler => (
          <SamplerCard key={sampler.id} sampler={sampler} />
        ))}

      {data.length === 0 &&
        <Typography variant="h3">No samplers available.</Typography>}
    </Stack>
  );
}

export async function getStaticProps () {
  const samplers = await getSamplers ();

  return {
    props: {samplers},
  };
}

//init
