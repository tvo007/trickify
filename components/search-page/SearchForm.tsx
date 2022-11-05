import { Button, Grid, Stack, TextField } from "@mui/material";
import React from "react";

interface SearchFormProps {
  handleSubmit: () => void;
  handleChange: () => void;
  searchInput: { tricks: string };
}

const SearchForm = ({ handleSubmit, handleChange, searchInput }) => {
  return searchInput ? (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Trick Search"
          variant="outlined"
          size="medium"
          fullWidth
          name="tricks"
          id="tricks"
          onChange={handleChange}
          value={searchInput.tricks || ""}
          required
          inputProps={{ spellCheck: "false" }}
        />
        <Grid
          container
          direction="column"
          justifyContent={"center"}
          alignItems={"flex-end"}
        >
          <Button
            variant="contained"
            sx={{
              "&:hover": {
                backgroundColor: "primary.light",
              },
            }}
            type="submit"
          >
            Search
          </Button>
        </Grid>
      </Stack>
    </form>
  ) : null;
};

export default SearchForm;
