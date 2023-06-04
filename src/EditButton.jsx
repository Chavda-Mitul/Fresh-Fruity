import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  doc,
  updateDoc,
  getDoc,
  setDoc,
  arrayUnion,
  addDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

function EditButton({ fruitsList, setFruitsList }) {
  const [inputValue, setInputValue] = useState("");
  const [priceValue, setPriceValue] = useState(0);
  const [colorValue, setColorValue] = useState("");
  const navigate = useNavigate();

  const handleAddData = () => {
    const newObject = {
      id: fruitsList.length + 1,
      fruit_name: inputValue,
      color: colorValue,
      price: priceValue,
      weight: 0.68,
      origin_country: "India",
      harvest_date: "11/12/2020",
      expiration_date: "6/16/2022",
      organic: false,
      supplier_name: "Organic Harvest",
      shelf_life: 7,
    };

    setFruitsList([...fruitsList, newObject]);
    // addData();
    // readData();
    console.log("button clickd");
    setInputValue("");
    navigate("/about");
  };

  const addData = async () => {
    try {
      const fruit = {
        name: "apple",
        price: "1400",
        color: "red",
      };
      const docRef = doc(db, "user", "list");
      await setDoc(docRef, {
        fruits: fruitsList,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const readData = async () => {
    const querySnapshot = await getDocs(collection(db, "person"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      console.log(JSON.stringify(doc.data()));
    });
  };

  return (
    <div className="flex justify-center items-center h-60">
      <div className="border rounded p-4">
        <div className="flex flex-row items-center mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mr-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Enter your name"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>

        <div className="flex flex-row items-center mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mr-2"
            htmlFor="price"
          >
            Price
          </label>
          <input
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="text"
            placeholder="Enter the price"
            value={priceValue}
            onChange={(e) => setPriceValue(e.target.value)}
          />
        </div>

        <div className="flex flex-row items-center mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mr-2"
            htmlFor="color"
          >
            Color
          </label>
          <input
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="color"
            type="text"
            placeholder="Enter the color"
            value={colorValue}
            onChange={(e) => setColorValue(e.target.value)}
          />
        </div>

        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleAddData}
          >
            Add Data
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditButton;
