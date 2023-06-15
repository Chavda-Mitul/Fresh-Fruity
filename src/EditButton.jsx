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
  const storedUser = localStorage.getItem("user");
  const user = JSON.parse(storedUser);
  const listCollectionRef = collection(db, user.uid);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [weight, setWeight] = useState("");
  const navigate = useNavigate();

  const handleAddData = () => {
    addData();
    console.log("button clickd");
    navigate("/addfruits");
  };

  const addData = async () => {
    await addDoc(listCollectionRef, {
      fruit_name: name,
      price: price,
      weight: weight,
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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="flex flex-row items-center mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mr-2"
            htmlFor="color"
          >
            Weight
          </label>
          <input
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="color"
            type="text"
            placeholder="Enter the color"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
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
