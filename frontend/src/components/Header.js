import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css"
import Grid from '@mui/material/Grid';
import { Typography } from "@mui/material";

function NavBar() {
  return (
    <Grid display="flex" backgroundColor="#0277bd" justifyContent="space-between" alignItems="center" borderRadius={2}>
      <Typography className="title" margin={2}>
       BALANCE APP
      </Typography>
      <Grid display="flex" flexDirection="row" margin={2}>
        <Link to="/login" className="login">Login</Link>
        <Link to="/registration" className="join">Join</Link>
        <Link to="/about" className="about">About</Link>
      </Grid >
    </Grid >
  );
}

export default NavBar;