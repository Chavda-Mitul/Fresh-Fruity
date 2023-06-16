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
import {
  doc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

export default function About() {
  const storedUser = localStorage.getItem("user");
  const user = JSON.parse(storedUser);
  const listCollectionRef = collection(db, user.uid);
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  const deleteByValue = async (id) => {
    try {
      const fruitDoc = doc(db, user.uid, id);
      await deleteDoc(fruitDoc);
      console.log("Document deleted successfully");
      getList();
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const navigateToEdit = () => {
    navigate("/edit");
  };

  const getList = async () => {
    try {
      const data = await getDocs(listCollectionRef);
      const listData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setList(listData);
      console.log(listData);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getList();
    console.log(user.displayName);
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
                <Button
                  variant="contained"
                  onClick={() => deleteByValue(data.id)}
                >
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
