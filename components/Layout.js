import React from 'react';
import {
  Container,
  Grid,
  Stack,
  Typography,
  Box,
  AppBar,
  Button,
  IconButton,
} from '@mui/material';
import AuthContext from '../lib/contexts/AuthContext';
import {useContext} from 'react';
import {Fragment} from 'react';
import {useRouter} from 'next/router';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SearchIcon from '@mui/icons-material/Search';

const Layout = ({children}) => {
  const router = useRouter ();
  const {isAuth, logoutHandler} = useContext (AuthContext);
  return (
    <Fragment>
      <Box sx={{flexGrow: 1}}>
        <AppBar
          position="relative"
          sx={{backgroundColor: 'white', height: '8vh'}}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: 'inherit',
            }}
          >

            <Stack
              direction="row"
              justifyContent={'space-between'}
              alignItems={'center'}
              sx={{
                height: '100%',
                px: '1rem',
                width: '100%',
                maxWidth: '1200px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => router.push ('/')}
              >

                <Typography
                  variant="h4"
                  component={Box}
                  fontWeight="bold"
                  sx={{color: '#ff5252', fontFamily: 'Permanent Marker', }}
                >
                  Trickify
                </Typography>
              </Box>
              <Stack direction="row">
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={() => router.push ('/search')}
                >
                  <IconButton sx={{color: 'primary.main'}}>
                    <SearchIcon />
                  </IconButton>

                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {isAuth
                    ? <IconButton
                        sx={{color: 'primary.main'}}
                        onClick={logoutHandler}
                      >
                        <ExitToAppIcon />
                      </IconButton>
                    : <Button onClick={() => router.push ('/login')}>
                        Admins Only
                      </Button>} {' '}
                </Box>

              </Stack>
            </Stack>
          </Box>

        </AppBar>
      </Box>
      <Container maxWidth="lg">

        <Grid
          container
          direction="column"
          alignItems="flex-start"
          justifyContent={'flex-start'}
          sx={{minHeight: '100vh', pt: '5rem'}}
        >
          {children}
        </Grid>

      </Container>
    </Fragment>
  );
};

export default Layout;
