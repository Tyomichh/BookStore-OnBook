import bookImage from '../assets/images/modern-bookstore-showcasing-rows-vibrant-books.jpg'; 
import WorkerCard from '../Components/WorkerCard.jsx';
import './AboutUs.scss'

function AboutUs() {
  const images = import.meta.glob('../assets/workers/*.jpg', { eager: true });

  const workers = Object.keys(images).map((path, index) => ({
    name: 'Artem Lozenko',
    position: ['Founder and CEO', 'Content Manager', 'Designer', 'Developer'][index],
    photo: images[path].default || images[path],
  }));
  
  return (
    <>
      <main>
        <section className='about_container'>
            <h2 className='section_title'>Who We Are and What Inspires Us?</h2>
            <p className='section_text'>We are a team of book enthusiasts dedicated to inspiring people to read and explore new worlds.
            Our collection offers something for everyone, from classics to new releases, from fiction to academic works!</p>
        </section>

        <section className="section_long">
          <div className="image_mask">
            <img src={bookImage} alt="Background Image" />
          </div>
        </section>

        <section className='about_container rotate'>
            <p className='section_text'>Our goal is to make books accessible to everyone. We aim to unite people through a love of reading,
            fostering imagination, knowledge, and empathy. Our platform is not just about selling books but building a community that values the power of words and ideas!</p>
            <h2 className='section_title'>Our Mission and Vision for the Future</h2>
        </section>

        <section>     
          <h2 className='section_title' id="target-section">Meet our team</h2>

          <div className='about_card_wrapper margin_top'>
            {workers.map((worker) => (
              <WorkerCard
                name={worker.name}
                position={worker.position}
                photo={worker.photo}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  )
}

export default AboutUs