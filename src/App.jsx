import {Router, Routes, Route } from "react-router-dom";
import Navigation from "./Components/Navigation";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import AboutUs from "./Pages/AboutUs";
import { useEffect, useState } from "react";

function App() {
    const [cart, setCart] = useState(() => {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    });

      // Обрізка тексту
  const truncateText = (text, length) => {
    return text && text.length > length ? text.slice(0, length) + '...' : text;
  };
  return (
    <>
        <Navigation cart={cart} setCart={setCart}/>
        
        <Routes>
          <Route path="/" element={<Home truncateText={truncateText}/>} />
          <Route path="/shop" element={<Shop setCart={setCart} truncateText={truncateText}/>}/>
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
        
        <Footer />
    </>
  );
}

export default App;
