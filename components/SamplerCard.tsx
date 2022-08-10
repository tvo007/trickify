import { Stack } from "@mui/material";
import { Typography, Box, Button } from "@mui/material";
import Link from "next/link";
import React from "react";
import { useAuth } from "../lib/contexts/AuthContext";
import { ISampler } from "../lib/interfaces";

interface SamplerCardProps {
  sampler: ISampler;
}

//represents each sampler on main index page
function SamplerCard({ sampler }: SamplerCardProps) {
  const { isAuth } = useAuth();
  return (
    <Box>
      <Box sx={{ pl: ".7rem" }}>
        <Box fontWeight={"medium"}>
          <Typography
            component={Link}
            href={`/${sampler.id}`}
            color={"text.primary"}
          >
            {sampler.name}
          </Typography>
        </Box>
        <Typography component={Box} color={"#6F6F6F"}>
          {sampler.created_by}
        </Typography>
        <Typography component={Box} color={"#6F6F6F"}>
          {sampler.upload_date}
        </Typography>
        <Typography component={Box} color={"#6F6F6F"}>
          {sampler.runtime} seconds
        </Typography>
      </Box>
      <Stack direction="row">
        <Link href={`/${sampler.id}`} passHref>
          <Button size="small">View Sampler</Button>
        </Link>
        {isAuth && (
          <Link href={`/admin/${sampler.id}`} passHref>
            <Button size="small">Edit Scenes</Button>
          </Link>
        )}
      </Stack>
    </Box>
  );
}

export default SamplerCard;
