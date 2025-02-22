// 1. Бібліотеки
// 2. Компоненти
// 3.Дані
// 4. Стилі
import './BookItem.scss';

function BookItem ({ photo, author, title, isCentral }) {
  
    return (
      <div className={`book_item ${isCentral ? "central" : ""}`}>
        <div className="book_item_shape">
            <img src={photo} alt="Book image" />
        </div>

        <div className={`book_item_text ${isCentral ? "top" : ""}`}>
          <p> {author} </p>
          
          <p> {title} </p>
        </div>
      </div>
    );
  };
  
  export default BookItem;