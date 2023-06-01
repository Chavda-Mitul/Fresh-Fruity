import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@material-ui/core";
import EditButton from "./EditButton";

export default function About({ fruitsList, setFruitsList }) {
  const navigate = useNavigate();
  const deleteByValue = (value) => {
    setFruitsList((oldValues) => {
      return oldValues.filter((fruit) => fruit !== value);
    });
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "500px",
      border: "2px solid red",
      background: "red",
    },
  };
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  const navigateToEdit = () => {
    navigate("/edit");
  };
  return (
    <TableContainer component={Paper} className="mt-2.5">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Fruit Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Color</TableCell>
            <TableCell align="right">
              {" "}
              <Button
                onClick={navigateToEdit}
                variant="contained"
                style={{ marginRight: "10px" }}
              >
                Edit
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fruitsList.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.fruit_name}
              </TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.color}</TableCell>
              <TableCell align="right">
                {/* <Button variant="contained" style={{ marginRight: "10px" }}>
                  edit
                </Button> */}
                <Button variant="contained" onClick={() => deleteByValue(row)}>
                  delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
