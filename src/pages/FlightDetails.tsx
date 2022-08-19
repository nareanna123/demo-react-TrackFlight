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
  TablePagination,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup  } from "react-simple-maps";

const FlightsList = (props: any): JSX.Element | null => {
  const { sort, order, orderBy } = props;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [fullscreen, setFullscreen] = useState(true);
  const [modalData, setModalData] = useState(props);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [pageData, setPageData] = useState([]);

  useEffect(() => {
    handlePageData();
  });

  const handlePageData = () => {
    setPageData(
      props.flights.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  };

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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

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
              <StyledHeaderCell align="right" onClick={() => sort("departure")}>
                Departure{" "}
                <SortLabel
                  order={order}
                  orderBy={orderBy}
                  headCell="departure"
                />
              </StyledHeaderCell>
              <StyledHeaderCell align="right" onClick={() => sort("arrival")}>
                Arrival{" "}
                <SortLabel order={order} orderBy={orderBy} headCell="arrival" />
              </StyledHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pageData.map((flight: any, index: any) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {flight.airline}
                </TableCell>
                <TableCell
                  align="right"
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={() => {
                    handleShow();
                    setModalData(flight);
                  }}
                >
                  {flight.aircraft}
                </TableCell>
                <TableCell align="right">{flight.status}</TableCell>
                <TableCell align="right">{flight.departure}</TableCell>
                <TableCell align="right">{flight.arrival}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={props.flights.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        scrollable={true}
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#002f5d", color: "white" }}
        >
          <Modal.Title style={{ width: "100%" }}>
            <span style={{ width: "50%" }}>
              {modalData.airline} {modalData.aircraft}
            </span>{" "}
            <span style={{ width: "50%", float: "right" }}>
              Status:{" "}
              <span
                style={{
                  backgroundColor: "lightgrey",
                  borderRadius: "0.5rem",
                  color: "green",
                }}
              >
                {modalData.status}
              </span>
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <table style={{ width: "100%", marginBottom: "2rem" }}>
              <td style={{ width: "50%" }}>
                <h1>Departure</h1>
                <br />
                Airport: {modalData.departure}
                <br />
              </td>
              <td style={{ width: "50%", alignContent: "flex-end" }}>
                <h1>Arrival</h1>
                <br />
                Airport: {modalData.arrival}
                <br />
              </td>
            </table>
            Airline: {modalData.airline} <br />
            Aircraft Number: {modalData.aircraft}
            <br />
            Flight Status: {modalData.status}
            <br />
          </div>

          <div style={{ float: "right", padding: "2rem" }}>
            
          <ComposableMap>
            <ZoomableGroup center={[modalData.longitude, modalData.latitude]} zoom={9}>
              <Geographies geography={geoUrl}>
                {({ geographies }: any) =>
                  geographies.map((geo: any) => (
                    <Geography key={geo.rsmKey} geography={geo} />
                  ))
                }
              </Geographies>
              <Marker coordinates={[modalData.longitude, modalData.latitude]}>
                <circle r={2} fill="#F53" />
              </Marker>
            </ZoomableGroup>
          </ComposableMap>

          </div>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#002f5d", color: "white" }}>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
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
