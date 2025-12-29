import { Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage';
import { ProductsPage } from './modules/ProductsPage';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />

      <Route path="wines">
        <Route index element={<ProductsPage />} />
      </Route>
    </Route>
  </Routes>
);
