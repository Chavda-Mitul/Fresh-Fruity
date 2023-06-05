import React, { useEffect, useState } from "react";
import { db } from "./firebaseConfig";
import { doc, addDoc, collection, getDocs, getDoc } from "firebase/firestore";
function List() {
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
    <>
      <div>
        <label htmlFor="text">Name</label>
        <input type="text" onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="text">age</label>
        <input type="number" onChange={(e) => setAge(e.target.value)} />
      </div>
      <div>
        <label htmlFor="text">Technology</label>
        <input type="text" onChange={(e) => setTech(e.target.value)} />
      </div>
      <div>
        <button onClick={submitData}>add-data</button>
      </div>
      {list.map((data, id) => (
        <div key={id}>
          <h1> Name : {data.name}</h1>
          <h1>Age : {data.age}</h1>
        </div>
      ))}
    </>
  );
}

export default List;
