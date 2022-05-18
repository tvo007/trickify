import {useState, Fragment} from 'react';
// import {useMutation, useQuery} from 'graphql-hooks';
import {useQuery} from 'react-query';
import {useRouter} from 'next/router';
import {Typography, Grid, Box} from '@mui/material';

// import Breadcrumbs from '../components/breadcrumbs';
import EditorContainer from '../../components/EditorContainer';
import {getSamplerById} from '../../lib/api';

export default function SamplerEditor({id}) {
  // const theme = useTheme ();
  // const mdMatches = useMediaQuery (theme.breakpoints.up ('md'));

  /*
  gql code
  const {data, refetch} = useQuery (SAMPLER_QUERY, {variables: {id}});
  if (!data) return <div>Loading...</div>;
  const {Samplers_by_id: sampler} = data;
  */

  // const {
  //   status,
  //   data,
  //   error,
  //   isFetching,
  //   isSuccess,
  //   refetch,
  // } = useQuery ('sampler', async () => getSamplerById (id));


  return (
    <Fragment>
      {/* {data &&
        isSuccess &&
        <EditorContainer id = {id} />
        }
      {isFetching && <h2>Loading</h2>} */}
      <EditorContainer id={id} />
    </Fragment>
  );
}

export async function getServerSideProps (context) {
  const {id} = context.params;

  return {
    props: {id},
  };
}
