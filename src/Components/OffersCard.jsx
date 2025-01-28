// 3. Дані
import OffersPhoto from '../assets/authors/SalvadorDali.jpg';
// 4. Стилі
import './OffersCard.scss';

function OffersCard({ reverse, text }) {

    return (
            <div className="offers_card">
                <div className={`offers_wrapper ${reverse ? "reverse" : ""}`}>
                        <div className="image_group">
                                <img src={OffersPhoto} alt="Book illustration" />
                                <img src={OffersPhoto} alt="Book illustration" />
                        </div>
                        <div className="image_group">
                                <img src={OffersPhoto} alt="Book illustration" />
                                <img src={OffersPhoto} alt="Book illustration" />
                        </div>

                </div>

                    <p>{text}</p>
            </div>
    )
}

export default OffersCard