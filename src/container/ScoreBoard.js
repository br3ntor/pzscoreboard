import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import Table from "component/Table";

export default function ScoreBoard() {
  return (
    <Container>
      <Typography variant="h4" component="h1" my={3}>
        West Coast Noobs Scoreboard 🧟‍♀️
      </Typography>
      <Table />
    </Container>
  );
}
