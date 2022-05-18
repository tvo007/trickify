import {TextField, Stack, Box, Typography, Button} from '@mui/material';
import {useMutation} from 'react-query';
import {useState, useEffect, useContext} from 'react';
import {addScene} from '../lib/api';
import AuthContext from '../lib/contexts/AuthContext';
import {Fragment} from 'react';
import {useRouter} from 'next/router';

const intitialState = {
  timestamp: '',
  tricks: '',
};

const SceneForm = ({
  isFetching,
  isSuccess,
  refetch,
  duration,
  handleDuration,
  isMobile,
  setMobile,
}) => {
  const router = useRouter ();
  const {id: samplerId} = router.query;
  const [state, setState] = useState (intitialState);
  const {isAuth} = useContext (AuthContext);
  /**old code */
  // const queryClient = useQueryClient ();
  const {mutateAsync} = useMutation (addScene, {
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
    <Fragment>
      {/* {!isAuth &&
        <Typography variant="h3">Editor mode is for Admins Only.</Typography>} */}
      {
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
                <Button size="small" onClick={() => setMobile (false)}>
                  X
                </Button>}
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
                <Button type="submit" disabled={isFetching && true}>
                  Submit
                </Button>
              </Box>

            </Stack>
          </form>
        </Stack>
      }
    </Fragment>
  );
};

export default SceneForm;
