import Cards from "./Cards";
function HomePage({query}) {
  return (
    <>
      {/* <h1 className="text-5xl mt-10">HomePage</h1> */}
      <Cards query={query}/>
    </>
  );
}

export default HomePage;

