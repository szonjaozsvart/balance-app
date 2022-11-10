import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import ListingMembers from "../components/ListingMembers";
import membersData from "../service/membersService";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./landing.css";

function Landing() {
  const [data, setData] = useState([]);
  useEffect(() => {
    membersData(50).then((members) => setData(members));
  }, []);

  return (
    <Container>
      <Grid margin={2}>
        <Link to="/addPage" title="Add a new member!" className="newMember">
          + ADD NEW MEMBER
        </Link>
      </Grid>
      <Typography margin={2}>
        Somebody made your day?
        <br></br>
        Let them know it!
      </Typography>
      {data === "undefined" || data.length === 0 ? (
        <Typography>
          If there is no one added to your list, start it right now!
        </Typography>
      ) : (
        <Grid container spacing={6} marginTop={3}>
          <ListingMembers allMembers={data} />
        </Grid>
      )}
    </Container>
  );
}

export default Landing;
