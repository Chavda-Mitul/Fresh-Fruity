import React, { useEffect, useState } from "react";
import { db } from "./firebaseConfig";
import { doc, addDoc, collection, getDocs, getDoc } from "firebase/firestore";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "react-bootstrap";

const List = ({ width }) => {
  const [list, setList] = useState([]);
  const listCollectionRef = collection(db, "user1");
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [tech, setTech] = useState("");
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

  const submitData = async () => {
    try {
      await addDoc(listCollectionRef, {
        name: name,
        age: age,
        Technology: tech,
      });
      getList();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div style={{ width: width }}>
        <label htmlFor="text">Name</label>
        <input type="text" onChange={(e) => setName(e.target.value)} />
      </div>
      <div style={{ width: width }}>
        <label htmlFor="text">age</label>
        <input type="number" onChange={(e) => setAge(e.target.value)} />
      </div>
      <div style={{ width: width }}>
        <label htmlFor="text">Technology</label>
        <input type="text" onChange={(e) => setTech(e.target.value)} />
      </div>
      <div style={{ width: width }}>
        <button onClick={submitData}>add-data</button>
      </div>
      <Table
        style={{ width: width }}
        responsive="sm"
        striped
        bordered
        hover
        // add this prop to make the table not scrollable
        tableLayout="fixed"
        // add this prop to set the minimum width of the table
        minWidth="500px"
        columns={[
          {
            title: "Name",
            dataField: "name",
          },
          {
            title: "Age",
            dataField: "age",
          },
          {
            title: "Delete",
            renderCell: (data) => (
              <button
                onClick={() => {
                  setList(list.filter((item) => item.id !== data.id));
                }}
              >
                Delete
              </button>
            ),
          },
        ]}
        data={list}
      />
    </div>
  );
};

export default List;
