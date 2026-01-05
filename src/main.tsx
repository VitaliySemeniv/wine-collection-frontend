import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes.tsx';
import { CartProvider } from './modules/shared/context/CartContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </CartProvider>
  </StrictMode>,
);
