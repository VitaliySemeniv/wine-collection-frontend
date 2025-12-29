import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes.tsx';
import { ProductsProvider } from './modules/shared/context/ProductsProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProductsProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ProductsProvider>
  </StrictMode>,
);
