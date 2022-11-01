import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import validator from "validator";
import Button from "@mui/material/Button";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import PasswordIcon from "@mui/icons-material/Password";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import register from "../service/registrationService";
import FormField from "../components/FormField";
import "./link.css";

export default function Registration() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState([]);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleCheckInput = () => {
    if (
      validator.isEmpty(firstName) &&
      validator.isEmpty(lastName) &&
      validator.isEmpty(email) &&
      validator.isEmpty(password) &&
      validator.isEmpty(confirmPassword)
    ) {
      setShowError(true);
      return setErrorMessage("Name, email and password are required.");
    }
    if (validator.isEmpty(firstName)) {
      setShowError(true);
      return setErrorMessage("First name is required");
    }
    if (validator.isEmpty(lastName)) {
        setShowError(true);
        return setErrorMessage("Last name is required");
      }
    if (!validator.isEmail(email)) {
      setShowError(true);
      return setErrorMessage("Email is required");
    }
    if (!validator.isStrongPassword(password)) {
      setShowError(true);
      return setErrorMessage(
        "Password must be at least 8 characters, including min 1 uppercased letter and min 1 symbol."
      );
    }
    if (password !== confirmPassword) {
      setShowError(true);
      return setErrorMessage(
        "The passwords are not the same, please check them again!"
      );
    }
    setErrorMessage([]);
    setShowError(false);
    return true;
  };

  const handleSubmitRegistration = (e) => {
    e.preventDefault();
    if (handleCheckInput()) {
      register(firstName,lastName, email, password, setErrorMessage, setShowError, navigate);
    }
  };
  return (
    <Grid align="center" justifyContent="center" margin={5}>
      <Typography variant="h3" margin={3} fontWeight="bold" component="span" color="primary" >
        Registration
      </Typography>
      <Container align="center" maxWidth="xs" data-testid="errorContainer">
        {showError && (
          <Alert severity="error" variant="filled">
            <AlertTitle align="center" data-testid="alertText">
              {errorMessage}
            </AlertTitle>
          </Alert>
        )}
        <br />
      </Container>
      <Container className="formContainer" maxWidth="sm" >
        <form onSubmit={handleSubmitRegistration}>
          <FormField
            name="FirstName"
            type="text"
            label="First Name"
            icon={<PersonIcon fontSize="large" />}
            value={firstName}
            onChange={setFirstName}
          />
          <br />
          <FormField
            name="LastName"
            type="text"
            label="Last Name"
            icon={<PersonIcon fontSize="large" />}
            value={lastName}
            onChange={setLastName}
          />
          <br />
          <FormField
            name="Email"
            type="text"
            label="Email"
            icon={<EmailOutlinedIcon fontSize="large" />}
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
          <FormField
            name="ConfirmPassword"
            type="password"
            label="Confirm Password"
            icon={<PasswordIcon fontSize="large" />}
            value={confirmPassword}
            onChange={setConfirmPassword}
          />
          <br />
          <Button
            type="submit"
            variant="contained"
          >
            Registration
          </Button>
          <br />
          <br />
          <Typography align="center" padding={3}>
          <Link
            to="/login"
            title="Go to Registration"
            className="link"
          >
            You already have an account? Click here!
          </Link>
          </Typography>
        </form>
      </Container>
    </Grid>
  );
}
