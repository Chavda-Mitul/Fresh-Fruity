import { Card, Grid, Row, Text, Button } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import list from "./listData";
import {
  doc,
  updateDoc,
  getDoc,
  setDoc,
  arrayUnion,
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

export default function Cards({
  items,
  setItems,
  selectedItems,
  setSelectedItems,
}) {
  const storedUser = localStorage.getItem("user");
  const user = JSON.parse(storedUser);
  const cartListRef = collection(db, user.uid, "cart/list");
  const _query = useSelector((state) => state.query.value);

  const Filterlist = list.filter((data) => {
    if (_query === "") return data;
    else return data.title.toLowerCase().includes(_query.toLowerCase());
  });
  const addToCart = (item) => {
    const itemIndex = selectedItems.findIndex(
      (selectedItem) => selectedItem.id === item.id
    );

    if (itemIndex !== -1) {
      // Item already exists in the cart, update its quantity
      const updatedItems = [...selectedItems];
      updatedItems[itemIndex].quantity += 1;
      setSelectedItems(updatedItems);
    } else {
      // Item doesn't exist in the cart, add it as a new item
      const newItem = {
        ...item,
        quantity: 1,
      };
      setSelectedItems([...selectedItems, newItem]);
    }
    addData(item);
    setItems(selectedItems.length + 1);
  };
  const addData = async (item) => {
    await addDoc(cartListRef, {
      item,
    });
  };

  const updateData = async (item) => {
    try {
      const data = await getDocs(cartListRef);
      const listData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const id = listData[0].id;
      const UpdateRef = doc(db, user.uid, "cart/list", id);
      await updateDoc(UpdateRef, {
        quantity: 10,
      });
    } catch (e) {
      console.error(e);
    }
  };
  const readData = async () => {
    const docSnap = await getDoc(cartListRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  return (
    <Grid.Container gap={2} justify="flex-start">
      {Filterlist.map((item) => (
        <Grid xs={6} sm={3} key={item.id}>
          <Card
            isPressable
            className="transition-transform duration-300 ease-in-out transform hover:-translate-y-1"
          >
            <Card.Body css={{ p: 0 }}>
              <Card.Image
                src={"https://nextui.org" + item.img}
                objectFit="cover"
                width="100%"
                height={140}
                alt={item.title}
              />
            </Card.Body>
            <Card.Footer css={{ justifyItems: "flex-start" }}>
              <Row wrap="wrap" justify="space-between" align="center">
                <Text b>{item.title}</Text>
                <Text
                  css={{
                    color: "$accents7",
                    fontWeight: "$semibold",
                    fontSize: "$sm",
                  }}
                >
                  {item.price}
                </Text>
                <Button
                  bordered
                  color="primary"
                  auto
                  onPress={() => addToCart(item)}
                >
                  Add
                </Button>
              </Row>
            </Card.Footer>
          </Card>
        </Grid>
      ))}
    </Grid.Container>
  );
}
