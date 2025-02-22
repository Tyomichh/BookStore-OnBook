import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
  const navigate = useNavigate();

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

export const useScroll = () => useContext(ScrollContext);
