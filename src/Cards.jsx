import { Card, Grid, Row, Text, Button } from "@nextui-org/react";
import list from "./listData";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedItems } from "./features/cartItems/itemSlice";
export default function Cards() {
  const query = useSelector((state) => state.query.value);
  const selectedItems = useSelector((state) => state.selectedItems.value);
  const dispatch = useDispatch();
  const Filterlist = list.filter((data) => {
    if (query === "") return data;
    else return data.title.toLowerCase().includes(query.toLowerCase());
  });
  const addToCart = (item) => {
    const itemIndex = selectedItems.findIndex(
      (selectedItem) => selectedItem.id === item.id
    );

    if (itemIndex !== -1) {
      // Item already exists in the cart, update its quantity
      const updatedItems = [...selectedItems];
      const updatedItem = { ...updatedItems[itemIndex] }; // Create a new object
      updatedItem.quantity += 1; // Update the quantity of the new object
      updatedItems[itemIndex] = updatedItem; // Replace the item in the array
      dispatch(setSelectedItems(updatedItems));
    } else {
      // Item doesn't exist in the cart, add it as a new item
      const newItem = {
        ...item,
        quantity: 1,
      };
      dispatch(setSelectedItems([...selectedItems, newItem]));
    }
    console.log(selectedItems);
  };
  console.log("log", selectedItems);

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
