import { Route, Routes } from 'react-router-dom';
import { App } from './App';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<App />}></Route>
  </Routes>
);
