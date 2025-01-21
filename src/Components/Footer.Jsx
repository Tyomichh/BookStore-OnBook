import "./Footer.scss";

function Footer() {
    return (
        <footer className="footer">

            <div className="footer_nav">

                <div className="footer_nav_links">

                    <div className="footer_column">
                        <h4 className="footer_column_title">Company</h4>

                        <ul>
                            <li><a href="#our-number">Our number</a></li>
                            <li><a href="#about-us">About us</a></li>
                            <li><a href="#contact-us">Contact us</a></li>
                        </ul>
                    </div>

                    <div className="footer_column">
                        <h4 className="footer_column_title">User</h4>

                        <ul>
                            <li><a href="#basket">Basket</a></li>
                        </ul>
                    </div>

                    <div className="footer_column">
                        <h4 className="footer_column_title">Follow us</h4>
                        
                        <ul>
                            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                        </ul>
                    </div>

                </div>

                <form className="footer_form" action="#">

                    <h4 className="footer_column_title">Contact us</h4>

                    <input type="email" placeholder="Enter your email" required />
                    <button type="submit">Send Email</button>

                </form>

            </div>

            <h1 className="logo_footer">On.Book</h1>

        </footer>

    )
}


export default Footer