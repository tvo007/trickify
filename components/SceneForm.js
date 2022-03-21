import {useState} from 'react';
import {TextField, Stack, Box} from '@mui/material';
import {Typography} from '@mui/material';
import {Button} from '@mui/material';
import {CREATE_SCENE_MUTATION} from '../lib/graphql-query-mutation';
import {useMutation} from 'graphql-hooks';

const intitialState = {
  timestamp: '',
  tricks: '',
};

const SceneForm = ({samplerId, refetch}) => {
  const [createScene] = useMutation (CREATE_SCENE_MUTATION);

  const [state, setState] = useState (intitialState);

  const handleChange = e => {
    const value = e.target.value;
    setState ({
      ...state,
      [e.target.name]: value,
    });
  };

  const handleCreateScene = async () => {
    await createScene ({
      variables: {
        timestamp: parseInt (state.timestamp),
        tricks: state.tricks,
        id: samplerId,
      },
    });

    refetch ();

    // console.log ({
    //   variables: {
    //     timestamp: parseInt (state.timestamp),
    //     tricks: state.tricks,
    //     sampler_id: {
    //       id: samplerId,
    //     },
    //   },
    // });
  };

  const submitHandler = e => {
    e.preventDefault ();
    handleCreateScene ();
    setState (intitialState);
  };

  return (
    <Stack direction={'column'} spacing={4}>
      <Stack direction="row" justifyContent={'space-between'}>
        <Typography component={Box} fontWeight={'medium'} variant={'h5'}>
          Scene Form
        </Typography>

        <Box>
          <Button size="small">Get Current Time</Button>

        </Box>
      </Stack>

      <form onSubmit={submitHandler}>
        <Stack direction={'column'} spacing={4}>
          <Box>
            <Typography>
              Timestamp (seconds)
            </Typography>
            <TextField
              name="timestamp"
              id="timestamp"
              value={state.timestamp}
              onChange={handleChange}
              fullWidth
              type={'number'}
              size="small"
              required
            />

          </Box>
          <Box>
            <Typography>
              Tricks
            </Typography>
            <TextField
              name="tricks"
              id="tricks"
              fullWidth
              onChange={handleChange}
              value={state.tricks}
              multiline
              rows={4}
              size="small"
            />

          </Box>

          <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
            <Button type="submit">Submit</Button>
          </Box>

        </Stack>
      </form>
    </Stack>
  );
};

export default SceneForm;
