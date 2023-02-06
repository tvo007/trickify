import { GetStaticProps } from "next";
import SamplerCard from "../components/SamplerCard";
import { getSamplers } from "../lib/api";
import { Box, Grid, Stack, Typography } from "@mui/material";


//WIP for index/landing/entry point page.
export default function Landing({ samplers }) {
  // if (!data) return <div>Loading...</div>;

  return (
    <Stack
      direction="column"
      spacing={4}
      sx={{ width: "100%", height: "100vh" }}
    >
      {" "}
      <Stack
        sx={{
          pl: "8px",
          width: "100%",
          height: "75%",
          py: "8rem",
        }}
        direction="column"
        justifyContent={"start"}
        alignItems={"start"}
        spacing={2}
      >
        <Typography component={Box} variant="h4">
          Watch Samplers.
        </Typography>
        <Typography component={Box} variant="h4" sx={{ pl: { md: "12rem" } }}>
          Learn Tricks.
        </Typography>
      </Stack>
      <Stack
        sx={{
          pl: "8px",
          width: "100%",
          height: "75%",
          py: "8rem",
        }}
        direction="column"
        justifyContent={"start"}
        alignItems={"start"}
        spacing={2}
      >
        <Typography component={Box} variant="h3">
          OUR MISSION
        </Typography>
        <Typography component={Box} variant="body2">
          Trickify is an app that helps users to explore tricking through the
          lens of a sampler. Each sampler is split up into scenes with each
          scene containing a set of tricks and video timestamp/endstamp values.
          This allows users to view and analyze sampler scenes in real time as
          the video progresses. As more samplers, scenes, and tricks are added,
          users will then be able to use this ever expanding tricks dataset for
          use in their own progressions and tricking ideas.
        </Typography>
      </Stack>
    </Stack>
  );
}

//vanilla
//use https://mockuphone.com to generate images wrapped in iphone/mac