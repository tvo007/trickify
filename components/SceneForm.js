import {useState} from 'react';
import {TextField, Stack, Box} from '@mui/material';
import {Typography} from '@mui/material';
import {Button} from '@mui/material';
import {useMutation, useQueryClient} from 'react-query';
import {useEffect} from 'react';
import {addScene} from '../lib/api';

const intitialState = {
  timestamp: '',
  tricks: '',
};

const SceneForm = ({
  samplerId,
  refetch,
  duration,
  handleDuration,
  isMobile,
  setMobile,
}) => {
  const [state, setState] = useState (intitialState);

  /**old code */
  // const queryClient = useQueryClient ();
  const {
    mutateAsync,
  } = useMutation (addScene, {
    onSuccess: () => {
      refetch ();
    },
  });

  const handleCreateScene = async () => {
    await mutateAsync ({
      timestamp: parseInt (state.timestamp),
      tricks: state.tricks,
      sampler_id: samplerId,
    });
  };
  /**old code */

  const handleChange = e => {
    const value = e.target.value;
    setState ({
      ...state,
      [e.target.name]: value,
    });
  };

  const submitHandler = e => {
    e.preventDefault ();
    handleCreateScene ();
    setState (intitialState);
  };

  useEffect (
    () => {
      let roundedDuration = Math.floor (duration);
      setState ({...state, timestamp: roundedDuration});
    },
    [duration]
  );

  return (
    <Stack direction={'column'} spacing={4}>
      <Stack direction="row" justifyContent={'space-between'}>
        <Typography component={Box} fontWeight={'medium'} variant={'h5'}>
          Scene Form
        </Typography>

        <Box>
          <Button size="small" onClick={handleDuration}>
            Get Current Time
          </Button>
          {isMobile &&
            <Button size="small" onClick={() => setMobile (false)}>X</Button>}
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
              onWheel={event => event.target.blur ()}
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
