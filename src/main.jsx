// 1. Бібліотеки
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ScrollProvider } from './context/scrollProvider.jsx';
// 2. Компоненти
//import Home from './Pages/Home.jsx';
import App from './App.jsx';
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
