import { Routes, Route } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Navigation from "../Components/Navigation";
import Footer from "../Components/Footer";
import AuthorCard from "../Components/AuthorCard";
import OffersCard from "../Components/OffersCard";
import Button from "../Components/ButtonComponent";
import authors from "../data/authorsData";
import AboutUs from './AboutUs';
import Shop from './Shop';
import './Home.scss';


function Home() {

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
