import React, { useState } from "react";
import { searchHook } from "./searchHook";
import { selectedItemsHook } from "./selectedItemsHook";
import { cartHook } from "./cartHook";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Homepage";
import Register from "./Resister";
import About from "./About";
import { useSignIn } from "./useSIgnin";
import Protected from "./Protected";
import Nav from "./Nav";
import Cart from "./Cart";
import SummaryPage from "./SummaryPage";

export default function Navbar() {
  const { isSignedIn, signin, signout } = useSignIn();
  const { query, setQuery } = searchHook();
  const { items, setItems } = cartHook();
  const { selectedItems, setSelectedItems } = selectedItemsHook();
  return (
    <>
      <Router>
        {/* navigation */}
        <Nav query={query} setQuery={setQuery} items={items} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Protected isSignedIn={isSignedIn}>
                <Home
                  query={query}
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
            path="/about"
            element={
              <Protected isSignedIn={isSignedIn}>
                <About />
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
        </Routes>
      </Router>
    </>
  );
}
