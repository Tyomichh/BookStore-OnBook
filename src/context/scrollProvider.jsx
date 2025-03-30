// 1. Бібліотеки
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
// 2. Компоненти
// 3. Дані
// 4. Стилі

// Створення контексту для керування прокруткою
const ScrollContext = createContext();

// Провайдер, що надає функцію handleClick дочірнім компонентам
export const ScrollProvider = ({ children }) => {
  const navigate = useNavigate();

  // Функція для навігації та плавної прокрутки до вказаного елемента
  const handleClick = (linkTo, scrollTo) => {
    if (linkTo) {
      navigate(linkTo);
      setTimeout(() => {
        const element = document.getElementById(scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 1000);
    } else if (scrollTo) {
      const element = document.getElementById(scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <ScrollContext.Provider value={{ handleClick }}>
      {children}
    </ScrollContext.Provider>
  );
};

// Хук для використання контексту прокрутки в компонентах
export const useScroll = () => useContext(ScrollContext);
