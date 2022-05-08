import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import KofiButton from "kofi-button";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Table from "component/Table";

export default function ScoreBoard() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Container>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={8}>
          <Typography variant="h4" component="h1" my={3}>
            West Coast Noobs Scoreboard 🧟‍♀️
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          sx={{ textAlign: matches ? "right" : "left" }}
        >
          <KofiButton
            color="#13C3FF"
            title="Help with server cost!"
            kofiID="westcoastnoobs"
          />
        </Grid>
      </Grid>
      <Table />
    </Container>
  );
}
