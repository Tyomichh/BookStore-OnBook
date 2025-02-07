// 1. Бібліотеки
import { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from "swiper/modules";
import axios from 'axios';
// 2. Компоненти
import Navigation from '../Components/Navigation';
import Footer from '../Components/Footer';
import AuthorCard from '../Components/AuthorCard';
import OffersItem from '../Components/OffersItem';
import Button from '../Components/ButtonComponent';
import BookItem from '../Components/BookItem';
import AboutUs from './AboutUs';
import Shop from './Shop';  
// 3. Дані
import authors from '../data/authorsData';
// 4. Стилі
import './Home.scss';
import 'swiper/css';
import 'swiper/css/pagination';


function Home() {
  const [books, setBooks] = useState([]);

  const truncateText = (text, length) => {
    return text && text.length > length ? text.slice(0, length) + '...' : text;
  };
  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://openlibrary.org/search.json', {
          params: {
            subject: 'detective',
            //author: '',
            limit: 40, 
            sort: 'editions', 
            //first_publish_year: 2008,
            language: 'eng',
            title: 'dark' 
          }
        });
  
        const booksData = response.data.docs.map(item => ({
          id: item.key,
          title: item.title ? truncateText(item.title, 16) : null,
          author: item.author_name?.[0] ? truncateText(item.author_name[0], 16) : null,
          photo: item.cover_i ? `https://covers.openlibrary.org/b/id/${item.cover_i}-L.jpg` : null,
        }));
  
        // Фільтруємо книги без необхідних даних та беремо потрібну кількість
        const validBooks = booksData.filter(book => book.title && book.author && book.photo).slice(0, 40);
        setBooks(validBooks);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
  
    fetchBooks();
  }, []);

  console.log("Total books loaded:", books.length);
  
  return (
    <>
      <Navigation />
      <Routes>

        <Route path="/" element={
          <main>
            
            <section className="section_wrapper">
              <div className="intro_box">
                <h2 className="no_margin section_title">Find Your Next Book</h2>

                <p className="section_text">Discover stories that inspire, entertain, and stay with you — find your next favorite book today!</p>
                <Button text="Explore Now" bgcolor="var(--graphite-100-color)" color="var(--body-background-color)" border="none" margin="0 0 0 0" linkTo="/about-us" scrollTo="target-section" />
              </div>
              
              <Swiper modules={[Pagination, Autoplay]} pagination={{ clickable: true }} loop={true} slidesPerView={1} direction="vertical" 
              autoplay={{ delay: 5000, disableOnInteraction: false }} speed={1000} className="content_carousel">
                
                {[0, 1, 2].map((index) => (
                  <SwiperSlide key={index}>
                    <div className="content_wrapper">
                      {books.slice(index * 3, index * 3 + 3).map((book, i) => (
                        <BookItem key={book.id} author={book.author} title={book.title} photo={book.photo} isCentral={i % 2 !== 0}/>
                      ))}
                    </div>
                  </SwiperSlide>
                ))}
                
              </Swiper>
            </section>

            <section className="line_background">
              <div className="line_mask">

                {[3, 4, 5].map((index) => (
                  <div key={index}>
                    <div className="content_row">

                      {books.slice(index * 4, index * 4 + 4).map((book, i) => (
                      <BookItem key={book.id} author={book.author} title={book.title} photo={book.photo} isCentral={i % 2 !== 0}/>
                      ))}
                        
                    </div>
                  </div>
                ))}

              </div>
                
              <div className="line_text">
                <h4>Online Book Sale 2025</h4>

                <p>Hurry up to the online sale of books with discounts up to 50% - your library is waiting for replenishment!</p>
              </div>
            </section>

            <section>
              <h2 className="section_title">Offers</h2>

              <div className="offers_container">
                <div className="offers_list">
                  {[6, 7, 8].map((index, i) => (
                    <OffersItem key={i} isCentral={i % 2 !== 0} text={`This month discount - ${50 - i * 15}%`} photos={books.slice(index * 4, index * 4 + 4).map(book => book.photo)}/>
                  ))}
                </div>
                
                <Button text="See More" margin="42px 0 0 0" justify="center" linkTo="/shop"/>
              </div>
            </section>

            <section>
              <h2 className="section_title">Get to know</h2>

              <div>
                <hr className="author_background_line"/>

                <div className="author_conteiner">
                  <Swiper spaceBetween={0}  slidesPerView="auto" grabCursor={true} freeMode={true} className="author_carousel">
                    
                    {authors.map((author) => (
                      <SwiperSlide key={author.id} style={{ width: 'auto' }}>
                        <AuthorCard name={author.name} about={author.about} photo={author.photo}/>
                      </SwiperSlide>
                    ))}

                  </Swiper>
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
