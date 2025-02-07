// 4. Стилі
import './WorkerItem.scss';

function WorkerItem({ name, position, photo }) {
    return (
            <div className="worker">

                <div className="worker_image">
                    <img src={photo} alt="Descriptive text about the image"/>
                </div>

                <div className="worker_content">
                    <p className="name">{name}</p>
                    <p className="position">{position}</p>
                </div>
            </div>   
    )
}


export default WorkerItem