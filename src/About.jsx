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
import { doc, collection, query, where, getDoc } from "firebase/firestore";

export default function About({ fruitsList, setFruitsList }) {
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
    // const userParsed = JSON.parse(storedUser);
    // const userRef = doc(db, userParsed.uid);

    if (storedUser) {
      const user = JSON.parse(storedUser);
      console.log(user.email);
      // const list = retrieveFruitList(user);
      // console.log(list);
    }
  }, []);

  const retrieveFruitList = async (userId) => {
    try {
      const collectionRef = collection(db, userId);
      const q = query(collectionRef, where(userId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const fruitListData = userDoc.data().fruitList;
        console.log("Fruit List Data:", fruitListData);
        return fruitListData;
      } else {
        console.log("No Fruit List found for the user");
      }
    } catch (error) {
      console.error("Error retrieving Fruit List:", error);
    }
  };

  const fetchData = useCallback(async () => {
    const docRef = doc(db, "user", "list", "fruits");
    const snapshot = await getDoc(docRef);

    // setFruitsList(Object.entries(snapshot.data()));
    // console.log(fruitsList[0]);
    // console.log(snapshot.data());
    if (snapshot.exists()) {
      console.log(snapshot.data());
      console.log("data found");
    } else {
      console.log("No data found");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
          {fruitsList.map((row, id) => (
            <TableRow
              key={id}
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
