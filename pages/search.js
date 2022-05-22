import {
  Typography,
  TextField,
  Box,
  Button,
  Grid,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, {useState} from 'react';
import {useMutation} from 'react-query';
import {searchScenes} from '../lib/api';
import breakpoints from '../lib/helpers/breakpoints';

const intitialState = {
  tricks: '',
};

const Search = () => {
  const theme = useTheme ();
  const mdUp = useMediaQuery (theme.breakpoints.up (breakpoints.medium));
  const mdDown = useMediaQuery (theme.breakpoints.down (breakpoints.medium));
  const [state, setState] = useState (intitialState);

  const {mutateAsync, data} = useMutation (searchScenes, {});

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
    handleQueryScene ();
    // await mutateAsync(state.tricks)
    // console.log(state.tricks)
  };

  return (
    // <Typography variant="h2">
    //   Under Construction
    // </Typography>
    (
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
        <Grid container direction={mdUp ? 'row' : 'column-reverse'}>
          {/**player goes here */}
          <Grid item sx={{px: '1rem', maxWidth: mdUp ? '35vw' : null}}>
            <Typography>
              Search Result(s):
            </Typography>
            <Grid container direction="column">
              {data &&
                data.map (item => (
                  <Button
                    size="small"
                    key={item.id}
                    fullWidth={false}
                    sx={{
                      textAlign: 'left',
                      display: 'inline-block',
                      width: 'auto',
                    }}
                  >
                    {item.tricks}
                  </Button>
                ))}
            </Grid>

          </Grid>
          <Grid item sx={{minHeight: '30vh', minWidth: '40vw'}}>
            <Typography>Player</Typography>
          </Grid>
        </Grid>

      </Stack>
    )
  );
};

//commit

export default Search;
