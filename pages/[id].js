import {Fragment} from 'react';
// import {useMutation, useQuery} from 'graphql-hooks';
import {useQuery} from 'react-query';

// import Breadcrumbs from '../components/breadcrumbs';

import PlayerContainer from '../components/PlayerContainer';
import {getSamplerById, getSamplers} from '../lib/api';

export default function SinglePage({sampler}) {
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
  } = useQuery ('sampler', getSamplerById, {
    cacheTime: 0,
    initialData: sampler,
    //
  });

  // console.log (data);
  return (
    <Fragment>
      {data &&
        isSuccess &&
        <PlayerContainer sampler={data} refetch={refetch} />}
      {isFetching && !data && <h2>Loading</h2>}
      {isSuccess && !data && <h2>Does not exist.</h2>}
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
  const sampler = await getSamplerById (id);
  return {
    props: {sampler},
  };
}
