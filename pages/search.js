import {Typography} from '@mui/material';
import {TextField, Box, Button, Grid, Stack} from '@mui/material';
import React, {useState} from 'react';
import {useMutation} from 'react-query';
import {searchScenes} from '../lib/api';

const intitialState = {
  tricks: '',
};

const Search = () => {
  const [state, setState] = useState (intitialState);

  const [result, setResult] = useState ([]);

  const {mutateAsync, data} = useMutation (searchScenes, {
  });

  const handleChange = e => {
    const value = e.target.value;
    setState ({
      ...state,
      [e.target.name]: value,
    });
  };

  const handleQueryScene = async () => {
    await mutateAsync ({
      tricks: state.tricks,
    });
  };

  const submitHandler = e => {
    e.preventDefault ();
    handleQueryScene()
    // await mutateAsync(state.tricks)
    // console.log(state.tricks)
  };

  return (
    <Stack sx={{width: '100%'}} spacing={4}>
      <Box>
        <form onSubmit={submitHandler}>
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
      </Box>
      <Box sx={{px: '1rem'}}>
        <Typography>
          Search Result(s):
        </Typography>
        {data &&
          data.map (item => (
            <Typography key={item.id}>
              {item.tricks}
            </Typography>
          ))}
      </Box>
    </Stack>
  );
};

export default Search;
