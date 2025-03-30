// 1. Бібліотеки
// 2. Компоненти
// 3. Дані
// 4. Стилі
import './OffersItem.scss';

function OffersItem({ photos, text, isCentral }) {
    return (
        <div className="offers">
            <div className={`offers_wrapper ${isCentral ? "central" : ""}`}>
                <div className="offers_image_group">
                    <img src={photos[0]} alt="Book image" />
                    <img src={photos[1]} alt="Book image" />
                </div>

                <div className="offers_image_group">
                    <img src={photos[2]} alt="Book image" />
                    <img src={photos[3]} alt="Book image" />
                </div>
            </div>

            <p>{text}</p>
        </div>
    )
}

export default OffersItem