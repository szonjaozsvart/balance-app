import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validator from 'validator';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Container } from '@mui/system';
import login from '../service/loginService';
import FormField from '../components/FormField';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (validator.isEmpty(password) || validator.isEmpty(email)) {
      setShowError(true);
      setErrorMessage('Please fill the email and the password too!');
      return;
    }
    login(email, password, setErrorMessage, setShowError, navigate);
  };

  return (
    <Grid align="center" justifyContent="center">
      <Typography variant="h3" margin={3} fontWeight="bold" component="span">
        Login
      </Typography>
      <Container align="center" maxWidth="xs">
        {showError && (
          <Alert severity="error" variant="filled">
            <AlertTitle align="center">{errorMessage}</AlertTitle>
          </Alert>
        )}
        <br />
      </Container>
      <Container maxWidth="sm">
        <Typography align="center" component="span">
          <form onSubmit={handleLogin}>
            <FormField
              name="Email"
              type="text"
              label="Email"
              icon={<PersonIcon fontSize="large" />}
              value={email}
              onChange={setEmail}
            />
            <br />
            <FormField
              name="Password"
              type="password"
              label="Password"
              icon={<PasswordIcon fontSize="large" />}
              value={password}
              onChange={setPassword}
            />
            <br />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              title="Go to Landing page"
            >
              Login
            </Button>
            <Typography align="center" padding={5}>
              <Link
                color="primary"
                to="/registration"
                title="Go to Registration"
                className="link"
              >
                If you do not have an account, click here to register!
              </Link>
            </Typography>
          </form>
        </Typography>
      </Container>
    </Grid>
  );
}

export default Login;
