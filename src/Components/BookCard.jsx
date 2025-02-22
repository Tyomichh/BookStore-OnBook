// 1. Бібліотеки
// 2. Компоненти
// 3. Дані
// 4. Стилі
import { useState } from "react";
import './BookCard.scss';

function BookCard({ id, title, photo, author, price, addToCart, discount, discountedPrice}) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({ id, photo, title, author, price: discountedPrice ?? price });
    setIsAdded(true);

    setTimeout(() => setIsAdded(false), 2000); // Галочка зникає через 2 секунди
  };

  return (
    <div className="book_card">
      {discount && <div className="discount_badge">{discount}%</div>}  {/* Бейдж знижки */}

      <div className="book_image">
        <img src={photo} alt="Book image"/>
      </div>

      <div className="book_card_content">
        <div className="book_info">
          <p className="name"><b>{title}</b></p>
          <p className="position">{author}</p>
        </div>

        <div className="book_footer">
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
