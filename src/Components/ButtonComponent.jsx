// 1. Бібліотеки
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// 4. Стилі
import '../Components/ButtonComponent.scss';

function ButtonComponent ({linkTo, scrollTo, bgcolor, color, border, margin, justify, text,}) {
  const navigate = useNavigate();

  const handleClick = () => {
    
    if (linkTo) {
      navigate(linkTo);

      if (scrollTo) {
        setTimeout(() => {
          const targetElement = document.getElementById(scrollTo);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
          }
        }, 500);
      }
    }
  };

  return (
    <a className="buttonComp_styles" style={{ backgroundColor: bgcolor, color: color, border: border, margin: margin, justifySelf: justify }} onClick={handleClick}>
      {text}
    </a>
  );
};

export default ButtonComponent;
