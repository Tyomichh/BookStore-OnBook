// 1. Бібліотеки
import { FaSearch, FaShoppingBag } from 'react-icons/fa';
import { Link } from 'react-router-dom';
// 4. Стилі
import './Navigation.scss';

function Navigation() {
    return (
        <header className="header" id='headerID'>
            <h1 className="logo"> On.Book </h1>
            <nav className="header_nav">
                    <Link className="header_nav_link" to="/">Home</Link>
                    <Link className="header_nav_link" to="/shop">Shop</Link>
                    <Link className="header_nav_link" to="/about-us">About Us</Link>
            </nav>
            <div className="header_controls">
                    <div className="search">
                        <FaSearch className="search_icon"/>
                        <input className="search_input" type="text" placeholder="Search book..."/>
                    </div>
                    <button className="basket_circle">
                        <FaShoppingBag className="basket_icon"/>
                    </button>   
            </div>         
        </header>
    )
}


export default Navigation