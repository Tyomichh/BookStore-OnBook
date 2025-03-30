// 1. Бібліотеки
import { useState } from "react";
// 2. Компоненти
// 3. Дані
// 4. Стилі
import './BookCard.scss';

function BookCard({ id, title, photo, author, price, addToCart, discount, discountedPrice }) {

    // Стан для відображення статусу додавання до корзини
    const [isAdded, setIsAdded] = useState(false);

    // Функція для додавання книги в корзину
    const handleAddToCart = () => {

        // Додаємо книгу до корзини
        addToCart({ id, photo, title, author, price: discountedPrice ?? price });
        setIsAdded(true);

        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="book_card">
            {discount && <div className="discount_badge">{discount}%</div>} {/* Бейдж знижки */}

            <div className="book_card_image">
                <img src={photo} alt="Book image" />
            </div>

            <div className="book_card_content">
                <div className="book_card_info"> {/* Інформація про книгу */}
                    <p className="name">
                        <b>{title}</b>
                    </p>

                    <p className="position">
                        {author}
                    </p>
                </div>

                <div className="book_card_footer"> {/* Ціна книги та кнопка додавання в корзину */}
                    {discount ? (
                        <div className="price_element">
                            <p className="old_price">{price} $ </p>
                            <p className="new_price">{discountedPrice} $</p>
                        </div>
                    ) : (
                        <p>{price} $</p>
                    )}

                    <button className={`button_add ${isAdded ? "added" : ""}`} onClick={handleAddToCart}></button>
                </div>
            </div>
        </div>
    )
}

export default BookCard;
