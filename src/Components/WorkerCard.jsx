import "./WorkerCard.scss";

function WorkerCard({ name, position, photo }) {
    return (
            <div class="about_card">

                <div class="about_card_image">
                    <img src={photo} alt="Descriptive text about the image"/>
                </div>

                <div class="about_card_content">
                    <p class="worker_name">{name}</p>
                    <p class="worker_position">{position}</p>
                </div>
            </div>   
    )
}


export default WorkerCard