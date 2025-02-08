// 1. Бібліотеки
import React from 'react';
import { useNavigate } from 'react-router-dom';
// 4. Стилі
import '../Components/ButtonComponent.scss';

function ButtonComponent ({linkTo, scrollTo, className, text}) {
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
    <a className={`buttonComp_styles ${className}`}  onClick={handleClick}>
      {text}
    </a>
  );
};

export default ButtonComponent;
