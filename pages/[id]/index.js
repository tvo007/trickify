import {Fragment} from 'react';
// import {useMutation, useQuery} from 'graphql-hooks';
import {useQuery} from 'react-query';

// import Breadcrumbs from '../components/breadcrumbs';

import SamplerPageContainer from '../../components/sampler-page/SamplerPageContainer';
import {getSamplerById, getSamplers} from '../../lib/api';

export default function SinglePage({sampler, id}) {
  // console.log (data);
  return (
    <Fragment>
      {sampler && <SamplerPageContainer sampler={sampler} />}
      {!sampler && <h2>Something went wrong.</h2>}
    </Fragment> 
  );
}

//statically generate paths instead of dynamically generating data
export async function getStaticPaths () {
  const samplers = await getSamplers ();

  return {
    paths: samplers.map (sampler => ({
      params: {id: sampler.id},
    })), //maps out each product statically to a route
    fallback: false,
  };
}

export async function getStaticProps (context) {
  const {id} = context.params;
  const sampler = await getSamplerById (id);

  return {
    props: {sampler},
  };
}
