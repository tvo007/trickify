import {TextField, Stack, Box, Typography, Button} from '@mui/material';
import {useMutation, useQuery} from 'react-query';
import {useState, useEffect, useContext} from 'react';
import {addScene, getScenesBySamplerId} from '../lib/api';
import AuthContext from '../lib/contexts/AuthContext';
import {Fragment} from 'react';

const intitialState = {
  timestamp: '',
  tricks: '',
  performedBy: '',
};

const SceneForm = ({
  samplerId,
  duration,
  handleDuration,
  isMobile,
  setMobile,
}) => {
  const [state, setState] = useState (intitialState);
  const [reuseName, setReuseName] = useState (true);
  const {isAuth} = useContext (AuthContext);
  /**old code */
  // const queryClient = useQueryClient ();

  const {refetch} = useQuery ('scenes', async () => getScenesBySamplerId (samplerId), {
    cacheTime: 0,
    //
  });

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
      performed_by: state.performedBy,
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
    if (reuseName) {
      setState ({...intitialState, performedBy: state.performedBy});
    } else {
      setState (intitialState);
    }
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

              <Box>
                <Typography>
                  Performed By
                </Typography>
                <TextField
                  name="performedBy"
                  id="performedBy"
                  fullWidth
                  onChange={handleChange}
                  value={state.performedBy}
                  size="small"
                  required
                />

              </Box>

              <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button type="submit">Submit</Button>
              </Box>

            </Stack>
          </form>
        </Stack>
      }
    </Fragment>
  );
};

export default SceneForm;
