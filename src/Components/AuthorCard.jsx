import "./AuthorCard.scss";

function AuthorCard({ name, about, photo }) {

    return (
            <div className="author_wrapper">

                <div className="author_info">
                    <div className="author_info_wrapper">
                        <h4>Name:</h4>
                        <p>{name}</p>
                    </div>

                    <div className="author_info_wrapper">
                        <h4>About the author:</h4>
                        <p>{about}</p>
                    </div>
                </div>

                <div className="author_image_wrapper">
                    <img src={photo} alt={`${name}'s photo`}/>
                </div>
            </div>   
    )
}


export default AuthorCard