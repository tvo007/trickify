import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import SamplerCard from "../components/SamplerCard";
import { useQuery, QueryClient, dehydrate } from "react-query";
import { getSamplers } from "../lib/api";
import { Stack, Typography } from "@mui/material";

export default function Home({ dehydratedState: initialSamplers }) {
  const {
    status,
    data: samplers,
    error,
    isFetching,
    isSuccess,
  } = useQuery("samplers", getSamplers, { initialData: initialSamplers.data });

  // if (!data) return <div>Loading...</div>;

  return (
    <Stack direction="column" spacing={2}>
      {isFetching && !samplers.data && <h2>Loading...</h2>}
      {samplers.length > 0 &&
        samplers.map((sampler) => (
          <SamplerCard key={sampler.id} sampler={sampler} />
          // <div key={sampler.id}>{sampler.name}</div>
        ))}

      {samplers.length === 0 && (
        <Typography variant="h3">No samplers available.</Typography>
      )}
    </Stack>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("samplers", async () => getSamplers());

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

//vanilla
