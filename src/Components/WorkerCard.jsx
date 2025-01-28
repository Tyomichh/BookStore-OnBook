// 4. Стилі
import './WorkerCard.scss';

function WorkerCard({ name, position, photo }) {
    return (
            <div className="worker_card">

                <div className="worker_card_image">
                    <img src={photo} alt="Descriptive text about the image"/>
                </div>

                <div className="worker_card_content">
                    <p className="worker_name">{name}</p>
                    <p className="worker_position">{position}</p>
                </div>
            </div>   
    )
}


export default WorkerCard