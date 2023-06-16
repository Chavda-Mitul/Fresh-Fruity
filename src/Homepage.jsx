import Cards from "./Cards";
import { useSelector } from "react-redux";
function HomePage({ items, setItems, selectedItems, setSelectedItems }) {
  const storedUser = localStorage.getItem("user");
  const user = JSON.parse(storedUser);
  const query = useSelector((state) => state.query.queryValue);
  return (
    <>
      <Cards />
    </>
  );
}

export default HomePage;

/*
use the redux in app
us the auth context for the application

*/
