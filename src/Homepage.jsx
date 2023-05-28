import Cards from "./Cards";



function HomePage({query,items,setItems}) {
  return (
    <>
      {/* <h1 className="text-5xl mt-10">HomePage</h1> */}
      
      <Cards query={query} items={items} setItems={setItems}/>
    </>
  );
}

export default HomePage;



