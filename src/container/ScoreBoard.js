import { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import KofiButton from "kofi-button";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Box from "@mui/material/Box";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";

import Table from "component/Table";
import React from "react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }

export default function ScoreBoard() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  // const [value, setValue] = useState(0);

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };
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
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Table />
        {/* <Tabs */}
        {/*   value={value} */}
        {/*   onChange={handleChange} */}
        {/*   aria-label="basic tabs example" */}
        {/* > */}
        {/*   <Tab label="Light Server" {...a11yProps(0)} /> */}
        {/*   <Tab label="Heavy Server" {...a11yProps(1)} /> */}
        {/* </Tabs> */}
      </Box>
      {/* <TabPanel value={value} index={0}> */}
      {/* <Table server="light" /> */}
      {/* </TabPanel> */}
      {/* <TabPanel value={value} index={1}> */}
      {/* <Table server="heavy" /> */}
      {/* </TabPanel> */}
    </Container>
  );
}
