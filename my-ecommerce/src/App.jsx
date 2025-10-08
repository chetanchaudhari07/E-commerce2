import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Productdetails from "./pages/Productdetails";
import Cart from "./pages/Cart";

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Productdetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    
  );
}

export default App;
