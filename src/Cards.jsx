import { Card, Grid, Row, Text, Button } from "@nextui-org/react";
import { useState, useEffect } from "react";
import list from "./listData";

export default function Cards({
  query,
  items,
  setItems,
  selectedItems,
  setSelectedItems,
}) {
  // const [selectedItems, setSelectedItems] = useState([]);

  const Filterlist = list.filter((data) => {
    if (query === "") return data;
    else return data.title.toLowerCase().includes(query.toLowerCase());
  });
  // console.log(Filterlist);
  const addToCart = (item) => {
    setSelectedItems([...selectedItems, item]);
    setItems(selectedItems.length + 1);
    console.log("s");
  };
  console.log(selectedItems);
  // useEffect(() => {
  //   console.log(items);
  // }, [items]);
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
