import { useParams } from 'react-router-dom';
import StoreCatalog from '../components/StoreCatalog';
import { getStore } from '../data/stores';
import NotFoundPage from './NotFoundPage';

/** Отдельная страница поиска: поле в фокусе, фильтры, выбранные фильтры чипами, результаты. */
export default function SearchPage() {
  const store = getStore(useParams().storeId);
  if (!store) return <NotFoundPage />;
  return <StoreCatalog store={store} variant="search" />;
}
