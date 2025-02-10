// 4. Стилі
import './BookCard.scss';

function BookCard({ name, position, photo, price }) {
  return (
    <div className="book_card">
      <div className="book_image">
        <img src={photo} alt="Descriptive text about the image"/>
      </div>

      <div className="book_card_content">
        <div className="book_info">
          <p className="name"><b>{name} Lorem Lorem</b></p>
          <p className="position">{position}Lorem Lorem</p>
        </div>

        <div className="book_footer">
          <p>{price} 234$</p>
          <button>+</button>
        </div>
      </div>
    </div>     
  )
}

export default BookCard;
