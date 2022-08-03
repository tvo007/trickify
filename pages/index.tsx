import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import SamplerCard from "../components/SamplerCard";
import { useQuery, QueryClient, dehydrate } from "react-query";
import { getSamplers } from "../lib/api";
import { Stack, Typography } from "@mui/material";

export default function Home({ dehydratedState: samplers }) {
  const { status, data, error, isFetching, isSuccess } = useQuery(
    "samplers",
    getSamplers,
    { initialData: samplers }
  );

  // if (!data) return <div>Loading...</div>;
  return (
    <Stack direction="column" spacing={2}>
      {isFetching && !data && <h2>Loading...</h2>}
      {data.length > 0 &&
        data.map((sampler) => (
          <SamplerCard key={sampler.id} sampler={sampler} />
        ))}

      {data.length === 0 && (
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
}

//init
