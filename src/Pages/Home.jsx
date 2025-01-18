import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Navigation from '../Components/Navigation';
import Shop from './Shop';
import AboutUs from './AboutUs';
import './Home.scss';
import Footer from '../Components/Footer';

function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navigation />

      <Routes>
        <Route path="/" element={
          <main>
            
          </main>
        } />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>

      <Footer />
    </>
  )
}

export default Home
