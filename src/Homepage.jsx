import Cards from "./Cards";

function HomePage({ query, items, setItems, selectedItems, setSelectedItems }) {
  return (
    <>
      <Cards
        query={query}
        items={items}
        setItems={setItems}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
    </>
  );
}

export default HomePage;

/*
use the redux in app
us the auth context for the application

*/
