import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import StorePage from './pages/StorePage';
import ProductPage from './pages/ProductPage';
import CatalogPage from './pages/CatalogPage';
import SearchPage from './pages/SearchPage';
import CartPage from './pages/CartPage';
import NotFoundPage from './pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'store/:storeId', element: <StorePage /> },
      { path: 'store/:storeId/catalog', element: <CatalogPage /> },
      { path: 'store/:storeId/search', element: <SearchPage /> },
      { path: 'store/:storeId/product/:productId', element: <ProductPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
