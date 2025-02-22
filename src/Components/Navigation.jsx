// 1. Бібліотеки
import { useState, useEffect } from 'react';
import { FaSearch, FaShoppingBag } from 'react-icons/fa';
import { Link } from 'react-router-dom';
// 2. Компоненти
// 3. Дані
// 4. Стилі
import './Navigation.scss';

function Navigation({cart, setCart}) {
    // Створення стану для відображення чи відкрита корзина, та для попапу
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [buyPopup, setBuyPopup] = useState(false);
    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });
    
    const [formErrors, setFormErrors] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });
    // Збереження даних корзини в localStorage при зміні стану 'cart'
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Функція для оновлення кількості товару в корзині
    const updateQuantity = (id, change) => {
        setCart(prevCart => {
            const updatedCart = prevCart.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + change } : item
            ).filter(item => item.quantity > 0);
            return updatedCart;
        });
    };

    // Функція покупки
    const handleBuy = () => {
        setBuyPopup(true); 
    };

    const handlePaymentChange = (e) => {
        const { name, value } = e.target;
        setPaymentInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateForm = () => {
        let isValid = true;
        let errors = {};

        // Перевірка картки
        if (!/^\d{16}$/.test(paymentInfo.cardNumber)) {
            errors.cardNumber = 'Card number must be 16 digits.';
            isValid = false;
        }

        // Перевірка дати закінчення
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentInfo.expiryDate)) {
            errors.expiryDate = 'Expiry date must be in MM/YY format.';
            isValid = false;
        }

        // Перевірка CVV
        if (!/^\d{3}$/.test(paymentInfo.cvv)) {
            errors.cvv = 'CVV must be 3 digits.';
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setCart([]); 
            setBuyPopup(false); // Закриваємо попап після успішної оплати
        }
    };




    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    // Отримання книг із localStorage
    useEffect(() => {
        if (searchQuery.length > 0) {
            const books = JSON.parse(localStorage.getItem("books")) || [];
            const offersBooks = JSON.parse(localStorage.getItem("offersBooks")) || [];
            const bestsellers = JSON.parse(localStorage.getItem("bestsellers")) || [];
            const allBooks = [...books, ...offersBooks, ...bestsellers];

            // Фільтруємо за назвами книг
            const filteredBooks = allBooks
            .filter(book => book.title.toLowerCase().includes(searchQuery.toLowerCase()))
            .filter((book, index, self) => 
                index === self.findIndex(b => b.id === book.id) // Перевірка унікальності книги
            );

            setSearchResults(filteredBooks);
        } else {
            setSearchResults([]);
        }
    }, [searchQuery]);

    // Додавання в корзину
    const addToCart = (book) => {
       
        setCart((prevCart) => {
          const existingItem = prevCart.find((item) => item.id === book.id);
          if (existingItem) {
            return prevCart.map((item) =>
              item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
            );
          }
          return [...prevCart, { ...book, quantity: 1 }];
        });
    };
    
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = (book) => { 
        // Вибір правильної ціни
        const price = book.discountedPrice || book.price;
    
        // Додавання книги до корзини з відповідною ціною
        addToCart({ ...book, price });
    
        // Оновлення статусу додавання
        setIsAdded(prev => ({
            ...prev,
            [book.id]: true, // Змінюємо тільки для конкретної книги
        }));
    
        // Повернення в початковий стан через 2 секунди
        setTimeout(() => {
            setIsAdded(prev => ({
                ...prev,
                [book.id]: false, // Повертаємо в початковий стан
            }));
        }, 2000); // Галочка зникає через 2 секунди
    };
    

  const truncateText = (text, maxLength = 10) => {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
};

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
                        <input className="search_input" type="text" placeholder="Search book..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                        {searchResults.length > 0 && (
                        <ul className="search_results">
                            {searchResults.map(book => (
                                <li key={book.id}>
                                    <img src={book.photo} alt={book.title} />
                                    <div>
                                        <p>{truncateText(book.title, 12)}</p>
                                        <p>{truncateText(book.author, 12)}</p>
                                    </div>
                                    <button className={`button_add ${isAdded[book.id] ? "added" : ""}`} onClick={() => handleAddToCart(book)}></button>
                                </li>
                            ))}
                        </ul>
                    )}
                    </div>

                    <button className="basket_circle" onClick={() => setIsCartOpen(!isCartOpen)} id='basketID'>
                        <FaShoppingBag className="basket_icon"/>
                        {cart.length > 0 && <span className="cart-count">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>}
                    </button>   
            </div>
            {isCartOpen && (
                <div className="cart-modal">
                    {cart.length > 0 ? (
                        <>
                            {cart.map(item => (
                                <div key={item.id} className="cart-item">
                                    <img src={item.photo} alt={item.name} className="cart-item-img" />

                                    <div className="cart-item-text">
                                        <p>{item.title}</p>
                                        <p>{item.author}</p>
                                        <p>{item.price}$</p>
                                        
                                    </div>

                                    <div className="cart-quantity-controls">
                                        <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                    </div>
                                </div>
                            ))}

                            <div className="cart-total">
                                <p>Total: ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}</p>

                                <button onClick={handleBuy}>Buy</button>
                            </div>
                        </>
                    ) : (
                        <p style={{ textAlign: "center" }}>Cart is empty</p>
                    )}
                </div>
            )}

            {buyPopup && (
                <div className="popup_overlay">
                    <div className="popup">
                    <h2>Payment Form</h2>
                    <form onSubmit={handlePaymentSubmit} className="payment-form">
                        <div className="form-group">
                            <label htmlFor="cardNumber">Card Number</label>
                            <input
                                type="text"
                                id="cardNumber"
                                name="cardNumber"
                                value={paymentInfo.cardNumber}
                                onChange={handlePaymentChange}
                                placeholder="1234 5678 9012 3456"
                                required
                            />
                            {formErrors.cardNumber && <p className="error">{formErrors.cardNumber}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="expiryDate">Expiry Date</label>
                            <input
                                type="text"
                                id="expiryDate"
                                name="expiryDate"
                                value={paymentInfo.expiryDate}
                                onChange={handlePaymentChange}
                                placeholder="MM/YY"
                                required
                            />
                            {formErrors.expiryDate && <p className="error">{formErrors.expiryDate}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="cvv">CVV</label>
                            <input
                                type="text"
                                id="cvv"
                                name="cvv"
                                value={paymentInfo.cvv}
                                onChange={handlePaymentChange}
                                placeholder="123"
                                required
                            />
                            {formErrors.cvv && <p className="error">{formErrors.cvv}</p>}
                        </div>
                        <button type="submit">Pay</button>
                    </form>
                    <button onClick={() => setBuyPopup(false)}></button>
                </div>
                
            </div>
            )}
        </header>
    )
}


export default Navigation