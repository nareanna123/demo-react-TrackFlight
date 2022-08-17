import styled from "@emotion/styled";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Box,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { useState } from "react";
import { Link } from "react-router-dom";

const FlightsList = (props: any): JSX.Element | null => {
  const { sort, order, orderBy } = props;

  const SortLabel = (props: any) => {
    return (
      <TableSortLabel
        active={props.orderBy === props.headCell}
        direction={props.orderBy === props.headCell ? props.order : "asc"}
      //   onClick={handleRequestSort(headCell.id)}
      >
        {props.headCell.label}
        {props.orderBy === props.headCell ? (
          <Box component="span" sx={visuallyHidden}>
            {props.order === "desc" ? "sorted descending" : "sorted ascending"}
          </Box>
        ) : null}
      </TableSortLabel>
    );
  };

  return (
    <StyledContainer>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledHeaderCell onClick={() => sort("airline")}>
                Airline{" "}
                <SortLabel order={order} orderBy={orderBy} headCell="airline" />
              </StyledHeaderCell>
              <TableCell align="right">Air Craft</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right" onClick={() => sort("departure")}>
                Departure{" "}
                <SortLabel
                  order={order}
                  orderBy={orderBy}
                  headCell="departure"
                />
              </TableCell>
              <TableCell align="right" onClick={() => sort("arrival")}>
                Arrival{" "}
                <SortLabel order={order} orderBy={orderBy} headCell="arrival" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.flights.map((flight: any, index: any) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {flight.airline}
                </TableCell>
                <Link to={'/post/' + flight.aircraft}><TableCell align="right" sx={{color: "primary.dark"}}>{flight.aircraft}</TableCell></Link>
                <TableCell align="right">{flight.status}</TableCell>
                <TableCell align="right">{flight.departure}</TableCell>
                <TableCell align="right">{flight.arrival}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      

    </StyledContainer>
  );
};

export default FlightsList;

const StyledContainer = styled.div`
  margin: 20px;
`;

const StyledHeaderCell = styled(TableCell)`
  cursor: pointer;
`;
