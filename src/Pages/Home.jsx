// 1. Бібліотеки
import { Routes, Route } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
// 2. Компоненти
import Navigation from '../Components/Navigation';
import Footer from '../Components/Footer';
import AuthorCard from '../Components/AuthorCard';
import OffersCard from '../Components/OffersCard';
import Button from '../Components/ButtonComponent';
import AboutUs from './AboutUs';
import Shop from './Shop';  
// 3. Дані
import authors from '../data/authorsData';
// 4. Стилі
import './Home.scss';
import './BookSlider.scss';



function Home() {

  const books = [
    { id: 1, author: "Author 1", title: "Book 1" },
    { id: 2, author: "Author 2", title: "Book 2" },
    { id: 3, author: "Author 3", title: "Book 3" },
  ];

  return (
    <>
      <Navigation />
      
      <Routes>
        <Route path="/" element={
          <main>
            
            <section>
              <div>
                <h2 className='section_title' style={{marginBottom: "42px"}}>Find Your Next Book</h2>
                <p className='section_text'>Discover stories that inspire, entertain, and stay with you — find your next favorite book today!</p>
                <Button text="Explore Now" bgcolor="var(--graphite-100-color)" color="var(--body-background-color)" border="none" linkTo="/about-us" scrollTo="target-section" />
              </div>
              
              <div>

                <Swiper slidesPerView={3} spaceBetween={20} centeredSlides loop>
                  {books.map((book, index) => (
                    <SwiperSlide key={book.id}>
                      <div className={`book-card ${index === 1 ? "inverted" : ""}`}>
                        <p>{book.author}</p>
                        <p>{book.title}</p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

              </div>
            </section>

            <section>
              <hr className='mask_background'/>
            </section>

            <section>
              <h2 className='section_title'>Offers</h2>

              <div className='section_offers'>
                <div className="offers_cards">
                  <OffersCard reverse={false} text={'This month discount - 50%'}/>
                  <OffersCard reverse={true} text={'This month discount - 30%'}/>
                  <OffersCard reverse={false} text={'This month discount - 15%'}/>
                </div>
                
                <Button text="See More" bgcolor="" color="" border="" linkTo="/shop" />

              </div>
            </section>

            <section>
              <h2 className='section_title'>Get to know</h2>

              <div style={ {marginTop: '60px' }}>

                <hr className='author_background'/>

                <div className='section_get_to'>

                
                    <div className='author_content'>
                  {authors.map(author => (
                      <AuthorCard 
                          key={author.id} 
                          name={author.name} 
                          about={author.about} 
                          photo={author.photo} 
                      />
                  ))}
                    </div>

                </div>

              </div>

              
              
            </section>

          </main>
        } />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>

      <Footer />
    </>
  )
}

export default Home
