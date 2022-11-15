import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Button, Typography } from '@mui/material';

export default function ListingMembers({ allMembers }) {
  return (
    <>
      {allMembers.map((member) => (
        <Grid item xs={3} key={member.id}>
            <Paper sx={{ padding: 3, opacity: 0.9, background: 'lightblue'}} >
              <Button variant="button" component="span">
                {member.first_name}
              </Button>
              <Typography>{member.email}</Typography>
            </Paper>
        </Grid>
      ))}
    </>
  );
}
