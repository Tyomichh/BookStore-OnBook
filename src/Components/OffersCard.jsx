import "./OffersCard.scss";
import photo1123123 from "../assets/offers/Photo2341.jpg";

function OffersCard({ reverse, text }) {

    return (
            <div className='offers_card'>
                <div className={`image_container ${reverse ? "reverse" : ""}`}>
                        <div className='image_group'>
                                <img src={photo1123123} alt="Book illustration" />
                                <img src={photo1123123} alt="Book illustration" />
                        </div>
                        <div className='image_group'>
                                <img src={photo1123123} alt="Book illustration" />
                                <img src={photo1123123} alt="Book illustration" />
                        </div>

                </div>

                    <p>{text}</p>
            </div>
    )
}

export default OffersCard