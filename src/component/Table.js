import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";

async function getPlayerData() {
  const data = await fetch(process.env.REACT_APP_PZAPI);
  return data.json();
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "kills",
    numeric: true,
    disablePadding: false,
    label: "Kills",
  },
  {
    id: "survived",
    numeric: true,
    disablePadding: false,
    label: "Time Survived",
  },
  {
    id: "health",
    numeric: true,
    disablePadding: false,
    label: "Health",
  },
  {
    id: "infected",
    numeric: true,
    disablePadding: false,
    label: "Infected",
  },
  {
    id: "prof",
    numeric: true,
    disablePadding: false,
    label: "Profession",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "desc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default function EnhancedTable({ server }) {
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("kills");
  const [rows, setRows] = useState([]);

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
  };

  const getAndSetData = (whichServer) => {
    getPlayerData(whichServer).then((player) => {
      const currentRows = [];
      const topKiller = player.reduce((prev, curr) =>
        JSON.parse(curr.stats).kills > JSON.parse(prev.stats).kills
          ? curr
          : prev,
      );
      player.forEach((p) => {
        if (p.name !== "FLUX") {
          currentRows.push({
            name: p.name === topKiller.name ? ` ${p.name} 👑` : p.name,
            kills: JSON.parse(p.stats).kills,
            survived: JSON.parse(p.stats).hours,
            health: JSON.parse(p.health).health,
            infected: JSON.parse(p.health).infected ? "Yes" : "No",
            prof: JSON.parse(p.stats).profession,
          });
        }
      });
      setRows(currentRows);
      console.log("Table loaded.");
    });
  };

  useEffect(() => {
    getAndSetData(server);
  }, [server]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 0 }}>
        <TableContainer sx={{ maxHeight: "80vh" }}>
          <Table
            stickyHeader
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"small"}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {rows
                .slice()
                .sort(getComparator(order, orderBy))
                .slice(0, 30)
                .map((row, index) => {
                  return (
                    <TableRow hover tabIndex={-1} key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.kills}</TableCell>
                      <TableCell align="right">{row.survived}</TableCell>
                      <TableCell align="right">{row.health}</TableCell>
                      <TableCell align="right">{row.infected}</TableCell>
                      <TableCell align="right">{row.prof}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
