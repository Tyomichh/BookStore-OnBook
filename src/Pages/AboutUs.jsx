// 1. Бібліотеки
import React from 'react';
// 2. Компоненти
import WorkerItem from '../Components/WorkerItem.jsx';
// 3. Дані
import bookImage from '../assets/images/modern-bookstore.jpg'; 
// 4. Стилі
import './AboutUs.scss';


function AboutUs() {
  // Завантажує всі зображення з папки workers
  const images = import.meta.glob('../assets/workers/*.jpg', { eager: true });

  // Використовується Object.keys для отримання шляхів зображень і метод map для створення масиву
  const workers = Object.keys(images).map((path, index) => ({
    name: 'Artem Lozenko',
    position: ['Founder and CEO', 'Content Manager', 'Designer', 'Developer'][index],
    photo: images[path].default || images[path],
  }));
  
return (
  <>
    <main>
      <section className="section_wrapper">
        <h2 className="no_margin section_title">Who We Are and What Inspires Us?</h2>

        <p className="section_text">
          We are a team of book enthusiasts dedicated to inspiring people to read and explore new worlds.
          Our collection offers something for everyone, from classics to new releases, from fiction to academic works!
        </p>
      </section>

      <section className="about_long">
          <img src={bookImage} alt="Background Image" />
      </section>

      <section className="section_wrapper">
        <p className="section_text">
          Our goal is to make books accessible to everyone. We strive to unite people through a love of reading,
          fostering imagination, knowledge, and empathy. Our platform is not just about selling books but building a community that values the power of words and ideas!
        </p>

        <h2 className="no_margin section_title">Our Mission and Vision for the Future</h2>
      </section>

      <section>
        <h2 className="section_title">Meet our team</h2>

        <div className="section_card_wrapper">
          {workers.map((worker,i) => (
            <WorkerItem
              key={i}
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
