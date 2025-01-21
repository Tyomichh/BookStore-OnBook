import { useState } from 'react'
import bookImage from '../assets/images/modern-bookstore-showcasing-rows-vibrant-books.jpg'; 
import './AboutUs.scss'
import WorkerCard from '../Components/WorkerCard.jsx';
import photo from '../assets/images/modern-bookstore-showcasing-rows-vibrant-books.jpg'; 

function AboutUs() {
  const workers = [
    { name: 'Artem Lozenko', position: 'Founder and CEO', photo: photo },
    { name: 'Artem Lozenko', position: 'Content Manager', photo: photo },
    { name: 'Artem Lozenko', position: 'Designer', photo: photo },
    { name: 'Artem Lozenko', position: 'Developer', photo: photo },
  ];

  return (
    <>
      <main className=''>

        <section className=''>
          <div className='about_container'>
            <h2 className='section_title'>Who We Are and What Inspires Us?</h2>
            <p className='section_text'>We are a team of book enthusiasts dedicated to inspiring people to read and explore new worlds.
            Our collection offers something for everyone, from classics to new releases, from fiction to academic works!</p>
          </div>
        </section>

        <section class="full-width-image">
          <div class="image-mask">
            <img src={bookImage} alt="Background Image" />
          </div>
        </section>

        <section className=''>
          <div className='about_container reverse'>
            <p className='section_text'>Our goal is to make books accessible to everyone. We aim to unite people through a love of reading,
            fostering imagination, knowledge, and empathy. Our platform is not just about selling books but building a community that values the power of words and ideas!</p>
            <h2 className='section_title'>Our Mission and Vision for the Future</h2>
          </div>
        </section>

        <section className=''>
          
          <h2 className='section_title'>Meet our team</h2>

          <div className='about_card_wrapper'>
            
            {workers.map((worker, index) => (
              <WorkerCard
                key={index}
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