import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import validator from 'validator';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Container } from '@mui/system';
import adding from '../service/addingService';
import FormField from '../components/FormField';

function AddingPage() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (validator.isEmpty(nickname) || validator.isEmpty(email)) {
      setShowError(true);
      setErrorMessage('Please fill all the fields!');
      return;
    }
    if (!validator.isEmail(email)) {
      setShowError(true);
      return setErrorMessage("Email is required");
    }
    adding(email, nickname, setErrorMessage, setShowError, navigate);
  };

  return (
    <Grid>
      {window.localStorage.length < 1 ? <Typography>Please <Link to="/registration">register</Link> or <Link to="/login">log in</Link>!</Typography> : (
    <Grid align="center" justifyContent="center" margin={5}>
      <Typography variant="h3" margin={3} fontWeight="bold" component="span" color="primary">
        ADD A NEW MEMBER
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
              name="Nickname"
              type="text"
              label="Their Nickname"
              icon={<PersonIcon fontSize="large" />}
              value={nickname}
              onChange={setNickname}
            />
            <br />
            <FormField
              name="Email"
              type="text"
              label="Their Email"
              icon={<EmailIcon fontSize="large" />}
              value={email}
              onChange={setEmail}
            />
            <br />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              title="Customize your relations!"
            >
              Submit
            </Button>
          </form>
        </Typography>
      </Container>
    </Grid>)
 } </Grid>
  );
}

export default AddingPage
