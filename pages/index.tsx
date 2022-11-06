import { GetStaticProps } from "next";
import SamplerCard from "../components/SamplerCard";
import { getSamplers } from "../lib/api";
import { Stack, Typography } from "@mui/material";

export default function Home({ samplers }) {
  // if (!data) return <div>Loading...</div>;

  return (
    <Stack direction="column" spacing={2}>
      {!samplers && <h2>Loading...</h2>}
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
  const samplers = await getSamplers();

  return {
    props: { samplers },
  };
};

//vanilla
