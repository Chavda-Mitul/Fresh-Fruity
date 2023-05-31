import Cards from "./Cards";

function HomePage({ query, items, setItems, selectedItems, setSelectedItems }) {
  return (
    <>
      {/* <h1 className="text-5xl mt-10">HomePage</h1> */}

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
