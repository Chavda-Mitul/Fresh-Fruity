import React, { useEffect, useState } from "react";
import { selectedItemsHook } from "./selectedItemsHook";
import { cartHook } from "./cartHook";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Homepage";
import Register from "./Resister";
import About from "./About";
import Protected, { SellerPermition } from "./Protected";
import Nav from "./Nav";
import SummaryPage from "./SummaryPage";
import EditButton from "./EditButton";
import SignIn from "./SignIn";
import { useSelector, useDispatch } from "react-redux";
import { signin, signout } from "./features/auth/siginSlicer";
export default function Navbar() {
  const isSignedIn = useSelector((state) => state.sigin.value);
  const { items, setItems } = cartHook();
  const { selectedItems, setSelectedItems } = selectedItemsHook();
  const storedUser = localStorage.getItem("user");
  const user = JSON.parse(storedUser);
  if (user) {
    console.log("user ", user);
    var seller = user.displayName == "seller" ? true : false;
    console.log(seller);
  }
  return (
    <>
      <Router>
        {/* navigation */}
        <Nav items={items} seller={seller} />
        {/* navigation */}
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Protected>
                <Home
                  items={items}
                  setItems={setItems}
                  selectedItems={selectedItems}
                  setSelectedItems={setSelectedItems}
                />
              </Protected>
            }
          />
          <Route path="/registration" element={<Register />} />
          <Route
            path="/addfruits"
            element={
              <Protected>
                <SellerPermition isSeller={seller}>
                  <About />
                </SellerPermition>
              </Protected>
            }
          />
          <Route
            path="/cart"
            element={
              <Protected>
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
              <Protected>
                <EditButton />
              </Protected>
            }
          />

          <Route path="/sigin" element={<SignIn />} />
        </Routes>
      </Router>
    </>
  );
}
