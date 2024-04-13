import { Grid, Typography } from '@mui/material';
import Billing from './components/Billing';

const App = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Billing Application</Typography>
      </Grid>
      <Grid item xs={12}>
        <Billing />
      </Grid>
    </Grid>
  );
};

export default App;
