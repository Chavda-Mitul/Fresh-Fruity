import "./App.css";
import Navbar from "./Navbar";
import store from "./app/store";
import { Provider } from "react-redux";
function App() {
  return (
    <>
      <Provider store={store}>
        <Navbar />
      </Provider>
    </>
  );
}

export default App;

// add edit and delet the list
// for hte add we will redirect edit page to edit and conform and cancal compent
// we can also add to cart directy also
