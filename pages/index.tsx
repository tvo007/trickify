import { GetStaticProps } from "next";
import SamplerCard from "../components/SamplerCard";
import { getSamplers } from "../lib/api";
import { Box, Grid, Stack, Typography } from "@mui/material";

export default function Home({ samplers }) {
  // if (!data) return <div>Loading...</div>;

  return (
    <Stack direction="column" spacing={4} sx={{ width: "100%" }}>
      <Stack sx={{ pl: "8px" }}>
        <Typography component={Box} variant="h5">
          Watch Samplers. Learn Tricks.
        </Typography>
      </Stack>
      {!samplers && <h2>Loading...</h2>}
      <Grid container rowSpacing={4} columns={{ xs: 1, sm: 2 }}>
        {samplers.length > 0 &&
          samplers.map((sampler) => (
            <Grid item key={sampler.id} xs={1}>
              <SamplerCard sampler={sampler} />
            </Grid>
            // <div key={sampler.id}>{sampler.name}</div>
          ))}
      </Grid>

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
