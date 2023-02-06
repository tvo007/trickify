import { Fragment } from "react";
// import {useMutation, useQuery} from 'graphql-hooks';
import { useQuery } from "react-query";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
// import Breadcrumbs from '../components/breadcrumbs';

import SamplerPageContainer from "../../../components/sampler-page/SamplerPageContainer";
import {
  getSamplerById,
  getSamplers,
  getScenesBySamplerId,
} from "../../../lib/api";
import { ISampler, IScene } from "../../../lib/interfaces";

interface SinglePageProps {
  sampler: ISampler;
  scenes: IScene[];
}

export default function SinglePage({ sampler, scenes }: SinglePageProps) {
  // console.log(scenes);
  return (
    <Fragment>
      {sampler && scenes && (
        <SamplerPageContainer sampler={sampler} scenes={scenes} />
      )}
      {!sampler || (!scenes && <h2>Something went wrong.</h2>)}
    </Fragment>
  );
}

//statically generate paths instead of dynamically generating data
export const getStaticPaths: GetStaticPaths = async () => {
  const samplers = await getSamplers();

  return {
    paths: samplers.map((sampler) => ({
      params: { id: sampler.id },
    })), //maps out each product statically to a route
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params;
  const sampler = await getSamplerById(id);
  const rawScenes = await getScenesBySamplerId(sampler.id);

  //copy rawScenes and create copy with index value
  const scenes = rawScenes.map((scene, index) => {
    return { ...scene, index: index + 1 };
  });

  // data.map((scene, index) => {
  //   return { ...scene, index: index + 1 };
  // }),

  return {
    props: { sampler, scenes },
  };
};
