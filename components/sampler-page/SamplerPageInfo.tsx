import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { ISampler } from "../../lib/interfaces";

interface SamplerPageInfoProps {
  sampler: ISampler
}

const SamplerPageInfo = ({ sampler }: SamplerPageInfoProps) => {
  return (
    <Grid container direction="row" justifyContent={"space-between"}>
      <Grid item>
        <Typography component={Box} fontWeight="bold">
          {sampler.name}
        </Typography>
        <Typography component={Box} color={"#6F6F6F"}>
          {sampler.created_by}
        </Typography>
      </Grid>
      {/**editor button, auth only */}
    </Grid>
  );
};

export default SamplerPageInfo;
