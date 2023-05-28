import React, { useState } from 'react';
import { searchHook } from './searchHook';
import { cartHook } from './cartHook';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Homepage';
import Register from './Resister';
import About from './About';
import { useSignIn  } from "./useSIgnin";
import Protected from './Protected';
import Nav from './Nav';
import Cart from './Cart';

export default function Navbar() {
  const {isSignedIn, signin , signout } = useSignIn();
  const {query, setQuery} = searchHook();
  const {items,setItems} = cartHook();
  return (
    <>
      <Router>
        {/* navigation */}
       <Nav query={query} setQuery={setQuery} items={items}/>
        <Routes>
          <Route exact path="/" 
          element={
            <Protected isSignedIn={isSignedIn}>
              <Home query={query} items={items} setItems={setItems}/>
              </Protected>
          }/> 
          <Route path="/registration" element={<Register />} />
          <Route path="/about" element={
            <Protected isSignedIn={isSignedIn}>
                <About query={query}/>
            </Protected>
          }/>
           <Route path="/cart" element={
            <Protected isSignedIn={isSignedIn}>
                <Cart/>
            </Protected>
          }/>
        </Routes>
      </Router>
    </>
  );
}
