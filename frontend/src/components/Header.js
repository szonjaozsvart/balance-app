import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import LogoutButton from "./LogoutButton";

function NavBar() {
  return (
    <Grid
      display="flex"
      backgroundColor="#0277bd"
      justifyContent="space-between"
      alignItems="center"
      borderRadius={2}
    >
      <Typography className="title" margin={2}>
        BALANCE APP
      </Typography>
      <Grid display="flex" flexDirection="row" margin={2}>
        {window.localStorage.length < 1 ? (
          <Link to="/login" className="login">
            LOGIN
          </Link>
        ) : (
          <Link to="/landing" className="login">
            LOGIN
          </Link>
        )}
        {window.localStorage.length < 1 ? (
          <Link to="/registration" className="join">
            JOIN
          </Link>
        ) : (
          <Link to="/landing" className="join">
            JOIN
          </Link>
        )}
        {window.localStorage.length < 1 ? null : <LogoutButton />}
      </Grid>
    </Grid>
  );
}

export default NavBar;
