// 1. Бібліотеки
import React from 'react';
// 2. Компоненти
// 3. Дані
// 4. Стилі
import '../Components/ButtonComponent.scss';

function ButtonComponent({ className, text, onClick }) {

    return (
        <a className={`buttonComp_styles ${className}`} onClick={onClick}>
            {text}
        </a>
    );
};

export default ButtonComponent;
