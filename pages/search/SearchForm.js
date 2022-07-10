import {Button, Grid, Stack, TextField} from '@mui/material';
import React from 'react';

const SearchForm = ({handleSubmit, handleChange, state}) => {
  return (
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
          value={state.tricks}
          required
        />
        <Grid
          container
          direction="column"
          justifyContent={'center'}
          alignItems={'flex-end'}
        >
          <Button
            variant="contained"
            sx={{
              '&:hover': {
                backgroundColor: 'primary.light',
              },
            }}
            type="submit"
          >
            Search
          </Button>
        </Grid>
      </Stack>
    </form>
  );
};

export default SearchForm;
