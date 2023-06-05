import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@material-ui/core";
import { db } from "./firebaseConfig";
import { doc, collection, query, where, getDocs } from "firebase/firestore";

export default function About({ fruitsList, setFruitsList }) {
  const storedUser = localStorage.getItem("user");
  const user = JSON.parse(storedUser);
  const listCollectionRef = collection(db, user.uid);
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const deleteByValue = (value) => {
    setFruitsList((oldValues) => {
      return oldValues.filter((fruit) => fruit !== value);
    });
  };

  const navigateToEdit = () => {
    navigate("/edit");
  };

  // getting the list of the user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
    }
  }, []);

  const getList = async () => {
    try {
      const data = await getDocs(listCollectionRef);
      //   console.log(data.data());
      const listData = data.docs.map((doc) => doc.data());
      setList(listData);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getList();
  }, []);
  return (
    <TableContainer component={Paper} className="mt-2.5">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Fruit Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">weight</TableCell>
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
          {list.map((data, id) => (
            <TableRow
              key={id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {data.fruit_name}
              </TableCell>
              <TableCell align="right">{data.price}</TableCell>
              <TableCell align="right">{data.weight}</TableCell>
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
