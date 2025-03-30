// 1. Бібліотеки
import emailjs from 'emailjs-com';
import { useState, useEffect, useRef } from 'react';
// 2. Компоненти
import { useScroll } from "../context/scrollProvider.jsx";
// 3. Дані
// 4. Стилі
import './Footer.scss';

function Footer() {
    // Скрол до елемента
    const { handleClick } = useScroll();

    // Змінні для зберігання значення email та помилки
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    // Керування відображенням попапа
    const [NumberPopup, setNumberPopup] = useState(false);
    const popupRef = useRef(null);

    // Відстеження стану блимання
    const [blink, setBlink] = useState(false);

    // Перевірка емейлу
    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(String(email).toLowerCase());
    }

    // Обробка форми
    const SubmitEmail = (e) => {
        e.preventDefault();

        // Перевірка валідації
        if (!validateEmail(email)) {
            setError('Please enter a valid email');
            return;
        }

        setError('');

        // Відправка за допомогою EmailJS
        const templateParams = {
            email: email,
            message: `Користувачеві ${email} потрібна ваша допомога, відгукніться якомога скоріше`
        };

        emailjs.send('service_34nm607', 'template_yo6x009', templateParams, 'MXdPw0RltTVuCF7fu')
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                alert('Your message has been sent!');
                setEmail('');
            }, (err) => {
                console.log('FAILED...', err);
                alert('Failed to send the message, please try again.');
            });
    };

    // Закриваємо віконечко при кліку поза ним
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setNumberPopup(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Функція активації блимання
    const handleContactClick = () => {
        setBlink(true);
        setTimeout(() => setBlink(false), 600);
    };

    console.log("Footer is rendering");

    return (
        <footer className="footer">
            <div className="footer_nav">
                <div className="footer_nav_columns">
                    <div className="footer_column">
                        <h3 className="footer_column_title">Company</h3>

                        <ul>
                            <li><button onClick={() => setNumberPopup(!NumberPopup)}>Our number</button></li>
                            <li><a href="/about-us">About us</a></li>
                            <li><button onClick={handleContactClick}>Contact us</button></li>
                        </ul>
                    </div>

                    <div className="footer_column">
                        <h3 className="footer_column_title">User</h3>

                        <ul>
                            <li><a href="#basket" onClick={() => handleClick("", "basketID")}>Basket</a></li>
                            <li><a href="/shop">Shop</a></li>
                        </ul>
                    </div>

                    <div className="footer_column">
                        <h3 className="footer_column_title">Follow us</h3>

                        <ul>
                            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                        </ul>
                    </div>
                </div>

                <form className={`footer_form ${blink ? 'blink' : ''}`} action="#" onSubmit={SubmitEmail}>
                    <h3 className="footer_column_title">Contact us</h3>

                    <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    {error && <p className="error">{error}</p>} {/* стилі до error в index.scss */}
                    <button type="submit">Send Email</button>
                </form>
            </div>

            <a href="#header" className="logo-footer" onClick={() => handleClick("", "headerID")} >On.Book</a> {/* стилі до logo в index.scss */}

            {NumberPopup && (
                <>
                    <div className="popup_overlay" onClick={() => setNumberPopup(false)}></div> {/* стилі до popup в index.scss */}

                    <div className="popup_number" ref={popupRef}>
                        <p><b>Our contact number:</b> +098 012 65 79</p>
                    </div>
                </>
            )}
        </footer>
    )
}

export default Footer