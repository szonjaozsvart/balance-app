import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

export default function ListingMembers({ allMembers }) {
  return (
    <>
      {allMembers.map((member) => (
        <Grid item xs={3} key={member.id}>
          <Paper sx={{ padding:1, background: 'lightblue' }} elevation={7}>
            <Paper sx={{ padding: 3, opacity: 0.9}}>
              <Button variant="button" component="span">
                {member.first_name} {member.last_name}
              </Button>
            </Paper>
          </Paper>
        </Grid>
      ))}
    </>
  );
}
