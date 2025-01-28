// 1. Бібліотеки
import React from 'react';
// 2. Компоненти
import WorkerCard from '../Components/WorkerCard.jsx';
// 3. Дані
import bookImage from '../assets/images/modern-bookstore.jpg'; 
// 4. Стилі
import './AboutUs.scss';


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
      <section className="about_wrapper">
        <h2 className="about_title">Who We Are and What Inspires Us?</h2>

        <p className="about_text">
          We are a team of book enthusiasts dedicated to inspiring people to read and explore new worlds.
          Our collection offers something for everyone, from classics to new releases, from fiction to academic works!
        </p>
      </section>

      <section className="about_long">
          <img src={bookImage} alt="Background Image" />
      </section>

      <section className="about_wrapper rotate">
        <p className="about_text">
          Our goal is to make books accessible to everyone. We strive to unite people through a love of reading,
          fostering imagination, knowledge, and empathy. Our platform is not just about selling books but building a community that values the power of words and ideas!
        </p>

        <h2 className="about_title">Our Mission and Vision for the Future</h2>
      </section>

      <section>
        <h2 className="about_title">Meet our team</h2>

        <div className="about_card_wrapper">
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

export default AboutUs;
