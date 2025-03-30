// 1. Бібліотеки
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// 2. Компоненти
import App from './App.jsx';
import { ScrollProvider } from './context/scrollProvider.jsx';
// 4. Стилі
import './index.scss';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollProvider>
        <App />
      </ScrollProvider>
    </BrowserRouter>
  </StrictMode>,
)
