// 1. Бібліотеки
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
// 2. Компоненти
import Button from "../Components/ButtonComponent.jsx";
import BookCard from "../Components/BookCard.jsx";
import { useScroll } from "../context/scrollProvider.jsx";
// 3. Дані
// 4. Стилі
import "./Shop.scss";

function Shop({setCart, truncateText}) {
   const { handleClick } = useScroll();

   const [windowWidth, setWindowWidth] = useState(window.innerWidth);

// Відстеження зміни розміру вікна
useEffect(() => {
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

  // Стан для збереження книг
  const [books, setBooks] = useState([]);
  const [bestsellerBooks, setBestsellerBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState("All");

  // Затриимка завантаження
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  // Жанри книг
  const genres = [
    "All",
    "Adventure",
    "Bestsellers",
    "Comedy",
    "Drama",
    "Fantasy",
    "History",
    "Horror",
    "Mystery",
    "Nonfiction",
    "Philosophy",
    "Romance",
    "Science Fiction",
    "Thriller",
    "Travel",
    "Western"
  ];

  const allBooksRef = useRef([]);
  const filteredGenres = genres.slice(1);
  
  // Визначення кількості книг на сторінці в залежності від ширини екрану
  const booksPerPage = windowWidth < 760 ? 3 : windowWidth < 1024 ? 6 : 9;

  // Розрахнок ціни
  const calculatePrice = (pages) => {
    if (!pages) {
      return Math.floor(Math.random() * (90 - 40 + 1)) + 40;
    }
    let multiplier = 2;
    if (pages > 300) multiplier = 1.5;
    if (pages < 40) multiplier = 10;

    return Math.round(pages * 0.2 * multiplier);
  };

  // Завантаження книг (для першої секції)
  useEffect(() => {
    async function fetchBooks() {
      try {

        const response = await axios.get("https://openlibrary.org/search.json", {
          params: {
            subject: 'detective',
            limit: 2,
            first_publish_year: 2023,
            language: 'eng',
            title: 'dark',
          },
        });

        const validBooks = response.data.docs.filter(
          (book) => book.cover_i
        ).slice(0, 2);

        // Оновлюємо стан книг
        setBooks(validBooks);
      } catch (error) {
        console.error("Помилка завантаження книг:", error);
      }
    }

    fetchBooks();
  }, []);

  // Завантаження книг (для третьої секції) --
  useEffect(() => {
    const fetchBestsellers = async () => {
      try {
        const response = await axios.get("https://openlibrary.org/search.json", {
          params: {
            subject: "bestsellers",
            limit: 4,
            sort: "editions",
            language: "eng",
          },
        });
  
        const booksData = [];
  
        for (const item of response.data.docs) {
          try {
            await delay(300); // 300 мс пауза
  
            const workId = item.key.split('/').pop();
            const editionsResponse = await axios.get(`https://openlibrary.org/works/${workId}/editions.json`);
            const editions = editionsResponse.data.entries;
  
            const pages = editions.find(edition => edition.number_of_pages)?.number_of_pages || null;
  
            // Отримуємо необхідні дані
            const title = item.title ? truncateText(item.title, 16) : null;
            const author = item.author_name?.[0] ? truncateText(item.author_name[0], 16) : null;
            const photo = item.cover_i ? `https://covers.openlibrary.org/b/id/${item.cover_i}-L.jpg` : null;
  
            if (pages && title && author && photo) { // Фільтрація некоректних книг
              booksData.push({
                id: item.key,
                title,
                author,
                photo,
                pages,
                price: calculatePrice(pages),
              });
            }
          } catch (err) {
            console.warn(`Помилка отримання даних для книги ${item.key}:`, err.message);
          }
        }
  
        // Зберігаємо книги в localStorage
        localStorage.setItem("bestsellers", JSON.stringify(booksData.slice(0, 4)));
  
        // Встановлюємо стан
        setBestsellerBooks(booksData.slice(0, 4));
      } catch (error) {
        console.error('Помилка отримання книг:', error);
      }
    };
  
    // Перевіряємо LocalStorage перед завантаженням з API
    const savedBestsellers = localStorage.getItem("bestsellers");
    if (savedBestsellers) {
      setBestsellerBooks(JSON.parse(savedBestsellers));
    } else {
      fetchBestsellers();
    }
  }, []);
  

  // Завантаження книг (для четвертої секції)
  useEffect(() => {
    const fetchShopListBooks = async () => {
      try {
        const booksData = [];
    
        for (const genre of filteredGenres) {
          console.log(`Завантаження книг для жанру: ${genre}`);
          const response = await axios.get("https://openlibrary.org/search.json", {
            params: {
              subject: genre,
              limit: 40,
              sort: "editions",
              language: "eng",
            },
          });
    
          for (const item of response.data.docs) {
            try {
              await delay(400);
              const workId = item.key.split('/').pop();
              const editionsResponse = await axios.get(`https://openlibrary.org/works/${workId}/editions.json`);
              const editions = editionsResponse.data.entries;
    
              const pages = editions.find(edition => edition.number_of_pages)?.number_of_pages || null;
              const price = calculatePrice(pages);
    
              // Отримуємо необхідні дані
              const title = item.title ? truncateText(item.title, 16) : null;
              const author = item.author_name?.[0] ? truncateText(item.author_name[0], 16) : null;
              const photo = item.cover_i ? `https://covers.openlibrary.org/b/id/${item.cover_i}-L.jpg` : null;
    
              // Фільтруємо книги, які не мають фото, автора або назви
              if (pages && title && author && photo && price >= 50) { // <-- Фільтрація некоректних книг
                booksData.push({
                  id: item.key,
                  title,
                  author,
                  photo,
                  pages,
                  price,
                  genre: genre.toLowerCase(),
                });
    
              }
            } catch (err) {
              console.warn(`Помилка отримання даних для книги ${item.key}:`, err.message);
            }
          }
        }
    
        // Фільтруємо дублікатні книги за `id`
        const uniqueBooks = Array.from(new Map(booksData.map(book => [book.id, book])).values());
    
        // Зберігаємо книги в useRef
        allBooksRef.current = uniqueBooks;
    
        // Зберігаємо книги в localStorage
        localStorage.setItem('books', JSON.stringify(uniqueBooks));
        console.log(`Загальна кількість унікальних книг: ${allBooksRef.current.length}`);
      } catch (error) {
        console.error('Помилка отримання книг:', error);
      }
    };

    const savedBooks = localStorage.getItem('books');
    if (savedBooks) {
      // Якщо книги є в localStorage, використовуємо їх
      allBooksRef.current = JSON.parse(savedBooks);
    } else {
      // Якщо немає - завантажуємо книги через API
      fetchShopListBooks();
    }
  }, []);
  
  // Зберігаємо книги в localStorage

  // Фільтруємо книги за вибраним жанром
  const filteredBooks = selectedGenre === "All" ? allBooksRef.current : allBooksRef.current.filter(book => {
      return book.genre === selectedGenre.toLowerCase();
  });

  // Визначаємо загальну кількість сторінок
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  // Витягуємо книги для поточної сторінки
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage
  );

  // Генерація пагінації
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }

    return (
      <div className="pagination">
        {pages.map((page, index) => (
          <span key={index} className={page === currentPage ? "activeDSA" : ""} onClick={() => typeof page === "number" && setCurrentPage(page)}>
            {page}
          </span>
        ))}
      </div>
    );
  };

  // Додає книгу в кошик
  const addToCart = (book) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === book.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...book, quantity: 1 }];
    });
  };

  const [offersBooks, setOffersBooks] = useState([]);
  const offersRef = useRef(JSON.parse(localStorage.getItem("offersBooks")) || []);
    // Визначення кількості книг на сторінці в залежності від ширини екрану
  const offersPerPage = windowWidth < 760 ? 2 : windowWidth < 1024 ? 6 : 8;
  const [currentOffersPage, setCurrentOffersPage] = useState(1); // Додано для сторінки
  const totalOffersPages = Math.ceil(offersRef.current.length / offersPerPage);
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        console.log("Fetching offers books...");
        const response = await axios.get("https://openlibrary.org/search.json", {
          params: {
            subject: "all",
            limit: 60,
            sort: "editions",
            language: "eng",
          },
        });

        console.log("API Response:", response.data);
        let booksData = [];

        for (const item of response.data.docs) {
          try {
            await delay(300); 
            const workId = item.key.split("/").pop();
            const editionsResponse = await axios.get(
              `https://openlibrary.org/works/${workId}/editions.json`
            );

            console.log(`Editions for ${workId}:", editionsResponse.data`);
            const editions = editionsResponse.data.entries;
            const pages = editions.find((edition) => edition.number_of_pages)?.number_of_pages || null;
            const price = pages ? calculatePrice(pages) : Math.floor(Math.random() * (90 - 40 + 1)) + 40;

            // Отримуємо необхідні дані
            const title = item.title ? truncateText(item.title, 16) : null;
            const author = item.author_name?.[0] ? truncateText(item.author_name[0], 16) : null;
            const photo = item.cover_i ? `https://covers.openlibrary.org/b/id/${item.cover_i}-L.jpg` : null;

            const discountOptions = [20, 35, 50]; // Доступні знижки

            // ...
            const discount = discountOptions[Math.floor(Math.random() * discountOptions.length)]; // Випадкова знижка
            const discountedPrice = Math.round(price * (1 - discount / 100)); // Обчислення нової ціни
            
            if (title && author && photo && price < 50 && !allBooksRef.current.some((book) => book.id === item.key)) {
              const bookData = {
                id: item.key,
                title,
                author,
                photo,
                price,  // Початкова ціна
                discount,  // Знижка у відсотках
                discountedPrice // Ціна після знижки
              };

              console.log("Adding book:", bookData);
              booksData.push(bookData);
            }
          } catch (err) {
            console.warn(`Помилка отримання даних для книги ${item.key}:`, err.message);
          }
        }

        console.log("Total books before filtering:", response.data.docs.length);
        console.log("Filtered Offers Books:", booksData);

        offersRef.current = booksData;
        setOffersBooks(booksData.slice(0, offersPerPage));

        // Зберігаємо книги в localStorage
        localStorage.setItem("offersBooks", JSON.stringify(booksData));
      } catch (error) {
        console.error("Error fetching offers books:", error);
      }
    };

    fetchOffers();
  }, []);


  const renderOffersPagination = () => {
    if (totalOffersPages <= 1) return null;

    const pages = [];
    for (let i = 1; i <= totalOffersPages; i++) {
      if (i === 1 || i === totalOffersPages || (i >= currentOffersPage - 1 && i <= currentOffersPage + 1)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }

    return (
      <div className="pagination">
        {pages.map((page, index) => (
          <span
            key={index}
            className={page === currentOffersPage ? "activeDSA" : ""}
            onClick={() => typeof page === "number" && setCurrentOffersPage(page)}
          >
            {page}
          </span>
        ))}
      </div>
    );
  };

  // Витягуємо книги для поточної сторінки
  const paginatedOffersBooks = offersRef.current.slice(
    (currentOffersPage - 1) * offersPerPage,
    currentOffersPage * offersPerPage
  );
  return (
      <main>
        <section className="section_wrapper">
          <div className="intro_box">
            <h2 className="no_margin section_title">What book are you looking for?</h2>
            <p className="section_text">
              Explore genres, uncover hidden gems, and find exactly what you're looking for in just a few clicks!
            </p>
            <Button text="Explore Now" linkTo="/about-us" className="btn-primary" onClick={() => handleClick("", "genresID")} />
          </div>

          <div className="shapes">
            {books.map((book, index) => (
              <div className="rectangle" key={index}>
                <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} alt={book.title} />
              </div>
            ))}
          </div>
        </section>

        <section className="collor_lines">
          <hr className="line1" />
          <hr className="line2" />
          <hr className="line3" />
          <hr className="line4" />
          <hr className="line5" />
        </section>

        <section>
          <h2 className="section_title" id='bestsellersID'>Bestsellers</h2>

          <div className="section_card_wrapper">
            {bestsellerBooks.map((book) => (
              <BookCard
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                photo={book.photo}
                price={book.price}
                addToCart={addToCart}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="section_title" id='genresID'>Browse Genres</h2>

          <div className="books_shop">
            <ul className="Genres_list">
              {genres.map((genre) => (
                <li key={genre} className={selectedGenre === genre ? "active" : ""} onClick={() => {setSelectedGenre(genre); setCurrentPage(1);}}>
                  {genre}
                </li>
              ))}
            </ul>

            <div className="book_list">
              {paginatedBooks.map((book) => (
                <BookCard
                  key={book.id} 
                  id={book.id}
                  title={book.title}
                  author={book.author}
                  photo={book.photo}
                  price={book.price}
                  addToCart={addToCart}
                />
              ))}

              {renderPagination()}
            </div>
            
            <div className="decoration_lines">
              <hr className="line1" />
              <hr className="line2" />
              <hr className="line3" />
              <hr className="line4" />
              <hr className="line5" />
            </div>
          </div>

          
        </section>

        <section>
          <h2 className="section_title" id='offersID'>Offers</h2>
          <div className="offers_book_list">
          {paginatedOffersBooks.map((book) => (
                <BookCard
                key={book.id} 
                id={book.id}
                title={book.title}
                  author={book.author}
                  photo={book.photo}
                  price={book.price}
                  discount={book.discount}
                  discountedPrice={book.discountedPrice} // Передаємо ціну зі знижкою
                  addToCart={addToCart}
                />
              ))}
            {renderOffersPagination()}
          </div>
        </section>
      </main>
  );
}

export default Shop;
