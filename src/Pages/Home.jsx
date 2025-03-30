// 1. Бібліотеки
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from "swiper/modules";
import axios from 'axios';
// 2. Компоненти
import AuthorCard from '../Components/AuthorCard.jsx';
import OffersItem from '../Components/OffersItem.jsx';
import Button from '../Components/ButtonComponent.jsx';
import BookItem from '../Components/BookItem.jsx';
import { useScroll } from "../context/scrollProvider.jsx";
// 3. Дані
import authors from '../data/authorsData.js';
// 4. Стилі
import './Home.scss';
import 'swiper/css';
import 'swiper/css/pagination';


function Home({ truncateText }) {
    // Скрол до елемента
    const { handleClick } = useScroll();

    // Стан для книг та розміру вікна
    const [books, setBooks] = useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 760);

    // Завантаження списку книг
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('https://openlibrary.org/search.json', {
                    params: {
                        subject: 'detective',
                        limit: 40,
                        sort: 'editions',
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

                // Фільтруємо книги без необхідних даних
                const validBooks = booksData.filter(book => book.title && book.author && book.photo).slice(0, 40);
                setBooks(validBooks);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    // Відстеження зміни розміру вікна
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 760);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    console.log("Total books loaded:", books.length);

    return (
        <main>
            <section className="section_wrapper"> {/* стилі для section в index.scss*/}
                <div className="intro_box"> {/* стилі для intro_box в index.scss*/}
                    <h2 className="no_margin section_title">Find Your Next Book</h2> {/* стилі для no_margin в index.scss*/}

                    <p className="section_text">Discover stories that inspire, entertain, and stay with you — find your next favorite book today!</p>
                    <Button text="Explore Now" linkTo="/about-us" className="btn-primary" onClick={() => handleClick("", "authorsID")} />
                </div>

                <Swiper modules={isMobile ? [Autoplay] : [Pagination, Autoplay]} pagination={!isMobile ? { clickable: true } : false} loop={true} slidesPerView={1} direction="vertical"
                    autoplay={{ delay: 5000, disableOnInteraction: false }} speed={1000} className="content_carousel">

                    {[0, 1, 2].map((index) => (
                        <SwiperSlide key={index}>
                            <div className="content_wrapper">
                                {books.slice(index * (isMobile ? 2 : 3), index * (isMobile ? 2 : 3) + (isMobile ? 2 : 3)).map((book, i) => (
                                    <BookItem key={book.id} author={book.author} title={book.title} photo={book.photo} isCentral={!isMobile && i % 2 !== 0} />
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
                                    <BookItem key={book.id} author={book.author} title={book.title} photo={book.photo} isCentral={i % 2 !== 0} />
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
                            <OffersItem key={i} isCentral={i % 2 !== 0} text={`This month discount - ${50 - i * 15}%`} photos={books.slice(index * 4, index * 4 + 4).map(book => book.photo)} />
                        ))}
                    </div>

                    <Button text="See More" className="btn-secondary" linkTo="/shop" onClick={() => handleClick("/shop", "offersID")} />
                </div>
            </section>

            <section>
                <h2 className="section_title" id='authorsID'>Get to know</h2>

                <div>
                    <hr className="author_background_line" />

                    <div className="author_conteiner">
                        <Swiper spaceBetween={0} slidesPerView="auto" grabCursor={true} freeMode={true} className="author_carousel">

                            {authors.map((author) => (
                                <SwiperSlide key={author.id} style={{ width: 'auto' }}>
                                    <AuthorCard name={author.name} about={author.about} photo={author.photo} />
                                </SwiperSlide>
                            ))}

                        </Swiper>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Home
