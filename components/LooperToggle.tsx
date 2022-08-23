import { Box, FormControlLabel, Switch, Typography } from "@mui/material";
import React from "react";

interface LooperToggleProps {
  isLooping: boolean;
  handleLooperToggle(e: React.ChangeEvent<HTMLInputElement>): void;
}

const LooperToggle = ({ isLooping, handleLooperToggle }: LooperToggleProps) => {
  return (
    <FormControlLabel
      value="start"
      control={
        <Switch
          color="primary"
          size="small"
          checked={isLooping}
          onChange={(e) => handleLooperToggle(e)}
        />
      }
      label={
        <Typography component={Box} sx={{ mb: "5px" }}>
          Auto Looper
        </Typography>
      }
      labelPlacement="start"
      sx={{ pb: "8px" }}
    />
  );
};

export default LooperToggle;
