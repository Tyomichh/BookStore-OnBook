import React from "react";
import { useNavigate } from "react-router-dom";
import "../Components/ButtonComponent.scss"

function ButtonComponent ({ text, color, bgcolor, border, linkTo, scrollTo }) {
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
    <button className="button_styles" style={{
      backgroundColor: bgcolor,
      color: color,
      border: border,
    }} onClick={handleClick}>
    {text}
  </button>
  );
};

export default ButtonComponent;
