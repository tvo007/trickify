import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Link as MUILink} from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from 'next/link';
import {useState, useContext} from 'react';
import {GET_ME_QUERY, LOGIN_MUTATION} from '../lib/graphql-query-mutation';
import {
  useMutation,
  ClientContext,
  GraphQLClient,
  useQuery,
  useManualQuery,
} from 'graphql-hooks';
import router from 'next/router';
import AuthContext from '../lib/contexts/AuthContext';
import {useEffect} from 'react';

const initialValues = {
  email: '',
  password: '',
};

const Login = () => {
  const {user, setUser, tokens, setTokens, loginHandler} = useContext (
    AuthContext
  );

  const client = useContext (ClientContext);
  const systemClient = new GraphQLClient ({
    url: process.env.NEXT_PUBLIC_API_URL + '/system',
    headers: client.headers,
  });

  const [login] = useMutation (LOGIN_MUTATION, {client: systemClient});
  const [getMe] = useManualQuery (GET_ME_QUERY, {client: systemClient});

  const [values, setValues] = useState (initialValues);

  const handleLogin = async () => {
    // e.preventDefault ();
    const {data, error} = await login ({
      variables: {
        email: values.email,
        password: values.password,
      },
    });

    if (error) {
      console.log ('Login failed due to an error.');
    } else {
      const {access_token, refresh_token} = data.auth_login;
      client.setHeader ('Authorization', `Bearer ${access_token}`);
      // console.log ({access_token, refresh_token});
      // router.push ('/');
      setTokens({access_token, refresh_token})
    }
  };

  const handleGetMe = async () => {
    const authData = await getMe ();
    if (authData) {
      console.log (authData.data.users_me);
      setUser (authData.data.users_me);
    } else {
      console.log ('Failed retrieving user data');
    }
  };

  const handleInputChange = e => {
    setValues ({...values, [e.target.name]: e.target.value});
  };

  const handleSubmit = async e => {
    e.preventDefault ();
    await handleLogin ();
    setValues (initialValues);
    await handleGetMe ();
  };

  useEffect (() => {
    if (user) router.push ('/');
  }, [user]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{m: 1, bgcolor: 'primary.main'}}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={values.email}
            autoComplete="email"
            onChange={handleInputChange}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            value={values.password}
            label="Password"
            type="password"
            id="password"
            onChange={handleInputChange}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              '&:hover': {
                backgroundColor: 'rgb(248 113 113)',
                textColor: 'white',
              },
            }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register">
                <MUILink
                  variant="body2"
                  sx={{
                    '&:hover': {
                      cursor: 'pointer',
                    },
                  }}
                >
                  Don't have an account? Sign Up
                </MUILink>

              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* <Copyright sx={{mt: 8, mb: 4}} /> */}
    </Container>
  );
};

export default Login;
