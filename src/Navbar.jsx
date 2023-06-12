import React, { useEffect, useState } from "react";
import { selectedItemsHook } from "./selectedItemsHook";
import { cartHook } from "./cartHook";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Homepage";
import Register from "./Resister";
import About from "./About";
import { useSignIn } from "./useSIgnin";
import Protected, { SellerPermition } from "./Protected";
import Nav from "./Nav";
import SummaryPage from "./SummaryPage";
import EditButton from "./EditButton";
import fruits from "./fruitsData";
import SignIn from "./SignIn";

export default function Navbar() {
  const { isSignedIn, signin, signout } = useSignIn();
  const { items, setItems } = cartHook();
  const { selectedItems, setSelectedItems } = selectedItemsHook();
  const [fruitsList, setFruitsList] = useState(fruits);
  const storedUser = localStorage.getItem("user");
  const user = JSON.parse(storedUser);
  if (user) {
    var seller = user.displayName == "seller" ? true : false;
  }
  return (
    <>
      <Router>
        {/* navigation */}
        <Nav
          items={items}
          isSignedIn={isSignedIn}
          signin={signin}
          signout={signout}
          seller={seller}
        />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Protected isSignedIn={isSignedIn}>
                <Home
                  items={items}
                  setItems={setItems}
                  selectedItems={selectedItems}
                  setSelectedItems={setSelectedItems}
                />
              </Protected>
            }
          />
          <Route
            path="/registration"
            element={<Register isSignedIn={isSignedIn} signin={signin} />}
          />
          <Route
            path="/addfruits"
            element={
              <Protected isSignedIn={isSignedIn}>
                <SellerPermition isSeller={seller}>
                  <About
                    fruitsList={fruitsList}
                    setFruitsList={setFruitsList}
                  />
                </SellerPermition>
              </Protected>
            }
          />
          <Route
            path="/cart"
            element={
              <Protected isSignedIn={isSignedIn}>
                <SummaryPage
                  selectedItems={selectedItems}
                  setSelectedItems={setSelectedItems}
                />
              </Protected>
            }
          />
          <Route
            path="/edit"
            element={
              <Protected isSignedIn={isSignedIn}>
                <EditButton
                  fruitsList={fruitsList}
                  setFruitsList={setFruitsList}
                />
              </Protected>
            }
          />

          <Route
            path="/sigin"
            element={<SignIn isSignedIn={isSignedIn} signin={signin} />}
          />
        </Routes>
      </Router>
    </>
  );
}
