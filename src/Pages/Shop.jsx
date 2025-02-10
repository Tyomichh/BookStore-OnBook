// 1. Бібліотеки

// 2. Компоненти
import Button from '../Components/ButtonComponent'; 
import BookCard from '../Components/BookCard'; 
// 3. Дані

// 4. Стилі
import './Shop.scss'

function Shop() {

  return (
    <>
      <main>
        <section className="section_wrapper">
          <div className="intro_box">
            <h2 className="no_margin section_title">What book are you looking for?</h2>

            <p className="section_text">Explore genres, uncover hidden gems, and find exactly what you're looking for in just a few clicks!</p>
            <Button text="Explore Now" linkTo="/about-us" className="btn-primary" scrollTo="target-section" />
          </div>

          <div className="shapes">
            <div className="rectangle">
              <img src="" alt="" />
            </div>

            <div className="rectangle">
              <img src="" alt="" />
            </div>
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
          <h2 className="section_title">Bestsellers</h2>

          <div className="about_card_wrapper">
            <BookCard/>
            <BookCard/>
            <BookCard/>
            <BookCard/>
          </div>
        </section>
      </main>
    </>
  )
}

export default Shop