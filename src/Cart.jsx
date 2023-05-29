import React, { useState } from "react";

const Cart = () => {
  const [items, setItems] = useState([]);
  const list = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
    { id: 4, name: "Item 4" },
    { id: 5, name: "Item 5" },
  ];

  const registerItem = (item) => {
    setItems([...items, item]);
  };

  return (
    <div>
      <h1>Item List</h1>
      <ul>
        {list.map((item) => (
          <li key={item.id}>
            {item.name}{" "}
            <button style={{border:"2px solid red"}} onClick={() => registerItem(item)}>Register</button>
          </li>
        ))}
      </ul>
      <h2>Registered Items:</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
