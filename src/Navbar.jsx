import React, { useState } from 'react';
import { searchHook } from './searchHook';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Homepage';
import Register from './Resister';
import About from './About';
import { useSignIn  } from "./useSIgnin";
import Protected from './Protected';
import Nav from './Nav';


export default function Navbar() {
  const {isSignedIn, signin , signout } = useSignIn();
  const {query, setQuery} = searchHook();
  return (
    <>
      <Router>
        {/* navigation */}
       <Nav query={query} setQuery={setQuery}/>
        <Routes>
          <Route exact path="/" 
          element={
            <Protected isSignedIn={isSignedIn}>
              <Home query={query} />
              </Protected>
          }/> 
          <Route path="/registration" element={<Register />} />
          <Route path="/about" element={
            <Protected isSignedIn={isSignedIn}>
                <About query={query}/>
            </Protected>
          }/>
        </Routes>
      </Router>
    </>
  );
}
