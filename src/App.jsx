// 1. Бібліотеки
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
// 2. Компоненти
import Navigation from "./Components/Navigation.jsx";
import Footer from "./Components/Footer.jsx";
import Home from "./Pages/Home.jsx";
import Shop from "./Pages/Shop.jsx";
import AboutUs from "./Pages/AboutUs.jsx";
// 3. Дані
// 4. Стилі

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
            <Navigation cart={cart} setCart={setCart} />

            <Routes>
                <Route path="/" element={<Home truncateText={truncateText} />} />
                <Route path="/shop" element={<Shop setCart={setCart} truncateText={truncateText} />} />
                <Route path="/about-us" element={<AboutUs />} />
            </Routes>

            <Footer />
        </>
    );
}

export default App;
