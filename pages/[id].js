import {Fragment} from 'react';
// import {useMutation, useQuery} from 'graphql-hooks';
import {useQuery} from 'react-query';

// import Breadcrumbs from '../components/breadcrumbs';

import PlayerContainer from '../components/PlayerContainer';
import {getSamplerById, getSamplers} from '../lib/api';

export default function SinglePage({id}) {
  // const theme = useTheme ();
  // const mdMatches = useMediaQuery (theme.breakpoints.up ('md'));

  /*
  gql code
  const {data, refetch} = useQuery (SAMPLER_QUERY, {variables: {id}});
  if (!data) return <div>Loading...</div>;
  const {Samplers_by_id: sampler} = data;
  */
  const {
    status,
    data,
    error,
    isFetching,
    isSuccess,
    refetch,
  } = useQuery ('sampler', async () => getSamplerById (id), {
    cacheTime: 0,
    //
  });

  // console.log (data);
  return (
    <Fragment>
      {data &&
        isSuccess &&
        <PlayerContainer sampler={data} refetch={refetch} />}
      {isFetching && <h2>Loading</h2>}
    </Fragment>
  );
}

//statically generate paths instead of dynamically generating data
// export async function getStaticPaths () {
//   const data = await getSamplers ();

//   return {
//     paths: data.samplers.map (sampler => ({
//       params: {id: sampler.id},
//     })), //maps out each product statically to a route
//     fallback: false,
//   };
// }

export async function getServerSideProps (context) {
  const {id} = context.params;

  return {
    props: {id},
  };
}
